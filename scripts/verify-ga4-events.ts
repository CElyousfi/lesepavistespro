/**
 * S2.4 — proves that the GA4 conversion events fire on real (built) pages
 * with the geo parameters: service, department_slug, city_slug, is_idf,
 * intent. Headless Chrome (puppeteer-core), `window.gtag` is replaced by a
 * recorder before any script runs, so nothing reaches Google.
 *
 *   npx tsx scripts/verify-ga4-events.ts [--base=http://localhost:3210]
 *
 * Exit 1 when an expected event or parameter is missing.
 */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const base = (process.argv.find(a => a.startsWith('--base='))?.slice(7) ?? 'http://localhost:3210').replace(/\/$/, '');
const chrome = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
if (!chrome) throw new Error('No Chrome binary found');

interface Recorded { name: string; params: Record<string, unknown> }

const PAGES: Array<{ path: string; expect: Record<string, unknown> }> = [
  { path: '/epaviste/ile-de-france/fourriere', expect: { service: 'epaviste', is_idf: true, intent: 'fourriere', page_type: 'intent' } },
  { path: '/rachat-voiture/ile-de-france/moteur-hs', expect: { service: 'rachat-voiture', is_idf: true, intent: 'moteur-hs', page_type: 'intent' } },
  { path: '/epaviste/hauts-de-seine-92/nanterre', expect: { service: 'epaviste', department_slug: 'hauts-de-seine-92', city_slug: 'nanterre', is_idf: true } },
  { path: '/rachat-voiture/val-de-marne-94', expect: { service: 'rachat-voiture', department_slug: 'val-de-marne-94', is_idf: true } },
  { path: '/epaviste/nord-59/lille', expect: { service: 'epaviste', department_slug: 'nord-59', city_slug: 'lille', is_idf: false } },
];
const EVENTS = ['click_call', 'click_whatsapp', 'form_start', 'lead_form_submit'];

async function main() {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
  let failures = 0;
  try {
    for (const page of PAGES) {
      const tab = await browser.newPage();
      let posted: Record<string, unknown> | null = null;
      await tab.setViewport({ width: 390, height: 844, isMobile: true });
      // Block the real GA script; keep everything else.
      await tab.setRequestInterception(true);
      tab.on('request', req => {
        if (/googletagmanager|google-analytics|api\/contact/.test(req.url())) {
          if (req.url().includes('/api/contact')) {
            posted = JSON.parse(req.postData() || '{}');
            return req.respond({ status: 200, contentType: 'application/json', body: '{"success":true}' });
          }
          return req.abort();
        }
        return req.continue();
      });
      await tab.evaluateOnNewDocument(() => {
        const w = window as unknown as { __ga: Recorded[]; gtag: (...args: unknown[]) => void; dataLayer: unknown[] };
        w.__ga = [];
        w.dataLayer = [];
        w.gtag = (...args: unknown[]) => {
          if (args[0] === 'event') w.__ga.push({ name: String(args[1]), params: (args[2] as Record<string, unknown>) ?? {} });
        };
      });
      await tab.goto(base + page.path, { waitUntil: 'load', timeout: 90000 });
      // Hydration: wait for the inline form to be interactive (React attaches handlers after load).
      await tab.waitForSelector('form button[type="button"]', { timeout: 30000 }).catch(() => null);
      await new Promise(r => setTimeout(r, 1500));
      // The layout inline script defines its own gtag → re-install the recorder on top of it.
      await tab.evaluate(() => {
        const w = window as unknown as { __ga: Recorded[]; gtag: (...args: unknown[]) => void };
        w.gtag = (...args: unknown[]) => {
          if (args[0] === 'event') w.__ga.push({ name: String(args[1]), params: (args[2] as Record<string, unknown>) ?? {} });
        };
      });

      // 1. call + WhatsApp CTAs (prevent navigation)
      await tab.evaluate(() => {
        document.addEventListener('click', e => { const a = (e.target as HTMLElement).closest('a'); if (a) e.preventDefault(); }, true);
        (document.querySelector('a[href^="tel:"]') as HTMLElement | null)?.click();
        (document.querySelector('a[href*="wa.me"], a[href*="whatsapp"]') as HTMLElement | null)?.click();
      });
      // 2. the inline form: pick a service / type a field → form_start
      const started = await tab.evaluate(() => {
        const form = document.querySelector('form');
        if (!form) return false;
        const btn = form.querySelector('button[type="button"]') as HTMLElement | null;
        btn?.click();
        return Boolean(btn);
      });
      // 3. drive the form to the end → lead_form_submit (the POST is stubbed)
      const submitted = started ? await driveForm(tab) : false;

      const events: Recorded[] = await tab.evaluate(() => (window as unknown as { __ga: Recorded[] }).__ga);
      for (const name of EVENTS) {
        const ev = events.find(e => e.name === name);
        if (!ev) {
          if (name === 'lead_form_submit' && !submitted) { console.log(`  ⚠ ${page.path} ${name}: form could not be driven to submit`); failures++; continue; }
          console.log(`  ✗ ${page.path} ${name}: not fired`); failures++; continue;
        }
        const missing = Object.entries(page.expect).filter(([k, v]) => ev.params[k] !== v);
        if (missing.length) { console.log(`  ✗ ${page.path} ${name}: ${missing.map(([k, v]) => `${k}=${JSON.stringify(ev.params[k])} (expected ${JSON.stringify(v)})`).join(', ')}`); failures++; }
        else console.log(`  ✓ ${page.path} ${name} → ${Object.keys(page.expect).map(k => `${k}=${JSON.stringify(ev.params[k])}`).join(' ')}`);
      }
      // 4. the hidden attribution fields must reach /api/contact
      if (submitted) {
        const body = posted as Record<string, unknown> | null;
        const ok = body && body.pagePath === page.path && body.landingPath === page.path && (body.intent ?? undefined) === (page.expect.intent ?? undefined);
        if (ok) console.log(`  ✓ ${page.path} POST /api/contact → pagePath=${body!.pagePath} landingPath=${body!.landingPath} intent=${JSON.stringify(body!.intent)}`);
        else { console.log(`  ✗ ${page.path} POST /api/contact attribution: ${JSON.stringify(body && { pagePath: body.pagePath, landingPath: body.landingPath, intent: body.intent })}`); failures++; }
      }
      await tab.close();
    }
  } finally {
    await browser.close();
  }
  console.log(failures ? `\n${failures} failure(s)` : '\nAll GA4 events verified');
  process.exit(failures ? 1 : 0);
}

/** Fill the 4-step ConversionForm with real typing and submit it (POST /api/contact is stubbed). */
async function driveForm(tab: import('puppeteer-core').Page): Promise<boolean> {
  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
  const clickText = (re: string) => tab.evaluate((src) => {
    const re = new RegExp(src, 'i');
    const btn = [...document.querySelectorAll('form button')].find(b => re.test(b.textContent || '')) as HTMLElement | undefined;
    btn?.click();
    return Boolean(btn);
  }, re);
  const pickOption = async (triggerRe: string) => {
    if (!(await clickText(triggerRe))) return false;
    await wait(400);
    return tab.evaluate(() => { const o = document.querySelector('form [data-option]') as HTMLElement | null; o?.click(); return Boolean(o); });
  };
  const typeInto = async (selector: string, text: string) => {
    const el = await tab.$(selector);
    if (!el) return false;
    await el.click();
    await el.type(text, { delay: 5 });
    return true;
  };
  try {
    // Step 2: vehicle (generous waits: production pages hydrate slower than a local build)
    await wait(400);
    if (!(await pickOption('Rechercher une marque'))) return false;
    await wait(400);
    if (!(await pickOption('Rechercher un modèle'))) return false;
    if (!(await typeInto('form input[placeholder="AA-123-BB"]', 'AB-123-CD'))) return false;
    if (!(await pickOption('État du véhicule'))) return false;
    await clickText('^Continuer$');
    // Step 3: postal code
    await wait(500);
    if (!(await typeInto('form input[placeholder^="Tapez un code postal"]', '92000'))) return false;
    await wait(700);
    await tab.evaluate(() => (document.querySelector('form [data-option]') as HTMLElement | null)?.click());
    await wait(300);
    await clickText('^Continuer$');
    // Step 4: contact
    await wait(500);
    await typeInto('form input[placeholder="Votre prénom"]', 'Test');
    await typeInto('form input[type="email"]', 'test@example.com');
    await typeInto('form input[type="tel"]', '0612345678');
    await clickText('^Valider ma demande$');
    await wait(2000);
    return true;
  } catch (e) {
    console.log('  driveForm:', (e as Error).message);
    return false;
  }
}

main().catch(e => { console.error(e); process.exit(1); });

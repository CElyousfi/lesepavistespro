/**
 * Weekly SEO monitor (S2.5) — one script the GitHub Action runs against
 * production. It chains the existing tools and turns their output into a
 * single summary JSON + a Markdown issue body:
 *
 *   1. scripts/seo-crawl.ts   — every Île-de-France URL + a 300-URL national sample
 *   2. scripts/validate-jsonld.ts — 10 reference pages
 *   3. redirect-hop test      — 6 host/path variants must reach the canonical
 *                               URL in exactly one hop
 *   4. robots.txt + sitemap   — key rules present, no regression vs last run
 *   5. Lighthouse (mobile)    — 6 reference pages, budgets perf ≥ 90,
 *                               LCP ≤ 2.5 s, CLS ≤ 0.1; a miss becomes an error
 *                               on 2 consecutive runs
 *
 *   npx tsx scripts/seo-monitor.ts [baseUrl] [--skip-lighthouse] [--skip-crawl]
 *
 * Output: seo-audit/monitor/<date>.json (committed by the workflow),
 *         seo-audit/monitor/latest.json (previous-run memory),
 *         seo-audit/monitor/issue.md (GitHub issue body, not committed).
 * Exit 1 on any error-level finding.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createHash } from 'node:crypto';

const argv = process.argv.slice(2);
const BASE = (argv.find(a => a.startsWith('http')) || 'https://www.lesepavistespro.fr').replace(/\/+$/, '');
const SKIP_LH = argv.includes('--skip-lighthouse');
const SKIP_CRAWL = argv.includes('--skip-crawl');
const CANONICAL_ORIGIN = 'https://www.lesepavistespro.fr';
const OUT_DIR = path.join(process.cwd(), 'seo-audit', 'monitor');
const AUDIT_DIR = path.join(process.cwd(), 'seo-audit');
const TODAY = new Date().toISOString().slice(0, 10);

type Severity = 'error' | 'warning' | 'notice';
interface Finding { severity: Severity; check: string; message: string }
const findings: Finding[] = [];
const add = (severity: Severity, check: string, message: string) => findings.push({ severity, check, message });

// ── Reference pages ─────────────────────────────────────────────────────────
const JSONLD_PAGES = [
  '/', '/epaviste', '/rachat-voiture', '/epaviste/ile-de-france', '/rachat-voiture/ile-de-france',
  '/epaviste/paris-75', '/epaviste/hauts-de-seine-92/nanterre', '/rachat-voiture/val-de-marne-94/creteil',
  '/epaviste/ile-de-france/fourriere', '/rachat-voiture/ile-de-france/sans-controle-technique',
];
const LIGHTHOUSE_PAGES = [
  '/', '/epaviste/ile-de-france', '/epaviste/paris-75', '/epaviste/hauts-de-seine-92/nanterre',
  '/rachat-voiture/ile-de-france/moteur-hs', '/blog/certificat-destruction-vhu-obligatoire',
];
const BUDGET = { perf: 90, lcpMs: 2500, cls: 0.1 };
/** Variants that must land on the canonical URL in one 308 hop (proxy.ts). */
const REDIRECT_VARIANTS: Array<{ from: string; to: string; ownerGated?: boolean }> = [
  { from: 'http://www.lesepavistespro.fr/', to: `${CANONICAL_ORIGIN}/` },
  { from: 'https://lesepavistespro.fr/epaviste', to: `${CANONICAL_ORIGIN}/epaviste` },
  { from: `${CANONICAL_ORIGIN}/epaviste/`, to: `${CANONICAL_ORIGIN}/epaviste` },
  { from: `${CANONICAL_ORIGIN}/Epaviste/Paris-75`, to: `${CANONICAL_ORIGIN}/epaviste/paris-75` },
  // The .com domain only redirects once the owner attaches it to the Vercel project.
  { from: 'https://www.lesepavistespro.com/', to: `${CANONICAL_ORIGIN}/`, ownerGated: true },
  { from: 'http://lesepavistespro.com/rachat-voiture/', to: `${CANONICAL_ORIGIN}/rachat-voiture`, ownerGated: true },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
/** fetch with a 30 s timeout and one retry (production is checked from a runner, not a browser). */
async function fetchRetry(url: string, init: RequestInit = {}): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try { return await fetch(url, { ...init, signal: AbortSignal.timeout(30_000) }); } catch (e) { lastError = e; }
  }
  throw lastError;
}
const sha = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 12);
function readPrevious(): MonitorSummary | null {
  try { return JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'latest.json'), 'utf8')) as MonitorSummary; } catch { return null; }
}
function runTsx(script: string, args: string[]): { code: number; out: string } {
  const r = spawnSync('npx', ['tsx', script, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: process.env });
  return { code: r.status ?? 1, out: `${r.stdout ?? ''}${r.stderr ?? ''}` };
}

interface CrawlSection { file: string; summary: Record<string, number>; idfSummary: Record<string, number>; errors: Array<{ issue: string; count: number; samples: string[] }>; warnings: Array<{ issue: string; count: number }> }
interface RedirectResult { from: string; expected: string; hops: number; final: string; status: number; ok: boolean; note?: string }
interface RobotsSection { status: number; hash: string; changed: boolean; checks: Record<string, boolean>; sitemapStatus: number; sitemapChildren: number }
interface LighthouseRow { path: string; perf: number | null; lcpMs: number | null; cls: number | null; budgetOk: boolean; consecutiveMisses: number; error?: string }
interface MonitorSummary {
  at: string; baseUrl: string; status: 'ok' | 'regression';
  counts: Record<Severity, number>;
  findings: Finding[];
  crawl: CrawlSection | null;
  jsonld: { exitCode: number; pages: number; tail: string } | null;
  redirects: RedirectResult[];
  robots: RobotsSection | null;
  lighthouse: LighthouseRow[];
}

// ── 1. Crawl ────────────────────────────────────────────────────────────────
function crawl(): CrawlSection | null {
  if (SKIP_CRAWL) return null;
  console.log('\n▶ 1/5 Crawl (IDF exhaustive + 300-URL national sample)');
  const before = new Set(fs.existsSync(AUDIT_DIR) ? fs.readdirSync(AUDIT_DIR) : []);
  const r = runTsx('scripts/seo-crawl.ts', [BASE, '--idf-only', '--limit=300', '--label=monitor', '--concurrency=6']);
  process.stdout.write(r.out.split('\n').slice(-45).join('\n') + '\n');
  const file = fs.readdirSync(AUDIT_DIR).filter(f => f.startsWith('crawl-monitor-') && !before.has(f)).sort().pop();
  if (r.code !== 0 || !file) { add('error', 'crawl', `Crawler failed (exit ${r.code})`); return null; }
  const report = JSON.parse(fs.readFileSync(path.join(AUDIT_DIR, file), 'utf8'));
  const errors = (report.errors as CrawlSection['errors']) ?? [];
  errors.forEach(g => add('error', 'crawl', `${g.issue}: ${g.count} — ${g.samples.slice(0, 3).join(', ')}`));
  (report.warnings as CrawlSection['warnings'] ?? []).forEach(g => add('warning', 'crawl', `${g.issue}: ${g.count}`));
  return { file, summary: report.summary, idfSummary: report.idf?.summary ?? {}, errors, warnings: (report.warnings ?? []).map((g: { issue: string; count: number }) => ({ issue: g.issue, count: g.count })) };
}

// ── 2. JSON-LD ──────────────────────────────────────────────────────────────
function jsonld(): MonitorSummary['jsonld'] {
  console.log('\n▶ 2/5 JSON-LD validation (10 pages)');
  const r = runTsx('scripts/validate-jsonld.ts', [BASE, ...JSONLD_PAGES]);
  const tail = r.out.split('\n').slice(-30).join('\n');
  process.stdout.write(tail + '\n');
  if (r.code !== 0) add('error', 'jsonld', `validate-jsonld exit ${r.code}: ${r.out.split('\n').filter(l => /✗|missing|error/i.test(l)).slice(0, 5).join(' | ')}`);
  return { exitCode: r.code, pages: JSONLD_PAGES.length, tail };
}

// ── 3. Redirect hops ────────────────────────────────────────────────────────
async function redirects(): Promise<RedirectResult[]> {
  console.log('\n▶ 3/5 Redirect hops (6 variants)');
  const results: RedirectResult[] = [];
  for (const v of REDIRECT_VARIANTS) {
    let url = v.from, hops = 0, status = 0, note: string | undefined;
    try {
      for (;;) {
        const res = await fetchRetry(url, { redirect: 'manual', headers: { 'user-agent': 'lesepavistespro-seo-monitor' } });
        status = res.status;
        const loc = res.headers.get('location');
        if (status >= 300 && status < 400 && loc && hops < 6) { url = new URL(loc, url).toString(); hops++; continue; }
        break;
      }
    } catch (e) {
      note = (e as Error).message;
    }
    const ok = !note && hops === 1 && url === v.to && status === 200;
    results.push({ from: v.from, expected: v.to, hops, final: url, status, ok, note });
    const line = `${ok ? '✓' : '✗'} ${v.from} → ${url} (${hops} hop${hops === 1 ? '' : 's'}, ${status})${note ? ` — ${note}` : ''}`;
    console.log('  ' + line);
    if (!ok) {
      // Until the owner attaches lesepavistespro.com to the Vercel project the
      // .com host is served elsewhere (or not at all): report, don't fail.
      if (v.ownerGated) add('warning', 'redirects', `${v.from}: le domaine .com n’atteint pas ${v.to} en un saut (TODO(owner) : rattacher lesepavistespro.com au projet Vercel) — ${url} (${status})${note ? `, ${note}` : ''}`);
      else add('error', 'redirects', line);
    }
  }
  return results;
}

// ── 4. robots.txt + sitemap index ───────────────────────────────────────────
async function robots(previous: MonitorSummary | null): Promise<RobotsSection | null> {
  console.log('\n▶ 4/5 robots.txt + sitemap index');
  try {
    const res = await fetchRetry(`${BASE}/robots.txt`);
    const text = await res.text();
    const block = (agent: string) => {
      const m = text.match(new RegExp(`User-agent:\\s*${agent.replace('*', '\\*')}\\s*\\n([\\s\\S]*?)(?=\\nUser-agent:|$)`, 'i'));
      return m ? m[1] : '';
    };
    const disallowsAll = (b: string) => /^Disallow:\s*\/\s*$/im.test(b);
    const checks: Record<string, boolean> = {
      status200: res.status === 200,
      sitemapIndexListed: text.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`),
      googlebotAllowed: block('Googlebot').length > 0 && !disallowsAll(block('Googlebot')),
      wildcardNotBlocked: !disallowsAll(block('*')),
      nextStaticNotBlocked: !/Disallow:\s*\/_next\/static/i.test(text),
      apiBlocked: /Disallow:\s*\/api\//i.test(text),
      semrushAllowed: /User-agent:\s*SemrushBot\s*\nAllow:\s*\//i.test(text),
    };
    const hash = sha(text);
    const changed = Boolean(previous?.robots?.hash && previous.robots.hash !== hash);
    Object.entries(checks).forEach(([k, ok]) => { console.log(`  ${ok ? '✓' : '✗'} ${k}`); if (!ok) add('error', 'robots', `robots.txt check failed: ${k}${changed ? ' (robots.txt changed since last run)' : ''}`); });
    if (changed) add('notice', 'robots', `robots.txt changed since last run (${previous!.robots!.hash} → ${hash})`);

    const sm = await fetchRetry(`${BASE}/sitemap.xml`);
    const smText = await sm.text();
    const children = (smText.match(/<loc>/g) || []).length;
    console.log(`  ${sm.status === 200 && children > 0 ? '✓' : '✗'} sitemap index: ${sm.status}, ${children} child sitemaps`);
    if (sm.status !== 200 || children === 0) add('error', 'sitemap', `sitemap.xml ${sm.status} with ${children} children`);
    if (previous?.robots?.sitemapChildren && children < previous.robots.sitemapChildren) add('error', 'sitemap', `sitemap index lost children: ${previous.robots.sitemapChildren} → ${children}`);
    return { status: res.status, hash, changed, checks, sitemapStatus: sm.status, sitemapChildren: children };
  } catch (e) {
    add('error', 'robots', `robots.txt/sitemap fetch failed: ${(e as Error).message}`);
    return null;
  }
}

// ── 5. Lighthouse ───────────────────────────────────────────────────────────
function lighthouse(previous: MonitorSummary | null): LighthouseRow[] {
  if (SKIP_LH) return [];
  console.log('\n▶ 5/5 Lighthouse mobile (6 pages, budgets perf ≥ 90 · LCP ≤ 2.5 s · CLS ≤ 0.1)');
  const rows: LighthouseRow[] = [];
  for (const p of LIGHTHOUSE_PAGES) {
    const out = path.join(os.tmpdir(), `lh-monitor-${Date.now()}.json`);
    const prev = previous?.lighthouse?.find(r => r.path === p);
    try {
      execFileSync('npx', ['lighthouse', `${BASE}${p}`, '--only-categories=performance', '--quiet', '--output=json', `--output-path=${out}`,
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage'], { stdio: ['ignore', 'ignore', 'pipe'], timeout: 180_000 });
      const report = JSON.parse(fs.readFileSync(out, 'utf8'));
      const perf = Math.round((report.categories.performance.score ?? 0) * 100);
      const lcpMs = Math.round(report.audits['largest-contentful-paint'].numericValue ?? 0);
      const cls = Number((report.audits['cumulative-layout-shift'].numericValue ?? 0).toFixed(3));
      const budgetOk = perf >= BUDGET.perf && lcpMs <= BUDGET.lcpMs && cls <= BUDGET.cls;
      const consecutiveMisses = budgetOk ? 0 : (prev?.consecutiveMisses ?? 0) + 1;
      rows.push({ path: p, perf, lcpMs, cls, budgetOk, consecutiveMisses });
      console.log(`  ${budgetOk ? '✓' : '✗'} perf ${perf}  LCP ${(lcpMs / 1000).toFixed(1)} s  CLS ${cls}  ${p}${budgetOk ? '' : ` (miss #${consecutiveMisses})`}`);
      if (!budgetOk) add(consecutiveMisses >= 2 ? 'error' : 'warning', 'lighthouse', `${p}: perf ${perf}, LCP ${(lcpMs / 1000).toFixed(1)} s, CLS ${cls} — budget missed ${consecutiveMisses} run(s) in a row`);
    } catch (e) {
      const error = (e as Error).message.split('\n')[0].slice(0, 160);
      // A runner failure (NO_FCP, timeout…) is not a budget miss: it does not count toward the 2-run rule.
      rows.push({ path: p, perf: null, lcpMs: null, cls: null, budgetOk: true, consecutiveMisses: prev?.consecutiveMisses ?? 0, error });
      console.log(`  ⚠ ${p}: Lighthouse did not complete — ${error}`);
      add('warning', 'lighthouse', `${p}: Lighthouse did not complete — ${error}`);
    } finally {
      try { fs.unlinkSync(out); } catch { /* not written */ }
    }
  }
  return rows;
}

// ── Issue body ──────────────────────────────────────────────────────────────
function issueMarkdown(s: MonitorSummary): string {
  const bySev = (sev: Severity) => s.findings.filter(f => f.severity === sev);
  const list = (items: Finding[]) => items.length ? items.map(f => `- **${f.check}** — ${f.message}`).join('\n') : '_aucun_';
  const lh = s.lighthouse.length
    ? ['| Page | Perf | LCP | CLS | Budget |', '|---|---|---|---|---|', ...s.lighthouse.map(r => `| \`${r.path}\` | ${r.perf ?? '—'} | ${r.lcpMs != null ? (r.lcpMs / 1000).toFixed(1) + ' s' : '—'} | ${r.cls ?? '—'} | ${r.error ? '⚠ ' + r.error : r.budgetOk ? '✅' : `❌ (${r.consecutiveMisses}×)`} |`)].join('\n')
    : '_non exécuté_';
  const rd = s.redirects.map(r => `- ${r.ok ? '✅' : '❌'} \`${r.from}\` → \`${r.final}\` (${r.hops} hop, ${r.status})${r.note ? ` — ${r.note}` : ''}`).join('\n');
  return `## SEO monitor — ${s.at.slice(0, 10)} — ${s.status === 'ok' ? '✅ OK' : '❌ régression'}

Cible : ${s.baseUrl} · ${s.counts.error} erreur(s), ${s.counts.warning} avertissement(s), ${s.counts.notice} note(s).

### Erreurs
${list(bySev('error'))}

### Avertissements
${list(bySev('warning'))}

### Crawl
${s.crawl ? `Pages : ${s.crawl.summary.pagesCrawled} (IDF : ${s.crawl.idfSummary.pagesCrawled ?? '—'}) · 200 : ${s.crawl.summary.status200} · 4xx : ${s.crawl.summary.status4xx} · 5xx : ${s.crawl.summary.status5xx} · rapport \`seo-audit/${s.crawl.file}\` (artefact du run)` : '_non exécuté_'}

### JSON-LD
${s.jsonld ? `${s.jsonld.pages} pages, exit ${s.jsonld.exitCode}` : '_non exécuté_'}

### Redirections
${rd}

### robots.txt / sitemap
${s.robots ? Object.entries(s.robots.checks).map(([k, ok]) => `- ${ok ? '✅' : '❌'} ${k}`).join('\n') + `\n- sitemap index : ${s.robots.sitemapStatus}, ${s.robots.sitemapChildren} sitemaps enfants${s.robots.changed ? '\n- ℹ️ robots.txt a changé depuis le dernier run' : ''}` : '_non exécuté_'}

### Lighthouse (mobile)
${lh}

_Résumé JSON : \`seo-audit/monitor/${s.at.slice(0, 10)}.json\`_
`;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`SEO monitor — ${BASE} — ${new Date().toISOString()}`);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const previous = readPrevious();
  const crawlSection = crawl();
  const jsonldSection = jsonld();
  const redirectRows = await redirects();
  const robotsSection = await robots(previous);
  const lhRows = lighthouse(previous);

  const counts: Record<Severity, number> = { error: 0, warning: 0, notice: 0 };
  findings.forEach(f => counts[f.severity]++);
  const summary: MonitorSummary = {
    at: new Date().toISOString(), baseUrl: BASE, status: counts.error ? 'regression' : 'ok', counts, findings,
    crawl: crawlSection, jsonld: jsonldSection, redirects: redirectRows, robots: robotsSection, lighthouse: lhRows,
  };
  fs.writeFileSync(path.join(OUT_DIR, `${TODAY}.json`), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'latest.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'issue.md'), issueMarkdown(summary));

  console.log('\n' + '═'.repeat(72));
  console.log(`${summary.status === 'ok' ? '✅ OK' : '❌ RÉGRESSION'} — ${counts.error} error(s), ${counts.warning} warning(s), ${counts.notice} notice(s)`);
  findings.filter(f => f.severity === 'error').forEach(f => console.log(`   ✗ [${f.check}] ${f.message}`));
  console.log(`Summary: seo-audit/monitor/${TODAY}.json`);
  process.exit(counts.error ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });

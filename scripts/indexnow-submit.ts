/**
 * indexnow-submit.ts — tell Bing (and every IndexNow engine) which URLs
 * changed (S3.5). Bing traffic fell from 14 to 3 visitors a week.
 *
 * Key file: public/2be00167ac82eb36a32045c27b0f0e4c.txt (served at /2be00167ac82eb36a32045c27b0f0e4c.txt).
 *
 * Usage:
 *   npx tsx scripts/indexnow-submit.ts                      # every URL of sitemap-idf.xml + static pages
 *   npx tsx scripts/indexnow-submit.ts --all                # every URL of every sitemap (batches of 10 000)
 *   npx tsx scripts/indexnow-submit.ts --urls=/a,/b         # specific paths
 *   npx tsx scripts/indexnow-submit.ts --dry-run
 * Runs after each production deployment (.github/workflows/indexnow.yml).
 */

const KEY = '2be00167ac82eb36a32045c27b0f0e4c';
const HOST = 'www.lesepavistespro.fr';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10_000;

const argv = process.argv.slice(2);
const arg = (n: string) => argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=');

async function locs(url: string): Promise<string[]> {
  const res = await fetch(url, { headers: { 'User-Agent': 'LesEpavistesPro-SEO-Monitor/1.0 (+indexnow)' } });
  const xml = await res.text();
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)).map((m) => m[1]);
}

async function collect(): Promise<string[]> {
  const explicit = arg('urls');
  if (explicit) return explicit.split(',').map((p) => (p.startsWith('http') ? p : `${ORIGIN}${p}`));
  if (argv.includes('--all')) {
    const children = await locs(`${ORIGIN}/sitemap.xml`);
    return (await Promise.all(children.map(locs))).flat();
  }
  return [...(await locs(`${ORIGIN}/sitemap-idf.xml`)), ...(await locs(`${ORIGIN}/sitemap-static.xml`))];
}

async function main() {
  const urls = Array.from(new Set(await collect())).filter((u) => u.startsWith(ORIGIN));
  console.log(`IndexNow: ${urls.length} URL(s) for ${HOST}`);
  if (argv.includes('--dry-run')) {
    urls.slice(0, 10).forEach((u) => console.log(`  ${u}`));
    return;
  }
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
    });
    // 200 OK / 202 Accepted (key validation pending) are both success.
    console.log(`  batch ${i / BATCH + 1}: ${urlList.length} URLs → HTTP ${res.status}`);
    if (res.status >= 400) {
      console.error(await res.text());
      process.exitCode = 1;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * seo-crawl.ts — Local SEO audit crawler (Semrush Site Audit style)
 *
 * Usage:
 *   npm run seo-crawl -- [baseUrl] [--limit=N] [--sample-per-sitemap=N] [--concurrency=N] [--label=name]
 *
 * Starts from `/` plus every URL discovered in /sitemap.xml (a sitemap index),
 * fetches each page without following redirects, and records the SEO signals
 * that Semrush Site Audit reports on.
 *
 * Output: seo-audit/crawl-<timestamp>.json + a grouped console summary.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

// ────────────────────────────────────────────────────────────────────────────
// CLI ARGS
// ────────────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const positional = argv.filter((a) => !a.startsWith('--'));
const flag = (name: string, fallback: number): number => {
  const raw = argv.find((a) => a.startsWith(`--${name}=`));
  if (!raw) return fallback;
  const value = Number(raw.split('=')[1]);
  return Number.isFinite(value) ? value : fallback;
};
const strFlag = (name: string, fallback: string): string => {
  const raw = argv.find((a) => a.startsWith(`--${name}=`));
  return raw ? raw.split('=').slice(1).join('=') : fallback;
};

const BASE_URL = (positional[0] || 'http://localhost:3000').replace(/\/+$/, '');
const LIMIT = flag('limit', 900);
const SAMPLE_PER_SITEMAP = flag('sample-per-sitemap', 120);
const CONCURRENCY = flag('concurrency', 8);
const LABEL = strFlag('label', '');
const OUT_DIR = path.join(process.cwd(), 'seo-audit');

// ────────────────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────────────────

interface JsonLdBlock {
  index: number;
  parseError: string | null;
  types: string[];
  ids: string[];
}

interface PageRecord {
  url: string;
  path: string;
  status: number;
  redirectTarget: string | null;
  redirectHops: number;
  finalUrl: string | null;
  contentType: string;
  htmlBytes: number;
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  canonical: string | null;
  selfCanonical: boolean;
  metaRobots: string | null;
  noindex: boolean;
  nofollow: boolean;
  h1Count: number;
  h1Texts: string[];
  wordCount: number;
  imgTotal: number;
  imgWithoutAlt: number;
  internalLinks: string[];
  externalLinks: string[];
  nofollowInternalLinks: string[];
  jsonLd: JsonLdBlock[];
  jsonLdParseErrors: number;
  faqPageCount: number;
  localBusinessCount: number;
  duplicateIdConflicts: string[];
  inSitemap: boolean;
  error?: string;
}

interface CrawlReport {
  baseUrl: string;
  label: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  options: { limit: number; samplePerSitemap: number; concurrency: number };
  sitemapIndex: string[];
  sitemapUrlCounts: Record<string, number>;
  totalSitemapUrls: number;
  pagesCrawled: number;
  summary: Record<string, number>;
  errors: IssueGroup[];
  warnings: IssueGroup[];
  notices: IssueGroup[];
  pages: PageRecord[];
}

interface IssueGroup {
  issue: string;
  count: number;
  samples: string[];
}

// ────────────────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────────────────

function normalizeUrl(u: string): string {
  try {
    const parsed = new URL(u, BASE_URL);
    parsed.hash = '';
    let p = parsed.pathname;
    if (p.length > 1) p = p.replace(/\/+$/, '');
    parsed.pathname = p || '/';
    return parsed.toString();
  } catch {
    return u;
  }
}

/** Map a production URL onto the crawl base so we can crawl a local build. */
function toBase(u: string): string {
  try {
    const parsed = new URL(u);
    return normalizeUrl(`${BASE_URL}${parsed.pathname}${parsed.search}`);
  } catch {
    return normalizeUrl(u);
  }
}

async function fetchRaw(url: string, redirect: 'manual' | 'follow' = 'manual') {
  return fetch(url, {
    redirect,
    headers: {
      'User-Agent': 'LesEpavistesProSeoCrawler/1.0 (+local audit)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });
}

/** Count redirect hops manually (max 5) and return the final URL. */
async function traceRedirects(url: string, max = 5) {
  let current = url;
  let hops = 0;
  let firstTarget: string | null = null;
  let lastResponse: Response | null = null;

  for (let i = 0; i < max; i++) {
    const res = await fetchRaw(current);
    lastResponse = res;
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) break;
      if (hops === 0) firstTarget = location;
      hops++;
      try {
        current = new URL(location, current).toString();
      } catch {
        break;
      }
      // Never leave the crawl base (production redirects to www would escape).
      current = toBase(current);
      continue;
    }
    break;
  }

  return { response: lastResponse, hops, firstTarget, finalUrl: current };
}

function textWordCount($: cheerio.CheerioAPI): number {
  const clone = $.root().clone();
  clone.find('script, style, noscript, svg, template').remove();
  const text = clone.find('body').text() || clone.text();
  return text.split(/\s+/).filter((w) => w.replace(/[^\p{L}\p{N}]/gu, '').length > 0).length;
}

function collectTypes(node: unknown, types: string[], ids: string[], idMap: Map<string, string[]>) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, types, ids, idMap));
    return;
  }
  if (!node || typeof node !== 'object') return;
  const obj = node as Record<string, unknown>;
  const t = obj['@type'];
  if (typeof t === 'string') types.push(t);
  else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.push(x));

  const id = obj['@id'];
  if (typeof id === 'string') {
    ids.push(id);
    // A bare {"@id": …} (optionally with @type/@context) is a *reference* to an
    // entity defined elsewhere, not a competing definition — ignore those.
    const meaningfulKeys = Object.keys(obj).filter(
      (k) => !['@id', '@type', '@context'].includes(k)
    );
    if (meaningfulKeys.length > 0) {
      const existing = idMap.get(id) || [];
      existing.push(JSON.stringify(obj));
      idMap.set(id, existing);
    }
  }

  Object.values(obj).forEach((v) => {
    if (v && typeof v === 'object') collectTypes(v, types, ids, idMap);
  });
}

// ────────────────────────────────────────────────────────────────────────────
// SITEMAP DISCOVERY
// ────────────────────────────────────────────────────────────────────────────

function extractLocs(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) locs.push(m[1].trim());
  return locs;
}

async function discoverSitemapUrls() {
  const indexUrl = `${BASE_URL}/sitemap.xml`;
  const sitemapUrls: string[] = [];
  const perSitemap: Record<string, string[]> = {};
  const counts: Record<string, number> = {};

  let indexXml = '';
  try {
    const res = await fetchRaw(indexUrl, 'follow');
    indexXml = await res.text();
  } catch (e) {
    console.error(`  ! Could not fetch ${indexUrl}: ${(e as Error).message}`);
    return { sitemapUrls, perSitemap, counts, total: 0 };
  }

  const isIndex = /<sitemapindex/i.test(indexXml);
  const children = isIndex ? extractLocs(indexXml).map(toBase) : [indexUrl];
  sitemapUrls.push(...children);

  let total = 0;
  for (const child of children) {
    try {
      const res = await fetchRaw(child, 'follow');
      const xml = await res.text();
      const locs = extractLocs(xml).map(toBase);
      const unique = Array.from(new Set(locs));
      perSitemap[child] = unique;
      counts[child] = unique.length;
      total += unique.length;
    } catch (e) {
      console.error(`  ! Could not fetch ${child}: ${(e as Error).message}`);
      perSitemap[child] = [];
      counts[child] = 0;
    }
  }

  return { sitemapUrls, perSitemap, counts, total };
}

/** Deterministic even sampling so re-runs compare like-for-like. */
function sample<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return [...arr];
  const step = arr.length / n;
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE ANALYSIS
// ────────────────────────────────────────────────────────────────────────────

async function analyzePage(url: string, inSitemap: boolean): Promise<PageRecord> {
  const record: PageRecord = {
    url,
    path: new URL(url).pathname,
    status: 0,
    redirectTarget: null,
    redirectHops: 0,
    finalUrl: null,
    contentType: '',
    htmlBytes: 0,
    title: null,
    titleLength: 0,
    description: null,
    descriptionLength: 0,
    canonical: null,
    selfCanonical: false,
    metaRobots: null,
    noindex: false,
    nofollow: false,
    h1Count: 0,
    h1Texts: [],
    wordCount: 0,
    imgTotal: 0,
    imgWithoutAlt: 0,
    internalLinks: [],
    externalLinks: [],
    nofollowInternalLinks: [],
    jsonLd: [],
    jsonLdParseErrors: 0,
    faqPageCount: 0,
    localBusinessCount: 0,
    duplicateIdConflicts: [],
    inSitemap,
  };

  try {
    const { response, hops, firstTarget, finalUrl } = await traceRedirects(url);
    if (!response) {
      record.error = 'no response';
      return record;
    }
    record.status = response.status;
    record.redirectHops = hops;
    record.redirectTarget = firstTarget;
    record.finalUrl = finalUrl;
    record.contentType = response.headers.get('content-type') || '';

    if (!record.contentType.includes('html')) {
      const buf = await response.arrayBuffer();
      record.htmlBytes = buf.byteLength;
      return record;
    }

    const html = await response.text();
    record.htmlBytes = Buffer.byteLength(html, 'utf8');
    const $ = cheerio.load(html);

    record.title = ($('head title').first().text() || '').trim() || null;
    record.titleLength = record.title ? record.title.length : 0;

    const desc = $('meta[name="description"]').attr('content');
    record.description = desc ? desc.trim() : null;
    record.descriptionLength = record.description ? record.description.length : 0;

    const canonical = $('link[rel="canonical"]').attr('href');
    record.canonical = canonical ? canonical.trim() : null;
    if (record.canonical) {
      const canonicalPath = (() => {
        try {
          return new URL(record.canonical).pathname.replace(/\/+$/, '') || '/';
        } catch {
          return record.canonical;
        }
      })();
      const selfPath = record.path.replace(/\/+$/, '') || '/';
      record.selfCanonical = canonicalPath === selfPath;
    }

    const robots = $('meta[name="robots"]').attr('content');
    record.metaRobots = robots ? robots.trim() : null;
    if (record.metaRobots) {
      const lowered = record.metaRobots.toLowerCase();
      record.noindex = lowered.includes('noindex');
      record.nofollow = /(^|[,\s])nofollow/.test(lowered);
    }

    const h1s = $('h1');
    record.h1Count = h1s.length;
    h1s.each((_, el) => {
      record.h1Texts.push($(el).text().trim().replace(/\s+/g, ' '));
    });

    record.wordCount = textWordCount($);

    const imgs = $('img');
    record.imgTotal = imgs.length;
    imgs.each((_, el) => {
      const alt = $(el).attr('alt');
      if (alt === undefined || alt.trim() === '') record.imgWithoutAlt++;
    });

    const internal = new Set<string>();
    const external = new Set<string>();
    $('a[href]').each((_, el) => {
      const href = ($(el).attr('href') || '').trim();
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|whatsapp:)/i.test(href)) return;
      let abs: URL;
      try {
        abs = new URL(href, url);
      } catch {
        return;
      }
      const isInternal =
        abs.origin === new URL(BASE_URL).origin ||
        abs.hostname.endsWith('lesepavistespro.fr');
      if (isInternal) {
        const norm = toBase(abs.toString());
        internal.add(norm);
        const rel = ($(el).attr('rel') || '').toLowerCase();
        if (rel.includes('nofollow')) record.nofollowInternalLinks.push(norm);
      } else {
        external.add(abs.toString());
      }
    });
    record.internalLinks = Array.from(internal);
    record.externalLinks = Array.from(external);

    const idMap = new Map<string, string[]>();
    $('script[type="application/ld+json"]').each((i, el) => {
      const raw = $(el).contents().text();
      const block: JsonLdBlock = { index: i, parseError: null, types: [], ids: [] };
      try {
        const parsed = JSON.parse(raw);
        collectTypes(parsed, block.types, block.ids, idMap);
      } catch (e) {
        block.parseError = (e as Error).message;
        record.jsonLdParseErrors++;
      }
      record.jsonLd.push(block);
    });

    const allTypes = record.jsonLd.flatMap((b) => b.types);
    record.faqPageCount = allTypes.filter((t) => t === 'FAQPage').length;
    record.localBusinessCount = allTypes.filter((t) =>
      ['LocalBusiness', 'AutomotiveBusiness', 'AutoRepair'].includes(t)
    ).length;

    idMap.forEach((fingerprints, id) => {
      if (new Set(fingerprints).size > 1) record.duplicateIdConflicts.push(id);
    });
  } catch (e) {
    record.error = (e as Error).message;
  }

  return record;
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  const startedAt = Date.now();
  console.log(`\n🔎 SEO crawl of ${BASE_URL}`);
  console.log(`   limit=${LIMIT} sample-per-sitemap=${SAMPLE_PER_SITEMAP} concurrency=${CONCURRENCY}\n`);

  console.log('→ Discovering sitemaps…');
  const { sitemapUrls, perSitemap, counts, total } = await discoverSitemapUrls();
  console.log(`  ${sitemapUrls.length} child sitemaps, ${total} URLs total`);

  const sitemapUrlSet = new Set<string>();
  Object.values(perSitemap).forEach((urls) => urls.forEach((u) => sitemapUrlSet.add(u)));

  // Build the crawl queue: homepage + an even sample of each child sitemap.
  const queue: string[] = [normalizeUrl(`${BASE_URL}/`)];
  Object.entries(perSitemap).forEach(([, urls]) => {
    sample(urls, SAMPLE_PER_SITEMAP).forEach((u) => queue.push(u));
  });
  const unique = Array.from(new Set(queue)).slice(0, LIMIT);

  console.log(`→ Crawling ${unique.length} URLs…`);
  const pages: PageRecord[] = [];
  let done = 0;
  let cursor = 0;

  async function worker() {
    while (cursor < unique.length) {
      const i = cursor++;
      const url = unique[i];
      const rec = await analyzePage(url, sitemapUrlSet.has(url));
      pages.push(rec);
      done++;
      if (done % 50 === 0 || done === unique.length) {
        process.stdout.write(`\r  ${done}/${unique.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n');

  // ── Cross-page analysis ───────────────────────────────────────────────────
  const byUrl = new Map(pages.map((p) => [p.url, p]));
  const okPages = pages.filter((p) => p.status === 200);
  const indexable = okPages.filter((p) => !p.noindex);

  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  indexable.forEach((p) => {
    if (p.title) titleMap.set(p.title, [...(titleMap.get(p.title) || []), p.url]);
    if (p.description) descMap.set(p.description, [...(descMap.get(p.description) || []), p.url]);
  });

  // Internal link targets that are broken / redirected / noindex / non-canonical.
  const linkTargets = new Set<string>();
  pages.forEach((p) => p.internalLinks.forEach((l) => linkTargets.add(l)));
  const uncrawledTargets = Array.from(linkTargets).filter((t) => !byUrl.has(t));
  const targetChecks = new Map<string, PageRecord>();
  const CHECK_TARGET_LIMIT = flag('check-targets', 2000);
  const toCheck = sample(uncrawledTargets, CHECK_TARGET_LIMIT);
  if (toCheck.length) {
    console.log(`→ Verifying ${toCheck.length} internal link targets not already crawled…`);
    let c = 0;
    async function tworker() {
      while (c < toCheck.length) {
        const i = c++;
        const rec = await analyzePage(toCheck[i], sitemapUrlSet.has(toCheck[i]));
        targetChecks.set(toCheck[i], rec);
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, tworker));
  }
  const resolveTarget = (u: string) => byUrl.get(u) || targetChecks.get(u);

  const brokenInternalLinks: string[] = [];
  const redirectedInternalLinks: string[] = [];
  const noindexLinkedInternally: string[] = [];
  pages.forEach((p) => {
    p.internalLinks.forEach((l) => {
      const t = resolveTarget(l);
      if (!t) return;
      if (t.status >= 400) brokenInternalLinks.push(`${p.path} → ${t.path} (${t.status})`);
      else if (t.status >= 300 && t.status < 400) redirectedInternalLinks.push(`${p.path} → ${t.path} (${t.status})`);
      if (t.status === 200 && t.noindex) noindexLinkedInternally.push(`${p.path} → ${t.path}`);
    });
  });

  const group = (issue: string, items: string[]): IssueGroup => ({
    issue,
    count: items.length,
    samples: items.slice(0, 15),
  });

  const sitemapPages = pages.filter((p) => p.inSitemap);

  const errors: IssueGroup[] = [
    group('4xx status codes', pages.filter((p) => p.status >= 400 && p.status < 500).map((p) => `${p.path} (${p.status})`)),
    group('5xx status codes', pages.filter((p) => p.status >= 500).map((p) => `${p.path} (${p.status})`)),
    group('Broken internal links (target 4xx/5xx)', Array.from(new Set(brokenInternalLinks))),
    group('Duplicate title tags', Array.from(titleMap.entries()).filter(([, u]) => u.length > 1).map(([t, u]) => `"${t}" ×${u.length} — ${u.slice(0, 3).join(', ')}`)),
    group('Duplicate meta descriptions', Array.from(descMap.entries()).filter(([, u]) => u.length > 1).map(([d, u]) => `"${d.slice(0, 60)}…" ×${u.length}`)),
    group('Sitemap URL not 200', sitemapPages.filter((p) => p.status !== 200).map((p) => `${p.path} (${p.status})`)),
    group('Sitemap URL is noindex', sitemapPages.filter((p) => p.status === 200 && p.noindex).map((p) => p.path)),
    group('Sitemap URL is not self-canonical', sitemapPages.filter((p) => p.status === 200 && p.canonical && !p.selfCanonical).map((p) => `${p.path} → ${p.canonical}`)),
    group('Missing canonical', okPages.filter((p) => !p.canonical).map((p) => p.path)),
    group('JSON-LD parse errors', pages.filter((p) => p.jsonLdParseErrors > 0).map((p) => `${p.path} (${p.jsonLdParseErrors})`)),
    group('Conflicting JSON-LD @id (same id, different data)', pages.filter((p) => p.duplicateIdConflicts.length > 0).map((p) => `${p.path} — ${p.duplicateIdConflicts.join(', ')}`)),
    group('Multiple FAQPage blocks on one page', okPages.filter((p) => p.faqPageCount > 1).map((p) => `${p.path} (${p.faqPageCount})`)),
    group('Missing title', okPages.filter((p) => !p.title).map((p) => p.path)),
    group('Missing meta description', okPages.filter((p) => !p.description).map((p) => p.path)),
  ].filter((g) => g.count > 0);

  const warnings: IssueGroup[] = [
    group('Title longer than 60 chars', okPages.filter((p) => p.titleLength > 60).map((p) => `${p.path} (${p.titleLength})`)),
    group('Title longer than 70 chars', okPages.filter((p) => p.titleLength > 70).map((p) => `${p.path} (${p.titleLength})`)),
    group('Meta description outside 70–160 chars', okPages.filter((p) => p.description && (p.descriptionLength < 70 || p.descriptionLength > 160)).map((p) => `${p.path} (${p.descriptionLength})`)),
    group('Missing H1', okPages.filter((p) => p.h1Count === 0).map((p) => p.path)),
    group('Multiple H1', okPages.filter((p) => p.h1Count > 1).map((p) => `${p.path} (${p.h1Count})`)),
    group('Low word count (< 300)', okPages.filter((p) => p.wordCount < 300).map((p) => `${p.path} (${p.wordCount})`)),
    group('Redirect chains (2+ hops)', pages.filter((p) => p.redirectHops > 1).map((p) => `${p.path} (${p.redirectHops} hops)`)),
    group('Images without alt', okPages.filter((p) => p.imgWithoutAlt > 0).map((p) => `${p.path} (${p.imgWithoutAlt}/${p.imgTotal})`)),
    group('High HTML size (> 300 KB)', okPages.filter((p) => p.htmlBytes > 300_000).map((p) => `${p.path} (${Math.round(p.htmlBytes / 1024)} KB)`)),
    group('Internal links to redirects', Array.from(new Set(redirectedInternalLinks))),
  ].filter((g) => g.count > 0);

  const notices: IssueGroup[] = [
    group('Noindex pages linked internally', Array.from(new Set(noindexLinkedInternally))),
    group('Noindex + nofollow robots meta', okPages.filter((p) => p.noindex && p.nofollow).map((p) => p.path)),
    group('Nofollow internal links', pages.filter((p) => p.nofollowInternalLinks.length > 0).map((p) => `${p.path} (${p.nofollowInternalLinks.length})`)),
    group('H1 identical to title', okPages.filter((p) => p.h1Count === 1 && p.title && p.h1Texts[0] === p.title).map((p) => p.path)),
    group('Multiple LocalBusiness nodes on one page', okPages.filter((p) => p.localBusinessCount > 1).map((p) => `${p.path} (${p.localBusinessCount})`)),
  ].filter((g) => g.count > 0);

  const summary: Record<string, number> = {
    pagesCrawled: pages.length,
    status200: okPages.length,
    status3xx: pages.filter((p) => p.status >= 300 && p.status < 400).length,
    status4xx: pages.filter((p) => p.status >= 400 && p.status < 500).length,
    status5xx: pages.filter((p) => p.status >= 500).length,
    indexablePages: indexable.length,
    noindexPages: okPages.filter((p) => p.noindex).length,
    noindexNofollowPages: okPages.filter((p) => p.noindex && p.nofollow).length,
    titlesOver60: okPages.filter((p) => p.titleLength > 60).length,
    titlesOver70: okPages.filter((p) => p.titleLength > 70).length,
    duplicateTitleGroups: Array.from(titleMap.values()).filter((u) => u.length > 1).length,
    duplicateDescriptionGroups: Array.from(descMap.values()).filter((u) => u.length > 1).length,
    sitemapUrlsNonCanonical: sitemapPages.filter((p) => p.status === 200 && p.canonical && !p.selfCanonical).length,
    sitemapUrlsNoindex: sitemapPages.filter((p) => p.status === 200 && p.noindex).length,
    sitemapUrlsNon200: sitemapPages.filter((p) => p.status !== 200).length,
    jsonLdParseErrorPages: pages.filter((p) => p.jsonLdParseErrors > 0).length,
    conflictingJsonLdIdPages: pages.filter((p) => p.duplicateIdConflicts.length > 0).length,
    multiFaqPages: okPages.filter((p) => p.faqPageCount > 1).length,
    multiLocalBusinessPages: okPages.filter((p) => p.localBusinessCount > 1).length,
    totalLocalBusinessNodes: okPages.reduce((s, p) => s + p.localBusinessCount, 0),
    brokenInternalLinks: new Set(brokenInternalLinks).size,
    noindexLinkedInternally: new Set(noindexLinkedInternally.map((s) => s.split(' → ')[1])).size,
    missingH1: okPages.filter((p) => p.h1Count === 0).length,
    multipleH1: okPages.filter((p) => p.h1Count > 1).length,
    lowWordCount: okPages.filter((p) => p.wordCount < 300).length,
    imagesWithoutAlt: okPages.reduce((s, p) => s + p.imgWithoutAlt, 0),
    maxHtmlBytes: okPages.reduce((m, p) => Math.max(m, p.htmlBytes), 0),
    redirectChains: pages.filter((p) => p.redirectHops > 1).length,
  };

  const heaviest = [...okPages].sort((a, b) => b.htmlBytes - a.htmlBytes).slice(0, 5);

  const report: CrawlReport = {
    baseUrl: BASE_URL,
    label: LABEL,
    startedAt: new Date(startedAt).toISOString(),
    finishedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    options: { limit: LIMIT, samplePerSitemap: SAMPLE_PER_SITEMAP, concurrency: CONCURRENCY },
    sitemapIndex: sitemapUrls,
    sitemapUrlCounts: counts,
    totalSitemapUrls: total,
    pagesCrawled: pages.length,
    summary,
    errors,
    warnings,
    notices,
    pages,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(OUT_DIR, `crawl-${LABEL ? `${LABEL}-` : ''}${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(report, null, 2));

  // ── Console summary ───────────────────────────────────────────────────────
  const line = (s = '') => console.log(s);
  line();
  line('═'.repeat(72));
  line(`SEO SITE AUDIT — ${BASE_URL}${LABEL ? ` [${LABEL}]` : ''}`);
  line('═'.repeat(72));
  line(`Pages crawled: ${pages.length}   Sitemap URLs: ${total}   Duration: ${Math.round(report.durationMs / 1000)}s`);

  const printGroups = (name: string, groups: IssueGroup[]) => {
    line();
    line(`── ${name} (${groups.reduce((s, g) => s + g.count, 0)} across ${groups.length} issue types) ──`);
    if (!groups.length) {
      line('   none 🎉');
      return;
    }
    groups
      .sort((a, b) => b.count - a.count)
      .forEach((g) => {
        line(`   • ${g.issue}: ${g.count}`);
        g.samples.slice(0, 5).forEach((s) => line(`       - ${s}`));
      });
  };

  printGroups('ERRORS', errors);
  printGroups('WARNINGS', warnings);
  printGroups('NOTICES', notices);

  line();
  line('── Heaviest pages ──');
  heaviest.forEach((p) => line(`   ${Math.round(p.htmlBytes / 1024)} KB  ${p.path}`));

  line();
  line('── Key metrics ──');
  Object.entries(summary).forEach(([k, v]) => line(`   ${k.padEnd(32)} ${v}`));

  line();
  line(`Report written to ${path.relative(process.cwd(), file)}`);
  line();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

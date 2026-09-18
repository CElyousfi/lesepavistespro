/**
 * seo-crawl.ts — Local SEO audit crawler (Semrush Site Audit style)
 *
 * Usage:
 *   npm run seo-crawl -- [baseUrl] [--limit=N] [--sample-per-sitemap=N] [--concurrency=N] [--label=name] [--idf-only]
 *
 * --idf-only crawls EVERY Île-de-France URL (region, 8 departments, all IDF
 * communes for both services, IDF blog posts) and only a sample elsewhere, so
 * the IDF section of the report is exhaustive rather than sampled.
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
const IDF_ONLY = argv.includes('--idf-only');
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
  isIdf: boolean;
  /** A `TODO(owner)` placeholder leaked into the visible HTML. */
  todoOwnerRendered: boolean;
  error?: string;
}

interface CrawlReport {
  baseUrl: string;
  label: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  options: { limit: number; samplePerSitemap: number; concurrency: number; idfOnly: boolean };
  sitemapIndex: string[];
  sitemapUrlCounts: Record<string, number>;
  totalSitemapUrls: number;
  pagesCrawled: number;
  summary: Record<string, number>;
  /** Same metrics restricted to Île-de-France URLs (exhaustive with --idf-only). */
  idf: { pagesCrawled: number; summary: Record<string, number>; errors: IssueGroup[]; warnings: IssueGroup[]; notices: IssueGroup[] };
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
/**
 * Île-de-France URL test. Location pages carry the region or a department
 * slug; blog posts are matched on their slug. Kept in sync with lib/idf.ts by
 * the QA check, not imported, so the crawler stays dependency-free.
 */
const IDF_PATH_RE =
  /^\/(epaviste|rachat-voiture)\/(ile-de-france|paris-75|seine-et-marne-77|yvelines-78|essonne-91|hauts-de-seine-92|seine-saint-denis-93|val-de-marne-94|val-d-oise-95)(\/|$)/;
const IDF_BLOG_RE = /^\/blog\/[^/]*(ile-de-france|idf|paris|grand-paris)[^/]*$/;
function isIdfPath(pathname: string): boolean {
  return IDF_PATH_RE.test(pathname) || IDF_BLOG_RE.test(pathname);
}

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

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
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
    isIdf: isIdfPath(new URL(url).pathname),
    todoOwnerRendered: false,
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
    // Placeholders must be hidden, never shown: a leaked `TODO(owner)` in the
    // visible text is a warning.
    record.todoOwnerRendered = /TODO\(owner\)/.test($('body').text());

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
  console.log(`   limit=${LIMIT} sample-per-sitemap=${SAMPLE_PER_SITEMAP} concurrency=${CONCURRENCY}${IDF_ONLY ? ' idf-only' : ''}\n`);

  console.log('→ Discovering sitemaps…');
  const { sitemapUrls, perSitemap, counts, total } = await discoverSitemapUrls();
  console.log(`  ${sitemapUrls.length} child sitemaps, ${total} URLs total`);

  const sitemapUrlSet = new Set<string>();
  Object.values(perSitemap).forEach((urls) => urls.forEach((u) => sitemapUrlSet.add(u)));

  // Build the crawl queue: homepage + an even sample of each child sitemap.
  const queue: string[] = [normalizeUrl(`${BASE_URL}/`)];
  const sampled: string[] = [];
  Object.entries(perSitemap).forEach(([, urls]) => {
    if (IDF_ONLY) {
      // Every IDF URL goes first; the non-IDF remainder is sampled evenly.
      urls.filter((u) => isIdfPath(new URL(u).pathname)).forEach((u) => queue.push(u));
      sample(urls.filter((u) => !isIdfPath(new URL(u).pathname)), SAMPLE_PER_SITEMAP).forEach((u) => sampled.push(u));
    } else {
      sample(urls, SAMPLE_PER_SITEMAP).forEach((u) => sampled.push(u));
    }
  });
  // --idf-only must never drop an IDF URL: the limit only trims the sample.
  const idfQueue = Array.from(new Set(queue));
  const unique = IDF_ONLY
    ? [...idfQueue, ...Array.from(new Set(sampled)).filter((u) => !idfQueue.includes(u)).slice(0, LIMIT)]
    : Array.from(new Set([...queue, ...sampled])).slice(0, LIMIT);

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

  /**
   * Issue groups + key metrics for a set of pages. Called once for the whole
   * crawl and once for the Île-de-France subset so the IDF section of the
   * report is computed with exactly the same rules.
   */
  function analyse(subset: PageRecord[]) {
    const ok = subset.filter((p) => p.status === 200);
    const idx = ok.filter((p) => !p.noindex);
    const inSm = subset.filter((p) => p.inSitemap);
    const subsetPaths = new Set(subset.map((p) => p.path));
    const tMap = new Map<string, string[]>();
    const dMap = new Map<string, string[]>();
    idx.forEach((p) => {
      if (p.title) tMap.set(p.title, [...(tMap.get(p.title) || []), p.url]);
      if (p.description) dMap.set(p.description, [...(dMap.get(p.description) || []), p.url]);
    });
    const fromSubset = (s: string) => subsetPaths.has(s.split(' → ')[0]);
    const broken = Array.from(new Set(brokenInternalLinks)).filter(fromSubset);
    const redirected = Array.from(new Set(redirectedInternalLinks)).filter(fromSubset);
    const noindexLinked = Array.from(new Set(noindexLinkedInternally)).filter(fromSubset);

    const errors: IssueGroup[] = [
      group('4xx status codes', subset.filter((p) => p.status >= 400 && p.status < 500).map((p) => `${p.path} (${p.status})`)),
      group('5xx status codes', subset.filter((p) => p.status >= 500).map((p) => `${p.path} (${p.status})`)),
      group('Broken internal links (target 4xx/5xx)', broken),
      group('Duplicate title tags', Array.from(tMap.entries()).filter(([, u]) => u.length > 1).map(([t, u]) => `"${t}" ×${u.length} — ${u.slice(0, 3).join(', ')}`)),
      group('Duplicate meta descriptions', Array.from(dMap.entries()).filter(([, u]) => u.length > 1).map(([d, u]) => `"${d.slice(0, 60)}…" ×${u.length}`)),
      group('Sitemap URL not 200', inSm.filter((p) => p.status !== 200).map((p) => `${p.path} (${p.status})`)),
      group('Sitemap URL is noindex', inSm.filter((p) => p.status === 200 && p.noindex).map((p) => p.path)),
      group('Sitemap URL is not self-canonical', inSm.filter((p) => p.status === 200 && p.canonical && !p.selfCanonical).map((p) => `${p.path} → ${p.canonical}`)),
      group('Missing canonical', ok.filter((p) => !p.canonical).map((p) => p.path)),
      group('JSON-LD parse errors', subset.filter((p) => p.jsonLdParseErrors > 0).map((p) => `${p.path} (${p.jsonLdParseErrors})`)),
      group('Conflicting JSON-LD @id (same id, different data)', subset.filter((p) => p.duplicateIdConflicts.length > 0).map((p) => `${p.path} — ${p.duplicateIdConflicts.join(', ')}`)),
      group('Multiple FAQPage blocks on one page', ok.filter((p) => p.faqPageCount > 1).map((p) => `${p.path} (${p.faqPageCount})`)),
      group('Missing title', ok.filter((p) => !p.title).map((p) => p.path)),
      group('Missing meta description', ok.filter((p) => !p.description).map((p) => p.path)),
    ].filter((g) => g.count > 0);

    const warnings: IssueGroup[] = [
      group('Title longer than 60 chars', ok.filter((p) => p.titleLength > 60).map((p) => `${p.path} (${p.titleLength})`)),
      group('Title longer than 70 chars', ok.filter((p) => p.titleLength > 70).map((p) => `${p.path} (${p.titleLength})`)),
      group('Title truncated with an ellipsis', ok.filter((p) => p.title && /…/.test(p.title)).map((p) => `${p.path} — ${p.title}`)),
      group('Meta description outside 70–160 chars', ok.filter((p) => p.description && (p.descriptionLength < 70 || p.descriptionLength > 160)).map((p) => `${p.path} (${p.descriptionLength})`)),
      group('Missing H1', ok.filter((p) => p.h1Count === 0).map((p) => p.path)),
      group('Multiple H1', ok.filter((p) => p.h1Count > 1).map((p) => `${p.path} (${p.h1Count})`)),
      group('Low word count (< 300)', ok.filter((p) => p.wordCount < 300).map((p) => `${p.path} (${p.wordCount})`)),
      group('Redirect chains (2+ hops)', subset.filter((p) => p.redirectHops > 1).map((p) => `${p.path} (${p.redirectHops} hops)`)),
      group('Images without alt', ok.filter((p) => p.imgWithoutAlt > 0).map((p) => `${p.path} (${p.imgWithoutAlt}/${p.imgTotal})`)),
      group('High HTML size (> 300 KB)', ok.filter((p) => p.htmlBytes > 300_000).map((p) => `${p.path} (${Math.round(p.htmlBytes / 1024)} KB)`)),
      group('Internal links to redirects', redirected),
      group('TODO(owner) placeholder rendered in HTML', ok.filter((p) => p.todoOwnerRendered).map((p) => p.path)),
    ].filter((g) => g.count > 0);

    const notices: IssueGroup[] = [
      group('Noindex pages linked internally', noindexLinked),
      group('Noindex + nofollow robots meta', ok.filter((p) => p.noindex && p.nofollow).map((p) => p.path)),
      group('Nofollow internal links', subset.filter((p) => p.nofollowInternalLinks.length > 0).map((p) => `${p.path} (${p.nofollowInternalLinks.length})`)),
      group('H1 identical to title', ok.filter((p) => p.h1Count === 1 && p.title && p.h1Texts[0] === p.title).map((p) => p.path)),
      group('Multiple LocalBusiness nodes on one page', ok.filter((p) => p.localBusinessCount > 1).map((p) => `${p.path} (${p.localBusinessCount})`)),
      group('More than 200 internal links', ok.filter((p) => p.internalLinks.length > 200).map((p) => `${p.path} (${p.internalLinks.length})`)),
    ].filter((g) => g.count > 0);

    const summary: Record<string, number> = {
      pagesCrawled: subset.length,
      status200: ok.length,
      status3xx: subset.filter((p) => p.status >= 300 && p.status < 400).length,
      status4xx: subset.filter((p) => p.status >= 400 && p.status < 500).length,
      status5xx: subset.filter((p) => p.status >= 500).length,
      indexablePages: idx.length,
      noindexPages: ok.filter((p) => p.noindex).length,
      noindexNofollowPages: ok.filter((p) => p.noindex && p.nofollow).length,
      titlesOver60: ok.filter((p) => p.titleLength > 60).length,
      titlesOver70: ok.filter((p) => p.titleLength > 70).length,
      titlesTruncated: ok.filter((p) => p.title && /…/.test(p.title)).length,
      duplicateTitleGroups: Array.from(tMap.values()).filter((u) => u.length > 1).length,
      duplicateDescriptionGroups: Array.from(dMap.values()).filter((u) => u.length > 1).length,
      sitemapUrlsNonCanonical: inSm.filter((p) => p.status === 200 && p.canonical && !p.selfCanonical).length,
      sitemapUrlsNoindex: inSm.filter((p) => p.status === 200 && p.noindex).length,
      sitemapUrlsNon200: inSm.filter((p) => p.status !== 200).length,
      jsonLdParseErrorPages: subset.filter((p) => p.jsonLdParseErrors > 0).length,
      conflictingJsonLdIdPages: subset.filter((p) => p.duplicateIdConflicts.length > 0).length,
      multiFaqPages: ok.filter((p) => p.faqPageCount > 1).length,
      multiLocalBusinessPages: ok.filter((p) => p.localBusinessCount > 1).length,
      totalLocalBusinessNodes: ok.reduce((s, p) => s + p.localBusinessCount, 0),
      brokenInternalLinks: broken.length,
      noindexLinkedInternally: new Set(noindexLinked.map((s) => s.split(' → ')[1])).size,
      missingH1: ok.filter((p) => p.h1Count === 0).length,
      multipleH1: ok.filter((p) => p.h1Count > 1).length,
      lowWordCount: ok.filter((p) => p.wordCount < 300).length,
      medianWordCount: median(ok.map((p) => p.wordCount)),
      imagesWithoutAlt: ok.reduce((s, p) => s + p.imgWithoutAlt, 0),
      maxHtmlBytes: ok.reduce((m, p) => Math.max(m, p.htmlBytes), 0),
      maxInternalLinks: ok.reduce((m, p) => Math.max(m, p.internalLinks.length), 0),
      redirectChains: subset.filter((p) => p.redirectHops > 1).length,
      todoOwnerRendered: ok.filter((p) => p.todoOwnerRendered).length,
    };

    return { errors, warnings, notices, summary };
  }

  const { errors, warnings, notices, summary } = analyse(pages);
  const idfPages = pages.filter((p) => p.isIdf);
  const idfAnalysis = analyse(idfPages);

  const heaviest = [...okPages].sort((a, b) => b.htmlBytes - a.htmlBytes).slice(0, 5);

  const report: CrawlReport = {
    baseUrl: BASE_URL,
    label: LABEL,
    startedAt: new Date(startedAt).toISOString(),
    finishedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    options: { limit: LIMIT, samplePerSitemap: SAMPLE_PER_SITEMAP, concurrency: CONCURRENCY, idfOnly: IDF_ONLY },
    sitemapIndex: sitemapUrls,
    sitemapUrlCounts: counts,
    totalSitemapUrls: total,
    pagesCrawled: pages.length,
    summary,
    idf: { pagesCrawled: idfPages.length, ...idfAnalysis },
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
  line('═'.repeat(72));
  line(`ÎLE-DE-FRANCE — ${idfPages.length} IDF URLs crawled${IDF_ONLY ? ' (exhaustive)' : ' (sampled; use --idf-only for all)'}`);
  line('═'.repeat(72));
  printGroups('IDF ERRORS', idfAnalysis.errors);
  printGroups('IDF WARNINGS', idfAnalysis.warnings);
  printGroups('IDF NOTICES', idfAnalysis.notices);
  line();
  line('── IDF key metrics ──');
  Object.entries(idfAnalysis.summary).forEach(([k, v]) => line(`   ${k.padEnd(32)} ${v}`));

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

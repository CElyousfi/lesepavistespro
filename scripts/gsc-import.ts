/**
 * gsc-import.ts — Search Console import (S3.1.a)
 *
 * CSV mode (default): parses every export in seo-audit/gsc/<date>/ — the 7
 * files of the Search Console "Performance" export (Pages, Requêtes,
 * Graphique, Appareils, Pays, Filtres, Apparence), French or English headers,
 * UTF-8 / UTF-8 BOM / UTF-16.
 *
 * API mode (--api, or `npm run seo:loop` when the secret is set):
 *   GSC_SERVICE_ACCOUNT_JSON  service-account key (the JSON itself or a path)
 *   GSC_SITE_URL              property, e.g. sc-domain:lesepavistespro.fr or
 *                             https://www.lesepavistespro.fr/
 * → searchanalytics.query, dimensions page+query (plus page, query, date),
 *   country FRA, last 3 months and last 28 days.
 *
 * Output: seo-audit/gsc-latest.json (+ seo-audit/gsc-history/<date>.json).
 *
 * Usage:
 *   npx tsx scripts/gsc-import.ts                  # latest seo-audit/gsc/<date>/
 *   npx tsx scripts/gsc-import.ts --date=2026-10-05
 *   npx tsx scripts/gsc-import.ts --api
 *   npx tsx scripts/gsc-import.ts --date=2026-01-02 --history-only
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import {
  readCsv,
  parseNumber,
  classifyPage,
  clusterOf,
  isIdfIntentQuery,
  inferLanding,
  naturalPage,
  toPath,
  type GscSnapshot,
  type Metrics,
  type PageRow,
  type QueryRow,
} from './gsc-lib';

const ROOT = process.cwd();
const GSC_DIR = path.join(ROOT, 'seo-audit', 'gsc');
const HISTORY_DIR = path.join(ROOT, 'seo-audit', 'gsc-history');
const LATEST = path.join(ROOT, 'seo-audit', 'gsc-latest.json');
/** Pages total vs daily chart total: beyond this gap the export is a sample. */
const TOTALS_TOLERANCE = 0.2;

// ────────────────────────────────────────────────────────────────────────────
// CSV MODE
// ────────────────────────────────────────────────────────────────────────────

type Kind = 'pages' | 'queries' | 'chart' | 'devices' | 'countries' | 'filters' | 'appearance';

const HEADER_KINDS: Array<[RegExp, Kind]> = [
  [/^(pages les plus populaires|top pages|pages?)$/i, 'pages'],
  [/^(requ[eê]tes les plus fr[eé]quentes|top queries|requ[eê]tes?)$/i, 'queries'],
  [/^date$/i, 'chart'],
  [/^(appareils?|device)$/i, 'devices'],
  [/^(pays|country)$/i, 'countries'],
  [/^(filtres?|filter)$/i, 'filters'],
  [/^(apparence dans les r[eé]sultats de recherche|search appearance)$/i, 'appearance'],
];

function metricsFrom(row: string[], header: string[]): Metrics {
  const col = (re: RegExp) => header.findIndex((h) => re.test(h.trim()));
  return {
    clicks: parseNumber(row[col(/^(clics|clicks)$/i)]),
    impressions: parseNumber(row[col(/^impressions$/i)]),
    ctr: parseNumber(row[col(/^ctr$/i)]),
    position: parseNumber(row[col(/^position$/i)]),
  };
}

interface RawImport {
  pages: Array<Metrics & { url: string }>;
  queries: Array<Metrics & { query: string }>;
  chart: Array<Metrics & { date: string }>;
  devices: Array<Metrics & { device: string }>;
  countries: Array<Metrics & { country: string }>;
  appearance: Array<Metrics & { appearance: string }>;
  filters: Record<string, string>;
  ignored: string[];
}

function readCsvDir(dir: string): RawImport {
  const out: RawImport = { pages: [], queries: [], chart: [], devices: [], countries: [], appearance: [], filters: {}, ignored: [] };
  for (const file of fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.csv')).sort()) {
    const rows = readCsv(fs.readFileSync(path.join(dir, file)));
    if (!rows.length) {
      out.ignored.push(`${file} (vide)`);
      continue;
    }
    const header = rows[0].map((h) => h.trim());
    const kind = HEADER_KINDS.find(([re]) => re.test(header[0]))?.[1];
    if (!kind) {
      out.ignored.push(`${file} (en-tête « ${header[0]} » — pas un export Search Console)`);
      continue;
    }
    const body = rows.slice(1).filter((r) => r.length && r[0].trim());
    if (kind === 'filters') {
      body.forEach((r) => (out.filters[r[0].trim()] = (r[1] ?? '').trim()));
      continue;
    }
    const recs = body.map((r) => ({ key: r[0].trim(), m: metricsFrom(r, header) }));
    if (kind === 'pages') out.pages = recs.map(({ key, m }) => ({ url: key, ...m }));
    if (kind === 'queries') out.queries = recs.map(({ key, m }) => ({ query: key, ...m }));
    if (kind === 'chart') out.chart = recs.map(({ key, m }) => ({ date: key, ...m }));
    if (kind === 'devices') out.devices = recs.map(({ key, m }) => ({ device: key, ...m }));
    if (kind === 'countries') out.countries = recs.map(({ key, m }) => ({ country: key, ...m }));
    if (kind === 'appearance') out.appearance = recs.map(({ key, m }) => ({ appearance: key, ...m }));
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// API MODE (no SDK: a signed JWT exchanged for an access token)
// ────────────────────────────────────────────────────────────────────────────

interface ServiceAccount { client_email: string; private_key: string }

function loadServiceAccount(): ServiceAccount {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GSC_SERVICE_ACCOUNT_JSON is not set');
  const json = raw.trim().startsWith('{') ? raw : fs.readFileSync(raw, 'utf8');
  const sa = JSON.parse(json) as ServiceAccount;
  if (!sa.client_email || !sa.private_key) throw new Error('GSC_SERVICE_ACCOUNT_JSON: client_email / private_key missing');
  return sa;
}

async function accessToken(sa: ServiceAccount): Promise<string> {
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key).toString('base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` }),
  });
  const body = (await res.json()) as { access_token?: string; error_description?: string };
  if (!body.access_token) throw new Error(`OAuth token: ${body.error_description ?? res.status}`);
  return body.access_token;
}

interface ApiRow { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function query(token: string, site: string, startDate: string, endDate: string, dimensions: string[]): Promise<ApiRow[]> {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const rows: ApiRow[] = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        type: 'web',
        rowLimit: 25000,
        startRow,
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'fra' }] }],
      }),
    });
    if (!res.ok) throw new Error(`searchanalytics.query ${dimensions.join('+')}: ${res.status} ${await res.text()}`);
    const body = (await res.json()) as { rows?: ApiRow[] };
    rows.push(...(body.rows ?? []));
    if (!body.rows || body.rows.length < 25000) break;
  }
  return rows;
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const m = (r: ApiRow): Metrics => ({ clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });

async function readApi(): Promise<{ raw: RawImport; pairs: NonNullable<GscSnapshot['pairs']>; pages28: NonNullable<GscSnapshot['pages28']>; period: string }> {
  const site = process.env.GSC_SITE_URL;
  if (!site) throw new Error('GSC_SITE_URL is not set');
  const token = await accessToken(loadServiceAccount());
  // Search Console data lags ~2 days.
  const end = new Date(Date.now() - 2 * 86400_000);
  const start90 = new Date(end.getTime() - 89 * 86400_000);
  const start28 = new Date(end.getTime() - 27 * 86400_000);
  const [pairs, pages, queries, chart, devices, pages28] = await Promise.all([
    query(token, site, isoDay(start90), isoDay(end), ['page', 'query']),
    query(token, site, isoDay(start90), isoDay(end), ['page']),
    query(token, site, isoDay(start90), isoDay(end), ['query']),
    query(token, site, isoDay(start90), isoDay(end), ['date']),
    query(token, site, isoDay(start90), isoDay(end), ['device']),
    query(token, site, isoDay(start28), isoDay(end), ['page']),
  ]);
  return {
    period: `${isoDay(start90)} → ${isoDay(end)} (3 mois) · 28 jours depuis ${isoDay(start28)}`,
    raw: {
      pages: pages.map((r) => ({ url: r.keys[0], ...m(r) })),
      queries: queries.map((r) => ({ query: r.keys[0], ...m(r) })),
      chart: chart.map((r) => ({ date: r.keys[0], ...m(r) })),
      devices: devices.map((r) => ({ device: r.keys[0], ...m(r) })),
      countries: [],
      appearance: [],
      filters: { Pays: 'France', 'Type de recherche': 'Web', Source: 'API' },
      ignored: [],
    },
    pairs: pairs.map((r) => ({ page: toPath(r.keys[0]), query: r.keys[1], ...m(r) })),
    pages28: pages28.map((r) => ({ path: toPath(r.keys[0]), ...m(r) })),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// SNAPSHOT
// ────────────────────────────────────────────────────────────────────────────

const sum = (rows: Metrics[]) => ({
  clicks: rows.reduce((s, r) => s + r.clicks, 0),
  impressions: rows.reduce((s, r) => s + r.impressions, 0),
});

export function buildSnapshot(
  raw: RawImport,
  opts: { source: 'csv' | 'api'; date: string; inputDir: string | null; period: string; pairs?: GscSnapshot['pairs']; pages28?: GscSnapshot['pages28'] }
): GscSnapshot {
  const warnings: string[] = [];
  const pagesTotal = sum(raw.pages);
  const queriesTotal = sum(raw.queries);
  const chartTotal = raw.chart.length ? sum(raw.chart) : null;

  if (!raw.pages.length) warnings.push('Aucun export « Pages » trouvé.');
  if (!raw.queries.length) warnings.push('Aucun export « Requêtes » trouvé.');
  if (chartTotal && chartTotal.clicks > 0) {
    const gap = Math.abs(chartTotal.clicks - pagesTotal.clicks) / chartTotal.clicks;
    if (gap > TOTALS_TOLERANCE) {
      warnings.push(
        `⚠️  ÉCHANTILLON : les pages exportées totalisent ${pagesTotal.clicks} clics contre ${chartTotal.clicks} dans le graphique quotidien ` +
          `(écart ${Math.round(gap * 100)} % > ${TOTALS_TOLERANCE * 100} %). Les valeurs absolues ne sont pas fiables, seules les tendances le sont. ` +
          'Refaire un export sans filtre (ou passer en mode API).'
      );
    }
  }
  if (opts.source === 'csv') {
    warnings.push(
      'Mode CSV : l’export Search Console ne contient pas les couples page × requête. La page d’atterrissage de chaque requête est INFÉRÉE ' +
        '(page « naturelle » si elle a des impressions, sinon son parent le plus proche). Le mode API donne les couples exacts.'
    );
  }

  const pageRows: PageRow[] = raw.pages.map((p) => ({ url: p.url, ...classifyPage(p.url), clicks: p.clicks, impressions: p.impressions, ctr: p.ctr, position: p.position, top_queries: [] }));
  const byPath = new Map(pageRows.map((p) => [p.path, p]));
  const pagesWithImpr = new Set(pageRows.filter((p) => p.impressions > 0).map((p) => p.path));

  const pairsByQuery = new Map<string, NonNullable<GscSnapshot['pairs']>>();
  (opts.pairs ?? []).forEach((pr) => pairsByQuery.set(pr.query, [...(pairsByQuery.get(pr.query) ?? []), pr]));

  const queryRows: QueryRow[] = raw.queries.map((q) => {
    const base = { query: q.query, clicks: q.clicks, impressions: q.impressions, ctr: q.ctr, position: q.position, is_idf_intent: isIdfIntentQuery(q.query), cluster: clusterOf(q.query) };
    const pairs = pairsByQuery.get(q.query);
    if (pairs?.length) {
      const sorted = [...pairs].sort((a, b) => b.impressions - a.impressions);
      return { ...base, natural_page: naturalPage(q.query), landing_page: sorted[0].page, mapping: 'api', also_ranking: sorted.slice(1).filter((p) => p.impressions > 0).map((p) => p.page) };
    }
    const { natural, landing, mapping } = inferLanding(q.query, pagesWithImpr);
    return { ...base, natural_page: natural, landing_page: landing, mapping, also_ranking: [] };
  });

  // Top queries per page: exact pairs in API mode, inferred landings in CSV mode.
  if (opts.pairs?.length) {
    opts.pairs.forEach((pr) => byPath.get(pr.page)?.top_queries.push({ query: pr.query, clicks: pr.clicks, impressions: pr.impressions, ctr: pr.ctr, position: pr.position, mapping: 'api' }));
  } else {
    queryRows.forEach((q) => {
      if (!q.landing_page) return;
      byPath.get(q.landing_page)?.top_queries.push({ query: q.query, clicks: q.clicks, impressions: q.impressions, ctr: q.ctr, position: q.position, mapping: q.mapping });
    });
  }
  pageRows.forEach((p) => {
    p.top_queries.sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
    p.top_queries = p.top_queries.slice(0, 10);
  });

  return {
    version: 1,
    source: opts.source,
    date: opts.date,
    importedAt: new Date().toISOString(),
    period: opts.period,
    inputDir: opts.inputDir,
    filters: raw.filters,
    totals: { chart: chartTotal, pages: pagesTotal, queries: queriesTotal },
    warnings,
    ignoredFiles: raw.ignored,
    devices: raw.devices,
    countries: raw.countries,
    appearance: raw.appearance,
    chart: raw.chart,
    pages: pageRows.sort((a, b) => b.impressions - a.impressions),
    queries: queryRows.sort((a, b) => b.impressions - a.impressions),
    ...(opts.pairs ? { pairs: opts.pairs } : {}),
    ...(opts.pages28 ? { pages28: opts.pages28 } : {}),
  };
}

/** Compact copy kept in seo-audit/gsc-history/ for the decliners report. */
function historyCopy(s: GscSnapshot) {
  return {
    version: s.version,
    source: s.source,
    date: s.date,
    period: s.period,
    filters: s.filters,
    totals: s.totals,
    warnings: s.warnings,
    pages: s.pages.map(({ path: p, clicks, impressions, ctr, position, is_idf, page_type }) => ({ path: p, clicks, impressions, ctr, position, is_idf, page_type })),
    queries: s.queries.map(({ query: q, clicks, impressions, ctr, position, cluster, is_idf_intent }) => ({ query: q, clicks, impressions, ctr, position, cluster, is_idf_intent })),
  };
}

export async function runImport(argv: string[] = process.argv.slice(2)): Promise<GscSnapshot> {
  const arg = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
  const useApi = argv.includes('--api');
  const historyOnly = argv.includes('--history-only');

  let snapshot: GscSnapshot;
  if (useApi) {
    const { raw, pairs, pages28, period } = await readApi();
    const date = isoDay(new Date());
    snapshot = buildSnapshot(raw, { source: 'api', date, inputDir: null, period, pairs, pages28 });
  } else {
    const dates = fs.existsSync(GSC_DIR) ? fs.readdirSync(GSC_DIR).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort() : [];
    const date = arg('date') ?? dates[dates.length - 1];
    if (!date) throw new Error(`No export folder in ${path.relative(ROOT, GSC_DIR)}/<YYYY-MM-DD>/`);
    const dir = arg('dir') ? path.resolve(arg('dir') as string) : path.join(GSC_DIR, date);
    const raw = readCsvDir(dir);
    snapshot = buildSnapshot(raw, { source: 'csv', date, inputDir: path.relative(ROOT, dir), period: raw.filters['Date'] ?? 'inconnue' });
  }

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  fs.writeFileSync(path.join(HISTORY_DIR, `${snapshot.date}.json`), JSON.stringify(historyCopy(snapshot), null, 1));
  if (!historyOnly) fs.writeFileSync(LATEST, JSON.stringify(snapshot, null, 1));

  const idfPages = snapshot.pages.filter((p) => p.is_idf && p.path !== '/');
  const idf = { clicks: idfPages.reduce((s, p) => s + p.clicks, 0), impressions: idfPages.reduce((s, p) => s + p.impressions, 0) };
  console.log(`\n📥 Search Console import — ${snapshot.source.toUpperCase()} ${snapshot.date} (${snapshot.period})`);
  console.log(`   pages ${snapshot.pages.length} · requêtes ${snapshot.queries.length} · jours ${snapshot.chart.length}`);
  console.log(`   totaux pages : ${snapshot.totals.pages.clicks} clics / ${snapshot.totals.pages.impressions} impr.` + (snapshot.totals.chart ? ` · graphique : ${snapshot.totals.chart.clicks} clics / ${snapshot.totals.chart.impressions} impr.` : ''));
  console.log(`   Île-de-France (hors accueil) : ${idf.impressions} impr. (${Math.round((idf.impressions / Math.max(1, snapshot.totals.pages.impressions)) * 100)} %), ${idf.clicks} clics (${Math.round((idf.clicks / Math.max(1, snapshot.totals.pages.clicks)) * 100)} %)`);
  snapshot.ignoredFiles.forEach((f) => console.log(`   ignoré : ${f}`));
  snapshot.warnings.forEach((w) => console.log(`\n   ${w.startsWith('⚠️') ? '\x1b[31m' + w + '\x1b[0m' : w}`));
  console.log(`\n   → ${historyOnly ? '' : `${path.relative(ROOT, LATEST)} + `}${path.relative(ROOT, path.join(HISTORY_DIR, `${snapshot.date}.json`))}\n`);
  return snapshot;
}

if (require.main === module) {
  runImport().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

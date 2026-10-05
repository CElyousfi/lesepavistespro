/**
 * striking-distance.ts — opportunities from the latest Search Console import (S3.1.b)
 *
 *   T1  Push to page 1   IDF pages, ≥ 20 impr., position 4–20, ranked by
 *                        impressions × (expectedCTR(pos − 3) − CTR)
 *   T2  Fix the snippet  ≥ 30 impr., position ≤ 10, CTR < 50 % of expected
 *   T3  Query gaps       ≥ 30 impr. queries whose landing page is not the
 *                        natural page (or nothing ranks)
 *   Cannibalisation      two of our URLs with impressions on one query
 *   Decliners            vs. the previous import in seo-audit/gsc-history/
 *
 * For T1/T2 pages the live HTML is fetched (title, H1, H2, first 100 words) to
 * say whether the top query appears verbatim.
 *
 * Usage: npx tsx scripts/striking-distance.ts [--base=https://www.lesepavistespro.fr] [--no-fetch]
 * Output: seo-audit/striking-distance.md + .json, top 20 actions on stdout.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { expectedCtr, norm, pct, fallbackChain, type GscSnapshot, type PageRow, type QueryRow } from './gsc-lib';

const ROOT = process.cwd();
const LATEST = path.join(ROOT, 'seo-audit', 'gsc-latest.json');
const HISTORY_DIR = path.join(ROOT, 'seo-audit', 'gsc-history');
const OUT_MD = path.join(ROOT, 'seo-audit', 'striking-distance.md');
const OUT_JSON = path.join(ROOT, 'seo-audit', 'striking-distance.json');

export const T1_MIN_IMPR = 20;
export const T1_MIN_POS = 4;
export const T1_MAX_POS = 20;
export const T2_MIN_IMPR = 30;
export const T2_MAX_POS = 10;
export const T3_MIN_IMPR = 30;

interface PageHtml {
  title: string;
  h1: string;
  h2: string[];
  first100: string;
  status: number;
}

export interface T1Row {
  path: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  expected_ctr: number;
  score: number;
  page_type: string;
  top_query: string | null;
  top_query_impressions: number;
  top_query_mapping: string | null;
  in_title: boolean | null;
  in_h1: boolean | null;
  in_h2: boolean | null;
  in_first100: boolean | null;
  title: string | null;
}

export interface T2Row {
  path: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  expected_ctr: number;
  is_idf: boolean;
  title: string | null;
}

export interface T3Row {
  query: string;
  impressions: number;
  position: number;
  cluster: string;
  landing: string | null;
  recommended: string | null;
  reason: string;
}

export interface StrikingReport {
  generatedAt: string;
  source: GscSnapshot['source'];
  date: string;
  period: string;
  previous: string | null;
  base: string;
  warnings: string[];
  t1: T1Row[];
  t2: T2Row[];
  t3: T3Row[];
  cannibalisation: Array<{ query: string; impressions: number; position: number; urls: string[]; exact: boolean }>;
  decliners: Array<{ path: string; before: { impressions: number; clicks: number; position: number }; after: { impressions: number; clicks: number; position: number }; reason: string }>;
  actions: Array<{ priority: number; kind: string; target: string; action: string }>;
}

// ────────────────────────────────────────────────────────────────────────────

async function fetchHtml(base: string, p: string): Promise<PageHtml | null> {
  try {
    const res = await fetch(`${base}${p}`, { headers: { 'User-Agent': 'LesEpavistesPro-SEO-Monitor/1.0 (+striking-distance)' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    $('script, style, noscript, svg, template, header, nav, footer, [data-nosnippet]').remove();
    const h1 = $('h1').first().text().replace(/\s+/g, ' ').trim();
    const body = $('body').text().replace(/\s+/g, ' ').trim();
    const at = h1 ? body.indexOf(h1) : 0;
    const first100 = body.slice(Math.max(0, at)).split(' ').slice(0, 100).join(' ');
    return {
      status: res.status,
      title: cheerio.load(html)('head title').first().text().trim(),
      h1,
      h2: $('h2').map((_, el) => $(el).text().replace(/\s+/g, ' ').trim()).get(),
      first100,
    };
  } catch {
    return null;
  }
}

async function fetchAll(base: string, paths: string[]): Promise<Map<string, PageHtml | null>> {
  const out = new Map<string, PageHtml | null>();
  let i = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (i < paths.length) {
        const p = paths[i++];
        out.set(p, await fetchHtml(base, p));
      }
    })
  );
  return out;
}

const contains = (haystack: string | undefined, query: string) => (haystack ? ` ${norm(haystack)} `.includes(` ${norm(query)} `) : false);

function previousSnapshot(date: string): { date: string; pages: Array<{ path: string; clicks: number; impressions: number; position: number }> } | null {
  if (!fs.existsSync(HISTORY_DIR)) return null;
  const prev = fs.readdirSync(HISTORY_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f.slice(0, 10) < date).sort().pop();
  return prev ? JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, prev), 'utf8')) : null;
}

// ────────────────────────────────────────────────────────────────────────────

export function computeT1(s: GscSnapshot): Omit<T1Row, 'in_title' | 'in_h1' | 'in_h2' | 'in_first100' | 'title'>[] {
  return s.pages
    .filter((p) => p.is_idf && p.path !== '/' && p.impressions >= T1_MIN_IMPR && p.position >= T1_MIN_POS && p.position <= T1_MAX_POS)
    .map((p) => {
      const top = p.top_queries[0];
      return {
        path: p.path,
        impressions: p.impressions,
        clicks: p.clicks,
        ctr: p.ctr,
        position: p.position,
        expected_ctr: expectedCtr(p.position),
        score: Math.round(p.impressions * Math.max(0, expectedCtr(Math.max(1, p.position - 3)) - p.ctr) * 100) / 100,
        page_type: p.page_type,
        top_query: top?.query ?? null,
        top_query_impressions: top?.impressions ?? 0,
        top_query_mapping: top?.mapping ?? null,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function computeT2(s: GscSnapshot): Omit<T2Row, 'title'>[] {
  return s.pages
    .filter((p) => p.impressions >= T2_MIN_IMPR && p.position <= T2_MAX_POS && p.ctr < 0.5 * expectedCtr(p.position))
    .map((p) => ({ path: p.path, impressions: p.impressions, clicks: p.clicks, ctr: p.ctr, position: p.position, expected_ctr: expectedCtr(p.position), is_idf: p.is_idf }))
    .sort((a, b) => b.impressions * b.expected_ctr - a.impressions * a.expected_ctr);
}

export function computeT3(s: GscSnapshot): T3Row[] {
  return s.queries
    .filter((q) => q.impressions >= T3_MIN_IMPR && q.cluster !== 'brand' && q.natural_page && q.natural_page !== '/' && q.landing_page !== q.natural_page)
    .map((q) => ({
      query: q.query,
      impressions: q.impressions,
      position: q.position,
      cluster: q.cluster,
      landing: q.landing_page,
      recommended: q.natural_page,
      reason: gapReason(q),
    }))
    .sort((a, b) => b.impressions - a.impressions);
}

function gapReason(q: QueryRow): string {
  const nat = q.natural_page ?? '';
  const land = q.landing_page ?? '';
  if (!land) return 'aucune page ne se positionne';
  if (nat.startsWith('/centre-vhu-agree/')) return 'aucune réponse dédiée « centre VHU » (page à créer, S3.4)';
  const natDepth = nat.split('/').length;
  const landDepth = land.split('/').length;
  if (land.includes('/ile-de-france/') && !nat.includes('/ile-de-france/')) return 'page « situation » qui répond à une requête ville';
  if (natDepth > landDepth) return 'page parente (département / région) qui répond à une requête ville';
  return 'page d’atterrissage différente de la page naturelle';
}

export function computeCannibalisation(s: GscSnapshot): StrikingReport['cannibalisation'] {
  if (s.source === 'api') {
    return s.queries
      .filter((q) => q.also_ranking.length > 0 && q.impressions >= 20)
      .map((q) => ({ query: q.query, impressions: q.impressions, position: q.position, urls: [q.landing_page as string, ...q.also_ranking], exact: true }))
      .sort((a, b) => b.impressions - a.impressions);
  }
  // CSV: two of our pages that could answer the query, both with impressions
  // at a position close to the query's — "possible", to confirm in API mode.
  const byPath = new Map(s.pages.map((p) => [p.path, p]));
  const out: StrikingReport['cannibalisation'] = [];
  s.queries
    .filter((q) => q.impressions >= 20 && q.natural_page && q.natural_page !== '/')
    .forEach((q) => {
      const nat = q.natural_page as string;
      const sibling = nat.startsWith('/epaviste/') ? nat.replace('/epaviste/', '/rachat-voiture/') : nat.replace('/rachat-voiture/', '/epaviste/');
      const candidates = Array.from(new Set([...fallbackChain(nat).slice(0, 2), sibling])).filter((p) => p !== '/');
      const close = candidates.filter((p) => {
        const pg = byPath.get(p);
        return pg && pg.impressions >= 10 && Math.abs(pg.position - q.position) <= 3;
      });
      if (close.length >= 2) out.push({ query: q.query, impressions: q.impressions, position: q.position, urls: close, exact: false });
    });
  return out.sort((a, b) => b.impressions - a.impressions);
}

export function computeDecliners(s: GscSnapshot): { previous: string | null; rows: StrikingReport['decliners'] } {
  const prev = previousSnapshot(s.date);
  if (!prev) return { previous: null, rows: [] };
  const before = new Map(prev.pages.map((p) => [p.path, p]));
  const rows: StrikingReport['decliners'] = [];
  s.pages.forEach((p) => {
    const b = before.get(p.path);
    if (!b) return;
    const after = { impressions: p.impressions, clicks: p.clicks, position: p.position };
    const prevSlim = { impressions: b.impressions, clicks: b.clicks, position: b.position };
    if (b.impressions >= 20 && p.impressions >= 20 && p.position - b.position >= 3) {
      rows.push({ path: p.path, before: prevSlim, after, reason: `position ${b.position.toFixed(1)} → ${p.position.toFixed(1)}` });
    } else if (b.clicks >= 3 && p.clicks <= b.clicks / 2) {
      rows.push({ path: p.path, before: prevSlim, after, reason: `clics ${b.clicks} → ${p.clicks}` });
    } else if (b.impressions >= 50 && p.impressions <= b.impressions / 2) {
      rows.push({ path: p.path, before: prevSlim, after, reason: `impressions ${b.impressions} → ${p.impressions}` });
    }
  });
  return { previous: prev.date, rows: rows.sort((a, b) => b.before.impressions - a.before.impressions) };
}

// ────────────────────────────────────────────────────────────────────────────

const yn = (b: boolean | null) => (b === null ? '?' : b ? '✅' : '—');
const fmtPos = (n: number) => n.toFixed(1).replace('.', ',');

function renderMarkdown(r: StrikingReport): string {
  const L: string[] = [];
  L.push(`# Striking distance — Search Console ${r.date}`);
  L.push('');
  L.push(`Source : ${r.source.toUpperCase()} · période : ${r.period} · import précédent : ${r.previous ?? 'aucun'} · HTML lu sur ${r.base} · généré le ${r.generatedAt.slice(0, 10)}.`);
  L.push('');
  r.warnings.forEach((w) => L.push(`> ${w}`));
  if (r.warnings.length) L.push('');
  L.push('Courbe de CTR attendue : p1 28 %, p2 15 %, p3 11 %, p4 8 %, p5 7 %, p6–10 4 → 2,5 %, p11–20 1,5 → 0,6 %.');
  L.push('');
  L.push(`## T1 — Pousser en page 1 (${r.t1.length} pages IDF, ≥ ${T1_MIN_IMPR} impr., position ${T1_MIN_POS}–${T1_MAX_POS})`);
  L.push('');
  L.push('Score = impressions × (CTR attendu à (position − 3) − CTR actuel). « Requête » = requête principale (inférée en mode CSV).');
  L.push('');
  L.push('| # | Page | Impr. | Clics | Pos. | CTR | CTR attendu | Score | Requête principale | Titre | H1 | H2 | 100 mots |');
  L.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  r.t1.forEach((t, i) =>
    L.push(`| ${i + 1} | \`${t.path}\` | ${t.impressions} | ${t.clicks} | ${fmtPos(t.position)} | ${pct(t.ctr)} | ${pct(t.expected_ctr)} | ${t.score.toFixed(1)} | ${t.top_query ?? '—'}${t.top_query ? ` (${t.top_query_impressions})` : ''} | ${yn(t.in_title)} | ${yn(t.in_h1)} | ${yn(t.in_h2)} | ${yn(t.in_first100)} |`)
  );
  L.push('');
  L.push(`## T2 — Corriger le snippet (${r.t2.length} pages, ≥ ${T2_MIN_IMPR} impr., position ≤ ${T2_MAX_POS}, CTR < 50 % de l’attendu)`);
  L.push('');
  L.push('| Page | IDF | Impr. | Clics | Pos. | CTR | CTR attendu | Titre actuel |');
  L.push('|---|---|---|---|---|---|---|---|');
  r.t2.forEach((t) => L.push(`| \`${t.path}\` | ${t.is_idf ? 'oui' : ''} | ${t.impressions} | ${t.clicks} | ${fmtPos(t.position)} | ${pct(t.ctr)} | ${pct(t.expected_ctr)} | ${t.title ?? '?'} |`));
  L.push('');
  L.push(`## T3 — Requêtes sans la bonne page (${r.t3.length} requêtes ≥ ${T3_MIN_IMPR} impr.)`);
  L.push('');
  L.push('| Requête | Impr. | Pos. | Cluster | Page qui reçoit les impressions | Page recommandée | Pourquoi |');
  L.push('|---|---|---|---|---|---|---|');
  r.t3.forEach((t) => L.push(`| ${t.query} | ${t.impressions} | ${fmtPos(t.position)} | ${t.cluster} | ${t.landing ? `\`${t.landing}\`` : '—'} | \`${t.recommended}\` | ${t.reason} |`));
  L.push('');
  L.push(`## Cannibalisation (${r.cannibalisation.length}${r.source === 'csv' ? ', possible — à confirmer en mode API' : ''})`);
  L.push('');
  if (r.cannibalisation.length) {
    L.push('| Requête | Impr. | Pos. | URLs |');
    L.push('|---|---|---|---|');
    r.cannibalisation.slice(0, 40).forEach((c) => L.push(`| ${c.query} | ${c.impressions} | ${fmtPos(c.position)} | ${c.urls.map((u) => `\`${u}\``).join(' · ')} |`));
  } else L.push('Aucune.');
  L.push('');
  L.push(`## En baisse depuis l’import précédent (${r.previous ?? '—'}) — ${r.decliners.length} pages`);
  L.push('');
  if (r.decliners.length) {
    L.push('| Page | Avant (impr. / clics / pos.) | Après | Motif |');
    L.push('|---|---|---|---|');
    r.decliners.slice(0, 40).forEach((d) => L.push(`| \`${d.path}\` | ${d.before.impressions} / ${d.before.clicks} / ${fmtPos(d.before.position)} | ${d.after.impressions} / ${d.after.clicks} / ${fmtPos(d.after.position)} | ${d.reason} |`));
  } else L.push(r.previous ? 'Aucune.' : 'Pas d’import précédent.');
  L.push('');
  L.push('## Top 20 actions');
  L.push('');
  r.actions.slice(0, 20).forEach((a, i) => L.push(`${i + 1}. **${a.kind}** \`${a.target}\` — ${a.action}`));
  L.push('');
  return L.join('\n');
}

function buildActions(r: Omit<StrikingReport, 'actions'>): StrikingReport['actions'] {
  const actions: StrikingReport['actions'] = [];
  r.t1.forEach((t) => {
    const missing = [!t.in_title && 'titre', !t.in_h2 && 'H2'].filter(Boolean).join(' + ');
    actions.push({
      priority: t.score,
      kind: 'T1',
      target: t.path,
      action: t.top_query
        ? `pos. ${fmtPos(t.position)}, ${t.impressions} impr. : « ${t.top_query} »${missing ? ` absente du ${missing}` : ' déjà présente'} → titre + H2 dédié + 3 liens internes avec l’ancre`
        : `pos. ${fmtPos(t.position)}, ${t.impressions} impr. → renforcer le maillage interne`,
    });
  });
  r.t2.forEach((t) => actions.push({ priority: t.impressions * (t.expected_ctr - t.ctr), kind: 'T2', target: t.path, action: `CTR ${pct(t.ctr)} pour ${pct(t.expected_ctr)} attendu à la pos. ${fmtPos(t.position)} → réécrire titre + description` }));
  r.t3.forEach((t) => actions.push({ priority: t.impressions * 0.02, kind: 'T3', target: t.recommended ?? '?', action: `« ${t.query} » (${t.impressions} impr.) : ${t.reason}` }));
  r.decliners.forEach((d) => actions.push({ priority: d.before.impressions * 0.01, kind: 'Baisse', target: d.path, action: d.reason }));
  return actions.sort((a, b) => b.priority - a.priority);
}

export async function runStrikingDistance(argv: string[] = process.argv.slice(2), snapshot?: GscSnapshot): Promise<StrikingReport> {
  const arg = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
  const base = (arg('base') ?? process.env.SITE_URL ?? 'https://www.lesepavistespro.fr').replace(/\/+$/, '');
  const s: GscSnapshot = snapshot ?? JSON.parse(fs.readFileSync(LATEST, 'utf8'));

  const t1raw = computeT1(s);
  const t2raw = computeT2(s);
  const html = argv.includes('--no-fetch') ? new Map<string, PageHtml | null>() : await fetchAll(base, Array.from(new Set([...t1raw.map((t) => t.path), ...t2raw.map((t) => t.path)])));

  const t1: T1Row[] = t1raw.map((t) => {
    const h = html.get(t.path);
    const q = t.top_query;
    return {
      ...t,
      title: h?.title ?? null,
      in_title: h && q ? contains(h.title, q) : null,
      in_h1: h && q ? contains(h.h1, q) : null,
      in_h2: h && q ? h.h2.some((x) => contains(x, q)) : null,
      in_first100: h && q ? contains(h.first100, q) : null,
    };
  });
  const t2: T2Row[] = t2raw.map((t) => ({ ...t, title: html.get(t.path)?.title ?? null }));
  const { previous, rows: decliners } = computeDecliners(s);

  const partial = {
    generatedAt: new Date().toISOString(),
    source: s.source,
    date: s.date,
    period: s.period,
    previous,
    base,
    warnings: s.warnings,
    t1,
    t2,
    t3: computeT3(s),
    cannibalisation: computeCannibalisation(s),
    decliners,
  };
  const report: StrikingReport = { ...partial, actions: buildActions(partial) };

  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 1));
  fs.writeFileSync(OUT_MD, renderMarkdown(report));

  console.log(`\n🎯 Striking distance — ${report.date} : T1 ${t1.length} · T2 ${t2.length} · T3 ${report.t3.length} · cannibalisation ${report.cannibalisation.length} · baisses ${decliners.length}`);
  console.log('\nTop 20 actions :');
  report.actions.slice(0, 20).forEach((a, i) => console.log(`${String(i + 1).padStart(2)}. [${a.kind}] ${a.target} — ${a.action}`));
  console.log(`\n→ ${path.relative(ROOT, OUT_MD)} + ${path.relative(ROOT, OUT_JSON)}\n`);
  return report;
}

export type { PageRow };

if (require.main === module) {
  runStrikingDistance().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

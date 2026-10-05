/**
 * Shared Search Console helpers (S3.1) — used by gsc-import.ts,
 * striking-distance.ts and seo-loop.ts.
 *
 *   • CSV decoding (UTF-8, UTF-8 BOM, UTF-16 LE/BE) and French number parsing
 *   • page classification: service, page_type, tier, is_idf
 *   • query classification: is_idf_intent, cluster
 *   • the expected-CTR curve used to rank opportunities
 *   • query → page inference when only the CSV export is available (the
 *     Search Console UI export has no page × query pairs — API mode does)
 */

import { parse } from 'csv-parse/sync';
import { allDepartments, regions, type City } from '../lib/locations-national';
import { IDF_DEPT_SLUGS } from '../lib/idf';
import { TIER_A_MIN_POPULATION, TIER_B_MIN_POPULATION } from '../lib/idf-cities';
import { blogPosts } from '../lib/blog-data';

export const SITE_ORIGIN = 'https://www.lesepavistespro.fr';

// ────────────────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────────────────

export type Service = 'epaviste' | 'rachat-voiture' | null;
export type PageType = 'home' | 'hub' | 'dept' | 'city-A' | 'city-B' | 'city-C' | 'intent' | 'blog' | 'static';
export type QueryCluster =
  | 'near-me'
  | 'brand'
  | 'centre-vhu'
  | 'casse'
  | 'situation'
  | 'rachat'
  | 'moto-scooter-caravane'
  | 'other';
/** How the landing page of a query was obtained. */
export type QueryMapping = 'api' | 'natural' | 'fallback' | 'none';

export interface Metrics {
  clicks: number;
  impressions: number;
  /** 0–1 */
  ctr: number;
  position: number;
}

export interface PageRow extends Metrics {
  url: string;
  path: string;
  is_idf: boolean;
  service: Service;
  page_type: PageType;
  tier: 'A' | 'B' | 'C' | null;
  top_queries: Array<Metrics & { query: string; mapping: QueryMapping }>;
}

export interface QueryRow extends Metrics {
  query: string;
  is_idf_intent: boolean;
  cluster: QueryCluster;
  /** The page that should rank for this query on this site (may not exist yet). */
  natural_page: string | null;
  /** Page that receives the impressions: exact in API mode, inferred in CSV mode. */
  landing_page: string | null;
  mapping: QueryMapping;
  /** Other of our URLs with impressions for this query (exact in API mode). */
  also_ranking: string[];
}

export interface GscSnapshot {
  version: 1;
  source: 'csv' | 'api';
  date: string;
  importedAt: string;
  period: string;
  inputDir: string | null;
  filters: Record<string, string>;
  totals: {
    chart: { clicks: number; impressions: number } | null;
    pages: { clicks: number; impressions: number };
    queries: { clicks: number; impressions: number };
  };
  warnings: string[];
  ignoredFiles: string[];
  devices: Array<Metrics & { device: string }>;
  countries: Array<Metrics & { country: string }>;
  appearance: Array<Metrics & { appearance: string }>;
  chart: Array<Metrics & { date: string }>;
  pages: PageRow[];
  queries: QueryRow[];
  /** API mode only: exact page × query rows. */
  pairs?: Array<Metrics & { page: string; query: string }>;
  /** API mode only: last-28-days page metrics. */
  pages28?: Array<Metrics & { path: string }>;
}

// ────────────────────────────────────────────────────────────────────────────
// CSV
// ────────────────────────────────────────────────────────────────────────────

/** Decode a CSV buffer whatever the export encoding (UTF-8, BOM, UTF-16). */
export function decodeCsv(buf: Buffer): string {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) return buf.subarray(2).toString('utf16le');
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const swapped = Buffer.from(buf.subarray(2));
    swapped.swap16();
    return swapped.toString('utf16le');
  }
  // UTF-16 without BOM: every other byte is NUL in ASCII-heavy text.
  if (buf.length >= 4 && buf[1] === 0 && buf[3] === 0) return buf.toString('utf16le');
  let s = buf.toString('utf8');
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  return s;
}

export function readCsv(buf: Buffer): string[][] {
  const text = decodeCsv(buf).replace(/\r\n?/g, '\n').trim();
  if (!text) return [];
  const firstLine = text.split('\n')[0];
  const delimiter = firstLine.includes('\t') ? '\t' : (firstLine.split(';').length > firstLine.split(',').length ? ';' : ',');
  return parse(text, { delimiter, relax_column_count: true, relax_quotes: true, skip_empty_lines: true }) as string[][];
}

/** "1 234", "1,5", "12.62", "1.5%", "0,18 %" → number (percent → 0–1). */
export function parseNumber(raw: string | undefined): number {
  if (raw === undefined) return 0;
  let s = raw.trim().replace(/[   ]/g, '');
  const pct = s.endsWith('%');
  if (pct) s = s.slice(0, -1);
  if (/^\d+,\d+$/.test(s)) s = s.replace(',', '.');
  const n = Number(s);
  if (!Number.isFinite(n)) return 0;
  return pct ? n / 100 : n;
}

// ────────────────────────────────────────────────────────────────────────────
// TEXT NORMALISATION
// ────────────────────────────────────────────────────────────────────────────

/** Lowercase, no accents, apostrophes/hyphens → spaces, saint → st. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`´\-_/.,()]/g, ' ')
    .replace(/\bsainte\b/g, 'ste')
    .replace(/\bsaint\b/g, 'st')
    .replace(/\s+/g, ' ')
    .trim();
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE CLASSIFICATION
// ────────────────────────────────────────────────────────────────────────────

const REGION_SLUGS = new Set(regions.map((r) => r.slug));
const DEPT_BY_SLUG = new Map(allDepartments.map((d) => [d.slug, d]));
const IDF_DEPTS = new Set(IDF_DEPT_SLUGS);
const IDF_BLOG_SLUGS = new Set(blogPosts.filter((p) => p.region === 'idf').map((p) => p.slug));

export function tierFor(city: Pick<City, 'slug' | 'population'>): 'A' | 'B' | 'C' {
  if (/^paris-\d+(er|e)$/.test(city.slug)) return 'A';
  const pop = city.population ?? 0;
  if (pop >= TIER_A_MIN_POPULATION) return 'A';
  if (pop >= TIER_B_MIN_POPULATION) return 'B';
  return 'C';
}

export function toPath(urlOrPath: string): string {
  try {
    const u = new URL(urlOrPath, SITE_ORIGIN);
    const p = decodeURIComponent(u.pathname).replace(/\/+$/, '');
    return p || '/';
  } catch {
    return urlOrPath;
  }
}

export function classifyPage(urlOrPath: string): Pick<PageRow, 'path' | 'is_idf' | 'service' | 'page_type' | 'tier'> {
  const path = toPath(urlOrPath);
  const seg = path.split('/').filter(Boolean);
  const base = { path, is_idf: false, service: null as Service, page_type: 'static' as PageType, tier: null as PageRow['tier'] };
  if (path === '/') return { ...base, page_type: 'home', is_idf: true };
  if (seg[0] === 'blog') return { ...base, page_type: 'blog', is_idf: seg[1] ? IDF_BLOG_SLUGS.has(seg[1]) : false };
  if (seg[0] === 'centre-vhu-agree') {
    return { ...base, service: 'epaviste', page_type: seg[1] ? 'dept' : 'hub', is_idf: seg[1] ? IDF_DEPTS.has(seg[1]) : false };
  }
  if (seg[0] !== 'epaviste' && seg[0] !== 'rachat-voiture') {
    return { ...base, is_idf: seg[0] === 'guides' && /ile-de-france|grand-paris|paris/.test(seg[1] ?? '') };
  }
  const service = seg[0] as Service;
  if (seg.length === 1) return { ...base, service, page_type: 'hub' };
  if (seg[1] === 'ile-de-france') {
    if (seg.length === 2) return { ...base, service, page_type: 'hub', is_idf: true };
    // Situation, marque and pro pages all live under /{service}/ile-de-france/.
    return { ...base, service, page_type: 'intent', is_idf: true };
  }
  if (REGION_SLUGS.has(seg[1]) && seg.length === 2) return { ...base, service, page_type: 'hub' };
  const dept = DEPT_BY_SLUG.get(seg[1]);
  const isIdf = IDF_DEPTS.has(seg[1]);
  if (seg.length === 2) return { ...base, service, page_type: 'dept', is_idf: isIdf };
  const city = dept?.cities.find((c) => c.slug === seg[2]);
  // Rachat × marque / pro pages live under the IDF hub, handled above.
  const tier = city ? tierFor(city) : 'C';
  return { ...base, service, page_type: `city-${tier}` as PageType, tier, is_idf: isIdf };
}

// ────────────────────────────────────────────────────────────────────────────
// QUERY CLASSIFICATION
// ────────────────────────────────────────────────────────────────────────────

const RE = {
  brand: /\b(l ?epavistes? ?pro|epavistes? pro|lesepavistespro|les epavistes)\b/,
  nearMe: /\b(autour de moi|pres de (chez )?moi|a proximite|proche de moi|proximite|near me|dans mon secteur)\b/,
  centreVhu: /\bcentres? (vhu|agree?s? vhu)\b|\bvhu agree?s?\b.*\bcentre\b|\bcentre de (destruction|recyclage)\b/,
  moto: /\b(moto|motos|scooter|scooters|caravane|caravanes|camping ?car|camping cars|quad|mobil ?home|remorque|cyclomoteur)\b/,
  casse: /\b(casse|casses|ferrailleur|ferrailleurs|ferraille|demolisseur|demolition auto|cimetiere)\b/,
  rachat: /\b(rachat|rachete|racheter|reprise|reprend|vendre|vente|acheteur|achat|achete|cash|argent)\b/,
  situation:
    /\b(sans carte grise|carte grise|fourriere|brule|brulee|accident|accidentee?|gage|succession|deces|panne|non roulant|sans ct|controle technique|parking|sous sol|abandon|abandonnee|zfe|crit ?air|utilitaire|camion|camionnette|moteur|boite|kilometrage|hs)\b/,
};

const IDF_INTENT_RE = (() => {
  const names = new Set<string>(['paris', 'idf', 'ile de france', 'seine et marne', 'yvelines', 'essonne', 'hauts de seine', 'seine st denis', 'val de marne', 'val d oise', 'grand paris', 'petite couronne', 'grande couronne']);
  IDF_DEPT_SLUGS.forEach((slug) => DEPT_BY_SLUG.get(slug)?.cities.forEach((c) => {
    const n = norm(c.name);
    if (n.length >= 4) names.add(n);
  }));
  const alts = Array.from(names).sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`\\b(${alts.join('|')}|75|77|78|91|92|93|94|95)\\b`);
})();

export function isIdfIntentQuery(query: string): boolean {
  return IDF_INTENT_RE.test(norm(query));
}

export function clusterOf(query: string): QueryCluster {
  const q = norm(query);
  if (RE.brand.test(q) || /\bepaviste pro\b/.test(q)) return 'brand';
  if (RE.centreVhu.test(q)) return 'centre-vhu';
  if (RE.nearMe.test(q)) return 'near-me';
  if (RE.moto.test(q)) return 'moto-scooter-caravane';
  if (RE.casse.test(q)) return 'casse';
  if (RE.rachat.test(q)) return 'rachat';
  if (RE.situation.test(q)) return 'situation';
  return 'other';
}

export function serviceOfQuery(query: string): 'epaviste' | 'rachat-voiture' {
  return RE.rachat.test(norm(query)) ? 'rachat-voiture' : 'epaviste';
}

// ────────────────────────────────────────────────────────────────────────────
// LOCATION DETECTION (query → commune / département / région)
// ────────────────────────────────────────────────────────────────────────────

/** Words that are never a place on their own, even if a commune bears the name. */
const NOT_A_PLACE = new Set([
  'epaviste', 'epavistes', 'epave', 'epaves', 'voiture', 'voitures', 'vehicule', 'rachat', 'gratuit', 'gratuite',
  'casse', 'auto', 'moto', 'pro', 'vhu', 'centre', 'enlevement', 'autour', 'moi', 'reprise', 'cash', 'vente',
  'oui', 'prix', 'agree', 'garage', 'service', 'les', 'la', 'le', 'de', 'des', 'du', 'en', 'sur', 'pres', 'avis',
  'scooter', 'camion', 'utilitaire', 'caravane', 'france', 'occasion', 'panne', 'achat', 'destruction', 'recuperation',
]);

interface CityKey { deptSlug: string; slug: string; name: string; population: number }

const CITY_INDEX: Map<string, CityKey[]> = (() => {
  const idx = new Map<string, CityKey[]>();
  const add = (key: string, v: CityKey) => {
    if (key.length < 3 || NOT_A_PLACE.has(key)) return;
    const arr = idx.get(key) ?? [];
    if (!arr.some((x) => x.deptSlug === v.deptSlug && x.slug === v.slug)) arr.push(v);
    idx.set(key, arr);
  };
  allDepartments.forEach((d) => d.cities.forEach((c) => {
    const v = { deptSlug: d.slug, slug: c.slug, name: c.name, population: c.population ?? 0 };
    const n = norm(c.name);
    add(n, v);
    // "trinite" for "La Trinité", "chesnay" for "Le Chesnay"
    const noArticle = n.replace(/^(la|le|les|l) /, '');
    if (noArticle !== n && noArticle.length >= 5) add(noArticle, v);
    // Paris arrondissements: "paris 16", "paris 16e", "75016"
    const arr = c.slug.match(/^paris-(\d+)(er|e)$/);
    if (arr) {
      add(`paris ${arr[1]}`, v);
      add(`paris ${arr[1]}${arr[2]}`, v);
      add(`750${arr[1].padStart(2, '0')}`, v);
    }
  }));
  return idx;
})();

const DEPT_NAME_INDEX: Map<string, string> = (() => {
  const idx = new Map<string, string>();
  allDepartments.forEach((d) => {
    idx.set(norm(d.name), d.slug);
    idx.set(d.code.toLowerCase(), d.slug);
  });
  return idx;
})();

const REGION_NAME_INDEX: Map<string, string> = (() => {
  const idx = new Map<string, string>();
  regions.forEach((r) => idx.set(norm(r.name), r.slug));
  idx.set('idf', 'ile-de-france');
  idx.set('region parisienne', 'ile-de-france');
  return idx;
})();

export interface QueryPlace {
  cities: CityKey[];
  deptSlug: string | null;
  regionSlug: string | null;
}

/** Longest-match scan of the query n-grams against communes, départements, régions. */
export function detectPlace(query: string): QueryPlace {
  const tokens = norm(query).split(' ').filter(Boolean);
  const out: QueryPlace = { cities: [], deptSlug: null, regionSlug: null };
  const used = new Array(tokens.length).fill(false);
  for (let n = Math.min(6, tokens.length); n >= 1; n--) {
    for (let i = 0; i + n <= tokens.length; i++) {
      if (used.slice(i, i + n).some(Boolean)) continue;
      const gram = tokens.slice(i, i + n).join(' ');
      const region = REGION_NAME_INDEX.get(gram);
      const dept = DEPT_NAME_INDEX.get(gram);
      const isCode = /^(\d{2,3}|2a|2b)$/.test(gram);
      if (region && !out.regionSlug) { out.regionSlug = region; used.fill(true, i, i + n); continue; }
      // Département names win over the homonym commune (Paris, Essonne…).
      if (dept && !out.deptSlug && (!isCode || n === 1)) { out.deptSlug = dept; used.fill(true, i, i + n); continue; }
      const cities = CITY_INDEX.get(gram);
      if (cities && !out.cities.length && !isCode) { out.cities = cities; used.fill(true, i, i + n); }
    }
  }
  // A département in the query disambiguates homonym communes.
  if (out.cities.length > 1 && out.deptSlug) {
    const inDept = out.cities.filter((c) => c.deptSlug === out.deptSlug);
    if (inDept.length) out.cities = inDept;
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// NATURAL PAGE + LANDING INFERENCE
// ────────────────────────────────────────────────────────────────────────────

/** Situation keyword → IDF intent page slug, per service. */
const INTENT_RULES: Array<{ re: RegExp; epaviste?: string; rachat?: string }> = [
  { re: /\bsans carte grise|carte grise perdue\b/, epaviste: 'sans-carte-grise' },
  { re: /\b(parking|sous sol|souterrain)\b/, epaviste: 'parking-souterrain' },
  { re: /\bbrulee?s?\b/, epaviste: 'voiture-brulee' },
  { re: /\bgagee?s?\b|\bgage\b/, epaviste: 'vehicule-gage', rachat: 'vehicule-gage' },
  { re: /\b(succession|deces|defunt|heritage)\b/, epaviste: 'succession-deces', rachat: 'succession' },
  { re: /\babandonnee?s?\b|\bvoie publique\b/, epaviste: 'voiture-abandonnee-voie-publique' },
  { re: /\bfourriere\b/, epaviste: 'fourriere' },
  { re: /\b(utilitaire|camionnette|fourgon)\b/, epaviste: 'utilitaire-camionnette', rachat: 'utilitaire' },
  { re: /\b(moto|motos|scooter|scooters|cyclomoteur)\b/, epaviste: 'moto-scooter' },
  { re: /\bcamping ?cars?\b/, epaviste: 'camping-car' },
  { re: /\bcaravanes?\b/, epaviste: 'caravane' },
  { re: /\baccident(e|ee|es)?\b/, epaviste: 'vehicule-accidente', rachat: 'voiture-accidentee' },
  { re: /\b(zfe|crit ?air)\b/, epaviste: 'zfe-vieux-vehicule' },
  { re: /\b(sans ct|sans controle technique|controle technique)\b/, rachat: 'sans-controle-technique' },
  { re: /\bmoteur\b/, rachat: 'moteur-hs' },
  { re: /\bboite\b/, rachat: 'boite-de-vitesses-hs' },
  { re: /\ben panne\b/, rachat: 'voiture-en-panne' },
  { re: /\bkilometrage|\bkm\b/, rachat: 'fort-kilometrage' },
  { re: /\bnon roulante?\b/, rachat: 'voiture-non-roulante' },
];

/** Départements that get a /centre-vhu-agree/<dept> page (S3.4). */
export const CENTRE_VHU_DEPT_SLUGS = new Set([...IDF_DEPT_SLUGS, 'guadeloupe-971', 'martinique-972', 'guyane-973', 'la-reunion-974']);

export function naturalPage(query: string): string | null {
  const q = norm(query);
  const cluster = clusterOf(query);
  const service = serviceOfQuery(query);
  const place = detectPlace(query);
  const cityDept = place.cities[0]?.deptSlug ?? null;
  const dept = place.deptSlug ?? cityDept;

  if (cluster === 'brand') return '/';
  if (cluster === 'centre-vhu') {
    if (dept && CENTRE_VHU_DEPT_SLUGS.has(dept)) return `/centre-vhu-agree/${dept}`;
    if (dept) return `/epaviste/${dept}`;
    return '/';
  }
  if (place.cities.length) {
    const best = [...place.cities].sort((a, b) => b.population - a.population)[0];
    return `/${service}/${best.deptSlug}/${best.slug}`;
  }
  const isIdfRegion = place.regionSlug === 'ile-de-france' || (dept !== null && IDF_DEPTS.has(dept));
  const rule = INTENT_RULES.find((r) => r.re.test(q) && (service === 'epaviste' ? r.epaviste : r.rachat));
  if (rule && (isIdfRegion || (!place.deptSlug && !place.regionSlug))) {
    return `/${service}/ile-de-france/${service === 'epaviste' ? rule.epaviste : rule.rachat}`;
  }
  if (place.deptSlug) return `/${service}/${place.deptSlug}`;
  if (place.regionSlug) return `/${service}/${place.regionSlug}`;
  return service === 'rachat-voiture' && cluster !== 'near-me' ? '/rachat-voiture' : '/';
}

/** Parent chain of a page: city → dept → region → pillar → home. */
export function fallbackChain(path: string): string[] {
  const seg = path.split('/').filter(Boolean);
  const chain: string[] = [path];
  if (seg[0] === 'centre-vhu-agree' && seg[1]) chain.push(`/epaviste/${seg[1]}`);
  if ((seg[0] === 'epaviste' || seg[0] === 'rachat-voiture') && seg.length >= 2) {
    const service = seg[0];
    if (seg.length === 3) chain.push(`/${service}/${seg[1]}`);
    const dept = DEPT_BY_SLUG.get(seg[1]);
    if (dept) chain.push(`/${service}/${dept.regionSlug}`);
    chain.push(`/${service}`);
  }
  chain.push('/');
  return Array.from(new Set(chain));
}

/**
 * CSV mode: the landing page of a query is not exported, so infer it. The
 * natural page wins when it has impressions; otherwise the first parent that
 * does (a city query answered by the département page is a T3 gap).
 */
export function inferLanding(query: string, pagesWithImpr: Set<string>): { natural: string | null; landing: string | null; mapping: QueryMapping } {
  const natural = naturalPage(query);
  if (!natural) return { natural, landing: null, mapping: 'none' };
  // Homonym communes: prefer one that actually has impressions.
  const place = detectPlace(query);
  if (place.cities.length > 1) {
    const service = serviceOfQuery(query);
    const present = place.cities.map((c) => `/${service}/${c.deptSlug}/${c.slug}`).find((p) => pagesWithImpr.has(p));
    if (present) return { natural: present, landing: present, mapping: 'natural' };
  }
  if (pagesWithImpr.has(natural)) return { natural, landing: natural, mapping: 'natural' };
  const landing = fallbackChain(natural).slice(1).find((p) => pagesWithImpr.has(p)) ?? null;
  return { natural, landing, mapping: landing ? 'fallback' : 'none' };
}

// ────────────────────────────────────────────────────────────────────────────
// EXPECTED CTR CURVE (S3.1.b)
// ────────────────────────────────────────────────────────────────────────────

/** p1 28 %, p2 15 %, p3 11 %, p4 8 %, p5 7 %, p6–10 4→2.5 %, p11–20 1.5→0.6 %. */
const CURVE: Array<[number, number]> = [
  [1, 0.28], [2, 0.15], [3, 0.11], [4, 0.08], [5, 0.07], [6, 0.04], [10, 0.025], [11, 0.015], [20, 0.006], [30, 0.002], [50, 0.0005],
];

export function expectedCtr(position: number): number {
  if (!Number.isFinite(position) || position <= CURVE[0][0]) return CURVE[0][1];
  for (let i = 0; i < CURVE.length - 1; i++) {
    const [p0, c0] = CURVE[i];
    const [p1, c1] = CURVE[i + 1];
    if (position <= p1) return c0 + ((position - p0) / (p1 - p0)) * (c1 - c0);
  }
  return CURVE[CURVE.length - 1][1];
}

export function pct(x: number, digits = 1): string {
  return `${(x * 100).toFixed(digits).replace('.', ',')} %`;
}

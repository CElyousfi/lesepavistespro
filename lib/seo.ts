import { Metadata } from 'next';
import { getSiteUrl } from './site';
import { isIdfDeptCode, IDF_REGION_SLUG, idfLocative } from './idf';
import ctrTest from '../seo-audit/ctr-test.json';
import { getGscPageOverride } from '../data/gsc-actions';

export const TITLE_SUFFIX = ' | Les Épavistes Pro'; // layout.tsx template
export const TITLE_SUFFIX_LEN = TITLE_SUFFIX.length;
/** Full SERP title budget, suffix included. */
export const MAX_TITLE_TOTAL = 60;
/** Meta description target (S3.2): long enough to fill two mobile lines, short enough not to be cut. */
export const DESC_MIN = 130;
export const DESC_MAX = 155;

export const PHONE_DISPLAY = '06 02 42 73 45';

/**
 * Build a title that fits the 60-character SERP budget.
 *
 * The city/department name is the primary keyword and is NEVER truncated.
 * When the title does not fit, degrade in this order:
 *   1. drop the postal/department code (only when it is not needed to
 *      disambiguate a homonym city),
 *   2. drop the marketing tag ('– Gratuit'),
 *   3. drop the ' | Les Épavistes Pro' suffix by returning an absolute title.
 *
 * Returns a Next.js `title` value: a plain string uses the layout template,
 * `{ absolute }` opts out of it.
 */
export function safeTitleFit(
  prefix: string,
  name: string,
  codeDisplay: string,
  tag: string,
  options: { keepCode?: boolean } = {}
): string | { absolute: string } {
  const keepCode = options.keepCode === true;
  const withSuffix = MAX_TITLE_TOTAL - TITLE_SUFFIX_LEN;

  const candidates: Array<{ text: string; absolute: boolean }> = [];
  const push = (text: string, absolute: boolean) => candidates.push({ text, absolute });

  // With the brand suffix
  push(`${prefix}${name}${codeDisplay}${tag}`, false);
  if (!keepCode) push(`${prefix}${name}${tag}`, false);
  push(`${prefix}${name}${codeDisplay}`, false);
  if (!keepCode) push(`${prefix}${name}`, false);
  // Without the brand suffix — the brand is the least valuable part of the title
  push(`${prefix}${name}${codeDisplay}${tag}`, true);
  push(`${prefix}${name}${codeDisplay}`, true);
  push(`${prefix}${name}`, true);

  for (const candidate of candidates) {
    const limit = candidate.absolute ? MAX_TITLE_TOTAL : withSuffix;
    if (candidate.text.length <= limit) {
      return candidate.absolute ? { absolute: candidate.text } : candidate.text;
    }
  }

  // Every candidate is too long (a commune name over 60 chars does not exist in
  // France). Keep the name intact rather than truncating the keyword.
  return { absolute: `${prefix}${name}` };
}

/**
 * S3.2 title fitting. `candidates` go from the most complete pattern to the
 * shortest; each one is tried with the brand suffix, then without it
 * (`absolute`), before falling back to the next — the keyword pattern is worth
 * more than the brand. Nothing is ever truncated: the last candidate (prefix +
 * place name) is returned as is.
 */
export function fitTitle(candidates: string[]): string | { absolute: string } {
  for (const text of candidates) {
    if (text.length + TITLE_SUFFIX_LEN <= MAX_TITLE_TOTAL) return text;
    if (text.length <= MAX_TITLE_TOTAL) return { absolute: text };
  }
  return { absolute: candidates[candidates.length - 1] };
}

/** Length of a title as it will appear in the SERP, suffix included. */
export function renderedTitleLength(title: string | { absolute: string }): number {
  return typeof title === 'string' ? title.length + TITLE_SUFFIX_LEN : title.absolute.length;
}

/** The title as it will appear in the SERP. */
export function renderedTitle(title: string | { absolute: string }): string {
  return typeof title === 'string' ? `${title}${TITLE_SUFFIX}` : title.absolute;
}

/**
 * Pick the description: the first candidate within 130–155 characters, else
 * the longest one ≤ 155, else the shortest. Candidates are listed in order of
 * preference (the S3.2 pattern first).
 */
export function pickDescription(candidates: string[]): string {
  const clean = candidates.map((c) => c.replace(/\s+/g, ' ').trim());
  const inRange = clean.find((c) => c.length >= DESC_MIN && c.length <= DESC_MAX);
  if (inRange) return inRange;
  const fitting = clean.filter((c) => c.length <= DESC_MAX).sort((a, b) => b.length - a.length);
  if (fitting.length) return fitting[0];
  return [...clean].sort((a, b) => a.length - b.length)[0];
}

// ────────────────────────────────────────────────────────────────────────────
// CTR test (S3.2): half of the T2 pages end their description without ☎.
// seo-audit/ctr-test.json is the single source — npm run seo:loop reads it.
// ────────────────────────────────────────────────────────────────────────────

const NO_EMOJI_PATHS = new Set<string>(ctrTest.cohorts['without-emoji']);

/** "☎ 06 02 42 73 45" — or "Tél. 06 02 42 73 45" for the without-emoji cohort. */
export function phoneTail(path: string): string {
  return NO_EMOJI_PATHS.has(path) ? `Tél. ${PHONE_DISPLAY}` : `☎ ${PHONE_DISPLAY}`;
}

// ────────────────────────────────────────────────────────────────────────────
// French helpers
// ────────────────────────────────────────────────────────────────────────────

/** "à Esbly", "au Chesnay-Rocquencourt", "aux Mureaux", "à La Courneuve". */
export function aLieu(name: string): string {
  if (/^Le /.test(name)) return `au ${name.slice(3)}`;
  if (/^Les /.test(name)) return `aux ${name.slice(4)}`;
  return `à ${name}`;
}

/** "en Bretagne", "dans les Hauts-de-France", "à La Réunion"… */
const REGION_LOCATIVE: Record<string, string> = {
  'hauts-de-france': 'dans les Hauts-de-France',
  'pays-de-la-loire': 'dans les Pays de la Loire',
  'la-reunion': 'à La Réunion',
  mayotte: 'à Mayotte',
};
function regionLocative(regionName: string, regionSlug: string): string {
  return REGION_LOCATIVE[regionSlug] ?? `en ${regionName}`;
}

/** Department code from its slug: "paris-75" → "75", "corse-du-sud-2a" → "2A". */
export function deptCodeFromSlug(deptSlug: string): string {
  return (deptSlug.match(/(\d+|2[ab])$/i)?.[0] ?? '').toUpperCase();
}

const PETITE_COURONNE = new Set(['75', '92', '93', '94']);

/** Intervention delay the site states for a department, or null outside IDF. */
export function interventionDelay(deptCode: string): string | null {
  if (PETITE_COURONNE.has(deptCode)) return 'sous 2 h';
  if (isIdfDeptCode(deptCode)) return 'sous 24 h';
  return null;
}

/** Deterministic rotation so the proof clause varies by department and tier. */
function rotate<T>(items: T[], key: string): T[] {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const i = h % items.length;
  return [...items.slice(i), ...items.slice(0, i)];
}

const EPAVISTE_PROOFS = [
  'certificat de destruction remis',
  'sous-sol et fourrière compris',
  'déclaration de cession faite pour vous',
  'véhicule roulant ou non',
];
const RACHAT_PROOFS = [
  'estimation gratuite',
  'offre ferme sur photos',
  'cession déclarée pour vous',
  'enlèvement inclus',
];
/** Same proofs, shorter — used when the full clause would overflow 155. */
const EPAVISTE_SHORT: Record<string, string> = {
  'certificat de destruction remis': 'certificat remis',
  'sous-sol et fourrière compris': 'sous-sol compris',
  'déclaration de cession faite pour vous': 'cession faite pour vous',
  'véhicule roulant ou non': 'roulant ou non',
};
const RACHAT_SHORT: Record<string, string> = {
  'estimation gratuite': 'estimation offerte',
  'offre ferme sur photos': 'offre sur photos',
  'cession déclarée pour vous': 'cession déclarée',
  'enlèvement inclus': 'enlèvement inclus',
};

export function tierOf(citySlug: string, population?: number): 'A' | 'B' | 'C' {
  if (/^paris-\d+(er|e)$/.test(citySlug)) return 'A';
  const pop = population ?? 0;
  if (pop >= 20_000) return 'A';
  if (pop >= 5_000) return 'B';
  return 'C';
}

interface SEOParams {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate complete metadata for Next.js pages
 * Includes title, description, canonical, OG, Twitter cards
 *
 * A Search Console override (data/gsc-actions.ts, S3.1.c) replaces the title
 * and/or description of the page it targets.
 */
export function generateMeta({
  title,
  description,
  path = '/',
  image = '/images/og-default.jpg',
  noIndex = false,
}: SEOParams): Metadata {
  const override = getGscPageOverride(path);
  if (override?.title) title = override.title;
  if (override?.description) description = override.description;

  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  // OG / Twitter need a plain string; an { absolute } title carries no brand,
  // so append it there where there is no length pressure.
  const socialTitle =
    typeof title === 'string' ? `${title}${TITLE_SUFFIX}` : title.absolute;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: 'Les Épavistes Pro',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
        // index: false but follow: true — noindex pages must still pass link
        // equity back to the indexed pages they link to.
        index: false,
        follow: true,
      }
      : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// S3.2 title / description patterns
//
// What a person on a phone needs to see to click: the town first, the service,
// "gratuit" / "cash", availability, then proof and the phone number. Every
// generator below returns { title, description } through fitTitle() and
// pickDescription(); scripts/seo-qa-check.ts (checkMetadataSystem) runs them
// over every IDF page and the national dataset: title ≤ 60, description
// 110–160, no duplicates, place name first.
// ────────────────────────────────────────────────────────────────────────────

export interface MetaText {
  title: string | { absolute: string };
  description: string;
}

export function epavisteCityText(p: {
  name: string;
  deptSlug: string;
  citySlug: string;
  postalCode?: string;
  population?: number;
  isHomonym?: boolean;
}): MetaText {
  const code = deptCodeFromSlug(p.deptSlug);
  const path = `/epaviste/${p.deptSlug}/${p.citySlug}`;
  // Homonym communes (~1,470 slugs exist in several departments) carry the
  // department code so their titles stay unique in the SERP.
  const place = p.isHomonym && code ? `${p.name} (${code})` : p.name;
  const cp = p.postalCode ? ` (${p.postalCode})` : code ? ` (${code})` : '';
  const delay = interventionDelay(code);
  const tail = phoneTail(path);
  const [proof1, proof2] = rotate(EPAVISTE_PROOFS, `${code}-${tierOf(p.citySlug, p.population)}`);
  const [short1, short2] = [EPAVISTE_SHORT[proof1], EPAVISTE_SHORT[proof2]];
  const lead = `Épaviste agréé VHU ${aLieu(p.name)}${cp}.`;
  const core = delay ? `Enlèvement d'épave gratuit, intervention ${delay}` : "Enlèvement d'épave gratuit 24h/24";
  const coreShort = delay ? `Enlèvement gratuit ${delay}` : 'Enlèvement gratuit 24h/24';

  return {
    title: fitTitle([
      `Épaviste ${place} – Enlèvement d'épave gratuit 24h/24`,
      `Épaviste ${place} – Enlèvement d'épave gratuit`,
      `Épaviste ${place} – Enlèvement gratuit`,
      `Épaviste ${place} – Gratuit`,
      `Épaviste ${place}`,
    ]),
    description: pickDescription([
      `${lead} ${core}, ${proof1}. ${tail}`,
      `${lead} ${core}, ${proof1}, ${short2}. ${tail}`,
      `${lead} ${core}, ${proof1}, ${proof2}. ${tail}`,
      `${lead} ${core}, ${short1}. ${tail}`,
      `${lead} ${core}, ${short1}, ${short2}. ${tail}`,
      `${lead} ${coreShort}, ${proof1}. ${tail}`,
      `${lead} ${coreShort}, ${short1}. ${tail}`,
      `${lead} ${core}. ${tail}`,
      `Épaviste ${aLieu(p.name)}${cp} : enlèvement gratuit. ${tail}`,
    ]),
  };
}

export function rachatCityText(p: {
  name: string;
  deptSlug: string;
  citySlug: string;
  postalCode?: string;
  population?: number;
  isHomonym?: boolean;
}): MetaText {
  const code = deptCodeFromSlug(p.deptSlug);
  const path = `/rachat-voiture/${p.deptSlug}/${p.citySlug}`;
  const place = p.isHomonym && code ? `${p.name} (${code})` : p.name;
  const cp = p.postalCode ? ` (${p.postalCode})` : code ? ` (${code})` : '';
  const isIdf = isIdfDeptCode(code);
  const tail = phoneTail(path);
  const [proof1, proof2] = rotate(RACHAT_PROOFS, `${code}-${tierOf(p.citySlug, p.population)}`);
  const [short1, short2] = [RACHAT_SHORT[proof1], RACHAT_SHORT[proof2]];
  const lead = `Rachat voiture ${aLieu(p.name)}${cp} :`;
  const core = "paiement cash le jour de l'enlèvement, avec ou sans CT";
  const coreShort = 'paiement cash, avec ou sans CT';

  return {
    // "en 24h" only where the site states a 24 h delay (Île-de-France).
    title: fitTitle([
      ...(isIdf ? [`Rachat voiture ${place} – Cash, sans CT, en 24h`] : []),
      `Rachat voiture ${place} – Cash, sans CT`,
      `Rachat voiture ${place} – Cash`,
      `Rachat voiture ${place}`,
      `Rachat ${place}`,
    ]),
    description: pickDescription([
      `${lead} ${core}, ${proof1}. ${tail}`,
      `${lead} ${core}, ${proof1}, ${short2}. ${tail}`,
      `${lead} ${core}, ${proof1}, ${proof2}. ${tail}`,
      `${lead} ${core}, ${short1}. ${tail}`,
      `${lead} ${coreShort}, ${proof1}, ${proof2}. ${tail}`,
      `${lead} ${coreShort}, ${proof1}. ${tail}`,
      `${lead} ${core}. ${tail}`,
      `Rachat voiture ${aLieu(p.name)}${cp} : paiement cash. ${tail}`,
    ]),
  };
}

export function epavisteDepartmentText(deptName: string, deptSlug: string, communeCount?: number): MetaText {
  const code = deptCodeFromSlug(deptSlug);
  const path = `/epaviste/${deptSlug}`;
  const tail = phoneTail(path);
  const isIdf = isIdfDeptCode(code);
  const delay = interventionDelay(code);
  const [proof] = rotate(EPAVISTE_PROOFS, `${code}-dept`);
  const zone = code === '75' ? 'les 20 arrondissements' : communeCount ? `les ${communeCount.toLocaleString('fr-FR')} communes` : 'tout le département';

  // Paris: people search "épaviste paris", not "paris 75".
  const titles =
    code === '75'
      ? [`Épaviste Paris – Enlèvement d'épave gratuit 24h/24`, `Épaviste Paris – Gratuit, agréé VHU`]
      : [
        `Épaviste ${deptName} (${code}) – Gratuit, agréé VHU`,
        `Épaviste ${deptName} (${code}) – Gratuit`,
        `Épaviste ${deptName} (${code})`,
        `Épaviste ${deptName}`,
      ];

  const description = isIdf
    ? pickDescription([
      `Épaviste agréé VHU ${idfLocative(code, deptName)} (${code}) : enlèvement d'épave gratuit dans ${zone}, intervention ${delay}, ${proof}. ${tail}`,
      `Épaviste agréé VHU ${idfLocative(code, deptName)} (${code}) : enlèvement d'épave gratuit, intervention ${delay}, ${proof}. ${tail}`,
      `Épaviste agréé VHU ${idfLocative(code, deptName)} (${code}) : enlèvement d'épave gratuit, intervention ${delay}. ${tail}`,
    ])
    : pickDescription([
      `${deptName} (${code}) : épaviste agréé VHU, enlèvement d'épave gratuit 24h/24 dans ${zone}, ${proof}. ${tail}`,
      `${deptName} (${code}) : épaviste agréé VHU, enlèvement d'épave gratuit 24h/24, ${proof}, devis immédiat. ${tail}`,
      `${deptName} (${code}) : épaviste agréé VHU, enlèvement d'épave gratuit 24h/24, ${proof}. ${tail}`,
      `${deptName} (${code}) : épaviste agréé VHU, enlèvement gratuit. ${tail}`,
    ]);
  return { title: fitTitle(titles), description };
}

export function rachatDepartmentText(deptName: string, deptSlug: string): MetaText {
  const code = deptCodeFromSlug(deptSlug);
  const path = `/rachat-voiture/${deptSlug}`;
  const tail = phoneTail(path);
  const isIdf = isIdfDeptCode(code);
  const [proof1, proof2] = rotate(RACHAT_PROOFS, `${code}-dept`);
  const titles =
    code === '75'
      ? [`Rachat voiture Paris – Cash, sans CT, en 24h`, `Rachat voiture Paris – Cash`]
      : [`Rachat voiture ${deptName} (${code}) – Cash`, `Rachat voiture ${deptName} (${code})`, `Rachat voiture ${deptName}`];
  const description = isIdf
    ? pickDescription([
      `Rachat voiture ${idfLocative(code, deptName)} (${code}) : paiement cash le jour de l'enlèvement, avec ou sans CT, ${proof1}. ${tail}`,
      `Rachat voiture ${idfLocative(code, deptName)} (${code}) : paiement cash le jour de l'enlèvement, avec ou sans CT, ${proof1}, ${proof2}. ${tail}`,
      `Rachat voiture ${idfLocative(code, deptName)} (${code}) : paiement cash, avec ou sans CT. ${tail}`,
    ])
    : pickDescription([
      `${deptName} (${code}) : rachat voiture cash, avec ou sans CT, tous véhicules (panne, accident, HS), ${proof1}. ${tail}`,
      `${deptName} (${code}) : rachat voiture cash, avec ou sans CT, tous véhicules (panne, accident, HS), ${proof1}, ${RACHAT_SHORT[proof2]}. ${tail}`,
      `${deptName} (${code}) : rachat voiture cash, avec ou sans CT, tous véhicules, ${proof1}, ${proof2}. ${tail}`,
      `${deptName} (${code}) : rachat voiture cash, avec ou sans CT, ${proof1}. ${tail}`,
    ]);
  return { title: fitTitle(titles), description };
}

export function epavisteRegionText(regionName: string, regionSlug: string, deptCount?: number): MetaText {
  const tail = phoneTail(`/epaviste/${regionSlug}`);
  if (regionSlug === IDF_REGION_SLUG) {
    return {
      title: fitTitle([`Épaviste Île-de-France – Enlèvement gratuit 24h/24`, `Épaviste Île-de-France – Gratuit`]),
      description: pickDescription([
        `Épaviste agréé VHU en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) : enlèvement d'épave gratuit 24h/24, sous 2 h en petite couronne. ${tail}`,
        `Épaviste agréé VHU en Île-de-France : enlèvement d'épave gratuit 24h/24, sous 2 h en petite couronne. ${tail}`,
      ]),
    };
  }
  const where = regionLocative(regionName, regionSlug);
  const depts = deptCount ? ` dans les ${deptCount} départements` : '';
  return {
    title: fitTitle([`Épaviste ${regionName} – Enlèvement gratuit 24h/24`, `Épaviste ${regionName} – Gratuit 24h/24`, `Épaviste ${regionName}`]),
    description: pickDescription([
      `Épaviste agréé VHU ${where} : enlèvement d'épave gratuit 24h/24${depts}, certificat de destruction remis. ${tail}`,
      `Épaviste agréé VHU ${where} : enlèvement d'épave gratuit 24h/24${depts}, certificat de destruction remis, véhicule roulant ou non. ${tail}`,
      `Épaviste agréé VHU ${where} : enlèvement d'épave gratuit 24h/24, certificat de destruction remis. ${tail}`,
      `Épaviste agréé VHU ${where} : enlèvement d'épave gratuit 24h/24${depts}. ${tail}`,
      `Épaviste agréé VHU ${where} : enlèvement d'épave gratuit 24h/24. ${tail}`,
    ]),
  };
}

export function rachatRegionText(regionName: string, regionSlug: string): MetaText {
  const tail = phoneTail(`/rachat-voiture/${regionSlug}`);
  if (regionSlug === IDF_REGION_SLUG) {
    return {
      title: fitTitle([`Rachat voiture Île-de-France – Cash immédiat`, `Rachat voiture Île-de-France`]),
      description: pickDescription([
        `Rachat voiture en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) : paiement cash le jour de l'enlèvement, avec ou sans CT. ${tail}`,
        `Rachat voiture en Île-de-France : paiement cash le jour de l'enlèvement, avec ou sans CT, tous véhicules. ${tail}`,
      ]),
    };
  }
  const where = regionLocative(regionName, regionSlug);
  return {
    title: fitTitle([`Rachat voiture ${regionName} – Cash immédiat`, `Rachat voiture ${regionName} – Cash`, `Rachat voiture ${regionName}`]),
    description: pickDescription([
      `Rachat voiture ${where} : paiement cash, avec ou sans CT, tous véhicules (panne, accident, HS), estimation gratuite. ${tail}`,
      `Rachat voiture ${where} : paiement cash, avec ou sans CT, tous véhicules, estimation gratuite. ${tail}`,
      `Rachat voiture ${where} : paiement cash, avec ou sans CT. ${tail}`,
    ]),
  };
}

/**
 * Generate SEO metadata for homepage
 */
export function generateHomeMeta(): Metadata {
  return generateMeta({
    // The layout's ' | Les Épavistes Pro' template does not apply to the root
    // segment, so the homepage owns the full 60-character budget. It starts
    // with the brand (S3.2): brand searches land here and the brand SERP needs
    // the exact name, then the primary keyword.
    title: { absolute: 'Les Épavistes Pro – Épaviste gratuit en Île-de-France 24h/24' },
    description:
      "Les Épavistes Pro, épaviste agréé VHU à Paris et en Île-de-France : enlèvement d'épave gratuit 24h/24, rachat voiture cash. ☎ 06 02 42 73 45",
    path: '/',
  });
}

/**
 * Generate SEO metadata for épaviste pillar page
 */
export function generateEpavistePillarMeta(): Metadata {
  return generateMeta({
    title: { absolute: "Épaviste agréé VHU – Enlèvement d'épave gratuit 24h/24" },
    description:
      "Épaviste agréé VHU : enlèvement d'épave gratuit à Paris, en Île-de-France et partout en France, 24h/24, certificat de destruction remis. ☎ 06 02 42 73 45",
    path: '/epaviste',
  });
}

/**
 * Generate SEO metadata for rachat voiture pillar page
 */
export function generateRachatPillarMeta(): Metadata {
  return generateMeta({
    title: 'Rachat voiture cash, sans CT, tous états',
    description:
      "Rachat voiture cash en Île-de-France et partout en France : avec ou sans CT, en panne, accidentée ou HS, enlèvement inclus. ☎ 06 02 42 73 45",
    path: '/rachat-voiture',
  });
}

/**
 * Generate SEO metadata for épaviste department page
 */
export function generateEpavisteDepartmentMeta(deptName: string, deptSlug: string, communeCount?: number): Metadata {
  return generateMeta({ ...epavisteDepartmentText(deptName, deptSlug, communeCount), path: `/epaviste/${deptSlug}` });
}

/**
 * Generate SEO metadata for rachat department page
 */
export function generateRachatDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  return generateMeta({ ...rachatDepartmentText(deptName, deptSlug), path: `/rachat-voiture/${deptSlug}` });
}

/**
 * Generate SEO metadata for épaviste city page
 */
export function generateEpavisteCityMeta(
  cityName: string,
  deptSlug: string,
  citySlug: string,
  postalCode?: string,
  noIndex?: boolean,
  isHomonym?: boolean,
  population?: number
): Metadata {
  return generateMeta({
    ...epavisteCityText({ name: cityName, deptSlug, citySlug, postalCode, population, isHomonym }),
    path: `/epaviste/${deptSlug}/${citySlug}`,
    noIndex,
  });
}

/**
 * Generate SEO metadata for rachat city page
 */
export function generateRachatCityMeta(
  cityName: string,
  deptSlug: string,
  citySlug: string,
  postalCode?: string,
  noIndex?: boolean,
  isHomonym?: boolean,
  population?: number
): Metadata {
  return generateMeta({
    ...rachatCityText({ name: cityName, deptSlug, citySlug, postalCode, population, isHomonym }),
    path: `/rachat-voiture/${deptSlug}/${citySlug}`,
    noIndex,
  });
}

/**
 * Generate SEO metadata for zones page
 */
export function generateZonesMeta(): Metadata {
  return generateMeta({
    title: 'Zones d\'intervention – Épaviste & Rachat',
    description:
      "Zones d'intervention : Paris et les 8 départements d'Île-de-France en priorité, puis 101 départements. Épaviste et rachat voiture. ☎ 06 02 42 73 45",
    path: '/zones',
  });
}

/**
 * Generate SEO metadata for blog post
 */
export function generateBlogPostMeta(title: string, description: string, slug: string): Metadata {
  return generateMeta({
    title,
    description,
    path: `/blog/${slug}`,
  });
}

/**
 * Generate SEO metadata for region landing page
 */
export function generateEpavisteRegionMeta(regionName: string, regionSlug: string, deptCount?: number): Metadata {
  return generateMeta({ ...epavisteRegionText(regionName, regionSlug, deptCount), path: `/epaviste/${regionSlug}` });
}

/**
 * Generate SEO metadata for rachat voiture region landing page
 */
export function generateRachatRegionMeta(regionName: string, regionSlug: string): Metadata {
  return generateMeta({ ...rachatRegionText(regionName, regionSlug), path: `/rachat-voiture/${regionSlug}` });
}

/**
 * Île-de-France situation page (S2.1) — /{service}/ile-de-france/{intent}.
 * The SERP title is the intent's own metaTitle (≤ 60 chars, brand appended).
 */
export function generateIdfIntentMeta(
  service: 'epaviste' | 'rachat-voiture',
  slug: string,
  metaTitle: string,
  description: string
): Metadata {
  return generateMeta({
    title: metaTitle,
    description,
    path: `/${service}/ile-de-france/${slug}`,
  });
}

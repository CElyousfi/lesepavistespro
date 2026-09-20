import { Metadata } from 'next';
import { getSiteUrl } from './site';
import { isIdfDeptCode, IDF_REGION_SLUG } from './idf';

export const TITLE_SUFFIX = ' | Les Épavistes Pro'; // layout.tsx template
export const TITLE_SUFFIX_LEN = TITLE_SUFFIX.length;
/** Full SERP title budget, suffix included. */
export const MAX_TITLE_TOTAL = 60;

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

/** Length of a title as it will appear in the SERP, suffix included. */
export function renderedTitleLength(title: string | { absolute: string }): number {
  return typeof title === 'string' ? title.length + TITLE_SUFFIX_LEN : title.absolute.length;
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
 */
export function generateMeta({
  title,
  description,
  path = '/',
  image = '/images/og-default.jpg',
  noIndex = false,
}: SEOParams): Metadata {
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

/**
 * Generate SEO metadata for homepage
 */
export function generateHomeMeta(): Metadata {
  return generateMeta({
    // The layout's ' | Les Épavistes Pro' template does not apply to the root
    // segment, so the homepage owns the full 60-character budget — declare it
    // absolute to say so explicitly.
    // 55 characters — the region is the primary keyword, not the country.
    title: { absolute: 'Épaviste Île-de-France – Enlèvement d\'épave gratuit 24h/24' },
    description:
      'Épaviste agréé VHU à Paris et en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Enlèvement d\'épave gratuit sous 2h, rachat voiture cash. ☎ 06 02 42 73 45',
    path: '/',
  });
}

/**
 * Generate SEO metadata for épaviste pillar page
 */
export function generateEpavistePillarMeta(): Metadata {
  return generateMeta({
    title: 'Épaviste agréé VHU – Enlèvement gratuit',
    description:
      'Enlèvement d\'épave 100% gratuit en France. Agréé VHU, intervention 24h/24, certificat de destruction fourni. ☎ 06 02 42 73 45',
    path: '/epaviste',
  });
}

/**
 * Generate SEO metadata for rachat voiture pillar page
 */
export function generateRachatPillarMeta(): Metadata {
  return generateMeta({
    title: 'Rachat voiture – Paiement cash immédiat',
    description:
      'Rachat de voiture sans CT partout en France. Cash immédiat, tous véhicules : HS, accidentés, en panne. ☎ 06 02 42 73 45',
    path: '/rachat-voiture',
  });
}

/**
 * Generate SEO metadata for épaviste department page
 */
export function generateEpavisteDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const deptCodeDisplay = deptCode ? ` (${deptCode})` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: safeTitleFit('Épaviste ', deptName, deptCodeDisplay, ' – Gratuit 24h'),
    description: isIdf
      ? `Épaviste agréé VHU ${deptName}${deptCodeDisplay}. Enlèvement d'épave GRATUIT 24h/24, intervention sous 2h. ☎ 06 02 42 73 45`
      : `Épaviste agréé VHU ${deptName}${deptCodeDisplay}. Enlèvement d'épave GRATUIT 24h/24, certificat de destruction. ☎ 06 02 42 73 45`,
    path: `/epaviste/${deptSlug}`,
  });
}

/**
 * Generate SEO metadata for rachat department page
 */
export function generateRachatDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const deptCodeDisplay = deptCode ? ` (${deptCode})` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: safeTitleFit('Rachat voiture ', deptName, deptCodeDisplay, ' – Cash'),
    description: isIdf
      ? `Rachat voiture ${deptName}${deptCodeDisplay}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 06 02 42 73 45`
      : `Rachat voiture ${deptName}${deptCodeDisplay}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 06 02 42 73 45`,
    path: `/rachat-voiture/${deptSlug}`,
  });
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
  isHomonym?: boolean
): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);
  // Homonym cities (~1,470 slugs exist in several departments) must carry the
  // department code so their titles stay unique in the SERP.
  const titleCode = isHomonym && deptCode ? ` (${deptCode})` : postalDisplay;

  return generateMeta({
    // IDF pattern: 'Épaviste {Ville} ({CP}) – Gratuit 24h/24'; safeTitleFit
    // degrades (code → tag → brand) so the commune name is never truncated.
    title: safeTitleFit('Épaviste ', cityName, titleCode, isIdf ? ' – Gratuit 24h/24' : ' – Gratuit', { keepCode: isHomonym === true }),
    description: isIdf
      ? `Épaviste agréé VHU à ${cityName}${postalDisplay}. Enlèvement d'épave gratuit, intervention sous 2h, certificat de destruction. ☎ 06 02 42 73 45`
      : `Épaviste agréé à ${cityName}${postalDisplay}. Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 06 02 42 73 45`,
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
  isHomonym?: boolean
): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);
  const titleCode = isHomonym && deptCode ? ` (${deptCode})` : postalDisplay;

  return generateMeta({
    // IDF pattern: 'Rachat voiture {Ville} ({CP}) – Cash'.
    title: safeTitleFit(isIdf ? 'Rachat voiture ' : 'Rachat ', cityName, titleCode, ' – Cash', { keepCode: isHomonym === true }),
    description: isIdf
      ? `Rachat voiture à ${cityName}${postalDisplay}. Paiement cash le jour de l'enlèvement, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45`
      : `Rachat voiture à ${cityName}${postalDisplay}. Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 06 02 42 73 45`,
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
      'Nos zones d\'intervention : 18 régions, 101 départements. Épaviste et rachat voiture partout en France. ☎ 06 02 42 73 45',
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
export function generateEpavisteRegionMeta(regionName: string, regionSlug: string): Metadata {
  const isIdf = regionSlug === IDF_REGION_SLUG;

  return generateMeta({
    title: isIdf
      ? safeTitleFit('Épaviste ', 'Île-de-France', '', ' – Gratuit 24/7')
      : safeTitleFit('Épaviste ', regionName, '', ' – Gratuit 24h'),
    description: isIdf
      ? `Épaviste agréé VHU en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Enlèvement GRATUIT 24h/24, intervention sous 2h. ☎ 06 02 42 73 45`
      : `Épaviste agréé VHU en ${regionName}. Enlèvement d'épave GRATUIT 24h/24, certificat de destruction. ☎ 06 02 42 73 45`,
    path: `/epaviste/${regionSlug}`,
  });
}

/**
 * Generate SEO metadata for rachat voiture region landing page
 */
export function generateRachatRegionMeta(regionName: string, regionSlug: string): Metadata {
  const isIdf = regionSlug === IDF_REGION_SLUG;

  return generateMeta({
    title: isIdf
      ? safeTitleFit('Rachat voiture ', 'Île-de-France', '', ' – Cash immédiat')
      : safeTitleFit('Rachat voiture ', regionName, '', ' – Cash immédiat'),
    description: isIdf
      ? `Rachat voiture en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Cash immédiat, sans CT, tous véhicules. ☎ 06 02 42 73 45`
      : `Rachat voiture en ${regionName}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 06 02 42 73 45`,
    path: `/rachat-voiture/${regionSlug}`,
  });
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

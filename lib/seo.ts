import { Metadata } from 'next';
import { getSiteUrl } from './site';
import { isIdfDeptCode, IDF_REGION_SLUG } from './idf';

const TITLE_SUFFIX_LEN = 21; // ' | Les Épavistes Pro' from layout.tsx template
const MAX_TITLE_TOTAL = 65;

/**
 * Build a title that fits within the Google SERP pixel limit.
 * Strategy: include postal/code display if it fits, drop it if not,
 * truncate the name with '…' as a last resort.
 */
function safeTitleFit(prefix: string, name: string, codeDisplay: string, tag: string): string {
  const budget = MAX_TITLE_TOTAL - TITLE_SUFFIX_LEN;
  // Try with code display
  const full = `${prefix}${name}${codeDisplay}${tag}`;
  if (full.length <= budget) return full;
  // Drop code display
  const noCode = `${prefix}${name}${tag}`;
  if (noCode.length <= budget) return noCode;
  // Truncate name
  const fixedLen = prefix.length + tag.length;
  const maxName = budget - fixedLen - 1; // -1 for '…'
  return `${prefix}${name.substring(0, maxName)}…${tag}`;
}

interface SEOParams {
  title: string;
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

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Les Épavistes Pro',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
        index: false,
        follow: false,
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
    title: 'Épaviste agréé VHU – Enlèvement gratuit 24/7',
    description:
      'Enlèvement d\'épave 100% GRATUIT 24h/24 partout en France. Rachat voiture sans CT, paiement cash. Agréé VHU. ☎ 09 79 04 94 86',
    path: '/',
  });
}

/**
 * Generate SEO metadata for épaviste pillar page
 */
export function generateEpavistePillarMeta(): Metadata {
  return generateMeta({
    title: 'Épaviste agréé – Enlèvement d\'épave gratuit',
    description:
      'Enlèvement d\'épave 100% gratuit en France. Agréé VHU, intervention 24h/24, certificat de destruction fourni. ☎ 09 79 04 94 86',
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
      'Rachat de voiture sans CT partout en France. Cash immédiat, tous véhicules : HS, accidentés, en panne. ☎ 09 79 04 94 86',
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
      ? `Épaviste agréé VHU ${deptName}${deptCodeDisplay}. Enlèvement d'épave GRATUIT 24h/24, intervention sous 2h. ☎ 09 79 04 94 86`
      : `Épaviste agréé VHU ${deptName}${deptCodeDisplay}. Enlèvement d'épave GRATUIT 24h/24, certificat de destruction. ☎ 09 79 04 94 86`,
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
      ? `Rachat voiture ${deptName}${deptCodeDisplay}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 09 79 04 94 86`
      : `Rachat voiture ${deptName}${deptCodeDisplay}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 09 79 04 94 86`,
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
  noIndex?: boolean
): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: safeTitleFit('Épaviste ', cityName, postalDisplay, ' – Gratuit'),
    description: isIdf
      ? `Épaviste agréé à ${cityName}${postalDisplay}. Enlèvement d'épave GRATUIT, intervention sous 2h. ☎ 09 79 04 94 86`
      : `Épaviste agréé à ${cityName}${postalDisplay}. Enlèvement d'épave GRATUIT 24h/24, certificat fourni. ☎ 09 79 04 94 86`,
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
  noIndex?: boolean
): Metadata {
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: safeTitleFit('Rachat ', cityName, postalDisplay, ' – Cash'),
    description: isIdf
      ? `Rachat voiture à ${cityName}${postalDisplay}. Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 09 79 04 94 86`
      : `Rachat voiture à ${cityName}${postalDisplay}. Cash immédiat, sans CT, tous véhicules. Estimation gratuite. ☎ 09 79 04 94 86`,
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
      'Nos zones d\'intervention : 18 régions, 101 départements. Épaviste et rachat voiture partout en France. ☎ 09 79 04 94 86',
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
      ? `Épaviste agréé VHU en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Enlèvement GRATUIT 24h/24, intervention sous 2h. ☎ 09 79 04 94 86`
      : `Épaviste agréé VHU en ${regionName}. Enlèvement d'épave GRATUIT 24h/24, certificat de destruction. ☎ 09 79 04 94 86`,
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
      ? `Rachat voiture en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Cash immédiat, sans CT, tous véhicules. ☎ 09 79 04 94 86`
      : `Rachat voiture en ${regionName}. Cash immédiat, sans CT, tous véhicules acceptés. Estimation gratuite. ☎ 09 79 04 94 86`,
    path: `/rachat-voiture/${regionSlug}`,
  });
}

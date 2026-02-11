import { Metadata } from 'next';
import { getSiteUrl } from './site';

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
  image = '/icon.png',
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
    title: 'Épaviste France entière – Enlèvement gratuit 24/7 & Rachat voiture agréé VHU',
    description:
      'Épaviste agréé VHU partout en France. Enlèvement d\'épave 100% GRATUIT 24h/24, rachat voiture sans CT, paiement cash immédiat. Intervention rapide dans toutes les régions. 09 79 04 94 86',
    path: '/',
  });
}

/**
 * Generate SEO metadata for épaviste pillar page
 */
export function generateEpavistePillarMeta(): Metadata {
  return generateMeta({
    title: 'Épaviste France – Enlèvement d\'épave gratuit',
    description:
      'Service d\'enlèvement d\'épave 100% gratuit partout en France. Épaviste agréé VHU, intervention 24h/24, certificat de destruction fourni. 18 régions couvertes. 09 79 04 94 86',
    path: '/epaviste',
  });
}

/**
 * Generate SEO metadata for rachat voiture pillar page
 */
export function generateRachatPillarMeta(): Metadata {
  return generateMeta({
    title: 'Rachat voiture France – Paiement cash immédiat',
    description:
      'Rachat de voiture partout en France sans CT. Paiement cash immédiat, tous véhicules acceptés : HS, accidentés, en panne. Estimation gratuite 09 79 04 94 86',
    path: '/rachat-voiture',
  });
}

/**
 * Generate SEO metadata for épaviste department page
 */
export function generateEpavisteDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  // Extract department code from slug (e.g., "val-de-marne-94" -> "94")
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const deptCodeDisplay = deptCode ? ` (${deptCode})` : '';

  return generateMeta({
    title: `Épaviste ${deptName}${deptCodeDisplay} – Gratuit 24/7`,
    description: `Épaviste agréé VHU dans le ${deptName} ${deptCode}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide partout dans le département. 09 79 04 94 86`,
    path: `/epaviste/${deptSlug}`,
  });
}

/**
 * Generate SEO metadata for rachat department page
 */
export function generateRachatDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  // Extract department code from slug
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const deptCodeDisplay = deptCode ? ` (${deptCode})` : '';

  return generateMeta({
    title: `Rachat ${deptName}${deptCodeDisplay} – Cash immédiat`,
    description: `Rachat de voiture dans le ${deptName} ${deptCode}. SANS contrôle technique, paiement cash immédiat, tous véhicules acceptés (HS, accidentés, en panne). Estimation gratuite en 15 min. 09 79 04 94 86`,
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
  postalCode?: string
): Metadata {
  // Extract department code from slug for display
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';

  return generateMeta({
    title: `Épaviste ${cityName}${postalDisplay} – Gratuit 24/7`,
    description: `Épaviste agréé VHU à ${cityName}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide sous 2h. 09 79 04 94 86`,
    path: `/epaviste/${deptSlug}/${citySlug}`,
  });
}

/**
 * Generate SEO metadata for rachat city page
 */
export function generateRachatCityMeta(
  cityName: string,
  deptSlug: string,
  citySlug: string,
  postalCode?: string
): Metadata {
  // Extract department code from slug for display
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';

  return generateMeta({
    title: `Rachat ${cityName}${postalDisplay} – Cash immédiat`,
    description: `Rachat de voiture à ${cityName}. SANS contrôle technique, paiement cash immédiat, tous véhicules acceptés (HS, accidentés, en panne). Estimation gratuite. 09 79 04 94 86`,
    path: `/rachat-voiture/${deptSlug}/${citySlug}`,
  });
}

/**
 * Generate SEO metadata for zones page
 */
export function generateZonesMeta(): Metadata {
  return generateMeta({
    title: 'Zones d\'intervention – Épaviste & Rachat voiture',
    description:
      'Découvrez toutes nos zones d\'intervention en France. Service d\'épaviste et rachat voiture disponible dans 18 régions, 101 départements et plus de 35 000 communes.',
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
  return generateMeta({
    title: `Épaviste ${regionName} – Gratuit 24/7`,
    description: `Épaviste agréé VHU en ${regionName}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide dans tous les départements de la région. 09 79 04 94 86`,
    path: `/epaviste/${regionSlug}`,
  });
}

/**
 * Generate SEO metadata for rachat voiture region landing page
 */
export function generateRachatRegionMeta(regionName: string, regionSlug: string): Metadata {
  return generateMeta({
    title: `Rachat ${regionName} – Cash immédiat`,
    description: `Rachat de voiture en ${regionName}. SANS contrôle technique, paiement cash immédiat, tous véhicules acceptés. Intervention dans tous les départements. 09 79 04 94 86`,
    path: `/rachat-voiture/${regionSlug}`,
  });
}

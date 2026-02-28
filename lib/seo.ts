import { Metadata } from 'next';
import { getSiteUrl } from './site';
import { isIdfDeptCode, IDF_REGION_SLUG } from './idf';

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
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const deptCodeDisplay = deptCode ? ` (${deptCode})` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: isIdf
      ? `Épaviste ${deptName}${deptCodeDisplay} – Enlèvement Gratuit 24/7 Agréé VHU`
      : `Épaviste ${deptName}${deptCodeDisplay} Enlèvement Gratuit 24h`,
    description: isIdf
      ? `Épaviste agréé VHU N° PR9500003D dans le ${deptName}${deptCodeDisplay}. Enlèvement d'épave 100% GRATUIT 24h/24 7j/7, certificat de destruction immédiat. Intervention IDF sous 2-4h. Parking souterrain, ZFE-m. ☎ 09 79 04 94 86.`
      : `Épaviste agréé VHU dans tout le département ${deptName}${deptCodeDisplay}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide sous 24-48h. 09 79 04 94 86.`,
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
    title: isIdf
      ? `Rachat voiture ${deptName}${deptCodeDisplay} – Cash immédiat, sans CT`
      : `Rachat voiture ${deptName}${deptCodeDisplay} – Sans CT, Cash immédiat`,
    description: isIdf
      ? `Rachat de voiture au meilleur prix dans le ${deptName}${deptCodeDisplay}. Paiement cash immédiat, sans contrôle technique. Tous véhicules : occasion, panne, accidenté, HS. Estimation gratuite en 15 min. ☎ 09 79 04 94 86.`
      : `Nous rachetons tous types de véhicules dans le ${deptName}${deptCodeDisplay} : voitures d'occasion, véhicules accidentés, en panne, sans contrôle technique. Paiement cash immédiat. Estimation gratuite. 09 79 04 94 86.`,
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
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: isIdf
      ? `Épaviste ${cityName}${postalDisplay} – Gratuit 24/7 Agréé VHU IDF`
      : `Épaviste ${cityName}${postalDisplay} – Enlèvement gratuit 24h`,
    description: isIdf
      ? `Épaviste agréé VHU à ${cityName}${postalDisplay}, Île-de-France. Enlèvement d'épave 100% GRATUIT, intervention sous 2h, certificat de destruction immédiat. Parking souterrain OK. ☎ 09 79 04 94 86.`
      : `Épaviste agréé VHU à ${cityName}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide sous 2h. 09 79 04 94 86.`,
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
  const deptCode = deptSlug.match(/\d+$/)?.[0] || '';
  const postalDisplay = postalCode ? ` (${postalCode})` : deptCode ? ` ${deptCode}` : '';
  const isIdf = isIdfDeptCode(deptCode);

  return generateMeta({
    title: isIdf
      ? `Rachat voiture ${cityName}${postalDisplay} – Cash immédiat IDF`
      : `Rachat voiture ${cityName}${postalDisplay} – Sans CT, Cash immédiat`,
    description: isIdf
      ? `Rachat de voiture au meilleur prix à ${cityName}${postalDisplay}, Île-de-France. Sans CT, paiement cash immédiat, tous véhicules acceptés. Estimation gratuite en 15 min. ☎ 09 79 04 94 86.`
      : `Nous rachetons tous types de véhicules à ${cityName} : voitures d'occasion en bon état, véhicules accidentés, voitures en panne, épaves, véhicules sans contrôle technique. Paiement cash immédiat. 09 79 04 94 86.`,
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
  const isIdf = regionSlug === IDF_REGION_SLUG;

  return generateMeta({
    title: isIdf
      ? `Épaviste Île-de-France – Enlèvement Gratuit 24/7 | 8 Départements IDF`
      : `Épaviste ${regionName} Enlèvement Gratuit 24h`,
    description: isIdf
      ? `Épaviste agréé VHU en Île-de-France : Paris 75, 77, 78, 91, 92, 93, 94, 95. Enlèvement d'épave 100% GRATUIT 24h/24, intervention sous 2h, 1 200+ communes couvertes. Certificat de destruction immédiat. ☎ 09 79 04 94 86.`
      : `Épaviste agréé VHU en ${regionName}. Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni. Intervention rapide dans tous les départements de la région. 09 79 04 94 86.`,
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
      ? `Rachat voiture Île-de-France – Cash immédiat | 8 Départements IDF`
      : `Rachat voiture ${regionName} – Sans CT, Cash immédiat`,
    description: isIdf
      ? `Rachat de voiture au meilleur prix en Île-de-France : Paris, 77, 78, 91, 92, 93, 94, 95. Sans CT, paiement cash immédiat, tous véhicules. 1 200+ communes. Estimation gratuite. ☎ 09 79 04 94 86.`
      : `Nous rachetons tous types de véhicules en ${regionName} : voitures d'occasion, véhicules accidentés, en panne, sans contrôle technique. Paiement cash immédiat dans tous les départements. 09 79 04 94 86.`,
    path: `/rachat-voiture/${regionSlug}`,
  });
}

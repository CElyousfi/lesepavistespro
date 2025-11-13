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
    title: 'Épaviste & Rachat voiture en Île-de-France – Service 24/7 | Les Épavistes Pro',
    description:
      'Épaviste rapide et gratuit en Île-de-France. Rachat voiture sans contrôle technique, paiement immédiat, intervention 24h/24. ☎️ 09 79 04 94 86',
    path: '/',
  });
}

/**
 * Generate SEO metadata for épaviste pillar page
 */
export function generateEpavistePillarMeta(): Metadata {
  return generateMeta({
    title: 'Épaviste Île-de-France – Enlèvement d\'épave gratuit 24/7 | Les Épavistes Pro',
    description:
      'Service d\'enlèvement d\'épave 100% gratuit en Île-de-France. Épaviste agréé VHU, intervention 24h/24, certificat de destruction fourni. Appelez le 09 79 04 94 86',
    path: '/epaviste',
  });
}

/**
 * Generate SEO metadata for rachat voiture pillar page
 */
export function generateRachatPillarMeta(): Metadata {
  return generateMeta({
    title: 'Rachat voiture Île-de-France – Sans contrôle technique, paiement immédiat',
    description:
      'Rachat de voiture en Île-de-France sans CT. Paiement cash immédiat, tous véhicules acceptés : HS, accidentés, en panne. Estimation gratuite ☎️ 09 79 04 94 86',
    path: '/rachat-voiture',
  });
}

/**
 * Generate SEO metadata for épaviste department page
 */
export function generateEpavisteDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  return generateMeta({
    title: `Épaviste ${deptName} – Intervention 24/7 | Les Épavistes Pro`,
    description: `Épaviste agréé dans le ${deptName}. Enlèvement d'épave gratuit 24h/24, certificat VHU, intervention rapide. Service disponible dans tout le département.`,
    path: `/epaviste/${deptSlug}`,
  });
}

/**
 * Generate SEO metadata for rachat department page
 */
export function generateRachatDepartmentMeta(deptName: string, deptSlug: string): Metadata {
  return generateMeta({
    title: `Rachat voiture ${deptName} – Paiement rapide, sans CT`,
    description: `Rachat de voiture dans le ${deptName}. Sans contrôle technique, paiement cash immédiat, tous véhicules acceptés. Estimation gratuite en 15 minutes.`,
    path: `/rachat-voiture/${deptSlug}`,
  });
}

/**
 * Generate SEO metadata for épaviste city page
 */
export function generateEpavisteCityMeta(
  cityName: string,
  deptSlug: string,
  citySlug: string
): Metadata {
  return generateMeta({
    title: `Épaviste à ${cityName} – Enlèvement gratuit 24/7`,
    description: `Épaviste à ${cityName}. Enlèvement d'épave 100% gratuit, intervention rapide, certificat de destruction VHU. Service disponible 24h/24, 7j/7.`,
    path: `/epaviste/${deptSlug}/${citySlug}`,
  });
}

/**
 * Generate SEO metadata for rachat city page
 */
export function generateRachatCityMeta(
  cityName: string,
  deptSlug: string,
  citySlug: string
): Metadata {
  return generateMeta({
    title: `Rachat voiture à ${cityName} – Sans CT, paiement immédiat`,
    description: `Rachat de voiture à ${cityName}. Sans contrôle technique, paiement cash immédiat, tous véhicules acceptés. Estimation gratuite en 15 minutes.`,
    path: `/rachat-voiture/${deptSlug}/${citySlug}`,
  });
}

/**
 * Generate SEO metadata for zones page
 */
export function generateZonesMeta(): Metadata {
  return generateMeta({
    title: 'Zones d\'intervention – Épaviste & Rachat voiture en Île-de-France',
    description:
      'Découvrez toutes nos zones d\'intervention en Île-de-France. Service d\'épaviste et rachat voiture disponible dans 8 départements et 288 villes.',
    path: '/zones',
  });
}

/**
 * Generate SEO metadata for blog post
 */
export function generateBlogPostMeta(title: string, description: string, slug: string): Metadata {
  return generateMeta({
    title: `${title} | Les Épavistes Pro`,
    description,
    path: `/blog/${slug}`,
  });
}

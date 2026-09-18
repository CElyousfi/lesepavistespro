// Structured Data (JSON-LD) for SEO
//
// ENTITY MODEL — one business, referenced everywhere:
//   - The single business entity (#business) is defined ONCE, in app/layout.tsx
//     via lib/schema.ts getLocalBusinessSchema(). No other file may define it.
//   - Location pages (region / department / city) describe what they offer with
//     a Service node: serviceType + areaServed + provider: { "@id": #business }.
//     They must NOT redefine #business with a city name and a city "address":
//     the same @id with conflicting properties is an ambiguous entity, and a
//     locality address where there are no premises is local-spam.
//   - FAQPage nodes are built by lib/faq.ts, one per page, from the questions
//     that page actually renders.

import { isIdfDeptCode } from './idf';

export const BUSINESS_ID = 'https://www.lesepavistespro.fr/#business';
export const WEBSITE_ID = 'https://www.lesepavistespro.fr/#website';
export const ORGANIZATION_ID = 'https://www.lesepavistespro.fr/#organization';
const SITE_URL = 'https://www.lesepavistespro.fr';
const LOGO_URL = `${SITE_URL}/logo.png`;

/** Reference to the one business entity defined in the layout. */
const providerRef = { '@id': BUSINESS_ID };

type ServiceKind = 'epaviste' | 'rachat';

const SERVICE_TYPE: Record<ServiceKind, string> = {
  epaviste: "Enlèvement d'épave",
  rachat: 'Rachat de véhicule',
};

const SERVICE_LABEL: Record<ServiceKind, string> = {
  epaviste: 'Épaviste',
  rachat: 'Rachat voiture',
};

// ────────────────────────────────────────────────────────────────────────────
// 1. HOME PAGE
// ────────────────────────────────────────────────────────────────────────────

/**
 * The business and website entities already come from the layout, so the
 * homepage only adds the WebPage node that ties this URL to them.
 */
export function getHomeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Épaviste Île-de-France – Enlèvement d'épave gratuit 24h/24",
      isPartOf: { '@id': WEBSITE_ID },
      about: providerRef,
      inLanguage: 'fr-FR',
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/images/og-default.jpg` },
    },
  ];
}

// ────────────────────────────────────────────────────────────────────────────
// 2 & 3. PILLAR SERVICE PAGES
// ────────────────────────────────────────────────────────────────────────────

export function getEpavisteServiceData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: "Enlèvement d'épave gratuit (VHU agréé)",
    serviceType: SERVICE_TYPE.epaviste,
    url: `${SITE_URL}/epaviste`,
    areaServed: { '@type': 'Country', name: 'France' },
    provider: providerRef,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description:
        'Intervention 24–48h, 7j/7 partout en France — certificat de destruction VHU, sous-sol et fourrière possibles',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Épaviste France',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave voiture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Épave utilitaire' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Épave moto/scooter' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sous-sol / fourrière' } },
      ],
    },
  };
}

export function getRachatServiceData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rachat de voiture – paiement rapide',
    serviceType: SERVICE_TYPE.rachat,
    url: `${SITE_URL}/rachat-voiture`,
    areaServed: { '@type': 'Country', name: 'France' },
    provider: providerRef,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Reprise véhicule avec ou sans CT, panne/accidenté — retrait à domicile 7j/7',
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 4. LOCATION SERVICE NODES (region / department / city)
// ────────────────────────────────────────────────────────────────────────────

/** Service offered across a region. */
export function getRegionServiceData(
  regionName: string,
  regionSlug: string,
  service: ServiceKind,
  deptNames: string[] = []
) {
  const path = service === 'epaviste' ? 'epaviste' : 'rachat-voiture';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SERVICE_LABEL[service]} ${regionName}`,
    serviceType: SERVICE_TYPE[service],
    url: `${SITE_URL}/${path}/${regionSlug}`,
    provider: providerRef,
    areaServed: [
      { '@type': 'AdministrativeArea', name: regionName },
      ...deptNames.map((name) => ({ '@type': 'AdministrativeArea', name })),
    ],
    ...(service === 'epaviste'
      ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } }
      : {}),
  };
}

/** Service offered across a department. */
export function getDepartmentServiceData(
  deptCode: string,
  deptName: string,
  deptSlug: string,
  service: ServiceKind,
  cityNames: string[] = []
) {
  const path = service === 'epaviste' ? 'epaviste' : 'rachat-voiture';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SERVICE_LABEL[service]} ${deptName} (${deptCode})`,
    serviceType: SERVICE_TYPE[service],
    url: `${SITE_URL}/${path}/${deptSlug}`,
    provider: providerRef,
    areaServed: [
      { '@type': 'AdministrativeArea', name: `${deptName} (${deptCode})` },
      ...(isIdfDeptCode(deptCode)
        ? [{ '@type': 'AdministrativeArea', name: 'Île-de-France' }]
        : []),
      ...cityNames.slice(0, 20).map((name) => ({ '@type': 'City', name })),
    ],
    ...(service === 'epaviste'
      ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } }
      : {}),
  };
}

/**
 * Service offered in a city.
 *
 * `areaServed` names the city — we serve it. There is deliberately no
 * `address`: we have no premises there, and claiming one would be local-spam.
 */
export function getCityServiceData(
  cityName: string,
  postalCode: string,
  deptCode: string,
  deptName: string,
  url: string,
  service: ServiceKind
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SERVICE_LABEL[service]} ${cityName} (${postalCode})`,
    serviceType: SERVICE_TYPE[service],
    url,
    provider: providerRef,
    areaServed: [
      { '@type': 'City', name: cityName, postalCode },
      { '@type': 'AdministrativeArea', name: `${deptName} (${deptCode})` },
      ...(isIdfDeptCode(deptCode)
        ? [{ '@type': 'AdministrativeArea', name: 'Île-de-France' }]
        : []),
    ],
    ...(service === 'epaviste'
      ? {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

/** WebPage node tying a URL to the site and the business entity. */
export function getWebPageData(url: string, name: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    about: providerRef,
    inLanguage: 'fr-FR',
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 5. BREADCRUMBS
// ────────────────────────────────────────────────────────────────────────────

export function getBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// 6. BLOG ARTICLE
// ────────────────────────────────────────────────────────────────────────────

export function getBlogArticleData(article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) {
  const image = article.image
    ? article.image.startsWith('http')
      ? article.image
      : `${SITE_URL}${article.image}`
    : LOGO_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    // Pure references — the Organization entity is defined once, in the layout.
    // Repeating @id with extra properties would make it a competing definition.
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    inLanguage: 'fr-FR',
  };
}

// ────────────────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────────────────

/** Render JSON-LD as dangerouslySetInnerHTML props. */
export function renderJSONLD(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

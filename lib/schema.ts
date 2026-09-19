import { getSiteUrl } from './site';

/** Static region names for structured data (avoids importing 2.5MB locations-national into client bundle) */
const REGION_NAMES = [
  'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne',
  'Centre-Val de Loire', 'Corse', 'Grand Est',
  'Hauts-de-France', 'Île-de-France', 'Normandie',
  'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire',
  'Provence-Alpes-Côte d\'Azur', 'Guadeloupe', 'Martinique',
  'Guyane', 'La Réunion', 'Mayotte',
];

/** The 8 Île-de-France departments — the primary service area (P4.1). */
const IDF_DEPARTMENT_NAMES = [
  'Paris', 'Seine-et-Marne', 'Yvelines', 'Essonne',
  'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', "Val-d'Oise",
];

/**
 * Organization schema for brand SERP ownership
 */
export function getOrganizationSchema() {
  const baseUrl = getSiteUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Les Épavistes Pro',
    alternateName: ['Épaviste France', 'Les Epavistes Pro', 'Épavistes Pro'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo_name.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/icon.png`,
    description: 'Épaviste agréé VHU partout en France. Service d\'enlèvement d\'épave gratuit 24h/24, 7j/7 et rachat de véhicules accidentés. Partenaire avec centre VHU agréé N° PR9500003D.',
    telephone: '+33602427345',
    email: 'lesepavistespro@gmail.com',
    // TODO(owner): lib/seo-config.ts says 2020 and this says 2023. One of them
    // is wrong and both end up in structured data — confirm the real year.
    foundingDate: '2023',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Agrément VHU Préfectoral',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Préfecture',
      },
      // TODO(owner): confirm this agrément number is current and that it belongs
      // to the partner VHU centre we are entitled to cite.
      identifier: 'PR9500003D',
      name: 'Agrément Centre VHU',
    },
    // TODO(owner): confirm this headcount range, or remove the property.
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    slogan: 'Enlèvement d\'épave gratuit partout en France',
    knowsAbout: [
      'Enlèvement d\'épave',
      'Véhicule Hors d\'Usage (VHU)',
      'Rachat de voiture',
      'Certificat de destruction',
      'Recyclage automobile',
      'Dépollution véhicule',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Épaviste',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Enlèvement d\'épave gratuit',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave voiture' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave moto/scooter' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave utilitaire' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave sous-sol' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Rachat de véhicules',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rachat voiture accidentée' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rachat voiture en panne' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rachat voiture sans CT' } },
          ],
        },
      ],
    },
    sameAs: [
      'https://web.facebook.com/profile.php?id=61552439650150',
      'https://www.instagram.com/lesepavistespro',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'France',
      identifier: 'FR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+33602427345',
        contactType: 'customer service',
        availableLanguage: 'French',
        areaServed: ['FR-IDF', 'FR'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
  };
}

/**
 * WebSite schema with sitelinks searchbox for brand SERP
 */
export function getWebSiteSchema() {
  const baseUrl = getSiteUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Les Épavistes Pro',
    alternateName: 'Épaviste France',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/epaviste/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

/**
 * THE single business entity for the whole site.
 *
 * Emitted exactly once, from app/layout.tsx, under @id …/#business. Every other
 * schema node references that @id instead of redefining it — the same @id with
 * different properties (a per-city name and address, for instance) makes the
 * entity ambiguous and, with no premises in that city, reads as local-spam.
 *
 * AutomotiveBusiness is the precise type for a VHU/épaviste operator.
 */
export function getLocalBusinessSchema() {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Les Épavistes Pro',
    description:
      'Épaviste agréé VHU basé en Île-de-France : enlèvement d\'épave gratuit 24h/24, 7j/7 à Paris et dans les 8 départements franciliens, rachat de véhicules accidentés ou hors d\'usage. Intervention également possible partout en France.',
    url: baseUrl,
    telephone: '+33602427345',
    email: 'lesepavistespro@gmail.com',
    priceRange: 'Gratuit',
    image: `${baseUrl}/icon.png`,
    logo: `${baseUrl}/logo.png`,
    parentOrganization: { '@id': `${baseUrl}/#organization` },
    address: {
      '@type': 'PostalAddress',
      // TODO(owner): provide the real registered address (streetAddress,
      // postalCode, addressLocality). Until then only the country is asserted —
      // inventing a street address would be fabricated local-business data.
      addressCountry: 'FR',
    },
    // Primary service area first (Île-de-France and its 8 departments), then
    // the other regions: the site is IDF-first but keeps national coverage.
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Île-de-France', identifier: 'FR-IDF' },
      ...IDF_DEPARTMENT_NAMES.map(name => ({ '@type': 'AdministrativeArea', name })),
      ...REGION_NAMES.filter(name => name !== 'Île-de-France').map(name => ({
        '@type': 'AdministrativeArea',
        name,
      })),
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+33602427345',
        contactType: 'customer service',
        availableLanguage: 'French',
        areaServed: ['FR-IDF', 'FR'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://web.facebook.com/profile.php?id=61552439650150',
      'https://www.instagram.com/lesepavistespro',
    ],
  };
}

export function getServiceSchema(serviceName: string, serviceDescription: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: serviceDescription,
    provider: { '@id': `${getSiteUrl()}/#business` },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    url: serviceUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };
}

// FAQPage nodes are built by lib/faq.ts buildFaqPage(): one per page, from
// questions that page actually renders.

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

export function getArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  imageUrl: string
) {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: 'Les Épavistes Pro',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Les Épavistes Pro',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo_name.png`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'fr-FR',
  };
}

/**
 * HowTo schema for step-by-step guides (rich snippet eligible)
 */
export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>,
  totalTime?: string
) {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    image: `${baseUrl}/icon.png`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`,
        },
      }),
    })),
  };
}

/**
 * HowTo schema for épave removal process
 */
export function getEpaveRemovalHowToSchema() {
  return getHowToSchema(
    'Comment faire enlever une épave gratuitement',
    'Guide complet pour faire enlever votre épave gratuitement par un épaviste agréé VHU en France. Toutes les étapes, documents et délais expliqués.',
    [
      {
        name: 'Contactez un épaviste agréé VHU',
        text: 'Appelez le 06 02 42 73 45 ou remplissez le formulaire en ligne. Précisez la marque, le modèle, l\'état du véhicule et votre adresse.',
      },
      {
        name: 'Préparez les documents obligatoires',
        text: 'Rassemblez la carte grise originale, votre pièce d\'identité valide et un justificatif de domicile de moins de 6 mois.',
      },
      {
        name: 'Planifiez l\'intervention',
        text: 'Choisissez un créneau qui vous convient. Intervention possible 7j/7, sous 24-48h partout en France.',
      },
      {
        name: 'Enlèvement gratuit du véhicule',
        text: 'Notre équipe arrive avec une dépanneuse équipée. Signature des documents de cession sur place. Aucun frais.',
      },
      {
        name: 'Recevez votre certificat de destruction',
        text: 'Vous recevez le certificat de destruction VHU sous 15 jours par email ou courrier. Ce document vous permet de résilier votre assurance.',
      },
    ],
    'P2D'
  );
}


/**
 * Video schema for embedded videos
 */
export function getVideoSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration?: string,
  contentUrl?: string,
  embedUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'Les Épavistes Pro',
      logo: {
        '@type': 'ImageObject',
        url: `${getSiteUrl()}/logo_name.png`,
      },
    },
  };
}

/**
 * Speakable schema for Google Assistant / voice search
 */
export function getSpeakableSchema(url: string, cssSelectors: string[] = ['h1', '.speakable']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

/**
 * ItemList schema for service catalog pages
 */
export function getItemListSchema(items: Array<{ name: string; url: string; position: number }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

/**
 * GeoCircle schema for service area pages
 */
export function getServiceAreaSchema(
  areaName: string,
  latitude: number,
  longitude: number,
  radiusKm: number = 50
) {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Épaviste agréé VHU',
    provider: { '@id': `${baseUrl}/#business` },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude,
        longitude,
      },
      geoRadius: `${radiusKm * 1000}`,
    },
    name: `Épaviste ${areaName}`,
    description: `Service d'enlèvement d'épave gratuit à ${areaName}. Intervention 24h/24, 7j/7. Certificat de destruction VHU fourni.`,
  };
}

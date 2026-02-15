import { regions } from './locations-national';
import { getSiteUrl } from './site';

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
    description: 'Épaviste agréé VHU partout en France. Service d\'enlèvement d\'épave gratuit 24h/24, 7j/7 et rachat de véhicules accidentés.',
    telephone: '+33979049486',
    email: 'lesepavistespro@gmail.com',
    foundingDate: '2023',
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
        telephone: '+33979049486',
        contactType: 'customer service',
        availableLanguage: 'French',
        areaServed: 'FR',
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

export function getLocalBusinessSchema() {
  const baseUrl = getSiteUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Les Épavistes Pro',
    description: 'Épaviste agréé VHU partout en France. Service d\'enlèvement d\'épave gratuit 24h/24, 7j/7 et rachat de véhicules accidentés ou hors d\'usage.',
    url: baseUrl,
    telephone: '+33979049486',
    email: 'lesepavistespro@gmail.com',
    priceRange: 'Gratuit',
    image: `${baseUrl}/icon.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: regions.map(region => ({
      '@type': 'AdministrativeArea',
      name: region.name,
    })),
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
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
    provider: {
      '@type': 'LocalBusiness',
      name: 'Les Épavistes Pro',
      telephone: '+33979049486',
    },
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

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

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
        text: 'Appelez le 09 79 04 94 86 ou remplissez le formulaire en ligne. Précisez la marque, le modèle, l\'état du véhicule et votre adresse.',
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
 * Review schema for customer testimonials
 */
export function getReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  body: string;
  date: string;
}>) {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Les Épavistes Pro',
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.body,
      datePublished: review.date,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Default customer reviews for rich snippets
 */
export function getDefaultReviewsSchema() {
  return getReviewSchema([
    {
      author: 'Marie L.',
      rating: 5,
      body: 'Service impeccable ! Enlèvement de mon épave en 24h, totalement gratuit. Le certificat de destruction a été envoyé rapidement. Je recommande vivement.',
      date: '2024-10-15',
    },
    {
      author: 'Thomas D.',
      rating: 5,
      body: 'Très professionnel. Ils sont venus chercher ma voiture accidentée dans un parking souterrain, ce qui n\'était pas simple. Aucun frais, service au top.',
      date: '2024-09-22',
    },
    {
      author: 'Sophie M.',
      rating: 5,
      body: 'Rachat de ma voiture sans CT à un bon prix. Paiement rapide et enlèvement le lendemain. Équipe sympathique et ponctuelle.',
      date: '2024-11-03',
    },
    {
      author: 'Ahmed B.',
      rating: 4,
      body: 'Bon service d\'enlèvement d\'épave. Intervention sous 48h comme promis. Certificat reçu en une semaine.',
      date: '2024-08-18',
    },
    {
      author: 'Isabelle R.',
      rating: 5,
      body: 'Excellente expérience. Mon véhicule hors d\'usage a été enlevé gratuitement. Les démarches administratives ont été gérées par eux. Parfait !',
      date: '2024-10-30',
    },
  ]);
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
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#business`,
      name: 'Les Épavistes Pro',
    },
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

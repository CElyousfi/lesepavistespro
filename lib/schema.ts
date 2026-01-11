import { departments } from './locations';
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
    alternateName: 'Épaviste Île-de-France',
    url: baseUrl,
    logo: `${baseUrl}/logo_name.png`,
    image: `${baseUrl}/icon.png`,
    description: 'Épaviste agréé VHU en Île-de-France. Service d\'enlèvement d\'épave gratuit 24h/24, 7j/7 et rachat de véhicules accidentés.',
    telephone: '+33979049486',
    email: 'lesepavistespro@gmail.com',
    sameAs: [
      'https://web.facebook.com/profile.php?id=61552439650150',
      'https://www.instagram.com/lesepavistespro',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: '50000', // 50km radius covering Île-de-France
    },
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
    alternateName: 'Épaviste Île-de-France',
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
    description: 'Épaviste agréé VHU en Île-de-France. Service d\'enlèvement d\'épave gratuit 24h/24, 7j/7 et rachat de véhicules accidentés ou hors d\'usage.',
    url: baseUrl,
    telephone: '+33979049486',
    email: 'lesepavistespro@gmail.com',
    priceRange: 'Gratuit',
    image: `${baseUrl}/icon.png`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: departments.map(dept => ({
      '@type': 'State',
      name: dept.name,
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
      '@type': 'State',
      name: 'Île-de-France',
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
    },
    publisher: {
      '@type': 'Organization',
      name: 'Les Épavistes Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lesepavistespro.fr/logo.png',
      },
    },
    image: imageUrl,
  };
}

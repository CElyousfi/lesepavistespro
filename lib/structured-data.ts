// Structured Data (JSON-LD) for SEO
// Complete implementation for Les Épavistes Pro

import { regions, allDepartments } from './locations-national';

const BUSINESS_ID = 'https://www.lesepavistespro.fr/#business';
const WEBSITE_ID = 'https://www.lesepavistespro.fr/#website';
const PHONE = '+33979049486';
const EMAIL = 'lesepavistespro@gmail.com';
const LOGO_URL = 'https://www.lesepavistespro.fr/logo.png';
const FACEBOOK_URL = 'https://web.facebook.com/profile.php?id=61552439650150';
const INSTAGRAM_URL = 'https://www.instagram.com/lesepavistespro';

// Generate area served for all of France (regions + key cities)
function getAllAreaServed() {
  const areas: Array<{ '@type': string; name: string }> = [
    { '@type': 'Country', name: 'France' },
  ];

  // Add all regions
  regions.forEach(region => {
    areas.push({ '@type': 'AdministrativeArea', name: region.name });
  });

  return areas;
}

// 1. HOME PAGE - LocalBusiness + WebSite
export function getHomeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: 'Les Épavistes Pro',
      url: 'https://www.lesepavistespro.fr/',
      image: LOGO_URL,
      telephone: PHONE,
      email: EMAIL,
      priceRange: '€',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'FR'
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }],
      sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '250'
      },
      areaServed: getAllAreaServed()
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: 'https://www.lesepavistespro.fr/',
      name: 'Les Épavistes Pro',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.lesepavistespro.fr/zones?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ];
}

// 2. EPAVISTE SERVICE PAGE
export function getEpavisteServiceData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: "Enlèvement d'épave gratuit (VHU agréé)",
    serviceType: 'Épaviste',
    areaServed: 'France',
    provider: { '@type': 'LocalBusiness', '@id': BUSINESS_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Intervention 24–48h, 7j/7 partout en France — certificat de destruction VHU, sous-sol et fourrière possibles'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Épaviste France',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enlèvement épave voiture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Épave utilitaire' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Épave moto/scooter' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sous-sol / fourrière' } }
      ]
    }
  };
}

// 3. RACHAT SERVICE PAGE
export function getRachatServiceData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rachat de voiture – paiement rapide',
    serviceType: 'Rachat automobile',
    areaServed: 'France',
    provider: { '@type': 'LocalBusiness', '@id': BUSINESS_ID },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Reprise véhicule avec ou sans CT, panne/accidenté — retrait à domicile 7j/7'
    }
  };
}

// 4. FAQ DATA (for pillar pages)
export function getPillarFAQData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "L'enlèvement d'épave est-il vraiment gratuit ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, 100% gratuit pour véhicule complet partout en France. Intervention sous 24–48h, 7j/7.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels documents faut-il fournir ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Carte grise signée, certificat de situation administrative (non-gage) de moins de 15 jours, pièce d\'identité, Cerfa 15776*02.'
        }
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous partout en France ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, nous intervenons dans toute la France : 18 régions, 101 départements, plus de 35 000 communes desservies.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pouvez-vous intervenir en sous-sol ou en fourrière ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Nous gérons l\'accès aux parkings, aux rampes et la coordination avec la fourrière si besoin.'
        }
      },
      {
        '@type': 'Question',
        name: 'Rachetez-vous les voitures sans contrôle technique ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, reprise possible selon l\'état. Enlèvement à domicile 7j/7 et paiement rapide.'
        }
      }
    ]
  };
}

// 5. DEPARTMENT LOCAL BUSINESS
export function getDepartmentLocalBusiness(deptCode: string, deptName: string, url: string) {
  // Find department from national data to get city names
  const dept = allDepartments.find(d => d.code === deptCode);
  const cityNames = dept ? dept.cities.slice(0, 20).map(c => c.name) : [];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: 'Les Épavistes Pro',
    url,
    telephone: PHONE,
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: [
      { '@type': 'AdministrativeArea', name: deptName },
      ...cityNames.map(city => ({ '@type': 'City', name: city }))
    ]
  };
}

// 6. BREADCRUMB LIST
export function getBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// 7. CITY FAQ (local variations with unique content)
export function getCityFAQData(cityName: string, deptName: string, citySlug?: string) {
  // Import city local data if available
  let localData: any = null;
  try {
    const { getCityLocalData } = require('./city-local-data');
    if (citySlug) {
      localData = getCityLocalData(citySlug);
    }
  } catch (e) {
    // City local data not available
  }

  const questions: any[] = [
    // Core question 1
    {
      '@type': 'Question',
      name: `Pouvez-vous enlever une épave en sous-sol à ${cityName} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: localData?.parkings?.length > 0
          ? `Oui, nous intervenons 7j/7 en sous-sol à ${cityName}. Nous avons l'habitude d'intervenir dans les parkings locaux comme ${localData.parkings.slice(0, 2).join(', ')}. Équipement adapté pour tous types de sous-sols.`
          : `Oui, nous intervenons 7j/7 en sous-sol à ${cityName} (parkings Indigo/Vinci), avec équipement adapté.`
      }
    },
    // Core question 2
    {
      '@type': 'Question',
      name: `Délai d'intervention à ${cityName} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Généralement sous 24–48h à ${cityName}. Pour une urgence, contactez-nous par téléphone (09 79 04 94 86) ou WhatsApp.`
      }
    }
  ];

  // Add local fourrière question if data available
  if (localData?.fourriere) {
    questions.push({
      '@type': 'Question',
      name: `Où se trouve la fourrière à ${cityName} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `La fourrière locale est ${localData.fourriere.name}, située ${localData.fourriere.address}. Tarif : ${localData.fourriere.tarif}. Nous pouvons récupérer votre véhicule directement en fourrière et gérer toutes les démarches pour vous.`
      }
    });
  }

  // Add local access question if data available
  if (localData?.acces) {
    questions.push({
      '@type': 'Question',
      name: `Y a-t-il des contraintes d'accès à ${cityName} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: localData.acces
      }
    });
  }

  // Add local specificities question if data available
  if (localData?.specificites && localData.specificites.length > 0) {
    questions.push({
      '@type': 'Question',
      name: `Quelles sont les particularités de l'enlèvement d'épave à ${cityName} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `À ${cityName}, voici les points importants : ${localData.specificites.join('. ')}.`
      }
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions
  };
}

// 8. BLOG ARTICLE SCHEMA
export function getBlogArticleData(article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || LOGO_URL,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Les Épavistes Pro',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

// Helper to render JSON-LD script tag
export function renderJSONLD(data: any) {
  return {
    __html: JSON.stringify(data)
  };
}

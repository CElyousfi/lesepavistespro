// Structured Data (JSON-LD) for SEO
// Complete implementation for Les Épavistes Pro

const BUSINESS_ID = 'https://www.lesepavistespro.fr/#business';
const WEBSITE_ID = 'https://www.lesepavistespro.fr/#website';
const PHONE = '+33979049486';
const EMAIL = 'lesepavistespro@gmail.com';
const LOGO_URL = 'https://www.lesepavistespro.fr/logo.png';
const FACEBOOK_URL = 'https://web.facebook.com/profile.php?id=61552439650150';
const INSTAGRAM_URL = 'https://www.instagram.com/lesepavistespro';

// All cities by department
const CITIES_BY_DEPT = {
  '75': [
    'Paris 1er', 'Paris 2e', 'Paris 3e', 'Paris 4e', 'Paris 5e',
    'Paris 6e', 'Paris 7e', 'Paris 8e', 'Paris 9e', 'Paris 10e',
    'Paris 11e', 'Paris 12e', 'Paris 13e', 'Paris 14e', 'Paris 15e',
    'Paris 16e', 'Paris 17e', 'Paris 18e', 'Paris 19e', 'Paris 20e'
  ],
  '77': [
    'Meaux', 'Melun', 'Chelles', 'Pontault-Combault', 'Savigny-le-Temple',
    'Bussy-Saint-Georges', 'Villeparisis', 'Champs-sur-Marne', 'Torcy',
    'Fontainebleau', 'Montereau-Fault-Yonne', 'La Ferté-sous-Jouarre',
    'Provins', 'Brie-Comte-Robert'
  ],
  '78': [
    'Versailles', 'Sartrouville', 'Mantes-la-Jolie', 'Saint-Germain-en-Laye',
    'Poissy', 'Conflans-Sainte-Honorine', 'Rambouillet', 'Trappes',
    'Houilles', 'Les Mureaux', 'Chatou'
  ],
  '91': [
    'Évry-Courcouronnes', 'Corbeil-Essonnes', 'Massy', 'Savigny-sur-Orge',
    'Sainte-Geneviève-des-Bois', 'Palaiseau', 'Viry-Châtillon',
    'Athis-Mons', 'Brunoy', 'Draveil', 'Yerres'
  ],
  '92': [
    'Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Colombes',
    'Asnières-sur-Seine', 'Rueil-Malmaison', 'Issy-les-Moulineaux',
    'Neuilly-sur-Seine', 'Levallois-Perret', 'Clichy', 'Suresnes', 'Puteaux'
  ],
  '93': [
    'Saint-Denis', 'Montreuil', 'Aubervilliers', 'Aulnay-sous-Bois',
    'Drancy', 'Noisy-le-Grand', 'Pantin', 'Bobigny', 'Le Blanc-Mesnil',
    'La Courneuve', 'Épinay-sur-Seine'
  ],
  '94': [
    'Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne', 'Saint-Maur-des-Fossés',
    'Ivry-sur-Seine', 'Villejuif', 'Maisons-Alfort', 'Alfortville',
    'Choisy-le-Roi', 'Le Perreux-sur-Marne', 'Nogent-sur-Marne'
  ],
  '95': [
    'Argenteuil', 'Sarcelles', 'Cergy', 'Garges-lès-Gonesse',
    'Goussainville', 'Ermont', 'Franconville', 'Taverny', 'Pontoise',
    'Bezons', 'Montmorency'
  ]
};

// Generate area served for all IDF
function getAllAreaServed() {
  const areas = [
    { '@type': 'AdministrativeArea', name: 'Paris (75)' },
    { '@type': 'AdministrativeArea', name: 'Seine-et-Marne (77)' },
    { '@type': 'AdministrativeArea', name: 'Yvelines (78)' },
    { '@type': 'AdministrativeArea', name: 'Essonne (91)' },
    { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine (92)' },
    { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis (93)' },
    { '@type': 'AdministrativeArea', name: 'Val-de-Marne (94)' },
    { '@type': 'AdministrativeArea', name: "Val-d'Oise (95)" }
  ];

  // Add all cities
  Object.values(CITIES_BY_DEPT).flat().forEach(city => {
    areas.push({ '@type': 'City', name: city });
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
        addressRegion: 'Île-de-France',
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
      name: 'Les Épavistes Pro'
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
    areaServed: 'Île-de-France',
    provider: { '@type': 'LocalBusiness', '@id': BUSINESS_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Intervention 24–48h, 7j/7 — certificat de destruction VHU, sous-sol et fourrière possibles'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Épaviste Île-de-France',
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
    areaServed: 'Île-de-France',
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
          text: 'Oui, 100% gratuit pour véhicule complet en Île-de-France. Intervention sous 24–48h, 7j/7.'
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
        name: 'Intervenez-vous partout en Île-de-France ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui : Paris (75) et départements 77, 78, 91, 92, 93, 94, 95 — plus de 1 200 communes desservies.'
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
  const cities = CITIES_BY_DEPT[deptCode as keyof typeof CITIES_BY_DEPT] || [];
  
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
      ...cities.map(city => ({ '@type': 'City', name: city }))
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

// 7. CITY FAQ (local variations)
export function getCityFAQData(cityName: string, deptName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Pouvez-vous enlever une épave en sous-sol à ${cityName} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Oui, nous intervenons 7j/7 en sous-sol à ${cityName} (parkings Indigo/Vinci), avec équipement adapté.`
        }
      },
      {
        '@type': 'Question',
        name: `Délai d'intervention à ${cityName} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Généralement sous 24–48h à ${cityName}. Pour une urgence, contactez-nous par téléphone ou WhatsApp.`
        }
      }
    ]
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

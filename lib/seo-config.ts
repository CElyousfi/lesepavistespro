/**
 * SEO Configuration for Les Épavistes Pro
 * Comprehensive SEO settings for maximum search engine visibility
 */

export const seoConfig = {
  // Base configuration
  siteName: 'Les Épavistes Pro',
  siteUrl: 'https://lesepavistespro.fr',
  defaultTitle: 'Épaviste Île-de-France | Enlèvement d\'épave gratuit & Rachat voiture 24h',
  defaultDescription: '⭐ Épaviste agréé VHU en Île-de-France. Enlèvement d\'épave 100% GRATUIT 24h/24, 7j/7. Rachat de véhicules accidentés, HS ou en panne. ☎️ 09 79 04 94 86',
  
  // Contact information
  phone: '09 79 04 94 86',
  whatsapp: '+33602427345',
  email: 'contact@lesepavistespro.fr',
  
  // Business information
  businessName: 'Les Épavistes Pro',
  legalName: 'Les Épavistes Pro SARL',
  foundingDate: '2020',
  
  // Service areas
  serviceAreas: [
    'Paris (75)',
    'Seine-et-Marne (77)',
    'Yvelines (78)',
    'Essonne (91)',
    'Hauts-de-Seine (92)',
    'Seine-Saint-Denis (93)',
    'Val-de-Marne (94)',
    'Val-d\'Oise (95)',
  ],
  
  // Primary keywords (high-value, high-intent)
  primaryKeywords: [
    'épaviste île-de-france',
    'enlèvement épave gratuit',
    'rachat voiture accidentée',
    'épaviste agréé vhu',
    'destruction véhicule',
    'certificat destruction vhu',
    'enlèvement épave 24h',
    'rachat voiture hs',
    'épaviste paris',
    'dépollution voiture',
  ],
  
  // Secondary keywords (long-tail)
  secondaryKeywords: [
    'enlever épave gratuitement',
    'faire enlever une épave',
    'vendre voiture accidentée',
    'vendre voiture en panne',
    'prix rachat épave',
    'épaviste gratuit près de moi',
    'certificat de destruction',
    'centre vhu agréé',
    'recyclage automobile',
    'prime à la conversion',
  ],
  
  // Local SEO keywords by department
  localKeywords: {
    paris: ['épaviste paris', 'enlèvement épave paris', 'rachat voiture paris 75'],
    seineetmarne: ['épaviste 77', 'enlèvement épave seine-et-marne', 'rachat voiture 77'],
    yvelines: ['épaviste 78', 'enlèvement épave yvelines', 'rachat voiture 78'],
    essonne: ['épaviste 91', 'enlèvement épave essonne', 'rachat voiture 91'],
    hautsdeseine: ['épaviste 92', 'enlèvement épave hauts-de-seine', 'rachat voiture 92'],
    seinestdenis: ['épaviste 93', 'enlèvement épave seine-saint-denis', 'rachat voiture 93'],
    valdemarne: ['épaviste 94', 'enlèvement épave val-de-marne', 'rachat voiture 94'],
    valdoise: ['épaviste 95', 'enlèvement épave val-d\'oise', 'rachat voiture 95'],
  },
  
  // Social media
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61552439650150',
    instagram: 'https://www.instagram.com/lesepavistespro',
    linkedin: '',
    twitter: '',
  },
  
  // Schema.org types
  schemaTypes: {
    organization: 'AutoRepair',
    service: 'AutomobileService',
    localBusiness: 'AutoRepair',
  },
  
  // Opening hours
  openingHours: [
    'Mo-Su 00:00-23:59',
  ],
  
  // Price range
  priceRange: '€€',
  
  // Service types for schema
  services: [
    'Enlèvement d\'épave gratuit',
    'Rachat de voiture',
    'Destruction de véhicule',
    'Dépollution automobile',
    'Certificat VHU',
    'Rachat voiture accidentée',
    'Rachat voiture en panne',
    'Enlèvement véhicule HS',
  ],
};

/**
 * Generate page-specific SEO metadata
 */
export function generatePageSEO(page: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
}) {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    keywords = seoConfig.primaryKeywords,
    canonical,
    type = 'website',
    publishedTime,
    modifiedTime,
    image = `${seoConfig.siteUrl}/logo_name.png`,
  } = page;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type,
      url: canonical || seoConfig.siteUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: canonical || seoConfig.siteUrl,
    },
    robots: {
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
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  areaServed: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'AutoRepair',
      name: seoConfig.businessName,
      telephone: seoConfig.phone,
      url: seoConfig.siteUrl,
    },
    areaServed: service.areaServed.map(area => ({
      '@type': 'City',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };
}

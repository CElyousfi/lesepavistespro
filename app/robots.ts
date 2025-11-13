import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * Robots.txt configuration
 * Points to canonical sitemap with www subdomain
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ''), // www.lesepavistespro.fr
  };
}

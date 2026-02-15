import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * Advanced Robots.txt for Maximum Crawl Efficiency
 * - Bot-specific rules for optimal crawl budget
 * - Blocks parasitic SEO tool bots
 * - Multi-sitemap references
 * - Social crawler allowances
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  
  return {
    rules: [
      // Primary search engines - full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/static/', '/_next/webpack/', '/*?utm_*', '/*?fbclid=*', '/*?gclid=*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/_next/image/', '/images/', '/blog/'],
      },
      // Secondary search engines
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Social media crawlers - full access for rich previews
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // Block parasitic SEO tool bots (waste crawl budget)
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        disallow: ['/'],
      },
      {
        userAgent: 'DotBot',
        disallow: ['/'],
      },
      {
        userAgent: 'PetalBot',
        disallow: ['/'],
      },
      {
        userAgent: 'DataForSeoBot',
        disallow: ['/'],
      },
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/static/', '/*?utm_*', '/*?fbclid=*'],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemap-static.xml`,
      `${base}/sitemap-blog.xml`,
      `${base}/sitemap-epaviste-regions.xml`,
      `${base}/sitemap-epaviste-departements.xml`,
      `${base}/sitemap-epaviste-cities.xml`,
      `${base}/sitemap-rachat-regions.xml`,
      `${base}/sitemap-rachat-departements.xml`,
      `${base}/sitemap-rachat-cities.xml`,
      `${base}/sitemap-images.xml`,
    ],
    host: base.replace(/^https?:\/\//, ''),
  };
}

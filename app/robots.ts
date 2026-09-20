import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * robots.txt
 *
 * Rules of engagement:
 * - Rendering resources (/_next/static, /_next/webpack, /_next/image) are NEVER
 *   disallowed: Google needs the CSS/JS to render the page it is ranking.
 * - SemrushBot-SA (Site Audit) and the generic SemrushBot are allowed: the
 *   owner runs Semrush Site Audit on this site (S2.0). Other parasitic SEO
 *   crawlers (AhrefsBot, MJ12bot, DotBot…) stay blocked to save crawl budget.
 * - Only the sitemap INDEX is listed; it points to every child sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  // Tracking-parameter URLs are duplicates of their clean counterparts.
  const TRACKING_PARAMS = ['/*?utm_*', '/*?fbclid=*', '/*?gclid=*'];
  const PRIVATE_PATHS = ['/api/', '/admin/'];

  return {
    rules: [
      // Primary search engines — full access, including rendering resources
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [...PRIVATE_PATHS, ...TRACKING_PARAMS],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/_next/image/', '/images/', '/blog/'],
      },
      // Secondary search engines
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      // Social media crawlers — full access for rich previews
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
      // Semrush — Site Audit and the generic crawler, allowed so we can audit
      // our own site (S2.0).
      {
        userAgent: 'SemrushBot-SA',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      // Block parasitic SEO tool bots (waste crawl budget, no SEO benefit)
      {
        userAgent: 'AhrefsBot',
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
        disallow: [...PRIVATE_PATHS, ...TRACKING_PARAMS],
      },
    ],
    // Only the index — it references every child sitemap.
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ''),
  };
}

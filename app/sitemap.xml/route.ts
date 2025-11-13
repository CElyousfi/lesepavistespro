import { getSiteUrl } from '@/lib/site';

/**
 * Sitemap Index Route Handler
 * Returns proper <sitemapindex> XML pointing to 6 child sitemaps
 * 
 * CRITICAL FIX: This generates a sitemap INDEX, not a regular sitemap
 * Google will discover all 329 URLs across the 6 child sitemaps
 */
export async function GET() {
  const base = getSiteUrl();
  
  const sitemaps = [
    `${base}/sitemap-static.xml`,
    `${base}/sitemap-blog.xml`,
    `${base}/sitemap-epaviste-departements.xml`,
    `${base}/sitemap-rachat-departements.xml`,
    `${base}/sitemap-epaviste-cities.xml`,
    `${base}/sitemap-rachat-cities.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

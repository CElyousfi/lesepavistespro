import { getSiteUrl } from '@/lib/site';

/**
 * Sitemap Index Route Handler
 * Returns proper <sitemapindex> XML pointing to the child sitemaps.
 *
 * sitemap-idf.xml comes FIRST: Île-de-France is where the business operates,
 * so its URLs are the ones we want discovered and refreshed first.
 */
export async function GET() {
  const base = getSiteUrl();
  
  const sitemaps = [
    `${base}/sitemap-idf.xml`,
    `${base}/sitemap-static.xml`,
    `${base}/sitemap-blog.xml`,
    `${base}/sitemap-epaviste-regions.xml`,
    `${base}/sitemap-rachat-regions.xml`,
    `${base}/sitemap-epaviste-departements.xml`,
    `${base}/sitemap-rachat-departements.xml`,
    `${base}/sitemap-epaviste-cities.xml`,
    `${base}/sitemap-rachat-cities.xml`,
    `${base}/sitemap-images.xml`,
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

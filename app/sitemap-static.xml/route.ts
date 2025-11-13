import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';

/**
 * Static pages sitemap
 * Includes: homepage, pillars, zones, blog index, contact
 */
export async function GET() {
  const base = getSiteUrl();
  const buildTime = new Date().toISOString();

  const urls = [
    { loc: `${base}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${base}/epaviste`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${base}/rachat-voiture`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${base}/zones`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${base}/blog`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${base}/contact`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${base}/mentions-legales`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${base}/politique-de-confidentialite`, changefreq: 'yearly', priority: 0.3 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${buildTime}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

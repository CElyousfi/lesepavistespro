import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { allDepartments } from '@/lib/locations-complete';

/**
 * Rachat voiture city pages sitemap
 * ~144 cities across 8 departments
 */
export async function GET() {
  const base = getSiteUrl();
  const buildTime = new Date().toISOString();

  const urls: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [];

  for (const dept of allDepartments) {
    for (const city of dept.cities) {
      urls.push({
        loc: `${base}/rachat-voiture/${dept.slug}/${city.slug}`,
        lastmod: buildTime,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
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

import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { allDepartments } from '@/lib/locations-complete';
import { isIdfDepartment } from '@/lib/idf';

/**
 * Épaviste city pages sitemap
 * ~35,000 cities across 101 departments
 */
export async function GET() {
  const base = getSiteUrl();
  const buildTime = new Date().toISOString();

  const urls: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [];

  for (const dept of allDepartments) {
    const isIdf = isIdfDepartment(dept.slug);
    for (const city of dept.cities) {
      urls.push({
        loc: `${base}/epaviste/${dept.slug}/${city.slug}`,
        lastmod: buildTime,
        changefreq: isIdf ? 'weekly' : 'monthly',
        priority: isIdf ? 0.9 : 0.7,
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

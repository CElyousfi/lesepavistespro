import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { allDepartments } from '@/lib/locations-complete';
import { isIdfDepartment } from '@/lib/idf';

/**
 * Rachat voiture department pages sitemap
 * 101 departments across France
 */
export async function GET() {
  const base = getSiteUrl();
  const buildTime = new Date().toISOString();

  const urls = allDepartments.map(dept => ({
    loc: `${base}/rachat-voiture/${dept.slug}`,
    lastmod: buildTime,
    changefreq: isIdfDepartment(dept.slug) ? 'weekly' : 'monthly',
    priority: isIdfDepartment(dept.slug) ? 0.95 : 0.8,
  }));

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

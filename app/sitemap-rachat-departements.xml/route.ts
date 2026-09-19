import { NextResponse } from 'next/server';
import { getSiteUrl, lastmod } from '@/lib/site';
import { allDepartments } from '@/lib/locations-complete';

/**
 * rachat-voiture department pages sitemap — 101 departments, all indexable
 * and self-canonical.
 */
export async function GET() {
  const base = getSiteUrl();
  const updated = lastmod('departments');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allDepartments
  .map(
    (dept) => `  <url>
    <loc>${base}/rachat-voiture/${dept.slug}</loc>
    <lastmod>${updated}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

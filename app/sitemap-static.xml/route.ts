import { NextResponse } from 'next/server';
import { getSiteUrl, lastmod } from '@/lib/site';

/**
 * Static pages sitemap.
 * Every entry is a 200, self-canonical, indexable route.
 * <lastmod> comes from CONTENT_UPDATED_AT, never from `new Date()`.
 */
export async function GET() {
  const base = getSiteUrl();
  const updated = lastmod('static');

  const paths = [
    '/',
    '/epaviste',
    '/rachat-voiture',
    '/zones',
    '/blog',
    '/contact',
    '/faq',
    '/conformite-vhu',
    '/documents',
    '/guides/rachat-sans-ct',
    '/mentions-legales',
    '/politique-de-confidentialite',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${base}${p === '/' ? '/' : p}</loc>
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

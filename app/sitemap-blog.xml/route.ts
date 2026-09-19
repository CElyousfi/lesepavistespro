import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/blog-data';

/**
 * Blog posts sitemap.
 * <lastmod> uses each post's own updated/published date — a real content date.
 */
export async function GET() {
  const base = getSiteUrl();

  const urls = blogPosts.map((post) => ({
    loc: `${base}/blog/${post.slug}`,
    lastmod: new Date(post.updatedAt ?? post.date).toISOString().slice(0, 10),
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
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

import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/blog-data';

/**
 * Blog posts sitemap
 * Uses actual post dates for lastmod
 */
export async function GET() {
  const base = getSiteUrl();

  const urls = blogPosts.map(post => ({
    loc: `${base}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'monthly',
    priority: 0.6,
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

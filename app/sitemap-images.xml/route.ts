import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/blog-data';

/**
 * Image sitemap for Google Image search.
 *
 * An image sitemap may only list images that are actually ON the page it
 * associates them with. The previous version listed hero/service artwork that
 * no component renders, listed /hero/hero-tow-truck.jpg (a 29-byte broken
 * file), and emitted two <url> blocks for the same page — all of which make
 * the sitemap useless or invalid.
 *
 * Every entry below corresponds to an <Image> that really renders on that URL.
 */
export async function GET() {
  const base = getSiteUrl();

  // The VHU certification photo renders inside <VHUCertification /> and the
  // footer, which appear on every one of these routes.
  const VHU_IMAGE = {
    loc: `${base}/images/centre-vhu-agree.webp`,
    title: 'Centre VHU agréé — Les Épavistes Pro',
    caption: "Notre partenaire centre VHU agréé assure la dépollution et la destruction réglementaire des véhicules hors d'usage.",
  };

  const vhuPages = [
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
  ];

  const imageEntries: Array<{
    pageUrl: string;
    images: Array<{ loc: string; title: string; caption?: string }>;
  }> = vhuPages.map(path => ({
    pageUrl: `${base}${path === '/' ? '/' : path}`,
    images: [VHU_IMAGE],
  }));

  // Blog index renders every post card image; each post renders its own hero.
  const blogIndex = imageEntries.find(e => e.pageUrl === `${base}/blog`);
  blogPosts.forEach(post => {
    const image = {
      loc: `${base}${post.image}`,
      title: post.title,
      caption: post.excerpt,
    };
    if (blogIndex) blogIndex.images.push(image);
    imageEntries.push({
      pageUrl: `${base}/blog/${post.slug}`,
      images: [VHU_IMAGE, image],
    });
  });

  // One <url> per page, one <image:image> per distinct image.
  const merged = new Map<string, Array<{ loc: string; title: string; caption?: string }>>();
  for (const entry of imageEntries) {
    const images = merged.get(entry.pageUrl) ?? [];
    for (const img of entry.images) {
      if (!images.some(existing => existing.loc === img.loc)) images.push(img);
    }
    merged.set(entry.pageUrl, images);
  }
  const uniqueEntries = Array.from(merged, ([pageUrl, images]) => ({ pageUrl, images }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${uniqueEntries.map(entry => `  <url>
    <loc>${entry.pageUrl}</loc>
${entry.images.map(img => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `
      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

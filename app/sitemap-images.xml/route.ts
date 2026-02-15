import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/blog-data';

/**
 * Image Sitemap for Google Image Search
 * Helps Google discover and index all important images
 */
export async function GET() {
  const base = getSiteUrl();

  const imageEntries: Array<{ pageUrl: string; images: Array<{ loc: string; title: string; caption?: string }> }> = [
    // Homepage images
    {
      pageUrl: `${base}/`,
      images: [
        { loc: `${base}/logo_name.png`, title: 'Les Épavistes Pro - Logo' },
        { loc: `${base}/icon.png`, title: 'Les Épavistes Pro - Icône' },
        { loc: `${base}/images/hero-home.png`, title: 'Épaviste France - Enlèvement d\'épave gratuit' },
      ],
    },
    // Épaviste pillar page
    {
      pageUrl: `${base}/epaviste`,
      images: [
        { loc: `${base}/images/hero-epaviste.png`, title: 'Service épaviste agréé VHU en France', caption: 'Enlèvement d\'épave gratuit partout en France - Intervention 24h/24' },
      ],
    },
    // Rachat voiture pillar page
    {
      pageUrl: `${base}/rachat-voiture`,
      images: [
        { loc: `${base}/images/hero-rachat.png`, title: 'Rachat de voiture - Paiement cash immédiat', caption: 'Rachat de véhicules accidentés, HS ou en panne - Sans contrôle technique' },
      ],
    },
    // Service images
    {
      pageUrl: `${base}/epaviste`,
      images: [
        { loc: `${base}/services/epaviste.png`, title: 'Épaviste professionnel agréé' },
        { loc: `${base}/services/rachat.png`, title: 'Rachat de véhicules' },
      ],
    },
    // Hero images
    {
      pageUrl: `${base}/`,
      images: [
        { loc: `${base}/hero/hero-tow-truck.jpg`, title: 'Dépanneuse épaviste - Remorquage gratuit' },
        { loc: `${base}/hero/hero1.png`, title: 'Enlèvement épave voiture' },
        { loc: `${base}/hero/hero2.jpg`, title: 'Service épaviste professionnel' },
      ],
    },
  ];

  // Add blog post images
  blogPosts.forEach(post => {
    imageEntries.push({
      pageUrl: `${base}/blog/${post.slug}`,
      images: [
        {
          loc: `${base}${post.image}`,
          title: post.title,
          caption: post.excerpt,
        },
      ],
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.map(entry => `  <url>
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

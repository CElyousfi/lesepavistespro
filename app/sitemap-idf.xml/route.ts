import { NextResponse } from 'next/server';
import { getSiteUrl, lastmod } from '@/lib/site';
import { allDepartments, getCityInDepartment, getRegionBySlug } from '@/lib/locations-complete';
import { shouldIncludeInSitemap, shouldNoIndex } from '@/lib/geo-targeting';
import { IDF_DEPT_SLUGS, IDF_REGION_SLUG } from '@/lib/idf';
import { getIdfCityUpdatedAt } from '@/data/idf-cities';
import { blogPosts } from '@/lib/blog-data';
import { idfIntents } from '@/data/idf-intents';

/**
 * Île-de-France sitemap — every IDF URL in one file, listed FIRST in the
 * sitemap index: the two region hubs, the 8 departments, every IDF commune
 * for both services, and the IDF blog posts.
 *
 * The same URLs also stay in the national sitemaps (a URL may appear in
 * several sitemaps). Each URL is validated with the exact functions the page
 * uses, so it is guaranteed 200, self-canonical and indexable.
 *
 * <lastmod> is a real date: the commune's own content date when it has
 * hand-written content, otherwise the content-family date from lib/site.ts.
 */
export async function GET() {
  const base = getSiteUrl();
  const services = ['epaviste', 'rachat-voiture'] as const;
  const entries: Array<{ loc: string; lastmod: string }> = [];

  // Region hubs
  const region = getRegionBySlug(IDF_REGION_SLUG);
  if (region) {
    for (const service of services) {
      entries.push({ loc: `${base}/${service}/${region.slug}`, lastmod: lastmod('regions') });
    }
  }

  // Departments
  const idfDepartments = allDepartments.filter(d => IDF_DEPT_SLUGS.includes(d.slug));
  for (const dept of idfDepartments) {
    for (const service of services) {
      entries.push({ loc: `${base}/${service}/${dept.slug}`, lastmod: lastmod('departments') });
    }
  }

  // Communes — both services
  for (const dept of idfDepartments) {
    for (const city of dept.cities) {
      if (!shouldIncludeInSitemap(dept.slug, city.slug)) continue;
      if (shouldNoIndex(dept.slug, city.slug)) continue;
      const resolved = getCityInDepartment(dept.slug, city.slug);
      if (!resolved || resolved.department.slug !== dept.slug) continue;
      const updated = getIdfCityUpdatedAt(dept.slug, city.slug) ?? lastmod('cities');
      for (const service of services) {
        entries.push({ loc: `${base}/${service}/${dept.slug}/${city.slug}`, lastmod: updated });
      }
    }
  }

  // Île-de-France situation pages (S2.1), with their own content date
  for (const intent of idfIntents) {
    entries.push({ loc: `${base}/${intent.service}/ile-de-france/${intent.slug}`, lastmod: intent.updatedAt });
  }

  // IDF blog posts
  for (const post of blogPosts) {
    if (post.region !== 'idf') continue;
    entries.push({
      loc: `${base}/blog/${post.slug}`,
      lastmod: new Date(post.updatedAt ?? post.date).toISOString().slice(0, 10),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
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

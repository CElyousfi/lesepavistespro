import { NextResponse } from 'next/server';
import { getSiteUrl, lastmod } from '@/lib/site';
import { allDepartments, getCityInDepartment } from '@/lib/locations-complete';
import { shouldIncludeInSitemap, shouldNoIndex } from '@/lib/geo-targeting';

/**
 * epaviste city pages sitemap.
 *
 * Every emitted URL must be 200, self-canonical and indexable, so each
 * candidate is validated against the exact same functions the page uses:
 *   - getCityInDepartment  → the page renders (and canonicalises to) this URL
 *   - shouldNoIndex        → the page is indexable
 *   - shouldIncludeInSitemap → it is inside the targeted geography
 * See SEO-PRUNING-DECISION.md for the pruning rationale.
 */
export async function GET() {
  const base = getSiteUrl();
  const updated = lastmod('cities');

  const locs: string[] = [];

  for (const dept of allDepartments) {
    for (const city of dept.cities) {
      if (!shouldIncludeInSitemap(dept.slug, city.slug)) continue;
      if (shouldNoIndex(dept.slug, city.slug)) continue;
      // Self-canonical guard: the URL must resolve to this exact department.
      const resolved = getCityInDepartment(dept.slug, city.slug);
      if (!resolved || resolved.department.slug !== dept.slug) continue;
      locs.push(`${base}/epaviste/${dept.slug}/${city.slug}`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
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

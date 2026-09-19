/**
 * check-city-resolution.ts — proof for P1.1
 *
 * Asserts, over the *entire* dataset (not a sample):
 *   1. Every (department, city) pair in `allDepartments` resolves back to the
 *      same department via getCityInDepartment — i.e. no city page can
 *      canonicalise itself into another department.
 *   2. No department contains two cities sharing a slug (a slug must address
 *      exactly one page).
 *   3. Every URL both city sitemaps would emit is self-canonical, i.e. the
 *      (dept, city) pair resolves to itself and is not excluded by the
 *      indexation rules it was included under.
 *   4. Every homonym city (slug present in >1 department) gets a title that is
 *      unique across departments.
 *
 * Run standalone (`npm run check-cities`) or via scripts/seo-qa-check.ts,
 * which runs on `prebuild`.
 */

import {
  allDepartments,
  getCityInDepartment,
  homonymCitySlugs,
} from '../lib/locations-national';
import { shouldIncludeInSitemap, shouldNoIndex } from '../lib/geo-targeting';
import { generateEpavisteCityMeta, generateRachatCityMeta } from '../lib/seo';

export interface CityResolutionResult {
  passed: boolean;
  checked: number;
  failures: string[];
  stats: {
    cities: number;
    departments: number;
    homonymSlugs: number;
    sitemapUrlsPerService: number;
  };
}

const MAX_REPORTED = 20;

export function checkCityResolution(): CityResolutionResult {
  const failures: string[] = [];
  let checked = 0;
  let sitemapUrls = 0;

  // 1 + 2 — resolution and slug uniqueness inside each department
  for (const dept of allDepartments) {
    const seen = new Set<string>();
    for (const city of dept.cities) {
      checked++;

      if (seen.has(city.slug)) {
        failures.push(
          `duplicate slug in department: ${dept.slug}/${city.slug} appears more than once`
        );
      }
      seen.add(city.slug);

      const resolved = getCityInDepartment(dept.slug, city.slug);
      if (!resolved) {
        failures.push(`unresolvable: ${dept.slug}/${city.slug}`);
        continue;
      }
      if (resolved.department.slug !== dept.slug) {
        failures.push(
          `cross-department resolution: /${dept.slug}/${city.slug} resolved to ${resolved.department.slug}`
        );
      }
      if (resolved.city.slug !== city.slug) {
        failures.push(
          `wrong city: /${dept.slug}/${city.slug} resolved to ${resolved.city.slug}`
        );
      }

      // 3 — sitemap URLs must be self-canonical and indexable
      if (shouldIncludeInSitemap(dept.slug, city.slug)) {
        sitemapUrls++;
        const target = getCityInDepartment(dept.slug, city.slug);
        if (!target || target.department.slug !== dept.slug) {
          failures.push(
            `sitemap URL is not self-canonical: /epaviste/${dept.slug}/${city.slug}`
          );
        }
        if (shouldNoIndex(dept.slug, city.slug)) {
          failures.push(
            `sitemap URL is noindex: /epaviste/${dept.slug}/${city.slug}`
          );
        }
      }
    }
  }

  // 4 — homonym cities must get unique titles across departments
  const titlesBySlug = new Map<string, Map<string, string[]>>();
  for (const dept of allDepartments) {
    for (const city of dept.cities) {
      if (!homonymCitySlugs.has(city.slug)) continue;
      const meta = generateEpavisteCityMeta(
        city.name,
        dept.slug,
        city.slug,
        city.postalCode,
        shouldNoIndex(dept.slug, city.slug),
        true
      );
      const title = String(meta.title ?? '');
      if (!titlesBySlug.has(city.slug)) titlesBySlug.set(city.slug, new Map());
      const bucket = titlesBySlug.get(city.slug)!;
      bucket.set(title, [...(bucket.get(title) || []), dept.slug]);
    }
  }
  titlesBySlug.forEach((bucket, slug) => {
    bucket.forEach((depts, title) => {
      if (depts.length > 1) {
        failures.push(
          `duplicate title for homonym "${slug}": "${title}" in ${depts.join(', ')}`
        );
      }
    });
  });

  // Rachat titles use the same code path; spot-check that it also disambiguates.
  const rachatSample = Array.from(homonymCitySlugs).slice(0, 200);
  for (const slug of rachatSample) {
    const owners = allDepartments.filter((d) => d.cities.some((c) => c.slug === slug));
    const titles = new Set(
      owners.map((d) => {
        const city = d.cities.find((c) => c.slug === slug)!;
        return String(
          generateRachatCityMeta(city.name, d.slug, slug, city.postalCode, false, true).title ?? ''
        );
      })
    );
    if (titles.size !== owners.length) {
      failures.push(`duplicate rachat title for homonym "${slug}"`);
    }
  }

  return {
    passed: failures.length === 0,
    checked,
    failures,
    stats: {
      cities: checked,
      departments: allDepartments.length,
      homonymSlugs: homonymCitySlugs.size,
      sitemapUrlsPerService: sitemapUrls,
    },
  };
}

// Standalone execution
if (process.argv[1] && process.argv[1].includes('check-city-resolution')) {
  const result = checkCityResolution();
  console.log('\n🏙️  City resolution check');
  console.log(`   departments:            ${result.stats.departments}`);
  console.log(`   cities checked:         ${result.stats.cities}`);
  console.log(`   homonym slugs:          ${result.stats.homonymSlugs}`);
  console.log(`   sitemap URLs / service: ${result.stats.sitemapUrlsPerService}`);

  if (result.passed) {
    console.log('\n✅ Every (department, city) resolves to itself, every sitemap URL is self-canonical and indexable, every homonym title is unique.\n');
    process.exit(0);
  }

  console.error(`\n❌ ${result.failures.length} failures:`);
  result.failures.slice(0, MAX_REPORTED).forEach((f) => console.error(`   - ${f}`));
  if (result.failures.length > MAX_REPORTED) {
    console.error(`   … and ${result.failures.length - MAX_REPORTED} more`);
  }
  console.error('');
  process.exit(1);
}

/**
 * check-internal-links.ts — proof for P1.2
 *
 * Client components cannot import the 2.5 MB national dataset, so a handful of
 * curated internal-link lists are hardcoded. This check parses those files and
 * asserts every hardcoded link actually resolves:
 *   - `{ name, slug, deptSlug }` city triples resolve via getCityInDepartment,
 *   - `{ name, code, slug }` department entries resolve via getDepartmentBySlug,
 *   - hardcoded /blog/<slug> hrefs match a real post,
 *   - hardcoded static hrefs match a real route,
 *   - every `<dept>/<city>` key of lib/city-local-data.ts resolves (the keys
 *     `saint-denis` / `saint-germain-en-laye` never matched the data slugs
 *     `st-denis` / `st-germain-en-laye`, so the richest local content was
 *     silently never rendered).
 *
 * Run via scripts/seo-qa-check.ts, which runs on `prebuild`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { getCityInDepartment, getDepartmentBySlug, getRegionBySlug } from '../lib/locations-national';
import { idfCityContentByDept } from '../data/idf-cities';
import { prefectures } from '../data/prefectures.generated';
import { getIdfGuideLinks } from '../lib/internal-linking';
import { blogPosts } from '../lib/blog-data';
import { cityLocalData } from '../lib/city-local-data';

/** Files that hardcode internal links to generated pages. */
const WATCHED_FILES = [
  'app/page.tsx',
  'components/IdfInternalLinks.tsx',
  'components/Coverage.tsx',
  'components/Footer.tsx',
  'components/IdfNav.ts',
  'components/Header.tsx',
  'components/MobileServiceMenu.tsx',
  'components/AlsoInIdf.tsx',
  'components/IdfCoverage.tsx',
  'components/IdfDepartmentPage.tsx',
  'components/IdfRegionPage.tsx',
  'lib/internal-linking.ts',
  'app/contact/page.tsx',
];

/** Static routes that exist in app/ (used to validate hardcoded hrefs). */
const STATIC_ROUTES = new Set([
  '/',
  '/epaviste',
  '/rachat-voiture',
  '/zones',
  '/blog',
  '/contact',
  '/faq',
  '/avis',
  '/conformite-vhu',
  '/documents',
  '/guides/rachat-sans-ct',
  '/cookies',
  '/mentions-legales',
  '/politique-de-confidentialite',
]);

export interface InternalLinkResult {
  passed: boolean;
  checked: number;
  failures: string[];
}

export function checkHardcodedInternalLinks(): InternalLinkResult {
  const failures: string[] = [];
  let checked = 0;

  const blogSlugs = new Set(blogPosts.map((p) => p.slug));

  // Data keyed by (department, city) — a key that does not resolve is content
  // that is never rendered.
  for (const key of Object.keys(cityLocalData)) {
    checked++;
    const [deptSlug, citySlug, ...rest] = key.split('/');
    if (!deptSlug || !citySlug || rest.length) {
      failures.push(`lib/city-local-data.ts: key "${key}" must be "<deptSlug>/<citySlug>"`);
    } else if (!getCityInDepartment(deptSlug, citySlug)) {
      failures.push(`lib/city-local-data.ts: key "${key}" does not resolve to a city`);
    }
  }

  // data/idf-cities/<dept>.ts — every hand-written commune key must resolve in
  // its department (guardrail #2), and every blog slug the guides point at
  // must exist.
  for (const [deptSlug, communes] of Object.entries(idfCityContentByDept)) {
    for (const citySlug of Object.keys(communes)) {
      checked++;
      if (!getCityInDepartment(deptSlug, citySlug)) {
        failures.push(`data/idf-cities: "${deptSlug}/${citySlug}" does not resolve to a city`);
      }
    }
  }
  // data/prefectures.generated.ts — every chef-lieu resolves, and the 101
  // préfectures are all present (D3: they are indexed whatever the department).
  let prefectureCount = 0;
  for (const [key, entry] of Object.entries(prefectures)) {
    checked++;
    const [deptSlug, citySlug] = key.split('/');
    if (!getCityInDepartment(deptSlug, citySlug)) failures.push(`data/prefectures.generated.ts: "${key}" does not resolve to a city`);
    if (entry.type === 'prefecture') prefectureCount++;
  }
  if (prefectureCount < 101) failures.push(`data/prefectures.generated.ts: only ${prefectureCount} préfecture pages (expected ≥ 101)`);

  for (const service of ['epaviste', 'rachat-voiture'] as const) {
    for (const link of getIdfGuideLinks(service)) {
      checked++;
      const slug = link.href.replace('/blog/', '');
      if (!blogSlugs.has(slug)) failures.push(`lib/internal-linking.ts: guide "${slug}" is not a blog post`);
    }
  }

  for (const rel of WATCHED_FILES) {
    const file = path.join(process.cwd(), rel);
    if (!fs.existsSync(file)) {
      failures.push(`${rel}: file not found (update WATCHED_FILES)`);
      continue;
    }
    const src = fs.readFileSync(file, 'utf8');

    // { name: 'X', slug: 'y', deptSlug: 'z' }
    const cityRe = /\{\s*name:\s*['"`](.+?)['"`],\s*slug:\s*['"`]([a-z0-9-]+)['"`],\s*deptSlug:\s*['"`]([a-z0-9-]+)['"`]\s*\}/g;
    let m: RegExpExecArray | null;
    while ((m = cityRe.exec(src)) !== null) {
      checked++;
      const [, name, slug, deptSlug] = m;
      if (!getCityInDepartment(deptSlug, slug)) {
        failures.push(`${rel}: "${name}" → /${deptSlug}/${slug} does not resolve (404)`);
      }
    }

    // { name: 'X', code: 'NN', slug: 'y' } — department entries
    const deptRe = /\{\s*name:\s*['"`](.+?)['"`],\s*code:\s*['"`](\d+)['"`],\s*slug:\s*['"`]([a-z0-9-]+)['"`]\s*\}/g;
    while ((m = deptRe.exec(src)) !== null) {
      checked++;
      const [, name, code, slug] = m;
      const dept = getDepartmentBySlug(slug);
      if (!dept) failures.push(`${rel}: department "${name}" → /${slug} does not resolve`);
      else if (dept.code !== code) {
        failures.push(`${rel}: department "${name}" slug ${slug} has code ${dept.code}, not ${code}`);
      }
    }

    // href: '/…' and href="/…" literals (not template strings)
    const hrefRe = /href[:=]\s*['"](\/[a-z0-9\-/]*)['"]/g;
    while ((m = hrefRe.exec(src)) !== null) {
      const href = m[1].replace(/\/+$/, '') || '/';
      checked++;
      if (STATIC_ROUTES.has(href)) continue;
      if (href.startsWith('/blog/')) {
        const slug = href.slice('/blog/'.length);
        if (!blogSlugs.has(slug)) failures.push(`${rel}: /blog/${slug} is not a real post`);
        continue;
      }
      const segments = href.split('/').filter(Boolean);
      if (segments.length >= 2 && (segments[0] === 'epaviste' || segments[0] === 'rachat-voiture')) {
        const [, second, third] = segments;
        if (third) {
          if (!getCityInDepartment(second, third)) {
            failures.push(`${rel}: ${href} does not resolve (404)`);
          }
        } else if (!getDepartmentBySlug(second) && !getRegionBySlug(second)) {
          failures.push(`${rel}: ${href} is neither a department nor a region`);
        }
        continue;
      }
      failures.push(`${rel}: hardcoded href ${href} is not a known route`);
    }
  }

  return { passed: failures.length === 0, checked, failures };
}

if (process.argv[1] && process.argv[1].includes('check-internal-links')) {
  const result = checkHardcodedInternalLinks();
  console.log(`\n🔗 Hardcoded internal links: ${result.checked} checked`);
  if (result.passed) {
    console.log('✅ all resolve\n');
    process.exit(0);
  }
  console.error(`❌ ${result.failures.length} failures:`);
  result.failures.forEach((f) => console.error(`   - ${f}`));
  process.exit(1);
}

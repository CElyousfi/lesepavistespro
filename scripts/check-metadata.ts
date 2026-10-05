/**
 * Metadata guardrail (S3.2) — runs the lib/seo.ts generators over every
 * Île-de-France page and every indexable national page:
 *   • rendered title ≤ 60 characters, never a ☎ in a title
 *   • description 110–160 characters (target 130–155)
 *   • no duplicate title or description among indexable pages
 *   • the town / département name comes first (title prefix, description lead)
 *
 * Standalone: npx tsx scripts/check-metadata.ts [--print=N]
 * Also called by scripts/seo-qa-check.ts (prebuild).
 */

import { allDepartments, regions, isHomonymCity } from '../lib/locations-national';
import { isIdfDepartment } from '../lib/idf';
import { shouldNoIndex, isIndexedDepartment } from '../lib/geo-targeting';
import {
  epavisteCityText,
  rachatCityText,
  epavisteDepartmentText,
  rachatDepartmentText,
  epavisteRegionText,
  rachatRegionText,
  renderedTitle,
  generateHomeMeta,
  generateEpavistePillarMeta,
  generateRachatPillarMeta,
  generateZonesMeta,
  MAX_TITLE_TOTAL,
  type MetaText,
} from '../lib/seo';
import { getGscPageOverride } from '../data/gsc-actions';

export const DESC_HARD_MIN = 110;
export const DESC_HARD_MAX = 160;

interface Row {
  path: string;
  place: string;
  title: string;
  description: string;
  indexable: boolean;
  idf: boolean;
}

function apply(path: string, text: MetaText): MetaText {
  const o = getGscPageOverride(path);
  return { title: o?.title ?? text.title, description: o?.description ?? text.description };
}

/** Every generated page: IDF exhaustively, national indexable + sampled noindex. */
export function collectMetadataRows(): Row[] {
  const rows: Row[] = [];
  const push = (path: string, place: string, t: MetaText, indexable: boolean, idf: boolean) => {
    const a = apply(path, t);
    rows.push({ path, place, title: renderedTitle(a.title), description: a.description, indexable, idf });
  };
  // Static pages built by lib/seo.ts (no place name to put first).
  ([['/', generateHomeMeta()], ['/epaviste', generateEpavistePillarMeta()], ['/rachat-voiture', generateRachatPillarMeta()], ['/zones', generateZonesMeta()]] as const).forEach(([path, m]) => {
    rows.push({ path, place: '', title: renderedTitle(m.title as string | { absolute: string }), description: String(m.description ?? ''), indexable: true, idf: path === '/' });
  });
  regions.forEach((r) => {
    push(`/epaviste/${r.slug}`, r.name, epavisteRegionText(r.name, r.slug, r.departments.length), true, r.slug === 'ile-de-france');
    push(`/rachat-voiture/${r.slug}`, r.name, rachatRegionText(r.name, r.slug), true, r.slug === 'ile-de-france');
  });
  allDepartments.forEach((d) => {
    const idf = isIdfDepartment(d.slug);
    const place = d.code === '75' ? 'Paris' : d.name;
    push(`/epaviste/${d.slug}`, place, epavisteDepartmentText(d.name, d.slug, d.cities.length), true, idf);
    push(`/rachat-voiture/${d.slug}`, place, rachatDepartmentText(d.name, d.slug), true, idf);
    const deptIndexed = isIndexedDepartment(d.slug);
    d.cities.forEach((c) => {
      const indexable = !shouldNoIndex(d.slug, c.slug);
      // National noindex communes: only titles that can still be crawled
      // matter, and checking 70 000 strings for duplicates is pointless.
      if (!indexable && !idf && !deptIndexed) return;
      const args = { name: c.name, deptSlug: d.slug, citySlug: c.slug, postalCode: c.postalCode, population: c.population, isHomonym: isHomonymCity(c.slug, c.name) };
      push(`/epaviste/${d.slug}/${c.slug}`, c.name, epavisteCityText(args), indexable, idf);
      push(`/rachat-voiture/${d.slug}/${c.slug}`, c.name, rachatCityText(args), indexable, idf);
    });
  });
  return rows;
}

const stripArticle = (s: string) => s.replace(/^(Les|Le|La|L’|L') ?/, '');

export function checkMetadataRows(rows: Row[]) {
  const issues: Record<string, string[]> = {
    'title > 60': [],
    'title contains ☎': [],
    'description outside 110–160': [],
    'duplicate title': [],
    'duplicate description': [],
    'place name not first in title': [],
    'place name not first in description': [],
  };
  const titles = new Map<string, string[]>();
  const descs = new Map<string, string[]>();
  let inTarget = 0;

  rows.forEach((r) => {
    if (r.title.length > MAX_TITLE_TOTAL) issues['title > 60'].push(`${r.path} (${r.title.length}) ${r.title}`);
    if (r.title.includes('☎')) issues['title contains ☎'].push(r.path);
    if (r.description.length < DESC_HARD_MIN || r.description.length > DESC_HARD_MAX) issues['description outside 110–160'].push(`${r.path} (${r.description.length}) ${r.description}`);
    if (r.description.length >= 130 && r.description.length <= 155) inTarget++;
    const bare = stripArticle(r.place);
    if (!bare) {
      if (r.indexable) {
        titles.set(r.title, [...(titles.get(r.title) ?? []), r.path]);
        descs.set(r.description, [...(descs.get(r.description) ?? []), r.path]);
      }
      return;
    }
    const tIdx = r.title.indexOf(bare);
    if (tIdx < 0 || tIdx > 22) issues['place name not first in title'].push(`${r.path} — ${r.title}`);
    const dIdx = r.description.indexOf(bare);
    if (dIdx < 0 || dIdx > 40) issues['place name not first in description'].push(`${r.path} — ${r.description}`);
    if (r.indexable) {
      titles.set(r.title, [...(titles.get(r.title) ?? []), r.path]);
      descs.set(r.description, [...(descs.get(r.description) ?? []), r.path]);
    }
  });
  titles.forEach((paths, t) => paths.length > 1 && issues['duplicate title'].push(`"${t}" ×${paths.length}: ${paths.slice(0, 3).join(', ')}`));
  descs.forEach((paths, d) => paths.length > 1 && issues['duplicate description'].push(`"${d.slice(0, 60)}…" ×${paths.length}: ${paths.slice(0, 3).join(', ')}`));
  return { issues, total: rows.length, idf: rows.filter((r) => r.idf).length, inTarget };
}

export function runMetadataCheck() {
  return checkMetadataRows(collectMetadataRows());
}

if (require.main === module) {
  const rows = collectMetadataRows();
  const { issues, total, idf, inTarget } = checkMetadataRows(rows);
  const printN = Number(process.argv.find((a) => a.startsWith('--print='))?.split('=')[1] ?? 0);
  if (printN) {
    const filter = process.argv.find((a) => a.startsWith('--grep='))?.split('=')[1];
    rows.filter((r) => !filter || r.path.includes(filter)).slice(0, printN).forEach((r) => console.log(`${r.path}\n  ${r.title} (${r.title.length})\n  ${r.description} (${r.description.length})`));
  }
  console.log(`\n${total} pages (${idf} IDF) — descriptions in 130–155: ${inTarget} (${Math.round((inTarget / total) * 100)} %)`);
  Object.entries(issues).forEach(([k, v]) => {
    console.log(`${v.length ? '✗' : '✓'} ${k}: ${v.length}`);
    v.slice(0, 8).forEach((s) => console.log(`    ${s}`));
  });
  process.exit(Object.values(issues).some((v) => v.length) ? 1 : 0);
}

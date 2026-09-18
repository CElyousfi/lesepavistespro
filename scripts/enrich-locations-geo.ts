/**
 * enrich-locations-geo.ts — P3.1
 *
 * Adds the official INSEE code, population and centroid (lat/lng) to every
 * commune of lib/locations-national.ts, from the government register
 * (geo.api.gouv.fr — INSEE COG + population + centre). Paris/Lyon/Marseille
 * arrondissements come from the `arrondissement-municipal` type of the same
 * API, so each arrondissement keeps its own population and centre.
 *
 * Matching reuses the display-name strategy (scripts/fix-city-display-names.ts):
 *   1. department + postal code + normalised name
 *   2. department + normalised name (unique)
 *   3. department + postal code (unique commune for that postal code)
 *   4. unique prefix match inside the postal code
 *   5. postal code alone (unique, cross-department)
 *
 * SLUGS, NAMES AND POSTAL CODES ARE NEVER TOUCHED. The script fails (exit 1)
 * if any Île-de-France commune is unmatched — that data feeds the city tiers,
 * the "nearest communes" links and the homepage, so IDF must be 100 %.
 *
 * Usage:
 *   npx tsx scripts/enrich-locations-geo.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';

const API_URL =
  'https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,population,centre&format=json';
const ARR_URL = (dept: string) =>
  `https://geo.api.gouv.fr/communes?codeDepartement=${dept}&type=arrondissement-municipal&fields=nom,code,codesPostaux,population,centre&format=json`;
const CACHE = path.join(process.cwd(), 'seo-audit', 'communes-geo.json');
const DATA_FILE = path.join(process.cwd(), 'lib', 'locations-national.ts');
const DRY_RUN = process.argv.includes('--dry-run');
const IDF = new Set(['75', '77', '78', '91', '92', '93', '94', '95']);

interface Commune {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeDepartement: string;
  population?: number;
  centre?: { type: 'Point'; coordinates: [number, number] };
}

function normalise(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[''`]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bst\b/g, 'saint')
    .replace(/\bste\b/g, 'sainte')
    .replace(/\bsts\b/g, 'saints')
    .replace(/\bstes\b/g, 'saintes')
    .trim()
    .replace(/\s+/g, ' ');
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return (await res.json()) as T;
}

async function loadCommunes(): Promise<{ communes: Commune[]; arrondissements: Commune[] }> {
  if (fs.existsSync(CACHE)) {
    console.log(`→ Using cached register (${path.relative(process.cwd(), CACHE)})`);
    return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  }
  console.log('→ Fetching the commune register from geo.api.gouv.fr…');
  const communes = await fetchJson<Commune[]>(API_URL);
  const arrondissements: Commune[] = [];
  for (const dept of ['75', '69', '13']) {
    const arr = await fetchJson<Commune[]>(ARR_URL(dept));
    arr.forEach(a => arrondissements.push({ ...a, codeDepartement: dept }));
  }
  const payload = { communes, arrondissements };
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(payload));
  console.log(`  cached ${communes.length} communes + ${arrondissements.length} arrondissements`);
  return payload;
}

/** "paris-10e" → "Paris 10e Arrondissement" key; "lyon-1er" → "Lyon 1er Arrondissement". */
function arrondissementKey(slug: string): string | null {
  const m = slug.match(/^(paris|lyon|marseille)-(\d+)(er|e)$/);
  if (!m) return null;
  const city = m[1][0].toUpperCase() + m[1].slice(1);
  return normalise(`${city} ${m[2]}${m[3]} Arrondissement`);
}

async function main() {
  const { communes, arrondissements } = await loadCommunes();

  const byDeptPostalName = new Map<string, Commune>();
  const byDeptName = new Map<string, Commune[]>();
  const byDeptPostal = new Map<string, Commune[]>();
  const byPostal = new Map<string, Commune[]>();
  const push = (map: Map<string, Commune[]>, key: string, c: Commune) =>
    map.set(key, [...(map.get(key) || []), c]);

  for (const c of communes) {
    const key = normalise(c.nom);
    for (const cp of c.codesPostaux) {
      byDeptPostalName.set(`${c.codeDepartement}|${cp}|${key}`, c);
      push(byDeptPostal, `${c.codeDepartement}|${cp}`, c);
      push(byPostal, cp, c);
    }
    push(byDeptName, `${c.codeDepartement}|${key}`, c);
  }
  const arrByKey = new Map(arrondissements.map(a => [normalise(a.nom), a]));

  const source = fs.readFileSync(DATA_FILE, 'utf8');
  const lines = source.split('\n');
  const deptCodeRe = /^\s*code: "(\d{2,3}|2A|2B)",\s*$/;
  // Accepts a line with or without previous enrichment (idempotent re-runs).
  const cityRe = /^(\s*)\{ name: (".*?"), slug: "(.*?)", postalCode: "(.*?)"(?:, insee: ".*?")?(?:, population: \d+)?(?:, lat: -?[\d.]+, lng: -?[\d.]+)? \}(,?)\s*$/;

  let currentDept = '';
  let matched = 0;
  const unmatched: string[] = [];
  const unmatchedIdf: string[] = [];

  const out = lines.map(line => {
    const dm = line.match(deptCodeRe);
    if (dm) {
      currentDept = dm[1];
      return line;
    }
    const cm = line.match(cityRe);
    if (!cm) return line;
    const [, indent, nameJson, slug, postalCode, comma] = cm;
    const name = JSON.parse(nameJson) as string;
    const key = normalise(name);

    let official: Commune | undefined;
    const arrKey = arrondissementKey(slug);
    if (arrKey) official = arrByKey.get(arrKey);
    if (!official) official = byDeptPostalName.get(`${currentDept}|${postalCode}|${key}`);
    if (!official) {
      const list = byDeptName.get(`${currentDept}|${key}`);
      if (list && list.length === 1) official = list[0];
    }
    if (!official) {
      const list = byDeptPostal.get(`${currentDept}|${postalCode}`);
      if (list && list.length === 1) official = list[0];
    }
    if (!official) {
      const list = byDeptPostal.get(`${currentDept}|${postalCode}`) || [];
      const prefixed = list.filter(c => {
        const nk = normalise(c.nom);
        return key.startsWith(`${nk} `) || nk.startsWith(`${key} `);
      });
      if (prefixed.length === 1) official = prefixed[0];
    }
    if (!official) {
      const list = byPostal.get(postalCode);
      if (list && list.length === 1) official = list[0];
    }

    if (!official || !official.centre) {
      const entry = `${currentDept} ${postalCode} "${name}" (${slug})`;
      unmatched.push(entry);
      if (IDF.has(currentDept)) unmatchedIdf.push(entry);
      // Strip any stale enrichment rather than keep a wrong one.
      return `${indent}{ name: ${nameJson}, slug: "${slug}", postalCode: "${postalCode}" }${comma}`;
    }

    matched++;
    const [lng, lat] = official.centre.coordinates;
    const population = official.population ?? 0;
    return `${indent}{ name: ${nameJson}, slug: "${slug}", postalCode: "${postalCode}", insee: "${official.code}", population: ${population}, lat: ${lat}, lng: ${lng} }${comma}`;
  });

  console.log(`\n📊 Geo enrichment`);
  console.log(`   matched:   ${matched}`);
  console.log(`   unmatched: ${unmatched.length} (Île-de-France: ${unmatchedIdf.length})`);
  if (unmatched.length) {
    const report = path.join(process.cwd(), 'seo-audit', 'unmatched-geo.txt');
    fs.mkdirSync(path.dirname(report), { recursive: true });
    fs.writeFileSync(report, unmatched.join('\n'));
    console.log(`   Full list: ${path.relative(process.cwd(), report)}`);
    unmatchedIdf.forEach(u => console.log(`   IDF ✗ ${u}`));
  }

  if (unmatchedIdf.length) {
    console.error('\n❌ Every Île-de-France commune must match the register.');
    process.exit(1);
  }
  if (DRY_RUN) {
    console.log('\n(dry run — no file written)\n');
    return;
  }
  fs.writeFileSync(DATA_FILE, out.join('\n'));
  console.log(`\n✅ Wrote ${path.relative(process.cwd(), DATA_FILE)}\n`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

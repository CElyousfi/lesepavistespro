/**
 * fix-city-display-names.ts — P2.2
 *
 * The city dataset comes from the La Poste postal-code file, whose names are
 * ASCII-flattened and abbreviated: "Asnieres sur Seine", "Boulogne Billancourt",
 * "Boissy St Leger", "Ste Genevieve des Bois", "Bois d Arcy". Those names flow
 * into titles, H1s, descriptions, breadcrumbs and schema, while users search
 * "épaviste Asnières-sur-Seine".
 *
 * This script rewrites the DISPLAY NAME only, from the official commune names
 * published by the French government (geo.api.gouv.fr / INSEE COG). SLUGS ARE
 * NEVER TOUCHED — every indexed URL keeps working.
 *
 * Matching, in order of confidence:
 *   1. department + postal code + normalised name
 *   2. department + normalised name
 *   3. department + postal code, when that postal code has exactly one commune
 *
 * Usage:
 *   npx tsx scripts/fix-city-display-names.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';

const API_URL =
  'https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement&format=json';
const CACHE = path.join(process.cwd(), 'seo-audit', 'communes.json');
const DATA_FILE = path.join(process.cwd(), 'lib', 'locations-national.ts');
const DRY_RUN = process.argv.includes('--dry-run');

interface Commune {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeDepartement: string;
}

/**
 * Normalise a name for matching: strip accents, lowercase, expand the La Poste
 * abbreviations (St/Ste), and collapse every separator to a single space so
 * "Boissy St Leger" and "Boissy-Saint-Léger" compare equal.
 */
function normalise(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    // NFD does not decompose the œ/æ ligatures, but La Poste spells them out.
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

async function loadCommunes(): Promise<Commune[]> {
  if (fs.existsSync(CACHE)) {
    console.log(`→ Using cached commune list (${path.relative(process.cwd(), CACHE)})`);
    return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  }
  console.log(`→ Fetching official commune names from geo.api.gouv.fr…`);
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`geo.api.gouv.fr returned ${res.status}`);
  const data = (await res.json()) as Commune[];
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(data));
  console.log(`  cached ${data.length} communes`);
  return data;
}

async function main() {
  const communes = await loadCommunes();

  // Indexes
  const byDeptPostalName = new Map<string, string>();
  const byDeptName = new Map<string, string[]>();
  const byDeptPostal = new Map<string, string[]>();
  // Postal codes ignore department boundaries in a handful of cases (Éloise is
  // 01200 but sits in département 74), so keep a department-agnostic index too.
  const byPostal = new Map<string, string[]>();

  for (const c of communes) {
    const dept = c.codeDepartement;
    const key = normalise(c.nom);
    for (const cp of c.codesPostaux) {
      byDeptPostalName.set(`${dept}|${cp}|${key}`, c.nom);
      const pk = `${dept}|${cp}`;
      byDeptPostal.set(pk, [...(byDeptPostal.get(pk) || []), c.nom]);
      byPostal.set(cp, [...(byPostal.get(cp) || []), c.nom]);
    }
    const nk = `${dept}|${key}`;
    byDeptName.set(nk, [...(byDeptName.get(nk) || []), c.nom]);
  }

  const source = fs.readFileSync(DATA_FILE, 'utf8');
  const lines = source.split('\n');

  const deptCodeRe = /^\s*code: "(\d{2,3})",\s*$/;
  const cityRe = /^(\s*)\{ name: "(.*?)", slug: "(.*?)", postalCode: "(.*?)" \}(,?)\s*$/;

  let currentDept = '';
  let updated = 0;
  let unchanged = 0;
  const unmatched: string[] = [];
  const samples: string[] = [];

  const out = lines.map((line) => {
    const dm = line.match(deptCodeRe);
    if (dm) {
      currentDept = dm[1];
      return line;
    }
    const cm = line.match(cityRe);
    if (!cm) return line;

    const [, indent, name, slug, postalCode, comma] = cm;

    // Arrondissements have no INSEE commune of their own — the register only
    // knows "Paris"/"Lyon"/"Marseille" — so matching would flatten
    // "Paris 10e" to "Paris". Keep the arrondissement name.
    if (/^(paris|lyon|marseille)-\d+(er|e)$/.test(slug)) {
      unchanged++;
      return line;
    }

    const key = normalise(name);

    let official =
      byDeptPostalName.get(`${currentDept}|${postalCode}|${key}`) ?? undefined;

    if (!official) {
      const byName = byDeptName.get(`${currentDept}|${key}`);
      if (byName && byName.length === 1) official = byName[0];
    }
    if (!official) {
      const inDeptPostal = byDeptPostal.get(`${currentDept}|${postalCode}`);
      if (inDeptPostal && inDeptPostal.length === 1) official = inDeptPostal[0];
    }
    if (!official) {
      // La Poste sometimes disambiguates a name the INSEE register does not
      // ("Beaufort sur Doron" for "Beaufort", "Ambérieux d Azergues" for
      // "Ambérieux"). Accept a unique prefix match inside the postal code.
      const inDeptPostal = byDeptPostal.get(`${currentDept}|${postalCode}`) || [];
      const prefixed = inDeptPostal.filter(n => {
        const nk = normalise(n);
        return key.startsWith(`${nk} `) || nk.startsWith(`${key} `);
      });
      if (prefixed.length === 1) official = prefixed[0];
    }
    if (!official) {
      // Postal code that belongs to a different département than the file says.
      const anywhere = byPostal.get(postalCode);
      if (anywhere && anywhere.length === 1) official = anywhere[0];
    }

    if (!official) {
      unmatched.push(`${currentDept} ${postalCode} "${name}" (${slug})`);
      return line;
    }
    if (official === name) {
      unchanged++;
      return line;
    }

    updated++;
    if (samples.length < 25) samples.push(`${name}  →  ${official}`);
    // Slug and postal code are untouched — only the display name changes.
    return `${indent}{ name: ${JSON.stringify(official)}, slug: "${slug}", postalCode: "${postalCode}" }${comma}`;
  });

  console.log(`\n📊 Display-name resolution`);
  console.log(`   updated:   ${updated}`);
  console.log(`   unchanged: ${unchanged}`);
  console.log(`   unmatched: ${unmatched.length}`);

  console.log(`\n   Sample renames:`);
  samples.forEach((s) => console.log(`     ${s}`));

  if (unmatched.length) {
    console.log(`\n   Unmatched (display name left as-is):`);
    unmatched.slice(0, 40).forEach((s) => console.log(`     ${s}`));
    if (unmatched.length > 40) console.log(`     … and ${unmatched.length - 40} more`);
    const report = path.join(process.cwd(), 'seo-audit', 'unmatched-cities.txt');
    fs.mkdirSync(path.dirname(report), { recursive: true });
    fs.writeFileSync(report, unmatched.join('\n'));
    console.log(`\n   Full list: ${path.relative(process.cwd(), report)}`);
  }

  if (DRY_RUN) {
    console.log('\n(dry run — no file written)\n');
    return;
  }

  fs.writeFileSync(DATA_FILE, out.join('\n'));
  console.log(`\n✅ Wrote ${path.relative(process.cwd(), DATA_FILE)}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

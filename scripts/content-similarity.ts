/**
 * content-similarity.ts — P4.2
 *
 * ~34,900 communes × 2 services = ~70,000 city URLs, all rendered from the same
 * template. That is the classic "duplicate content / doorway pages" pattern a
 * Semrush audit flags and Google's helpful-content systems demote.
 *
 * This samples indexable city pages per service, extracts the main content
 * (everything the template contributes minus header/footer/nav/scripts), and
 * computes Jaccard similarity over word 5-shingles for pairs WITHIN the same
 * department and ACROSS departments, then reports the distribution.
 *
 * Usage:
 *   npx tsx scripts/content-similarity.ts [baseUrl] [--sample=200]
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { allDepartments } from '../lib/locations-national';
import { shouldNoIndex } from '../lib/geo-targeting';

const argv = process.argv.slice(2);
const BASE = (argv.find((a) => !a.startsWith('--')) || 'http://localhost:3210').replace(/\/+$/, '');
const SAMPLE = Number((argv.find((a) => a.startsWith('--sample=')) || '--sample=200').split('=')[1]) || 200;
const SHINGLE = 5;
const CONCURRENCY = 8;

interface Doc {
  url: string;
  deptSlug: string;
  citySlug: string;
  shingles: Set<string>;
  words: number;
}

function shingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    out.add(words.slice(i, i + SHINGLE).join(' '));
  }
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  small.forEach((s) => {
    if (large.has(s)) inter++;
  });
  return inter / (a.size + b.size - inter);
}

/** Pick `n` indexable cities per service, spread across departments. */
function pickCities(n: number) {
  const indexed = allDepartments
    .map((d) => ({
      dept: d,
      cities: d.cities.filter((c) => !shouldNoIndex(d.slug, c.slug)),
    }))
    .filter((d) => d.cities.length > 0);

  const picked: Array<{ deptSlug: string; citySlug: string }> = [];
  const seen = new Set<string>();
  // Round-robin across departments so the sample spans the whole country;
  // a department is exhausted once every one of its cities has been taken.
  let round = 0;
  while (picked.length < n && round < 200) {
    let added = false;
    for (const d of indexed) {
      if (picked.length >= n) break;
      const city = d.cities[round];
      if (!city) continue;
      const key = `${d.dept.slug}/${city.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push({ deptSlug: d.dept.slug, citySlug: city.slug });
      added = true;
    }
    if (!added) break;
    round++;
  }
  return picked;
}

async function fetchMainText(url: string): Promise<{ text: string; words: number } | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'ContentSimilarity/1.0' } });
    if (res.status !== 200) return null;
    const $ = cheerio.load(await res.text());
    $('script, style, noscript, header, footer, nav, svg').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return { text, words: text.split(' ').filter(Boolean).length };
  } catch {
    return null;
  }
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))];
}

async function analyseService(service: 'epaviste' | 'rachat-voiture') {
  const picks = pickCities(SAMPLE);
  console.log(`\n→ ${service}: fetching ${picks.length} indexable city pages…`);

  const docs: Doc[] = [];
  let cursor = 0;
  async function worker() {
    while (cursor < picks.length) {
      const i = cursor++;
      const { deptSlug, citySlug } = picks[i];
      const url = `${BASE}/${service}/${deptSlug}/${citySlug}`;
      const main = await fetchMainText(url);
      if (!main) continue;
      docs.push({ url, deptSlug, citySlug, shingles: shingles(main.text), words: main.words });
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const sameDept: number[] = [];
  const crossDept: number[] = [];
  const worst: Array<{ a: string; b: string; score: number; scope: string }> = [];

  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      const score = jaccard(docs[i].shingles, docs[j].shingles);
      const scope = docs[i].deptSlug === docs[j].deptSlug ? 'same-dept' : 'cross-dept';
      (scope === 'same-dept' ? sameDept : crossDept).push(score);
      worst.push({ a: docs[i].url, b: docs[j].url, score, scope });
    }
  }
  worst.sort((x, y) => y.score - x.score);

  const stats = (arr: number[]) => {
    const s = [...arr].sort((a, b) => a - b);
    return {
      pairs: s.length,
      p50: +percentile(s, 0.5).toFixed(3),
      p90: +percentile(s, 0.9).toFixed(3),
      p99: +percentile(s, 0.99).toFixed(3),
      max: +(s[s.length - 1] ?? 0).toFixed(3),
      over80: s.filter((v) => v >= 0.8).length,
      over60: s.filter((v) => v >= 0.6).length,
    };
  };

  const wordCounts = docs.map((d) => d.words).sort((a, b) => a - b);

  return {
    service,
    pagesSampled: docs.length,
    words: {
      min: wordCounts[0] ?? 0,
      median: percentile(wordCounts, 0.5),
      max: wordCounts[wordCounts.length - 1] ?? 0,
    },
    sameDepartment: stats(sameDept),
    crossDepartment: stats(crossDept),
    mostSimilarPairs: worst.slice(0, 10),
  };
}

async function main() {
  console.log(`\n📐 Content similarity against ${BASE} (sample ${SAMPLE}/service, ${SHINGLE}-word shingles)`);

  const results = [];
  for (const service of ['epaviste', 'rachat-voiture'] as const) {
    const r = await analyseService(service);
    results.push(r);

    console.log(`\n── ${service} ──`);
    console.log(`   pages sampled: ${r.pagesSampled}`);
    console.log(`   words: min ${r.words.min} · median ${r.words.median} · max ${r.words.max}`);
    for (const [label, s] of [
      ['same department  ', r.sameDepartment],
      ['cross department ', r.crossDepartment],
    ] as const) {
      console.log(
        `   ${label} pairs=${String(s.pairs).padStart(6)}  p50=${s.p50}  p90=${s.p90}  p99=${s.p99}  max=${s.max}  ≥0.6: ${s.over60}  ≥0.8: ${s.over80}`
      );
    }
    console.log(`   most similar pairs:`);
    r.mostSimilarPairs.slice(0, 5).forEach((p) =>
      console.log(`     ${p.score.toFixed(3)} ${p.scope}  ${p.a.replace(BASE, '')}  ↔  ${p.b.replace(BASE, '')}`)
    );
  }

  fs.mkdirSync(path.join(process.cwd(), 'seo-audit'), { recursive: true });
  const file = path.join(process.cwd(), 'seo-audit', 'content-similarity.json');
  fs.writeFileSync(file, JSON.stringify({ baseUrl: BASE, sample: SAMPLE, at: new Date().toISOString(), results }, null, 2));
  console.log(`\nWritten to ${path.relative(process.cwd(), file)}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

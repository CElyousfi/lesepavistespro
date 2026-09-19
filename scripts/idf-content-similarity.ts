/**
 * idf-content-similarity.ts — P3.2 proof
 *
 * Computes, from the data (no server needed), the commune-specific text each
 * Île-de-France city page renders inside [data-idf-content="unique"] and
 * reports, per service and per tier:
 *   - the unique-word-count distribution (Tier A ≥ 800, Tier B ≥ 500),
 *   - pairwise Jaccard similarity over word 5-shingles within the tier
 *     (Tier A pairs must be < 0.40, Tier B pairs < 0.60),
 *   - Tier A coverage: how many Tier A communes still fall back to generated
 *     content.
 *
 * Usage: npx tsx scripts/idf-content-similarity.ts [--json]
 * Also imported by scripts/seo-qa-check.ts (prebuild).
 */

import { getAllIdfCities, type IdfTier } from '../lib/idf-cities';
import { resolveIdfCity, uniqueWordCount, type ResolvedIdfCity } from '../lib/idf-city-content';

const SHINGLE = 5;
export const TIER_MIN_WORDS: Record<'A' | 'B', number> = { A: 800, B: 500 };
export const TIER_MAX_SIMILARITY: Record<'A' | 'B', number> = { A: 0.4, B: 0.6 };

type Service = 'epaviste' | 'rachat-voiture';

function uniqueText(r: ResolvedIdfCity, service: Service): string {
  const parts =
    service === 'epaviste'
      ? [...r.intro, ...r.situations.flatMap(s => [s.title, s.text]), r.fourriere ? `${r.fourriere.name} ${r.fourriere.address} ${r.fourriere.note ?? ''}` : r.fourriereText ?? '', ...r.acces, ...r.faqEpaviste.flatMap(f => [f.question, f.answer])]
      : [...r.rachatIntro, ...r.rachatSituations.flatMap(s => [s.title, s.text]), ...r.acces, r.fourriere ? `${r.fourriere.name} ${r.fourriere.address} ${r.fourriere.note ?? ''}` : r.fourriereText ?? '', ...r.faqRachat.flatMap(f => [f.question, f.answer])];
  return parts.join(' ');
}

function shingles(text: string): Set<string> {
  const words = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + SHINGLE <= words.length; i++) out.add(words.slice(i, i + SHINGLE).join(' '));
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  small.forEach(s => { if (large.has(s)) inter++; });
  return inter / (a.size + b.size - inter);
}

function pct(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
}

export interface TierReport {
  service: Service;
  tier: 'A' | 'B';
  pages: number;
  handwritten: number;
  words: { min: number; p50: number; max: number; below: number };
  similarity: { pairs: number; p50: number; p90: number; max: number; over: number; worst: string[] };
  passed: boolean;
}

export function analyseIdfContent(): { reports: TierReport[]; tierCounts: Record<IdfTier, number> } {
  const cities = getAllIdfCities();
  const tierCounts: Record<IdfTier, number> = { A: 0, B: 0, C: 0 };
  cities.forEach(c => tierCounts[c.tier]++);
  const reports: TierReport[] = [];

  for (const service of ['epaviste', 'rachat-voiture'] as Service[]) {
    for (const tier of ['A', 'B'] as const) {
      const docs = cities
        .filter(c => c.tier === tier)
        .map(c => {
          const r = resolveIdfCity(c.deptSlug, c.slug)!;
          return { key: `${c.deptSlug}/${c.slug}`, r, words: uniqueWordCount(r, service), sh: shingles(uniqueText(r, service)) };
        });
      const words = docs.map(d => d.words).sort((a, b) => a - b);
      const sims: number[] = [];
      const worst: Array<{ s: number; a: string; b: string }> = [];
      for (let i = 0; i < docs.length; i++) {
        for (let j = i + 1; j < docs.length; j++) {
          const s = jaccard(docs[i].sh, docs[j].sh);
          sims.push(s);
          if (s >= TIER_MAX_SIMILARITY[tier]) worst.push({ s, a: docs[i].key, b: docs[j].key });
        }
      }
      sims.sort((a, b) => a - b);
      worst.sort((a, b) => b.s - a.s);
      const below = words.filter(w => w < TIER_MIN_WORDS[tier]).length;
      reports.push({
        service,
        tier,
        pages: docs.length,
        handwritten: docs.filter(d => d.r.source === 'handwritten').length,
        words: { min: words[0] ?? 0, p50: pct(words, 0.5), max: words[words.length - 1] ?? 0, below },
        similarity: {
          pairs: sims.length,
          p50: pct(sims, 0.5),
          p90: pct(sims, 0.9),
          max: sims[sims.length - 1] ?? 0,
          over: worst.length,
          worst: worst.slice(0, 5).map(w => `${w.a} ↔ ${w.b} (${w.s.toFixed(2)})`),
        },
        passed: below === 0 && worst.length === 0,
      });
    }
  }
  return { reports, tierCounts };
}

if (process.argv[1] && process.argv[1].includes('idf-content-similarity')) {
  const { reports, tierCounts } = analyseIdfContent();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ reports, tierCounts }, null, 2));
  } else {
    console.log(`\nIDF tiers: A=${tierCounts.A} B=${tierCounts.B} C=${tierCounts.C}\n`);
    for (const r of reports) {
      console.log(`${r.passed ? '✅' : '❌'} ${r.service} tier ${r.tier}: ${r.pages} pages (${r.handwritten} hand-written)`);
      console.log(`   words  min ${r.words.min} · p50 ${r.words.p50} · max ${r.words.max} · below ${TIER_MIN_WORDS[r.tier]}: ${r.words.below}`);
      console.log(`   jaccard p50 ${r.similarity.p50.toFixed(3)} · p90 ${r.similarity.p90.toFixed(3)} · max ${r.similarity.max.toFixed(3)} · pairs ≥ ${TIER_MAX_SIMILARITY[r.tier]}: ${r.similarity.over}/${r.similarity.pairs}`);
      r.similarity.worst.forEach(w => console.log(`      ${w}`));
    }
  }
  process.exit(reports.every(r => r.passed) ? 0 : 1);
}

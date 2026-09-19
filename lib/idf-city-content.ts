/**
 * Resolves what an Île-de-France commune page renders (P3.2) — server-only.
 *
 *   Tier A  → hand-written content from data/idf-cities/<dept>.ts
 *             (falls back to generated content until it is written, and the
 *             QA check reports the gap).
 *   Tier B  → generated from public facts with rotating phrasing.
 *   Tier C  → the same generator, rendered in the lighter template.
 */

import type { FaqItem } from './faq';
import { getIdfCityRef, getNearestIdfCities, distanceToParisKm, type IdfCityRef, type IdfTier } from './idf-cities';
import { getIdfCityContent } from '@/data/idf-cities';
import type { IdfCitySituation, IdfFourriere } from '@/data/idf-cities/types';
import { getIdfCommuneFacts, type IdfCommuneFacts } from '@/data/idf-facts.generated';
import { getIdfDeptHub, type IdfDeptHub } from '@/data/idf-extra-content';
import { generateIdfCityContent } from './idf-city-generated';

export interface ResolvedIdfCity {
  ref: IdfCityRef;
  tier: IdfTier;
  source: 'handwritten' | 'generated';
  facts: IdfCommuneFacts | null;
  hub: IdfDeptHub;
  nearest: Array<IdfCityRef & { distanceKm: number }>;
  distanceToParisKm: number | null;
  /** Real content date for the sitemap, null when generated. */
  updatedAt: string | null;
  intro: string[];
  situations: IdfCitySituation[];
  /** Situations rendered on the rachat page (hand-written content reuses `situations`). */
  rachatSituations: IdfCitySituation[];
  fourriere: IdfFourriere | null;
  /** Department-level fourrière guidance when no commune-level data exists. */
  fourriereText: string | null;
  acces: string[];
  faqEpaviste: FaqItem[];
  rachatIntro: string[];
  faqRachat: FaqItem[];
  sources: string[];
}

export function resolveIdfCity(deptSlug: string, citySlug: string): ResolvedIdfCity | null {
  const ref = getIdfCityRef(deptSlug, citySlug);
  if (!ref) return null;
  const hub = getIdfDeptHub(ref.deptCode);
  if (!hub) return null;
  const facts = getIdfCommuneFacts(deptSlug, citySlug);
  const nearest = getNearestIdfCities(deptSlug, citySlug, 6);
  const toParis = distanceToParisKm(ref);

  const handwritten = getIdfCityContent(deptSlug, citySlug);
  if (handwritten) {
    return {
      ref,
      tier: ref.tier,
      source: 'handwritten',
      facts,
      hub,
      nearest,
      distanceToParisKm: toParis,
      updatedAt: handwritten.updatedAt,
      intro: handwritten.intro,
      situations: handwritten.situations,
      rachatSituations: handwritten.situations,
      fourriere: handwritten.fourriere ?? null,
      fourriereText: handwritten.fourriere ? null : hub.fourriere,
      acces: handwritten.acces,
      faqEpaviste: handwritten.faqEpaviste,
      rachatIntro: handwritten.rachatIntro,
      faqRachat: handwritten.faqRachat,
      sources: handwritten.sources,
    };
  }

  const generated = generateIdfCityContent({
    city: ref,
    facts,
    hub,
    nearest: nearest.map(n => ({ name: n.name, distanceKm: n.distanceKm, deptCode: n.deptCode })),
    distanceToParisKm: toParis,
  });
  return {
    ref,
    tier: ref.tier,
    source: 'generated',
    facts,
    hub,
    nearest,
    distanceToParisKm: toParis,
    updatedAt: null,
    intro: generated.intro,
    situations: generated.situations,
    rachatSituations: generated.rachatSituations,
    fourriere: null,
    fourriereText: generated.fourriere,
    acces: generated.acces,
    faqEpaviste: generated.faqEpaviste,
    rachatIntro: generated.rachatIntro,
    faqRachat: generated.faqRachat,
    sources: [
      'INSEE via geo.api.gouv.fr — population, surface, intercommunalité, centroïde',
      'Métropole du Grand Paris — périmètre de la ZFE',
      ...(ref.deptCode === '75' ? ['paris.fr — fourrières et préfourrières'] : []),
    ],
  };
}

/** Word count of the commune-specific (unique) content for one service. */
export function uniqueWordCount(resolved: ResolvedIdfCity, service: 'epaviste' | 'rachat-voiture'): number {
  const parts =
    service === 'epaviste'
      ? [
          ...resolved.intro,
          ...resolved.situations.flatMap(s => [s.title, s.text]),
          ...(resolved.fourriere ? [resolved.fourriere.name, resolved.fourriere.address, resolved.fourriere.note ?? ''] : [resolved.fourriereText ?? '']),
          ...resolved.acces,
          ...resolved.faqEpaviste.flatMap(f => [f.question, f.answer]),
        ]
      : [
          ...resolved.rachatIntro,
          ...resolved.rachatSituations.flatMap(s => [s.title, s.text]),
          ...resolved.acces,
          ...(resolved.fourriere ? [resolved.fourriere.name, resolved.fourriere.address, resolved.fourriere.note ?? ''] : [resolved.fourriereText ?? '']),
          ...resolved.faqRachat.flatMap(f => [f.question, f.answer]),
        ];
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

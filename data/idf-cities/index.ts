import type { IdfCityContent, IdfCityContentMap } from './types';
import { cities as paris75 } from './paris-75';
import { cities as seineEtMarne77 } from './seine-et-marne-77';
import { cities as yvelines78 } from './yvelines-78';
import { cities as essonne91 } from './essonne-91';
import { cities as hautsDeSeine92 } from './hauts-de-seine-92';
import { cities as seineSaintDenis93 } from './seine-saint-denis-93';
import { cities as valDeMarne94 } from './val-de-marne-94';
import { cities as valDOise95 } from './val-d-oise-95';

export type { IdfCityContent, IdfCityContentMap, IdfFourriere, IdfCitySituation } from './types';

/** Content per IDF department slug, keyed by city slug inside it. */
export const idfCityContentByDept: Record<string, IdfCityContentMap> = {
  'paris-75': paris75,
  'seine-et-marne-77': seineEtMarne77,
  'yvelines-78': yvelines78,
  'essonne-91': essonne91,
  'hauts-de-seine-92': hautsDeSeine92,
  'seine-saint-denis-93': seineSaintDenis93,
  'val-de-marne-94': valDeMarne94,
  'val-d-oise-95': valDOise95,
};

/** Hand-written content for a commune, resolved within its department. */
export function getIdfCityContent(deptSlug: string, citySlug: string): IdfCityContent | null {
  return idfCityContentByDept[deptSlug]?.[citySlug] ?? null;
}

/** Real last-edit date of a commune's content, or null when it is templated. */
export function getIdfCityUpdatedAt(deptSlug: string, citySlug: string): string | null {
  return getIdfCityContent(deptSlug, citySlug)?.updatedAt ?? null;
}

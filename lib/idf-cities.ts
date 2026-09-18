/**
 * Île-de-France commune helpers — server-only (imports the national dataset).
 *
 * Tiers are computed from INSEE population (P3.1 enrichment), never hardcoded:
 *   A — the 20 Paris arrondissements + every commune over 20,000 inhabitants
 *   B — 5,000 to 20,000 inhabitants
 *   C — the rest
 */

import { allDepartments, type City, type Department } from './locations-national';
import { IDF_DEPT_SLUGS } from './idf';

export type IdfTier = 'A' | 'B' | 'C';

export const TIER_A_MIN_POPULATION = 20_000;
export const TIER_B_MIN_POPULATION = 5_000;

export interface IdfCityRef {
  name: string;
  slug: string;
  postalCode: string;
  deptSlug: string;
  deptCode: string;
  deptName: string;
  population: number;
  tier: IdfTier;
  lat?: number;
  lng?: number;
}

/** The 8 IDF departments, in code order. */
export function getIdfDepartments(): Department[] {
  return IDF_DEPT_SLUGS.map(slug => allDepartments.find(d => d.slug === slug)).filter(
    (d): d is Department => Boolean(d)
  );
}

export function getIdfTier(city: Pick<City, 'slug' | 'population'>): IdfTier {
  if (/^paris-\d+(er|e)$/.test(city.slug)) return 'A';
  const pop = city.population ?? 0;
  if (pop >= TIER_A_MIN_POPULATION) return 'A';
  if (pop >= TIER_B_MIN_POPULATION) return 'B';
  return 'C';
}

function toRef(city: City, dept: Department): IdfCityRef {
  return {
    name: city.name,
    slug: city.slug,
    postalCode: city.postalCode,
    deptSlug: dept.slug,
    deptCode: dept.code,
    deptName: dept.name,
    population: city.population ?? 0,
    tier: getIdfTier(city),
    lat: city.lat,
    lng: city.lng,
  };
}

let cache: IdfCityRef[] | null = null;

/** Every IDF commune with its department and tier. */
export function getAllIdfCities(): IdfCityRef[] {
  if (!cache) cache = getIdfDepartments().flatMap(d => d.cities.map(c => toRef(c, d)));
  return cache;
}

/** Most populated IDF communes first (Paris arrondissements count as communes). */
export function getTopIdfCities(limit: number, deptSlug?: string): IdfCityRef[] {
  return getAllIdfCities()
    .filter(c => !deptSlug || c.deptSlug === deptSlug)
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

export function getIdfCityRef(deptSlug: string, citySlug: string): IdfCityRef | undefined {
  return getAllIdfCities().find(c => c.deptSlug === deptSlug && c.slug === citySlug);
}

/** Great-circle distance in km. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la = (a.lat * Math.PI) / 180;
  const lb = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la) * Math.cos(lb) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * The `limit` geographically nearest IDF communes (any IDF department) to a
 * commune, by centroid. Falls back to same-department neighbours in data
 * order when the commune has no coordinates.
 */
export function getNearestIdfCities(deptSlug: string, citySlug: string, limit = 6): Array<IdfCityRef & { distanceKm: number }> {
  const all = getAllIdfCities();
  const origin = all.find(c => c.deptSlug === deptSlug && c.slug === citySlug);
  if (!origin) return [];
  if (origin.lat === undefined || origin.lng === undefined) {
    return all
      .filter(c => c.deptSlug === deptSlug && c.slug !== citySlug)
      .slice(0, limit)
      .map(c => ({ ...c, distanceKm: 0 }));
  }
  const o = { lat: origin.lat, lng: origin.lng };
  return all
    .filter(c => !(c.deptSlug === deptSlug && c.slug === citySlug) && c.lat !== undefined && c.lng !== undefined)
    .map(c => ({ ...c, distanceKm: distanceKm(o, { lat: c.lat as number, lng: c.lng as number }) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

/** Distance from a commune to the centre of Paris (Notre-Dame), rounded. */
export function distanceToParisKm(city: { lat?: number; lng?: number }): number | null {
  if (city.lat === undefined || city.lng === undefined) return null;
  return Math.round(distanceKm({ lat: city.lat, lng: city.lng }, { lat: 48.853, lng: 2.3499 }));
}

/** Tier counts, for reports and the QA check. */
export function getIdfTierCounts(): Record<IdfTier, number> {
  const counts: Record<IdfTier, number> = { A: 0, B: 0, C: 0 };
  getAllIdfCities().forEach(c => counts[c.tier]++);
  return counts;
}

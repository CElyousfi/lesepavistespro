/**
 * Geographic targeting configuration for SEO indexation strategy.
 * Controls which pages are indexed vs noIndex, and which go in sitemaps.
 *
 * Strategy: Prioritize IDF + adjacent regions for indexation.
 * Other regions remain accessible but not actively pushed to indexation.
 */

import { IDF_DEPT_CODES } from './idf';
import { hasCityLocalData } from './city-local-data';
import { prefectures } from '../data/prefectures.generated';

/**
 * Every préfecture and sous-préfecture of France, keyed '<deptSlug>/<citySlug>'
 * (INSEE COG chef-lieux, see scripts/generate-prefectures.ts). They are the
 * most-searched town of each department: indexed and in the sitemaps for
 * both services whatever their department (D3).
 */
export const PREFECTURE_SLUGS: ReadonlySet<string> = new Set(Object.keys(prefectures));

export function isPrefecture(deptSlug: string, citySlug: string): boolean {
  return PREFECTURE_SLUGS.has(`${deptSlug}/${citySlug}`);
}

// Regions adjacent to Île-de-France — target for business expansion
export const LIMITROPHE_REGION_SLUGS = [
  'hauts-de-france',
  'normandie',
  'centre-val-de-loire',
  'grand-est',
  'bourgogne-franche-comte',
];

// Department codes for limitrophe regions (bordering IDF directly)
export const LIMITROPHE_DEPT_CODES = [
  // Hauts-de-France
  '02', '60', '80', '59', '62',
  // Normandie
  '27', '76', '14', '50', '61',
  // Centre-Val de Loire
  '28', '45', '41', '37', '36', '18',
  // Grand Est (bordering IDF)
  '10', '51', '52', '08', '55', '54', '57', '67', '68', '88',
  // Bourgogne-Franche-Comté
  '89', '21', '58', '71', '39', '25', '70', '90',
];

/** All department codes that should be fully indexed */
export const INDEXED_DEPT_CODES = [...IDF_DEPT_CODES, ...LIMITROPHE_DEPT_CODES];

/**
 * Check if a department slug belongs to IDF or limitrophe regions.
 * Extracts dept code from slug format "dept-name-XX"
 */
export function isIndexedDepartment(deptSlug: string): boolean {
  const code = deptSlug.match(/\d+$/)?.[0] || '';
  return INDEXED_DEPT_CODES.includes(code);
}

/**
 * Check if a city should be included in the sitemap.
 * Rules:
 * 1. All IDF cities → included
 * 2. All limitrophe region cities → included
 * 3. Préfectures and sous-préfectures → included
 * 4. Other cities → only if they have local content in city-local-data.ts
 */
export function shouldIncludeInSitemap(deptSlug: string, citySlug: string): boolean {
  if (isIndexedDepartment(deptSlug)) return true;
  if (isPrefecture(deptSlug, citySlug)) return true;
  return hasCityLocalData(deptSlug, citySlug);
}

/**
 * Check if a city page should be noIndex.
 * Rules:
 * 1. IDF/limitrophe department → always index
 * 2. Préfecture or sous-préfecture → index
 * 3. Other department with city-local-data → index
 * 4. Other department without city-local-data → noIndex
 */
export function shouldNoIndex(deptSlug: string, citySlug: string): boolean {
  if (isIndexedDepartment(deptSlug)) return false;
  if (isPrefecture(deptSlug, citySlug)) return false;
  return !hasCityLocalData(deptSlug, citySlug);
}

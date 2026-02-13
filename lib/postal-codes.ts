/**
 * Postal code lookup from existing location data
 * Builds a searchable index of postal codes → city names
 */

import { regions } from '@/lib/locations-national';

export interface PostalCodeEntry {
  code: string;
  city: string;
  department: string;
}

let _cache: PostalCodeEntry[] | null = null;

/** Get all postal code entries (cached) */
export function getAllPostalCodes(): PostalCodeEntry[] {
  if (_cache) return _cache;

  const entries: PostalCodeEntry[] = [];
  for (const region of regions) {
    for (const dept of region.departments) {
      for (const city of dept.cities) {
        entries.push({
          code: city.postalCode,
          city: city.name,
          department: dept.name,
        });
      }
    }
  }

  // Sort by postal code then city name
  entries.sort((a, b) => {
    const codeCompare = a.code.localeCompare(b.code);
    if (codeCompare !== 0) return codeCompare;
    return a.city.localeCompare(b.city, 'fr');
  });

  _cache = entries;
  return entries;
}

/** Search postal codes - returns matching entries (code or city name) */
export function searchPostalCodes(query: string, limit = 30): PostalCodeEntry[] {
  const all = getAllPostalCodes();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // If query is numeric, search by postal code prefix
  if (/^\d+$/.test(q)) {
    return all.filter(e => e.code.startsWith(q)).slice(0, limit);
  }

  // Otherwise search by city name
  return all.filter(e =>
    e.city.toLowerCase().includes(q)
  ).slice(0, limit);
}

/** Get unique postal codes as display strings "CODE - City (Dept)" */
export function getPostalCodeOptions(query: string, limit = 30): string[] {
  const results = searchPostalCodes(query, limit);
  return results.map(e => `${e.code} - ${e.city}`);
}

/** Parse a selected option back to code and city */
export function parsePostalCodeOption(option: string): { code: string; city: string } | null {
  const match = option.match(/^(\d{5})\s*-\s*(.+)$/);
  if (!match) return null;
  return { code: match[1], city: match[2].trim() };
}

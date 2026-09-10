/**
 * Serializable data types for server→client prop passing.
 * These types contain only plain data (no functions, no class instances)
 * so they can cross the server/client boundary without pulling in
 * the full 2.5MB locations-national.ts into the client bundle.
 */

export interface CityData {
  name: string;
  slug: string;
  postalCode: string;
}

export interface DepartmentData {
  name: string;
  code: string;
  slug: string;
  cities: CityData[];
}

/**
 * A department as a region page needs it: name, code, slug and how many
 * communes it covers. Region pages only ever render `cities.length`, so
 * serialising every city (≈5,000 for Grand Est) into the RSC payload made
 * those the heaviest pages on the site at 485 KB.
 */
export interface RegionDepartmentSummary {
  name: string;
  code: string;
  slug: string;
  cityCount: number;
}

export interface RegionData {
  name: string;
  slug: string;
  departments: RegionDepartmentSummary[];
}

export interface ParentRegionData {
  name: string;
  slug: string;
}

/**
 * A department as a CITY page needs it. A city page renders at most 6 "nearby"
 * links and an 8-item neighbouring-cities grid, so it receives that short list
 * (already excluding itself) instead of every commune in the department —
 * serialising the full list cost up to ~180 KB per city page.
 */
export interface CityPageDepartment {
  name: string;
  code: string;
  slug: string;
  /** Total communes in the department, for the "N communes" copy. */
  cityCount: number;
  /** Pre-selected neighbours, current city excluded. */
  nearbyCities: CityData[];
}

/** Minimal city + department info for city pages */
export interface CityPageData {
  city: CityData;
  department: DepartmentData;
}

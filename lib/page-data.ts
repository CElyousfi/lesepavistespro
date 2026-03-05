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

export interface RegionData {
  name: string;
  slug: string;
  departments: DepartmentData[];
}

export interface ParentRegionData {
  name: string;
  slug: string;
}

/** Minimal city + department info for city pages */
export interface CityPageData {
  city: CityData;
  department: DepartmentData;
}

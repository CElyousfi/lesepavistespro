// Backward-compatible re-export from national data
// All existing imports from '@/lib/locations-complete' continue to work unchanged
// Now covers all of France (18 regions, 101 departments, ~35,000 cities)

export type { City, Department, Region } from './locations-national';

export {
  regions,
  allDepartments,
  getAllCities,
  getRegionBySlug,
  getDepartmentBySlug,
  getCityBySlug,
  getRegionForDepartment,
  getAllDepartmentSlugs,
  getAllRegionSlugs,
  getAllLocationUrls,
} from './locations-national';

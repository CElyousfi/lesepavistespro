/**
 * Île-de-France (IDF) Helper Functions & Constants
 * Used to conditionalize IDF-specific SEO content
 */

export const IDF_REGION_SLUG = 'ile-de-france';
export const IDF_DEPT_CODES = ['75', '77', '78', '91', '92', '93', '94', '95'];
export const IDF_DEPT_SLUGS = [
  'paris-75',
  'seine-et-marne-77',
  'yvelines-78',
  'essonne-91',
  'hauts-de-seine-92',
  'seine-saint-denis-93',
  'val-de-marne-94',
  'val-d-oise-95',
];

export function isIdfRegion(regionSlug: string): boolean {
  return regionSlug === IDF_REGION_SLUG;
}

export function isIdfDepartment(deptSlug: string): boolean {
  return IDF_DEPT_SLUGS.includes(deptSlug);
}

export function isIdfDeptCode(code: string): boolean {
  return IDF_DEPT_CODES.includes(code);
}

/** IDF-specific stats for trust signals — only verifiable facts */
export const IDF_STATS = [
  { number: '8', label: 'Départements', description: 'Tous les départements d\'Île-de-France couverts.' },
  { number: '1\u00a0286', label: 'Communes', description: 'Communes desservies en Île-de-France.' },
  { number: '24h/24', label: 'Disponibilité', description: 'Service disponible 7j/7 en Île-de-France.' },
  { number: '100%', label: 'Gratuit', description: 'Enlèvement d\'épave sans frais en IDF.' },
];

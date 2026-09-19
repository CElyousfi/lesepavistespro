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

/** "à Paris", "dans les Hauts-de-Seine"… — locative phrase per department code. */
export const IDF_DEPT_LOCATIVE: Record<string, string> = {
  '75': 'à Paris',
  '77': 'en Seine-et-Marne',
  '78': 'dans les Yvelines',
  '91': 'en Essonne',
  '92': 'dans les Hauts-de-Seine',
  '93': 'en Seine-Saint-Denis',
  '94': 'dans le Val-de-Marne',
  '95': "dans le Val-d'Oise",
};

/** "de Paris", "des Hauts-de-Seine"… — genitive phrase per department code. */
export const IDF_DEPT_GENITIVE: Record<string, string> = {
  '75': 'de Paris',
  '77': 'de Seine-et-Marne',
  '78': 'des Yvelines',
  '91': "de l'Essonne",
  '92': 'des Hauts-de-Seine',
  '93': 'de Seine-Saint-Denis',
  '94': 'du Val-de-Marne',
  '95': "du Val-d'Oise",
};

export function idfLocative(deptCode: string, fallbackName: string): string {
  return IDF_DEPT_LOCATIVE[deptCode] ?? `dans le ${fallbackName}`;
}

export function idfGenitive(deptCode: string, fallbackName: string): string {
  return IDF_DEPT_GENITIVE[deptCode] ?? `du ${fallbackName}`;
}

/**
 * The 8 Île-de-France departments for navigation (header dropdown, mobile
 * menu). Hardcoded because the header is a client component that must not
 * import the 4.7 MB dataset; every entry is asserted to resolve by
 * scripts/check-internal-links.ts on prebuild.
 */
export const IDF_NAV_DEPARTMENTS = [
  { name: 'Paris', code: '75', slug: 'paris-75' },
  { name: 'Seine-et-Marne', code: '77', slug: 'seine-et-marne-77' },
  { name: 'Yvelines', code: '78', slug: 'yvelines-78' },
  { name: 'Essonne', code: '91', slug: 'essonne-91' },
  { name: 'Hauts-de-Seine', code: '92', slug: 'hauts-de-seine-92' },
  { name: 'Seine-Saint-Denis', code: '93', slug: 'seine-saint-denis-93' },
  { name: 'Val-de-Marne', code: '94', slug: 'val-de-marne-94' },
  { name: "Val-d'Oise", code: '95', slug: 'val-d-oise-95' },
] as const;

/**
 * Site URL helper - enforces canonical host with www
 * All absolute URLs must use this helper
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lesepavistespro.fr';
  const u = new URL(raw);
  
  // Enforce https
  u.protocol = 'https:';
  
  // Enforce www subdomain
  if (!u.hostname.startsWith('www.')) {
    u.hostname = `www.${u.hostname}`;
  }
  
  return u.origin; // e.g. https://www.lesepavistespro.fr
}

/**
 * Get full canonical URL for a path
 */
export function getCanonicalUrl(path: string): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Real content-update dates per content family, used for <lastmod>.
 *
 * `new Date()` at request time is worse than no lastmod at all: Google learns
 * that the value is meaningless and ignores the whole signal. Bump the entry
 * for a family only when its content actually changes.
 */
export const CONTENT_UPDATED_AT = {
  /** Homepage, pillars, /zones, legal & informational pages. */
  static: '2026-09-19', // homepage rebuilt IDF-first, /contact hours & service area
  /** Region landing pages (épaviste + rachat). */
  regions: '2026-09-19', // IDF region hub, "Aussi en Île-de-France" block, prime badge removed
  /** Department landing pages (épaviste + rachat). */
  departments: '2026-09-19', // IDF department hubs, badge/copy changes on the national template
  /** City pages — templates + local data. */
  cities: '2026-09-19', // IDF city pages, H1/badge/copy changes on the national city template
  /** Image sitemap entries. */
  images: '2026-09-10',
} as const;

/** ISO-8601 date (YYYY-MM-DD) suitable for a sitemap <lastmod>. */
export function lastmod(family: keyof typeof CONTENT_UPDATED_AT): string {
  return CONTENT_UPDATED_AT[family];
}

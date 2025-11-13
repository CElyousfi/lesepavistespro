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

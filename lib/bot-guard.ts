/**
 * Analytics guard (S3.5): our own monitoring (seo-monitor's Lighthouse runs in
 * headless Chrome) and lab tools were counted as visitors in Vercel Analytics.
 * Kept dependency-free: the same regex is inlined in the layout's GA4 script.
 */
export const BOT_UA_RE = /HeadlessChrome|Lighthouse|LesEpavistesPro-SEO-Monitor|PageSpeed/i;

/** The UA our scripts send (crawler, striking-distance, Lighthouse runs). */
export const MONITOR_UA = 'LesEpavistesPro-SEO-Monitor/1.0';

export function isAutomatedVisit(): boolean {
  if (typeof navigator === 'undefined') return false;
  return BOT_UA_RE.test(navigator.userAgent) || (navigator as Navigator & { webdriver?: boolean }).webdriver === true;
}

/**
 * page_tier for GA4: home / hub / dept / city-A|B|C / intent / guide /
 * centre-vhu / blog / static. Commune tiers come from the data-page-tier
 * attribute rendered by the page; everything else from the path.
 */
export function pageTierFromPath(path: string, attr?: string | null): string {
  if (attr) return attr;
  if (path === '/') return 'home';
  if (/^\/blog(\/|$)/.test(path)) return 'blog';
  if (/^\/guides\//.test(path)) return 'guide';
  if (/^\/centre-vhu-agree\//.test(path)) return 'centre-vhu';
  const m = path.match(/^\/(epaviste|rachat-voiture)(?:\/([^/]+))?(?:\/([^/]+))?$/);
  if (!m) return 'static';
  if (!m[2]) return 'hub';
  if (m[2] === 'ile-de-france') return m[3] ? 'intent' : 'hub';
  if (!m[3]) return /-(\d+|2[ab])$/.test(m[2]) ? 'dept' : 'hub';
  return 'city';
}

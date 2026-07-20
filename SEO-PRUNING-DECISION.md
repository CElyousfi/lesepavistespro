# SEO Pruning Decision — July 2025

## Decision

Reduce the sitemap from ~70,000 URLs (35,000 epaviste + 35,000 rachat-voiture city pages)
to only include:

1. **IDF cities** (8 departments: 75, 77, 78, 91, 92, 93, 94, 95) — ~1,286 cities × 2 services
2. **Limitrophe region cities** (Hauts-de-France, Normandie, Centre-Val de Loire, Grand Est, Bourgogne-Franche-Comté) — ~8,000 cities × 2 services
3. **Other cities with real local content** in `lib/city-local-data.ts` — currently 48 cities × 2 services

**Estimated new sitemap size:** ~18,700 URLs (down from ~70,000).

## Rationale

1. **Thin content dilution:** 34,000+ city pages with identical template content (no local data, no unique text) dilute crawl budget and risk "thin content" classification.
2. **Business focus:** The business operates primarily in IDF and adjacent regions. Pushing 35,000 pages nationally for a service that cannot reliably respond outside IDF creates a credibility gap.
3. **Crawl budget optimization:** Google's crawlers spend limited time per domain. Concentrating indexation on ~19k relevant pages means faster discovery and better ranking for target pages.
4. **No URLs broken:** All pages remain accessible via direct URL. Only the sitemap submission and robots indexation directive change. Users who type a direct URL still reach a functional page.

## Implementation

- **Sitemap:** `app/sitemap-epaviste-cities.xml/route.ts` and `app/sitemap-rachat-cities.xml/route.ts` now filter using `shouldIncludeInSitemap()` from `lib/geo-targeting.ts`.
- **noIndex:** City pages outside IDF/limitrophe without `city-local-data.ts` entry return `robots: { index: false, follow: false }` via the existing `noIndex` parameter in `generateMeta()`.
- **Department pages (101):** Remain indexed — they have minimum real content (200+ words).
- **Region pages (18):** Remain indexed.

## Reversal

To re-index a city outside the current scope:
1. Add an entry for it in `lib/city-local-data.ts` with real local data.
2. It will automatically appear in the sitemap and lose its noIndex tag.

## Date

2025-07-20

/**
 * Search Console actions applied to specific pages (S3.1.c).
 *
 * Source: seo-audit/striking-distance.md (import of 5 October 2026). Every
 * entry is logged in IDF-DOMINATION-REPORT.md (Sprint 3) with the old and new
 * values. Keep this file small and dated: the next import says whether each
 * change worked.
 */

export interface GscPageOverride {
  /** Replaces the generated title (≤ 60 rendered characters). */
  title?: string | { absolute: string };
  /** Replaces the generated description (130–155 characters). */
  description?: string;
}

/** path → override. */
export const GSC_PAGE_OVERRIDES: Record<string, GscPageOverride> = {};

export function getGscPageOverride(path: string): GscPageOverride | undefined {
  return GSC_PAGE_OVERRIDES[path];
}

/**
 * One source for a page's real content date — server-only. Used by the
 * sitemaps (<lastmod>) and by the visible « Mis à jour le » line, so the two
 * can never disagree.
 *
 *   1. a Search Console action changed the page (data/gsc-actions.ts, S3.1.c)
 *   2. its hand-written IDF commune content (data/idf-cities)
 *   3. the content family date (lib/site.ts CONTENT_UPDATED_AT)
 */

import { lastmod, CONTENT_UPDATED_AT } from './site';
import { getIdfCityUpdatedAt } from '@/data/idf-cities';
import { getGscT1Action, GSC_ACTIONS_DATE } from '@/data/gsc-actions';

const latest = (...dates: Array<string | null | undefined>) =>
  dates.filter((d): d is string => Boolean(d)).sort().pop() as string;

export function getPageUpdatedAt(path: string): string {
  const seg = path.split('/').filter(Boolean);
  const gsc = getGscT1Action(path) ? GSC_ACTIONS_DATE : null;
  if (seg.length === 0) return latest(lastmod('static'), gsc);
  if (seg[0] !== 'epaviste' && seg[0] !== 'rachat-voiture') return latest(lastmod('static'), gsc);
  if (seg.length === 1) return latest(lastmod('static'), gsc);
  if (seg.length === 2) return latest(seg[1].match(/-(\d+|2[ab])$/) ? lastmod('departments') : lastmod('regions'), gsc);
  return latest(getIdfCityUpdatedAt(seg[1], seg[2]) ?? lastmod('cities'), lastmod('cities'), gsc);
}

/** French display date: "5 octobre 2026". */
export function formatFrenchDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });
}

export { CONTENT_UPDATED_AT };

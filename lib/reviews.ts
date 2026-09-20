/**
 * Reviews (S2.3). Nothing here is invented: the site shows only reviews the
 * owner has verified (data/idf-testimonials.ts, `verified: true`), and sends
 * clients to Google Business Profile to leave theirs.
 */
import { idfTestimonials, type IdfTestimonial } from '@/data/idf-testimonials';

/**
 * TODO(owner): paste the Google Business Profile "write a review" link
 * (Google Business Profile → Ask for reviews → copy link, of the form
 * https://g.page/r/<id>/review). Until it is filled, /avis hides the
 * "Laisser un avis" button and explains that reviews are collected on Google.
 */
export const GBP_REVIEW_URL = '';

export const REVIEW_CTA_ENABLED = GBP_REVIEW_URL.startsWith('https://');

/** Only reviews explicitly verified by the owner are ever rendered. */
export function getVerifiedTestimonials(): IdfTestimonial[] {
  return idfTestimonials.filter((t) => t.verified === true);
}

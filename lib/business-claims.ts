/**
 * Business claims that only the owner can vouch for.
 *
 * Nothing here is rendered unless `verified` is true — an unverifiable
 * "réponse en 15 minutes" or "500+ clients" is a fabricated trust signal.
 * Flip a flag to true once the number is real and can be backed up.
 */
export const BUSINESS_CLAIMS = {
  /** TODO(owner): confirm the real median callback time before enabling. */
  responseTime: { verified: false, text: 'Réponse sous 15 minutes' },
  /** TODO(owner): confirm the real number of clients served (source needed). */
  clientCount: { verified: false, text: '500+' },
} as const;

/** Copy for the form reassurance line — honest fallback when unverified. */
export const RESPONSE_TIME_COPY = BUSINESS_CLAIMS.responseTime.verified
  ? BUSINESS_CLAIMS.responseTime.text
  : 'Réponse rapide, 7j/7';

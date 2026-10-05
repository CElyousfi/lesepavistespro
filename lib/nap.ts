/**
 * Name, address, phone — the single source for /contact, the footer and the
 * #business / Organization schema (S3.3). They must match the Google Business
 * Profile character for character.
 */
import { BRAND_NAME } from './brand';

export const NAP = {
  name: BRAND_NAME,
  /** As displayed. */
  phone: '06 02 42 73 45',
  /** E.164, for tel: links and schema. */
  phoneE164: '+33602427345',
  email: 'lesepavistespro@gmail.com',
  /**
   * TODO(owner): the street address exactly as on the Google Business Profile
   * (or leave empty for a service-area business without a public address).
   * Never invent one.
   */
  streetAddress: '',
  postalCode: '',
  addressLocality: '',
  /** Shown instead of an address while none is published. */
  serviceArea: 'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)',
} as const;

/**
 * TODO(owner): the public URL of the Google Business Profile (Maps "Share"
 * link, https://maps.app.goo.gl/… or https://www.google.com/maps?cid=…).
 * When set, it is added to `sameAs` and `hasMap` of the #business entity.
 */
export const GBP_PROFILE_URL = '';

/** The website field to paste in the Google Business Profile (S3.3). */
export const GBP_WEBSITE_URL = 'https://www.lesepavistespro.fr/?utm_source=google&utm_medium=gbp';

/** Real social profiles only (sameAs). */
export const SOCIAL_PROFILES = [
  'https://web.facebook.com/profile.php?id=61552439650150',
  'https://www.instagram.com/lesepavistespro',
];

export const SAME_AS = [...SOCIAL_PROFILES, ...(GBP_PROFILE_URL.startsWith('https://') ? [GBP_PROFILE_URL] : [])];

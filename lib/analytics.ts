import { IDF_DEPT_SLUGS, IDF_REGION_SLUG } from './idf';
import { getTrafficSource, type TrafficSource } from './trafficSource';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-RKMW16M4C2';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONVERSION TRACKING STATE (PHASE 4: Budget Protection)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONVERSION_STORAGE_KEY = 'conversions_triggered';

interface ConversionRecord {
  event: string;
  timestamp: number;
}

function getConversionsInSession(): ConversionRecord[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = sessionStorage.getItem(CONVERSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function recordConversion(event: string) {
  if (typeof window === 'undefined') return;
  
  try {
    const conversions = getConversionsInSession();
    conversions.push({
      event,
      timestamp: Date.now(),
    });
    sessionStorage.setItem(CONVERSION_STORAGE_KEY, JSON.stringify(conversions));
  } catch (error) {
    console.warn('Could not record conversion:', error);
  }
}

function hasConvertedBefore(event: string): boolean {
  const conversions = getConversionsInSession();
  return conversions.some(c => c.event === event);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENRICHED EVENT TRACKING (PHASE 3: Attribution)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface EnrichedEventParams {
  traffic_source: TrafficSource;
  page_type?: 'city' | 'department' | 'service' | 'home' | 'intent' | 'other';
  location_slug?: string;
  is_repeat_intent: boolean;
  [key: string]: unknown;
}

function getPageType(): 'city' | 'department' | 'service' | 'home' | 'intent' | 'other' {
  if (typeof window === 'undefined') return 'other';
  
  const path = window.location.pathname;
  
  if (path === '/') return 'home';
  if (path.match(/^\/(epaviste|rachat-voiture)\/ile-de-france\/[^/]+$/)) return 'intent';
  if (path.match(/\/epaviste\/[^/]+\/[^/]+/) || path.match(/\/rachat-voiture\/[^/]+\/[^/]+/)) return 'city';
  if (path.match(/\/epaviste\/[^/]+$/) || path.match(/\/rachat-voiture\/[^/]+$/)) return 'department';
  if (path.match(/\/epaviste$/) || path.match(/\/rachat-voiture$/)) return 'service';
  
  return 'other';
}

function getLocationSlug(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const path = window.location.pathname;
  const match = path.match(/\/(epaviste|rachat-voiture)\/([^/]+)(?:\/([^/]+))?/);
  
  if (match) {
    return match[3] || match[2]; // City slug or department slug
  }
  
  return undefined;
}

/**
 * Service / department / city split of the current location page, plus an
 * Île-de-France flag — so GA4 can segment IDF conversions by commune (P4.3).
 */
function getGeoParams(): { service?: 'epaviste' | 'rachat-voiture'; department_slug?: string; city_slug?: string; intent?: string; is_idf: boolean } {
  if (typeof window === 'undefined') return { is_idf: false };
  const match = window.location.pathname.match(/^\/(epaviste|rachat-voiture)\/([^/]+)(?:\/([^/]+))?/);
  if (!match) return { is_idf: false };
  const [, service, second, third] = match;
  const isRegion = second === IDF_REGION_SLUG;
  const department_slug = isRegion ? undefined : second;
  // /{service}/ile-de-france/<intent> is a situation page (S2.1), not a city.
  const intent = isRegion && third ? third : undefined;
  return {
    service: service as 'epaviste' | 'rachat-voiture',
    department_slug,
    city_slug: intent ? undefined : third || undefined,
    intent,
    is_idf: isRegion || IDF_DEPT_SLUGS.includes(second),
  };
}

function enrichEventParams(baseParams: Record<string, unknown> = {}): EnrichedEventParams {
  const trafficSource = getTrafficSource();
  const pageType = getPageType();
  const locationSlug = getLocationSlug();
  const geo = getGeoParams();
  
  return {
    ...baseParams,
    ...geo,
    traffic_source: trafficSource,
    page_type: pageType,
    location_slug: locationSlug,
    is_repeat_intent: false, // Will be set by individual tracking functions
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CORE TRACKING FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events (base function)
export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONVERSION EVENTS (Enriched with traffic source + repeat detection)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const trackCallClick = (location?: string) => {
  const eventName = 'click_call';
  const isRepeat = hasConvertedBefore(eventName);
  
  const params = enrichEventParams({
    event_category: 'engagement',
    event_label: location || 'unknown',
    is_repeat_intent: isRepeat,
  });
  
  event(eventName, params);
  recordConversion(eventName);
};

export const trackWhatsAppClick = (location?: string) => {
  const eventName = 'click_whatsapp';
  const isRepeat = hasConvertedBefore(eventName);
  
  const params = enrichEventParams({
    event_category: 'engagement',
    event_label: location || 'unknown',
    is_repeat_intent: isRepeat,
  });
  
  event(eventName, params);
  recordConversion(eventName);
};

/** /avis → "Laisser un avis" (Google Business Profile). `src` = how the client got there (sms, whatsapp, site). */
export const trackReviewCtaClick = (src: string) => {
  event('review_cta_click', enrichEventParams({
    event_category: 'engagement',
    event_label: src || 'site',
    review_src: src || 'site',
    is_repeat_intent: false,
  }));
};

/** Sticky mobile bar → "Devis" (scroll to the form). */
export const trackStickyDevisClick = () => {
  event('click_devis_sticky', enrichEventParams({
    event_category: 'engagement',
    event_label: 'mobile_sticky',
    is_repeat_intent: hasConvertedBefore('lead_form_submit'),
  }));
};

/**
 * First interaction with the lead form. Same geo params as the other
 * conversion events (service, department_slug, city_slug, is_idf, intent).
 */
export const trackFormStart = (extra: Record<string, unknown> = {}) => {
  event('form_start', enrichEventParams({
    event_category: 'engagement',
    ...extra,
    is_repeat_intent: hasConvertedBefore('lead_form_submit'),
  }));
};

export const trackFormSubmit = (formType: string) => {
  const eventName = 'lead_form_submit';
  const isRepeat = hasConvertedBefore(eventName);
  
  const params = enrichEventParams({
    event_category: 'conversion',
    event_label: formType,
    is_repeat_intent: isRepeat,
  });
  
  event(eventName, params);
  recordConversion(eventName);
};

export const trackCallbackRequest = (department?: string) => {
  const eventName = 'callback_request';
  const isRepeat = hasConvertedBefore(eventName);
  
  const params = enrichEventParams({
    event_category: 'conversion',
    event_label: department || 'unknown',
    is_repeat_intent: isRepeat,
  });
  
  event(eventName, params);
  recordConversion(eventName);
};
import { getTrafficSource, type TrafficSource } from './trafficSource';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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
  page_type?: 'city' | 'department' | 'service' | 'home' | 'other';
  location_slug?: string;
  is_repeat_intent: boolean;
  [key: string]: any;
}

function getPageType(): 'city' | 'department' | 'service' | 'home' | 'other' {
  if (typeof window === 'undefined') return 'other';
  
  const path = window.location.pathname;
  
  if (path === '/') return 'home';
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

function enrichEventParams(baseParams: Record<string, any> = {}): EnrichedEventParams {
  const trafficSource = getTrafficSource();
  const pageType = getPageType();
  const locationSlug = getLocationSlug();
  
  return {
    ...baseParams,
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
export const event = (action: string, params?: Record<string, any>) => {
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
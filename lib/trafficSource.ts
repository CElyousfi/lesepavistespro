/**
 * TRAFFIC SOURCE DETECTION
 * 
 * Detects visitor source to enable source-aware CTA behavior
 * WITHOUT affecting SEO structure, rankings, or indexing
 * 
 * IMPORTANT:
 * - Session-only persistence (sessionStorage)
 * - Never overwrites once set
 * - No server-side logic (client-only)
 * - No impact on SEO crawlers
 */

export type TrafficSource = 'ads' | 'organic' | 'direct' | 'unknown';

const STORAGE_KEY = 'traffic_source';
const STORAGE_TIMESTAMP_KEY = 'traffic_source_timestamp';

/**
 * Detect traffic source from URL parameters and referrer
 */
function detectTrafficSource(): TrafficSource {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DETECTION 1: Google Ads (highest priority)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    // Method 1: gclid parameter (Google Click ID)
    if (urlParams.has('gclid')) {
      return 'ads';
    }

    // Method 2: UTM parameters indicating paid search
    const utmSource = urlParams.get('utm_source')?.toLowerCase();
    const utmMedium = urlParams.get('utm_medium')?.toLowerCase();
    
    if (
      (utmSource === 'google' || utmSource === 'google_ads') &&
      (utmMedium === 'cpc' || utmMedium === 'ppc' || utmMedium === 'paid')
    ) {
      return 'ads';
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DETECTION 2: Organic search
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    if (referrer) {
      const searchEngines = [
        'google.com',
        'google.fr',
        'bing.com',
        'yahoo.com',
        'duckduckgo.com',
        'ecosia.org',
        'qwant.com',
      ];

      const isFromSearchEngine = searchEngines.some(engine => 
        referrer.includes(engine)
      );

      if (isFromSearchEngine && !urlParams.has('gclid')) {
        return 'organic';
      }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DETECTION 3: Direct traffic
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    if (!referrer || referrer === '') {
      return 'direct';
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DETECTION 4: Unknown (referral, social, etc.)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    return 'unknown';

  } catch (error) {
    console.warn('Traffic source detection error:', error);
    return 'unknown';
  }
}

/**
 * Get traffic source (with session persistence)
 * 
 * Once detected, source is stored in sessionStorage and never overwritten
 * This ensures consistent behavior throughout the user session
 */
export function getTrafficSource(): TrafficSource {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  try {
    // Check if already detected in this session
    const stored = sessionStorage.getItem(STORAGE_KEY) as TrafficSource | null;
    
    if (stored && ['ads', 'organic', 'direct', 'unknown'].includes(stored)) {
      return stored;
    }

    // Detect and store
    const detected = detectTrafficSource();
    sessionStorage.setItem(STORAGE_KEY, detected);
    sessionStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());

    return detected;

  } catch (error) {
    console.warn('Traffic source storage error:', error);
    return detectTrafficSource();
  }
}

/**
 * Check if current visitor is from Google Ads
 */
export function isAdsTraffic(): boolean {
  return getTrafficSource() === 'ads';
}

/**
 * Check if current visitor is from organic search
 */
export function isOrganicTraffic(): boolean {
  return getTrafficSource() === 'organic';
}

/**
 * Get traffic source metadata for analytics
 */
export function getTrafficSourceMetadata() {
  const source = getTrafficSource();
  const timestamp = sessionStorage.getItem(STORAGE_TIMESTAMP_KEY);

  return {
    source,
    detected_at: timestamp ? new Date(parseInt(timestamp)) : null,
    session_id: getSessionId(),
  };
}

/**
 * Get or create session ID
 */
function getSessionId(): string {
  const SESSION_ID_KEY = 'session_id';
  
  try {
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    
    return sessionId;
  } catch {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * FOR TESTING ONLY
 * Manually set traffic source (useful for local development)
 */
export function setTrafficSourceForTesting(source: TrafficSource) {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(STORAGE_KEY, source);
    sessionStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Could not set traffic source for testing:', error);
  }
}

/**
 * FOR TESTING ONLY
 * Clear traffic source detection
 */
export function clearTrafficSource() {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_TIMESTAMP_KEY);
  } catch (error) {
    console.warn('Could not clear traffic source:', error);
  }
}

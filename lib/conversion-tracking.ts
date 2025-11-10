// Conversion Tracking Utilities for Les Épavistes Pro

// Track phone call conversions
export const trackPhoneCallConversion = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual Google Ads conversion ID
      'event_category': 'Phone Call',
      'event_label': source,
      'value': 1.0,
      'currency': 'EUR'
    });
  }

  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Phone Call',
      content_category: source
    });
  }
};

// Track WhatsApp conversions
export const trackWhatsAppConversion = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/WHATSAPP_LABEL', // Replace with actual conversion ID
      'event_category': 'WhatsApp',
      'event_label': source,
      'value': 1.0,
      'currency': 'EUR'
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp',
      content_category: source
    });
  }
};

// Track email conversions
export const trackEmailConversion = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/EMAIL_LABEL',
      'event_category': 'Email',
      'event_label': source,
      'value': 0.5,
      'currency': 'EUR'
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Email',
      content_category: source
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      'event_category': 'Form',
      'event_label': formName,
      'value': 2.0,
      'currency': 'EUR'
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formName
    });
  }
};

// Track scroll depth for engagement
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      'event_category': 'Engagement',
      'event_label': `${depth}%`,
      'value': depth
    });
  }
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      'name': 'page_view_time',
      'value': seconds,
      'event_category': 'Engagement'
    });
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      'event_category': 'CTA',
      'event_label': `${ctaName} - ${location}`,
    });
  }
};

// Track section views (for lazy loading)
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      'event_category': 'Section View',
      'event_label': sectionName
    });
  }
};

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

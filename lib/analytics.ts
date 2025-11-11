declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-RKMW16M4C2';

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
  }
};

// Predefined events
export const trackCallClick = (location?: string) => {
  event('click_call', {
    event_category: 'engagement',
    event_label: location || 'unknown',
  });
};

export const trackWhatsAppClick = (location?: string) => {
  event('click_whatsapp', {
    event_category: 'engagement',
    event_label: location || 'unknown',
  });
};

export const trackFormSubmit = (formType: string) => {
  event('lead_form_submit', {
    event_category: 'conversion',
    event_label: formType,
  });
};

export const trackCallbackRequest = (department?: string) => {
  event('callback_request', {
    event_category: 'conversion',
    event_label: department || 'unknown',
  });
};
/**
 * LEAD ATTRIBUTION & MONETIZATION INFRASTRUCTURE
 * 
 * IMPORTANT: This is infrastructure only - NOT ACTIVATED
 * No UI exposure, no pricing display, no active monetization
 * 
 * Purpose: Prepare for future:
 * - Lead resale
 * - Dispatcher routing
 * - Premium pricing by city demand
 */

export type LeadType = 'urgent_call' | 'non_urgent_whatsapp' | 'form_lead';
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost';

export interface LeadData {
  id: string;
  timestamp: Date;
  type: LeadType;
  source: {
    page: string;
    city?: string;
    department?: string;
    service: 'epaviste' | 'rachat';
  };
  contact: {
    phone?: string;
    email?: string;
    name?: string;
  };
  vehicle?: {
    type?: string;
    brand?: string;
    model?: string;
    year?: string;
    condition?: string;
  };
  metadata: {
    userAgent?: string;
    referrer?: string;
    sessionId?: string;
  };
  status: LeadStatus;
  value?: number; // Hidden pricing hook (not displayed)
}

/**
 * Tag lead based on intent and source
 * Used for internal analytics only
 */
export function tagLead(
  type: LeadType,
  source: LeadData['source'],
  contact: LeadData['contact'],
  vehicle?: LeadData['vehicle']
): LeadData {
  return {
    id: generateLeadId(),
    timestamp: new Date(),
    type,
    source,
    contact,
    vehicle,
    metadata: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      sessionId: getSessionId(),
    },
    status: 'new',
    value: calculateLeadValue(type, source), // Hidden pricing
  };
}

/**
 * Generate unique lead ID
 */
function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('lead_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('lead_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Calculate lead value (HIDDEN - not displayed anywhere)
 * Based on:
 * - Lead type (urgent = higher value)
 * - City demand (high-impression cities = higher value)
 * - Service type (epaviste vs rachat)
 */
function calculateLeadValue(type: LeadType, source: LeadData['source']): number {
  let baseValue = 0;
  
  // Base value by type
  switch (type) {
    case 'urgent_call':
      baseValue = 50; // Highest intent
      break;
    case 'non_urgent_whatsapp':
      baseValue = 30; // Medium intent
      break;
    case 'form_lead':
      baseValue = 40; // Good intent, pre-qualified
      break;
  }
  
  // City multiplier (based on demand)
  const highDemandCities = [
    'paris', 'versailles', 'creteil', 'nanterre', 
    'argenteuil', 'montreuil', 'saint-denis'
  ];
  
  if (source.city && highDemandCities.some(city => 
    source.city?.toLowerCase().includes(city)
  )) {
    baseValue *= 1.3; // 30% premium for high-demand cities
  }
  
  // Service multiplier
  if (source.service === 'rachat') {
    baseValue *= 1.2; // Rachat leads worth more (cash transaction)
  }
  
  return Math.round(baseValue);
}

/**
 * City-level lead attribution
 * Tracks which cities generate most valuable leads
 */
export interface CityAttribution {
  city: string;
  department: string;
  totalLeads: number;
  urgentCalls: number;
  whatsappLeads: number;
  formLeads: number;
  totalValue: number; // Hidden
  averageValue: number; // Hidden
  conversionRate: number;
}

/**
 * Get city attribution data (for internal analysis only)
 */
export function getCityAttribution(leads: LeadData[]): CityAttribution[] {
  const cityMap = new Map<string, CityAttribution>();
  
  leads.forEach(lead => {
    if (!lead.source.city) return;
    
    const key = `${lead.source.city}_${lead.source.department}`;
    const existing = cityMap.get(key) || {
      city: lead.source.city,
      department: lead.source.department || '',
      totalLeads: 0,
      urgentCalls: 0,
      whatsappLeads: 0,
      formLeads: 0,
      totalValue: 0,
      averageValue: 0,
      conversionRate: 0,
    };
    
    existing.totalLeads++;
    if (lead.type === 'urgent_call') existing.urgentCalls++;
    if (lead.type === 'non_urgent_whatsapp') existing.whatsappLeads++;
    if (lead.type === 'form_lead') existing.formLeads++;
    existing.totalValue += lead.value || 0;
    
    cityMap.set(key, existing);
  });
  
  // Calculate averages
  const attributions = Array.from(cityMap.values());
  attributions.forEach(attr => {
    attr.averageValue = attr.totalLeads > 0 
      ? Math.round(attr.totalValue / attr.totalLeads) 
      : 0;
  });
  
  // Sort by total value (highest first)
  return attributions.sort((a, b) => b.totalValue - a.totalValue);
}

/**
 * Pricing hooks (HIDDEN - not displayed)
 * Prepared for future monetization
 */
export const PRICING_TIERS = {
  standard: {
    urgent_call: 50,
    non_urgent_whatsapp: 30,
    form_lead: 40,
  },
  premium_city: {
    urgent_call: 65,
    non_urgent_whatsapp: 39,
    form_lead: 52,
  },
  enterprise: {
    urgent_call: 80,
    non_urgent_whatsapp: 48,
    form_lead: 64,
  },
} as const;

/**
 * Lead quality score (for dispatcher routing)
 */
export function calculateLeadQuality(lead: LeadData): number {
  let score = 50; // Base score
  
  // Intent signal
  if (lead.type === 'urgent_call') score += 30;
  if (lead.type === 'form_lead') score += 20;
  if (lead.type === 'non_urgent_whatsapp') score += 15;
  
  // Completeness
  if (lead.contact.phone) score += 10;
  if (lead.contact.email) score += 5;
  if (lead.contact.name) score += 5;
  
  // Vehicle info
  if (lead.vehicle?.brand) score += 5;
  if (lead.vehicle?.model) score += 5;
  if (lead.vehicle?.year) score += 5;
  
  return Math.min(score, 100);
}

/**
 * Export lead data for CRM integration (future)
 */
export function exportLeadForCRM(lead: LeadData) {
  return {
    id: lead.id,
    timestamp: lead.timestamp.toISOString(),
    type: lead.type,
    quality_score: calculateLeadQuality(lead),
    source_page: lead.source.page,
    source_city: lead.source.city,
    source_department: lead.source.department,
    service: lead.source.service,
    contact_phone: lead.contact.phone,
    contact_email: lead.contact.email,
    contact_name: lead.contact.name,
    vehicle_type: lead.vehicle?.type,
    vehicle_brand: lead.vehicle?.brand,
    vehicle_model: lead.vehicle?.model,
    status: lead.status,
    // value hidden from export
  };
}

/**
 * NOTE: This infrastructure is NOT ACTIVE
 * No UI integration
 * No pricing display
 * No monetization active
 * 
 * Ready for future activation when needed
 */

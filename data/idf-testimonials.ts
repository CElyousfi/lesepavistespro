/**
 * IDF-Specific Testimonials
 * IMPORTANT: This file must only contain real, verified testimonials
 * confirmed by the business owner. See CONTENT-INTEGRITY.md.
 *
 * Previous version contained 20 fabricated testimonials with invented
 * names, quotes, and dates — all removed for compliance.
 */

export interface IdfTestimonial {
  name: string;
  location: string;
  deptCode: string;
  rating: number;
  text: string;
  service: 'epaviste' | 'rachat';
  date: string;
}

// Empty until real verified testimonials are provided by the business owner
export const idfTestimonials: IdfTestimonial[] = [];

/** Get testimonials for a specific IDF department */
export function getIdfTestimonialsByDept(deptCode: string): IdfTestimonial[] {
  return idfTestimonials.filter(t => t.deptCode === deptCode);
}

/** Get testimonials for a specific service type in IDF */
export function getIdfTestimonialsByService(service: 'epaviste' | 'rachat'): IdfTestimonial[] {
  return idfTestimonials.filter(t => t.service === service);
}

/** Get all IDF testimonials (for region page) */
export function getAllIdfTestimonials(): IdfTestimonial[] {
  return idfTestimonials;
}

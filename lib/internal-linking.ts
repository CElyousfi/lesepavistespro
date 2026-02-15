import { getSiteUrl } from './site';
import { regions, allDepartments } from './locations-national';

/**
 * Internal Linking System for SEO
 * Generates contextual internal links to boost topical authority
 * and distribute PageRank across the site hierarchy.
 */

export interface InternalLink {
  text: string;
  href: string;
  title?: string;
}

/**
 * Get related department links for a given department (same region)
 */
export function getRelatedDepartmentLinks(deptSlug: string, service: 'epaviste' | 'rachat-voiture', limit: number = 6): InternalLink[] {
  const dept = allDepartments.find(d => d.slug === deptSlug);
  if (!dept) return [];

  const region = regions.find(r => r.slug === dept.regionSlug);
  if (!region) return [];

  return region.departments
    .filter(d => d.slug !== deptSlug)
    .slice(0, limit)
    .map(d => ({
      text: `${service === 'epaviste' ? 'Épaviste' : 'Rachat voiture'} ${d.name} (${d.code})`,
      href: `/${service}/${d.slug}`,
      title: `${service === 'epaviste' ? 'Enlèvement d\'épave gratuit' : 'Rachat de voiture'} dans le ${d.name}`,
    }));
}

/**
 * Get parent region link for a department
 */
export function getParentRegionLink(deptSlug: string, service: 'epaviste' | 'rachat-voiture'): InternalLink | null {
  const dept = allDepartments.find(d => d.slug === deptSlug);
  if (!dept) return null;

  const region = regions.find(r => r.slug === dept.regionSlug);
  if (!region) return null;

  return {
    text: `${service === 'epaviste' ? 'Épaviste' : 'Rachat voiture'} ${region.name}`,
    href: `/${service}/${region.slug}`,
    title: `Tous les départements de ${region.name}`,
  };
}

/**
 * Get pillar page links (always link back to pillar pages for authority)
 */
export function getPillarLinks(): InternalLink[] {
  return [
    {
      text: 'Épaviste France',
      href: '/epaviste',
      title: 'Service d\'enlèvement d\'épave gratuit partout en France',
    },
    {
      text: 'Rachat voiture France',
      href: '/rachat-voiture',
      title: 'Rachat de voiture sans contrôle technique partout en France',
    },
    {
      text: 'Zones d\'intervention',
      href: '/zones',
      title: 'Toutes nos zones d\'intervention en France',
    },
  ];
}

/**
 * Get contextual blog links based on service type
 */
export function getContextualBlogLinks(service: 'epaviste' | 'rachat-voiture'): InternalLink[] {
  if (service === 'epaviste') {
    return [
      {
        text: 'Comment faire enlever une épave gratuitement ?',
        href: '/blog/comment-enlever-epave-gratuit-ile-de-france',
        title: 'Guide complet pour l\'enlèvement d\'épave gratuit',
      },
      {
        text: 'Certificat de destruction VHU : tout savoir',
        href: '/blog/certificat-destruction-vhu-obligatoire',
        title: 'Pourquoi le certificat de destruction est obligatoire',
      },
    ];
  }

  return [
    {
      text: 'Rachat de voiture accidentée : obtenir le meilleur prix',
      href: '/blog/rachat-voiture-accidentee-meilleur-prix',
      title: 'Conseils pour maximiser le prix de rachat de votre véhicule',
    },
  ];
}

/**
 * Get nearby city links for a given city (same department)
 */
export function getNearbyCityLinks(
  deptSlug: string,
  citySlug: string,
  service: 'epaviste' | 'rachat-voiture',
  limit: number = 8
): InternalLink[] {
  const dept = allDepartments.find(d => d.slug === deptSlug);
  if (!dept) return [];

  return dept.cities
    .filter(c => c.slug !== citySlug)
    .slice(0, limit)
    .map(c => ({
      text: `${service === 'epaviste' ? 'Épaviste' : 'Rachat voiture'} ${c.name}`,
      href: `/${service}/${deptSlug}/${c.slug}`,
      title: `${service === 'epaviste' ? 'Enlèvement d\'épave' : 'Rachat de voiture'} à ${c.name}`,
    }));
}

/**
 * Get cross-service link (épaviste <-> rachat-voiture)
 */
export function getCrossServiceLink(
  currentService: 'epaviste' | 'rachat-voiture',
  slug?: string
): InternalLink {
  const otherService = currentService === 'epaviste' ? 'rachat-voiture' : 'epaviste';
  const path = slug ? `/${otherService}/${slug}` : `/${otherService}`;

  return {
    text: currentService === 'epaviste'
      ? 'Rachat de voiture – Paiement cash immédiat'
      : 'Enlèvement d\'épave gratuit 24h/24',
    href: path,
    title: currentService === 'epaviste'
      ? 'Découvrez notre service de rachat de véhicules'
      : 'Découvrez notre service d\'enlèvement d\'épave gratuit',
  };
}

/**
 * Generate full breadcrumb trail for any page
 */
export function generateBreadcrumbs(
  segments: Array<{ label: string; path: string }>
): Array<{ name: string; url: string }> {
  const baseUrl = getSiteUrl();

  return [
    { name: 'Accueil', url: baseUrl },
    ...segments.map(s => ({
      name: s.label,
      url: `${baseUrl}${s.path}`,
    })),
  ];
}

/**
 * Get footer SEO links (important pages for crawl depth)
 */
export function getFooterSEOLinks(): InternalLink[] {
  return [
    { text: 'Épaviste France', href: '/epaviste' },
    { text: 'Rachat voiture', href: '/rachat-voiture' },
    { text: 'Zones d\'intervention', href: '/zones' },
    { text: 'Blog', href: '/blog' },
    { text: 'FAQ', href: '/faq' },
    { text: 'Contact', href: '/contact' },
    { text: 'Conformité VHU', href: '/conformite-vhu' },
    { text: 'Documents', href: '/documents' },
    { text: 'Guide rachat sans CT', href: '/guides/rachat-sans-ct' },
  ];
}

'use client';

import Link from 'next/link';
import { MapPin } from '@phosphor-icons/react';

interface IdfInternalLinksProps {
  service: 'epaviste' | 'rachat-voiture';
  currentDeptSlug?: string;
  currentCitySlug?: string;
}

const IDF_DEPARTMENTS = [
  { name: 'Paris', code: '75', slug: 'paris-75' },
  { name: 'Seine-et-Marne', code: '77', slug: 'seine-et-marne-77' },
  { name: 'Yvelines', code: '78', slug: 'yvelines-78' },
  { name: 'Essonne', code: '91', slug: 'essonne-91' },
  { name: 'Hauts-de-Seine', code: '92', slug: 'hauts-de-seine-92' },
  { name: 'Seine-Saint-Denis', code: '93', slug: 'seine-saint-denis-93' },
  { name: 'Val-de-Marne', code: '94', slug: 'val-de-marne-94' },
  { name: "Val-d'Oise", code: '95', slug: 'val-d-oise-95' },
];

const IDF_KEY_CITIES: Record<string, { name: string; slug: string; deptSlug: string }[]> = {
  'paris-75': [
    { name: 'Paris 10e', slug: 'paris-10e', deptSlug: 'paris-75' },
    { name: 'Paris 11e', slug: 'paris-11e', deptSlug: 'paris-75' },
    { name: 'Paris 15e', slug: 'paris-15e', deptSlug: 'paris-75' },
    { name: 'Paris 18e', slug: 'paris-18e', deptSlug: 'paris-75' },
    { name: 'Paris 19e', slug: 'paris-19e', deptSlug: 'paris-75' },
    { name: 'Paris 20e', slug: 'paris-20e', deptSlug: 'paris-75' },
  ],
  'seine-et-marne-77': [
    { name: 'Meaux', slug: 'meaux', deptSlug: 'seine-et-marne-77' },
    { name: 'Melun', slug: 'melun', deptSlug: 'seine-et-marne-77' },
    { name: 'Chelles', slug: 'chelles', deptSlug: 'seine-et-marne-77' },
    { name: 'Pontault-Combault', slug: 'pontault-combault', deptSlug: 'seine-et-marne-77' },
    { name: 'Savigny-le-Temple', slug: 'savigny-le-temple', deptSlug: 'seine-et-marne-77' },
    { name: 'Torcy', slug: 'torcy', deptSlug: 'seine-et-marne-77' },
  ],
  'yvelines-78': [
    { name: 'Versailles', slug: 'versailles', deptSlug: 'yvelines-78' },
    { name: 'Sartrouville', slug: 'sartrouville', deptSlug: 'yvelines-78' },
    { name: 'Poissy', slug: 'poissy', deptSlug: 'yvelines-78' },
    { name: 'Mantes-la-Jolie', slug: 'mantes-la-jolie', deptSlug: 'yvelines-78' },
    { name: 'Plaisir', slug: 'plaisir', deptSlug: 'yvelines-78' },
    { name: 'Les Mureaux', slug: 'les-mureaux', deptSlug: 'yvelines-78' },
  ],
  'essonne-91': [
    { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes', deptSlug: 'essonne-91' },
    { name: 'Corbeil-Essonnes', slug: 'corbeil-essonnes', deptSlug: 'essonne-91' },
    { name: 'Massy', slug: 'massy', deptSlug: 'essonne-91' },
    { name: 'Savigny-sur-Orge', slug: 'savigny-sur-orge', deptSlug: 'essonne-91' },
    { name: 'Viry-Châtillon', slug: 'viry-chatillon', deptSlug: 'essonne-91' },
    { name: 'Grigny', slug: 'grigny', deptSlug: 'essonne-91' },
  ],
  'hauts-de-seine-92': [
    { name: 'Nanterre', slug: 'nanterre', deptSlug: 'hauts-de-seine-92' },
    { name: 'Boulogne-Billancourt', slug: 'boulogne-billancourt', deptSlug: 'hauts-de-seine-92' },
    { name: 'Colombes', slug: 'colombes', deptSlug: 'hauts-de-seine-92' },
    { name: 'Courbevoie', slug: 'courbevoie', deptSlug: 'hauts-de-seine-92' },
    { name: 'Rueil-Malmaison', slug: 'rueil-malmaison', deptSlug: 'hauts-de-seine-92' },
    { name: 'Issy-les-Moulineaux', slug: 'issy-les-moulineaux', deptSlug: 'hauts-de-seine-92' },
  ],
  'seine-saint-denis-93': [
    { name: 'Saint-Denis', slug: 'st-denis', deptSlug: 'seine-saint-denis-93' },
    { name: 'Montreuil', slug: 'montreuil', deptSlug: 'seine-saint-denis-93' },
    { name: 'Aulnay-sous-Bois', slug: 'aulnay-sous-bois', deptSlug: 'seine-saint-denis-93' },
    { name: 'Bondy', slug: 'bondy', deptSlug: 'seine-saint-denis-93' },
    { name: 'Pantin', slug: 'pantin', deptSlug: 'seine-saint-denis-93' },
    { name: 'Drancy', slug: 'drancy', deptSlug: 'seine-saint-denis-93' },
  ],
  'val-de-marne-94': [
    { name: 'Créteil', slug: 'creteil', deptSlug: 'val-de-marne-94' },
    { name: 'Vitry-sur-Seine', slug: 'vitry-sur-seine', deptSlug: 'val-de-marne-94' },
    { name: 'Champigny-sur-Marne', slug: 'champigny-sur-marne', deptSlug: 'val-de-marne-94' },
    { name: 'Ivry-sur-Seine', slug: 'ivry-sur-seine', deptSlug: 'val-de-marne-94' },
    { name: 'Maisons-Alfort', slug: 'maisons-alfort', deptSlug: 'val-de-marne-94' },
    { name: 'Vincennes', slug: 'vincennes', deptSlug: 'val-de-marne-94' },
  ],
  'val-d-oise-95': [
    { name: 'Argenteuil', slug: 'argenteuil', deptSlug: 'val-d-oise-95' },
    { name: 'Cergy', slug: 'cergy', deptSlug: 'val-d-oise-95' },
    { name: 'Sarcelles', slug: 'sarcelles', deptSlug: 'val-d-oise-95' },
    { name: 'Bezons', slug: 'bezons', deptSlug: 'val-d-oise-95' },
    { name: 'Garges-lès-Gonesse', slug: 'garges-les-gonesse', deptSlug: 'val-d-oise-95' },
    { name: 'Franconville', slug: 'franconville', deptSlug: 'val-d-oise-95' },
  ],
};

export default function IdfInternalLinks({ service, currentDeptSlug, currentCitySlug }: IdfInternalLinksProps) {
  const otherService = service === 'epaviste' ? 'rachat-voiture' : 'epaviste';
  const otherServiceLabel = service === 'epaviste' ? 'Rachat de voiture' : 'Épaviste';
  const isGold = service === 'rachat-voiture';

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className={`${isGold ? 'text-brand-gold' : 'text-brand-red'} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
              Maillage Île-de-France
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
              {service === 'epaviste' ? 'Épaviste' : 'Rachat voiture'} dans tous les départements IDF
            </h2>
            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
              Nous intervenons dans les 8 départements d&apos;Île-de-France, soit plus de 1 200 communes couvertes.
              Intervention rapide 24h/24. 09 79 04 94 86.
            </p>
          </div>

          {/* Department Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {IDF_DEPARTMENTS.map((dept) => {
              const isCurrent = dept.slug === currentDeptSlug;
              return (
                <Link
                  key={dept.slug}
                  href={`/${service}/${dept.slug}`}
                  className={`flex items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all text-sm sm:text-base font-medium ${
                    isCurrent
                      ? `${isGold ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-brand-red bg-brand-red/5 text-brand-red'}`
                      : 'border-neutral-200 hover:border-brand-navy/20 hover:bg-brand-navy/[0.02] text-brand-navy'
                  }`}
                >
                  <MapPin size={16} weight="fill" className={isCurrent ? '' : 'text-neutral-400'} />
                  {dept.name} ({dept.code})
                </Link>
              );
            })}
          </div>

          {/* Key City Links per Department */}
          {currentDeptSlug && IDF_KEY_CITIES[currentDeptSlug] && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-brand-navy mb-4">Villes principales</h3>
              <div className="flex flex-wrap gap-2">
                {IDF_KEY_CITIES[currentDeptSlug]
                  .filter(city => city.slug !== currentCitySlug)
                  .map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${service}/${city.deptSlug}/${city.slug}`}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        isGold
                          ? 'border-brand-gold/20 hover:bg-brand-gold/5 text-brand-navy hover:border-brand-gold/40'
                          : 'border-brand-red/20 hover:bg-brand-red/5 text-brand-navy hover:border-brand-red/40'
                      }`}
                    >
                      {service === 'epaviste' ? 'Épaviste' : 'Rachat'} {city.name}
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Cross-Service Link */}
          <div className="text-center pt-6 border-t border-neutral-100">
            <p className="text-neutral-500 text-sm mb-3">Vous cherchez un autre service en Île-de-France ?</p>
            <Link
              href={`/${otherService}/ile-de-france`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isGold
                  ? 'bg-brand-red/10 text-brand-red hover:bg-brand-red/20'
                  : 'bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20'
              }`}
            >
              {otherServiceLabel} en Île-de-France →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

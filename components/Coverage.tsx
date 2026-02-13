'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from '@phosphor-icons/react';
import { regions } from '@/lib/locations-complete';
import ScrollAnimation from './ScrollAnimation';

const Coverage = () => {
  const keyDepts = regions.flatMap(r => r.departments).slice(0, 16);
  const topCities = keyDepts.flatMap(dept => 
    dept.cities.slice(0, 1).map(city => ({
      name: city.name,
      slug: city.slug,
      deptSlug: dept.slug,
      postalCode: city.postalCode
    }))
  );

  return (
    <section id="couverture" className="py-24 md:py-32 bg-white relative">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Couverture</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Couverture nationale complète
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Intervention rapide dans les 18 régions de France. Plus de 35 000 communes desservies.
              </p>
            </div>
          </ScrollAnimation>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {regions.filter(r => !['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug)).map((region, index) => (
              <ScrollAnimation key={region.slug} delay={index * 0.03}>
                <Link
                  href={`/epaviste/${region.slug}`}
                  className="block bg-white rounded-xl p-5 border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <MapPin size={18} weight="bold" className="text-brand-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-brand-navy group-hover:text-brand-red transition-colors truncate">
                        {region.name}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {region.departments.length} dép. &middot; {region.departments.reduce((sum, d) => sum + d.cities.length, 0)} communes
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {/* Key Cities */}
          <ScrollAnimation>
            <div className="bg-brand-surface rounded-2xl p-8 md:p-10 border border-neutral-200">
              <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-8 text-center tracking-tight">
                Principales villes desservies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {topCities.map((city, index) => (
                  <Link
                    key={index}
                    href={`/epaviste/${city.deptSlug}/${city.slug}`}
                    className="flex items-center gap-2 py-2.5 px-3 bg-white rounded-lg text-sm font-medium text-neutral-600 hover:bg-brand-red/5 hover:text-brand-red border border-neutral-100 hover:border-brand-red/20 transition-all"
                  >
                    <MapPin size={14} weight="bold" className="flex-shrink-0 text-brand-red/50" />
                    <span className="truncate">{city.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link 
                  href="/epaviste"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-full font-semibold text-sm hover:bg-brand-red/90 transition-all"
                >
                  Voir toutes les zones
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
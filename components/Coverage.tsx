'use client';

import Link from 'next/link';
import { MapPin } from '@phosphor-icons/react';
import { allDepartments } from '@/lib/locations-complete';

const Coverage = () => {
  // Get top cities from each department
  const topCities = allDepartments.flatMap(dept => 
    dept.cities.slice(0, 2).map(city => ({
      name: city.name,
      slug: city.slug,
      deptSlug: dept.slug,
      postalCode: city.postalCode
    }))
  );

  return (
    <section id="couverture" className="py-20 md:py-28 bg-neutral-50">
      {/* Boxed container with 5% padding */}
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Couverture complète de l'Île-de-France
            </h2>
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              Intervention rapide dans les 8 départements de la région. Plus de 1 200 communes desservies.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {allDepartments.map((dept) => (
              <Link
                key={dept.code}
                href={`/epaviste/${dept.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-neutral-200 hover:border-brand-blue group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-blue/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                    <MapPin size={24} weight="bold" className="text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-neutral-500 mb-1 font-medium">{dept.code}</div>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand-blue transition-colors mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {dept.cities.length} villes
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Key Cities List - Now with clickable links */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border-2 border-neutral-200">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center tracking-tight">
              Principales villes desservies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topCities.map((city, index) => (
                <Link
                  key={index}
                  href={`/epaviste/${city.deptSlug}/${city.slug}`}
                  className="flex items-center gap-2 py-3 px-4 bg-neutral-50 rounded-xl text-sm font-medium text-neutral-700 hover:bg-brand-blue/5 hover:text-brand-blue hover:border-brand-blue border-2 border-transparent transition-all"
                >
                  <MapPin size={16} weight="bold" className="flex-shrink-0 text-brand-red" />
                  <span className="truncate">{city.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-neutral-600 mb-4">
                Et toutes les autres communes d'Île-de-France...
              </p>
              <Link 
                href="/epaviste"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-light text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <MapPin size={20} weight="bold" />
                Voir toutes les zones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
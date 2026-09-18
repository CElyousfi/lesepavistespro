import Link from 'next/link';
import { MapPin, Truck, CurrencyEur, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export interface IdfCoverageDepartment {
  name: string;
  code: string;
  slug: string;
  cityCount: number;
}

export interface IdfCoverageCity {
  name: string;
  slug: string;
  deptSlug: string;
  deptCode: string;
}

interface IdfCoverageProps {
  departments: IdfCoverageDepartment[];
  topCities: IdfCoverageCity[];
}

/**
 * Above-the-fold Île-de-France coverage: the 8 departments as big links
 * (both services) and the most-searched communes, computed from INSEE
 * population — never a hardcoded slug list. Server component.
 */
export default function IdfCoverage({ departments, topCities }: IdfCoverageProps) {
  return (
    <section id="ile-de-france" className="py-16 md:py-24 bg-brand-surface border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Île-de-France</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
              Les 8 départements d&apos;Île-de-France
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Choisissez votre département pour l&apos;enlèvement gratuit de votre épave ou le rachat de votre voiture.
              Paris et petite couronne&nbsp;: intervention sous 2&nbsp;h.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {departments.map((dept) => (
              <li key={dept.slug} className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-brand-red/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-red font-bold text-sm">{dept.code}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-brand-navy leading-tight">{dept.name}</h3>
                    <p className="text-xs text-neutral-500">{dept.cityCount} communes</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/epaviste/${dept.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:underline underline-offset-4">
                    <Truck size={16} weight="bold" /> Épaviste {dept.name}
                  </Link>
                  <Link href={`/rachat-voiture/${dept.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline underline-offset-4">
                    <CurrencyEur size={16} weight="bold" /> Rachat voiture {dept.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200">
            <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-2 text-center tracking-tight">
              Villes les plus demandées en Île-de-France
            </h3>
            <p className="text-sm text-neutral-500 text-center mb-8">
              Chaque page détaille les situations locales&nbsp;: parkings souterrains, fourrière, accès, documents.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {topCities.map((city) => (
                <li key={`${city.deptSlug}/${city.slug}`}>
                  <Link
                    href={`/epaviste/${city.deptSlug}/${city.slug}`}
                    className="flex items-center gap-2 py-2.5 px-3 bg-brand-surface rounded-lg text-sm font-medium text-neutral-700 hover:bg-brand-red/5 hover:text-brand-red border border-neutral-100 hover:border-brand-red/20 transition-all"
                  >
                    <MapPin size={14} weight="bold" className="flex-shrink-0 text-brand-red/50" />
                    <span className="truncate">{city.name}</span>
                    <span className="ml-auto text-xs text-neutral-400">{city.deptCode}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/epaviste/ile-de-france" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white rounded-full font-semibold text-sm hover:bg-brand-red/90 transition-all">
                Épaviste Île-de-France <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href="/rachat-voiture/ile-de-france" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-white rounded-full font-semibold text-sm hover:bg-brand-gold/90 transition-all">
                Rachat voiture Île-de-France <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

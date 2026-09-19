import Link from 'next/link';
import { idfGenitive } from '@/lib/idf';

export interface IdfCommuneLink {
  name: string;
  slug: string;
  postalCode: string;
}

interface IdfCommuneIndexProps {
  service: 'epaviste' | 'rachat-voiture';
  deptSlug: string;
  deptCode: string;
  deptName: string;
  cities: IdfCommuneLink[];
  /** Groups larger than this open collapsed (details/summary) — links stay in the HTML. */
  collapseAbove?: number;
}

/** First letter for grouping, accents stripped ("Évry" → "E"). */
function initial(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .charAt(0)
    .toUpperCase();
}

/**
 * Every commune of an IDF department as a link, grouped alphabetically.
 * Server component: all links are in the static HTML for crawlers; large
 * departments (Seine-et-Marne: 507 communes) are visually collapsed with
 * native <details>, never withheld behind client-side pagination.
 */
export default function IdfCommuneIndex({ service, deptSlug, deptCode, deptName, cities, collapseAbove = 120 }: IdfCommuneIndexProps) {
  const sorted = [...cities].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  const groups = new Map<string, IdfCommuneLink[]>();
  for (const city of sorted) {
    const key = initial(city.name);
    groups.set(key, [...(groups.get(key) || []), city]);
  }
  const collapsed = cities.length > collapseAbove;
  const label = service === 'epaviste' ? 'Épaviste' : 'Rachat voiture';

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-200" aria-labelledby="communes-title">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Toutes les communes</span>
            <h2 id="communes-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
              {label} dans les {cities.length} {deptCode === '75' ? 'arrondissements' : 'communes'} {idfGenitive(deptCode, deptName)}
            </h2>
            <p className="text-neutral-600 mt-3">
              Chaque commune a sa page avec les situations locales, la fourrière et les documents à préparer.
            </p>
          </div>

          <div className={collapsed ? 'space-y-2' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {Array.from(groups.entries()).map(([letter, list]) =>
              collapsed ? (
                <details key={letter} className="group rounded-xl border border-neutral-200 bg-white open:shadow-sm">
                  <summary className="cursor-pointer select-none px-4 py-3 flex items-center justify-between font-semibold text-brand-navy">
                    <span>{letter} <span className="text-neutral-400 font-normal text-sm">({list.length} commune{list.length > 1 ? 's' : ''})</span></span>
                    <span className="text-neutral-400 text-sm group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <ul className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 [&_a]:text-sm [&_a]:text-neutral-700 [&_a:hover]:text-brand-red [&_a]:leading-6">
                    {list.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/${service}/${deptSlug}/${city.slug}`}>{city.name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <div key={letter}>
                  <h3 className="font-semibold text-brand-navy mb-2 border-b border-neutral-100 pb-1">{letter}</h3>
                  <ul className="[&_a]:text-sm [&_a]:text-neutral-700 [&_a:hover]:text-brand-red [&_a]:leading-6">
                    {list.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/${service}/${deptSlug}/${city.slug}`}>
                          {city.name} <span className="text-neutral-400 text-xs">{city.postalCode}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

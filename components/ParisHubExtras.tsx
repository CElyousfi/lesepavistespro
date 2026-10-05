import Link from 'next/link';
import { MapPin, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { getIdfDepartments } from '@/lib/idf-cities';
import { PARIS_ARRONDISSEMENT_LINES } from '@/data/paris-arrondissements';
import { PARIS_FOURRIERE_SITES, PARIS_FOURRIERE_SOURCE, PARIS_TARIF, PARIS_TARIF_2RM, FOURRIERES_CHECKED_AT } from '@/data/idf-fourrieres';
import { ZFE_PARIS_PARAGRAPH, ZFE_SOURCES } from '@/data/zfe-grand-paris';
import { formatFrenchDate } from '@/lib/lastmod';

/**
 * Paris mega-hub (S3.3) — rendered on /epaviste/paris-75 and
 * /rachat-voiture/paris-75 only: the 20 arrondissements as cards (one local
 * line each, population from INSEE), the Ville de Paris fourrière table and
 * the ZFE paragraph. Server component; every link is in the HTML.
 */
export default function ParisHubExtras({ service }: { service: 'epaviste' | 'rachat-voiture' }) {
  const isRachat = service === 'rachat-voiture';
  const label = isRachat ? 'Rachat voiture' : 'Épaviste';
  const accent = isRachat ? 'text-brand-gold' : 'text-brand-red';
  const paris = getIdfDepartments().find((d) => d.code === '75');
  const arrondissements = [...(paris?.cities ?? [])].sort((a, b) => parseInt(a.slug.slice(6), 10) - parseInt(b.slug.slice(6), 10));

  return (
    <>
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200" id="arrondissements">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>20 arrondissements</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
                {isRachat ? 'Rachat de voiture dans votre arrondissement' : 'Épaviste dans votre arrondissement'}
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {arrondissements.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${service}/paris-75/${a.slug}`}
                    className="flex flex-col h-full p-5 bg-brand-surface rounded-2xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all group"
                  >
                    <span className="flex items-center gap-2 font-bold text-brand-navy group-hover:text-brand-red">
                      <MapPin size={16} weight="bold" className={accent} />
                      {label} {a.name}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1">
                      {a.postalCode}
                      {a.population ? ` · ${a.population.toLocaleString('fr-FR')} hab.` : ''}
                    </span>
                    <span className="text-sm text-neutral-600 leading-relaxed mt-3">{PARIS_ARRONDISSEMENT_LINES[a.slug]}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-neutral-400 text-center">Population : INSEE (geo.api.gouv.fr).</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-brand-surface border-t border-neutral-200" id="fourrieres-paris">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight mb-4">Fourrières de Paris</h2>
            <p className="text-neutral-700 leading-relaxed mb-8">
              Un véhicule enlevé à Paris passe d&apos;abord par l&apos;une des cinq préfourrières, puis, après 2 à 5 jours, par l&apos;une des
              trois fourrières. Pour savoir où il se trouve : le 3975 ou le portail « Où est mon véhicule ? ». Si vous ne voulez pas le
              récupérer, nous pouvons organiser sa destruction avec votre mandat.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50 text-brand-navy">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Site</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Adresse</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Téléphone</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Horaires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  {PARIS_FOURRIERE_SITES.map((f) => (
                    <tr key={f.name}>
                      <td className="px-4 py-3 align-top">
                        <span className="font-semibold text-brand-navy">{f.name}</span>
                        <span className="block text-xs text-neutral-500">{f.kind} · {f.where}</span>
                      </td>
                      <td className="px-4 py-3 align-top">{f.address}</td>
                      <td className="px-4 py-3 align-top whitespace-nowrap">{f.phone}</td>
                      <td className="px-4 py-3 align-top">{f.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-600">Tarifs : {PARIS_TARIF} ; {PARIS_TARIF_2RM}.</p>
            <p className="mt-2 text-xs text-neutral-400">
              Source :{' '}
              <a href={PARIS_FOURRIERE_SOURCE.url} rel="noopener" className="underline underline-offset-2">
                {PARIS_FOURRIERE_SOURCE.label}
              </a>
              , vérifié le {formatFrenchDate(FOURRIERES_CHECKED_AT)}.{' '}
              <Link href="/guides/fourrieres-ile-de-france" className="underline underline-offset-2">
                Toutes les fourrières d&apos;Île-de-France
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-t border-neutral-200" id="zfe-grand-paris">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">ZFE Grand Paris 2026</h2>
            <p className="text-neutral-700 leading-relaxed">
              {ZFE_PARIS_PARAGRAPH}{' '}
              {isRachat
                ? 'Une voiture Crit’Air 3 ou plus garde une valeur de rachat : nous la reprenons sans contrôle technique, paiement le jour de l’enlèvement.'
                : 'Une voiture qui ne peut plus circuler et ne roule plus part gratuitement, avec un certificat de destruction.'}
            </p>
            <p className="mt-4 text-sm">
              <Link href="/guides/zfe-grand-paris" className={`inline-flex items-center gap-1.5 font-semibold ${accent} hover:underline underline-offset-4`}>
                Le guide complet de la ZFE du Grand Paris <CaretRight size={12} weight="bold" />
              </Link>
            </p>
            <p className="mt-2 text-xs text-neutral-400">Sources : {ZFE_SOURCES.map((s) => s.label).join(' · ')}.</p>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { MapPin, CaretRight, Truck, CurrencyEur, CheckCircle, Clock, Shield } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import IdfFaq from '@/components/IdfFaq';
import IdfCommuneIndex from '@/components/IdfCommuneIndex';
import type { IdfDeptHub } from '@/data/idf-extra-content';
import type { FaqItem } from '@/lib/faq';
import { IDF_DEPT_SLUGS, idfLocative, idfGenitive } from '@/lib/idf';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';
import { getIdfDepartments, getTopIdfCities } from '@/lib/idf-cities';

interface IdfDepartmentPageProps {
  service: 'epaviste' | 'rachat-voiture';
  dept: { name: string; code: string; slug: string; cities: Array<{ name: string; slug: string; postalCode: string }> };
  hub: IdfDeptHub;
  faqItems: FaqItem[];
  /** Two blog posts relevant to this department/service. */
  guides: Array<{ title: string; href: string }>;
}

/** How many most-populated communes get a card. */
const TOP_CITY_CARDS = 12;

/**
 * Dedicated Île-de-France department hub (P2.2) — server component.
 *
 * Renders, for one IDF department and one service: a department-specific
 * introduction (400+ unique words from data/idf-extra-content.ts hubs), the
 * most-searched communes as cards, EVERY commune of the department as a link
 * (grouped alphabetically, collapsed visually for large departments), the IDF
 * FAQ, cross-links to the sibling service, the region hubs and the other 7
 * departments, and the conversion form. Non-IDF departments never use it.
 */
export default function IdfDepartmentPage({ service, dept, hub, faqItems, guides }: IdfDepartmentPageProps) {
  const isRachat = service === 'rachat-voiture';
  const serviceLabel = isRachat ? 'Rachat voiture' : 'Épaviste';
  const otherService = isRachat ? 'epaviste' : 'rachat-voiture';
  const otherLabel = isRachat ? 'Épaviste' : 'Rachat voiture';
  const accent = isRachat ? 'text-brand-gold' : 'text-brand-red';
  const locative = idfLocative(dept.code, dept.name);
  const genitive = idfGenitive(dept.code, dept.name);
  const population = getIdfDepartments()
    .find(d => d.slug === dept.slug)
    ?.cities.reduce((sum, c) => sum + (c.population ?? 0), 0);
  const topCities = getTopIdfCities(TOP_CITY_CARDS, dept.slug);
  const otherDepartments = getIdfDepartments().filter(d => d.slug !== dept.slug);

  return (
    <>
      <Header />

      <LocationHero accentColor={isRachat ? 'gold' : 'red'}>
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: serviceLabel, href: `/${service}` },
              { label: 'Île-de-France', href: `/${service}/ile-de-france` },
              { label: `${dept.name} (${dept.code})` },
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-6">
          <span className={`w-2 h-2 rounded-full ${isRachat ? 'bg-brand-gold' : 'bg-brand-red'} animate-pulse`}></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            {isRachat ? 'Rachat cash' : 'Enlèvement gratuit'} 7j/7 {locative} · préfecture {hub.prefecture}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          {isRachat ? 'Rachat de voiture' : 'Épaviste'} {locative} ({dept.code})&nbsp;:{' '}
          <br />
          <span className={accent}>{isRachat ? 'paiement cash, enlèvement inclus' : "enlèvement d'épave gratuit"}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {isRachat
            ? `Nous rachetons votre voiture ${locative}, avec ou sans contrôle technique, en panne ou accidentée : estimation gratuite, paiement le jour de l'enlèvement, cession déclarée pour vous.`
            : `Épaviste agréé VHU ${locative} : enlèvement d'épave 100 % gratuit dans les ${dept.cities.length} ${dept.code === '75' ? 'arrondissements' : 'communes'}, intervention sous 2 h en zone dense, certificat de destruction remis sur place.`}{' '}
          ☎ 06 02 42 73 45.
        </p>

        <QuickContact
          service={isRachat ? 'rachat' : 'epaviste'}
          location={`${dept.name} (${dept.code})`}
          departmentName={dept.name}
          className="justify-center mb-10"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">{isRachat ? 'Paiement cash' : '100 % gratuit'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">Intervention sous 2 h</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">Certificat de destruction</span>
          </div>
        </div>
      </LocationHero>

      {/* Department-specific hub content */}
      <section className="py-16 sm:py-24 bg-brand-surface" data-idf-content="hub">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
              {isRachat ? `Vendre sa voiture ${locative}` : `Faire enlever une épave ${locative}`}
            </h2>
            <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
              {hub.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {population ? (
                <p className="text-sm text-neutral-500">
                  {dept.name} ({dept.code}) — {dept.cities.length} {dept.code === '75' ? 'arrondissements' : 'communes'},{' '}
                  {population.toLocaleString('fr-FR')} habitants (population municipale INSEE), préfecture&nbsp;: {hub.prefecture}.
                </p>
              ) : null}
            </div>

            <div className="mt-12 grid gap-8">
              {isRachat && (
                <article>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Ce que nous rachetons {locative}</h3>
                  <p className="text-neutral-700 leading-relaxed">{hub.rachat}</p>
                </article>
              )}
              <article>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Circulation et accès {locative}</h3>
                <p className="text-neutral-700 leading-relaxed">{hub.circulation}</p>
              </article>
              <article>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Habitat, parkings et stationnement</h3>
                <p className="text-neutral-700 leading-relaxed">{hub.habitat}</p>
              </article>
              <article>
                <h3 className="text-xl font-bold text-brand-navy mb-3">ZFE et réglementation {locative}</h3>
                <p className="text-neutral-700 leading-relaxed">{hub.zfe}</p>
              </article>
              <article>
                <h3 className="text-xl font-bold text-brand-navy mb-3">Fourrière {locative}&nbsp;: qui, où, combien</h3>
                <p className="text-neutral-700 leading-relaxed">{hub.fourriere}</p>
              </article>
              {!isRachat && (
                <article>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">Plutôt vendre que détruire&nbsp;?</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {hub.rachat}{' '}
                    <Link href={`/rachat-voiture/${dept.slug}`} className="text-brand-gold font-semibold hover:underline">
                      Voir le rachat de voiture {locative} →
                    </Link>
                  </p>
                </article>
              )}
            </div>

            <p className="mt-10 text-xs text-neutral-400">
              Sources&nbsp;: {hub.sources.join(' · ')}.
            </p>
          </div>
        </div>
      </section>

      {/* Most-searched communes */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>Villes principales</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
                {serviceLabel} dans les grandes villes {genitive}
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${service}/${dept.slug}/${city.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <MapPin size={18} weight="bold" className={`${accent} flex-shrink-0`} />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors truncate">
                        {serviceLabel} {city.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {city.postalCode} · {city.population.toLocaleString('fr-FR')} hab.
                      </div>
                    </div>
                    <CaretRight size={14} weight="bold" className="ml-auto text-neutral-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Every commune — links in the HTML, collapsed visually when large */}
      <IdfCommuneIndex service={service} deptSlug={dept.slug} deptCode={dept.code} deptName={dept.name} cities={dept.cities.map(c => ({ name: c.name, slug: c.slug }))} />

      {/* Conversion form, pre-filled with the department */}
      <section className="py-16 sm:py-24 bg-brand-surface border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>{isRachat ? 'Estimation gratuite' : 'Devis gratuit'}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-tight">
                {isRachat ? `Combien vaut votre voiture ${locative} ?` : `Demander un enlèvement ${locative}`}
              </h2>
              <p className="text-neutral-600">Remplissez le formulaire&nbsp;: {RESPONSE_TIME_COPY.toLowerCase()}.</p>
            </div>
            <ConversionForm trigger="inline" defaultService={isRachat ? 'rachat' : 'epaviste'} pageType="department" departmentName={dept.name} />
          </div>
        </div>
      </section>

      {/* Cross-links: sibling service, region hubs, other departments, guides */}
      <section className="py-16 sm:py-20 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-4">Autre service {locative}</h2>
              <Link
                href={`/${otherService}/${dept.slug}`}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white ${isRachat ? 'bg-brand-red hover:bg-brand-red/90' : 'bg-brand-gold hover:bg-brand-gold/90'} transition-all`}
              >
                {isRachat ? <Truck size={18} weight="bold" /> : <CurrencyEur size={18} weight="bold" />}
                {otherLabel} {dept.name} ({dept.code})
              </Link>
              <h2 className="text-lg font-bold text-brand-navy mt-8 mb-3">Guides utiles</h2>
              <ul className="space-y-2">
                {guides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="text-sm text-neutral-700 hover:text-brand-red underline-offset-4 hover:underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Île-de-France</h2>
              <ul className="flex flex-wrap gap-2 mb-4">
                <li>
                  <Link href={`/${service}/ile-de-france`} className="px-3 py-1.5 rounded-full text-sm border border-neutral-200 hover:border-brand-red/40 hover:bg-brand-red/5 text-brand-navy font-semibold">
                    {serviceLabel} Île-de-France
                  </Link>
                </li>
                <li>
                  <Link href={`/${otherService}/ile-de-france`} className="px-3 py-1.5 rounded-full text-sm border border-neutral-200 hover:border-brand-red/40 hover:bg-brand-red/5 text-brand-navy font-semibold">
                    {otherLabel} Île-de-France
                  </Link>
                </li>
              </ul>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {otherDepartments.map((d) => (
                  <li key={d.slug} className="flex flex-wrap items-center gap-x-3 text-sm">
                    <Link href={`/${service}/${d.slug}`} className="text-neutral-700 hover:text-brand-red font-medium">
                      {serviceLabel} {d.name} ({d.code})
                    </Link>
                    <span className="text-neutral-300">·</span>
                    <Link href={`/${otherService}/${d.slug}`} className="text-neutral-500 hover:text-brand-gold">
                      {otherLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <IdfFaq faqItems={faqItems} service={isRachat ? 'rachat' : 'epaviste'} />

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

/** Sanity: the department slugs this hub is allowed to render. */
export const IDF_HUB_DEPT_SLUGS = IDF_DEPT_SLUGS;

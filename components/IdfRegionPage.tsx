import Link from 'next/link';
import IdfIntentLinks from '@/components/IdfIntentLinks';
import { MapPin, CaretRight, Truck, CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import IdfFaq from '@/components/IdfFaq';
import IdfExtraContent from '@/components/IdfExtraContent';
import IdfAeoSection from '@/components/IdfAeoSection';
import { idfRegionContent, idfDeptHubs } from '@/data/idf-extra-content';
import type { FaqItem } from '@/lib/faq';
import { IDF_STATS, idfLocative } from '@/lib/idf';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';
import { getIdfDepartments, getTopIdfCities } from '@/lib/idf-cities';

interface IdfRegionPageProps {
  service: 'epaviste' | 'rachat-voiture';
  faqItems: FaqItem[];
  guides: Array<{ title: string; href: string }>;
}

const TOP_CITY_LINKS = 24;

/**
 * Île-de-France region hub (P2.2) — server component, both services.
 * The 8 departments as cards (with their commune count and both services),
 * one department-specific paragraph each, the 24 most-populated communes,
 * the region content, the IDF FAQ and the form.
 */
export default function IdfRegionPage({ service, faqItems, guides }: IdfRegionPageProps) {
  const isRachat = service === 'rachat-voiture';
  const serviceLabel = isRachat ? 'Rachat voiture' : 'Épaviste';
  const otherService = isRachat ? 'epaviste' : 'rachat-voiture';
  const otherLabel = isRachat ? 'Épaviste' : 'Rachat voiture';
  const accent = isRachat ? 'text-brand-gold' : 'text-brand-red';
  const departments = getIdfDepartments();
  const topCities = getTopIdfCities(TOP_CITY_LINKS);

  return (
    <>
      <Header />

      <LocationHero accentColor={isRachat ? 'gold' : 'red'}>
        <div className="mb-6">
          <Breadcrumb items={[{ label: serviceLabel, href: `/${service}` }, { label: 'Île-de-France' }]} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-6">
          <span className={`w-2 h-2 rounded-full ${isRachat ? 'bg-brand-gold' : 'bg-brand-red'} animate-pulse`}></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Paris · 92 · 93 · 94 · 77 · 78 · 91 · 95 — 24h/24, 7j/7
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          {isRachat ? 'Rachat de voiture en Île-de-France' : 'Épaviste en Île-de-France'}&nbsp;:{' '}
          <br />
          <span className={accent}>{isRachat ? 'paiement cash, enlèvement inclus' : "enlèvement d'épave gratuit"}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {isRachat
            ? "Nous rachetons votre voiture dans les 8 départements d'Île-de-France, avec ou sans contrôle technique, en panne ou accidentée : estimation gratuite, paiement le jour de l'enlèvement, déclaration de cession faite pour vous."
            : "Épaviste agréé VHU à Paris et dans les 8 départements d'Île-de-France : enlèvement d'épave 100 % gratuit, intervention sous 2 h en petite couronne, certificat de destruction remis sur place, sous-sol et fourrière compris."}{' '}
          ☎ 06 02 42 73 45.
        </p>

        <QuickContact service={isRachat ? 'rachat' : 'epaviste'} location="Île-de-France" className="justify-center mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-neutral-200 pt-8">
          {IDF_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-brand-navy">{stat.number}</span>
              <span className="font-semibold text-neutral-700">{stat.label}</span>
            </div>
          ))}
        </div>
      </LocationHero>

      {/* The 8 departments */}
      <section className="py-16 sm:py-24 bg-brand-surface" data-idf-content="hub">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>8 départements</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
                {serviceLabel} dans chaque département d&apos;Île-de-France
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => {
                const hub = idfDeptHubs.find((h) => h.deptCode === dept.code);
                return (
                  <li key={dept.slug} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-red font-bold text-sm">{dept.code}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-navy leading-tight">
                          <Link href={`/${service}/${dept.slug}`} className="hover:text-brand-red">
                            {serviceLabel} {idfLocative(dept.code, dept.name)}
                          </Link>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          {dept.cities.length} {dept.code === '75' ? 'arrondissements' : 'communes'} · préfecture {hub?.prefecture}
                        </p>
                      </div>
                    </div>
                    {hub && <p className="text-sm text-neutral-600 leading-relaxed mb-4">{hub.intro[0]}</p>}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/${service}/${dept.slug}`} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent} hover:underline underline-offset-4`}>
                        {isRachat ? <CurrencyEur size={16} weight="bold" /> : <Truck size={16} weight="bold" />} {serviceLabel} {dept.name} <CaretRight size={12} weight="bold" />
                      </Link>
                      <Link href={`/${otherService}/${dept.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-brand-navy">
                        {otherLabel} {dept.name}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Most-populated communes */}
      <section className="py-16 sm:py-20 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight text-center mb-8">
              {serviceLabel} dans les grandes villes d&apos;Île-de-France
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {topCities.map((city) => (
                <li key={`${city.deptSlug}/${city.slug}`}>
                  <Link
                    href={`/${service}/${city.deptSlug}/${city.slug}`}
                    className="flex items-center gap-2 py-2.5 px-3 bg-brand-surface rounded-lg text-sm font-medium text-neutral-700 hover:bg-brand-red/5 hover:text-brand-red border border-neutral-100 hover:border-brand-red/20 transition-all"
                  >
                    <MapPin size={14} weight="bold" className={`flex-shrink-0 ${accent} opacity-60`} />
                    <span className="truncate">{city.name}</span>
                    <span className="ml-auto text-xs text-neutral-400">{city.deptCode}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Region content (existing) */}
      <IdfExtraContent deptContent={idfRegionContent} testimonials={[]} service={isRachat ? 'rachat' : 'epaviste'} locationName="Île-de-France" />

      {/* Form */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>{isRachat ? 'Estimation gratuite' : 'Devis gratuit'}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-tight">
                {isRachat ? 'Combien vaut votre voiture ?' : "Demander un enlèvement d'épave"}
              </h2>
              <p className="text-neutral-600">Remplissez le formulaire&nbsp;: {RESPONSE_TIME_COPY.toLowerCase()}.</p>
            </div>
            <ConversionForm trigger="inline" defaultService={isRachat ? 'rachat' : 'epaviste'} pageType="pillar" departmentName="Île-de-France" />
          </div>
        </div>
      </section>

      {/* Situations particulières (S2.1) */}
      <IdfIntentLinks service={service} />

      {/* Cross-links */}
      <section className="py-12 bg-brand-surface border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={`/${otherService}/ile-de-france`}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white ${isRachat ? 'bg-brand-red hover:bg-brand-red/90' : 'bg-brand-gold hover:bg-brand-gold/90'} transition-all`}
              >
                {isRachat ? <Truck size={18} weight="bold" /> : <CurrencyEur size={18} weight="bold" />}
                {otherLabel} en Île-de-France
              </Link>
              <Link href="/zones" className="text-sm font-medium text-neutral-600 hover:text-brand-navy underline-offset-4 hover:underline">
                Toute la France
              </Link>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {guides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-sm text-neutral-700 hover:text-brand-red underline-offset-4 hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <IdfAeoSection clusters={['eligibilite', 'comparaison']} service={isRachat ? 'rachat' : 'epaviste'} />

      <IdfFaq faqItems={faqItems} service={isRachat ? 'rachat' : 'epaviste'} />

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

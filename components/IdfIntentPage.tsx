import Link from 'next/link';
import { CaretRight, CheckCircle, Clock, Shield, MapPin, Phone } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import ConversionForm from '@/components/ConversionForm';
import IdfFaq from '@/components/IdfFaq';
import { IDF_NAV_DEPARTMENTS } from '@/components/IdfNav';
import { INTENT_SOURCES, type IdfIntent } from '@/data/idf-intents';
import { getIdfCityRef } from '@/lib/idf-cities';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';

interface IdfIntentPageProps {
  intent: IdfIntent;
  /** The other situations of the same service, for the "Autres situations" list. */
  siblings: IdfIntent[];
}

/**
 * Île-de-France situation page (S2.1) — server component. The hand-written
 * content sits inside [data-idf-intent="unique"] (guarded for length by
 * seo-check). Links: the 2 IDF hubs, the 8 departments, the sibling service,
 * 3 relevant Tier A towns, the other situations of the same service.
 */
export default function IdfIntentPage({ intent, siblings }: IdfIntentPageProps) {
  const isRachat = intent.service === 'rachat-voiture';
  const service = intent.service;
  const otherService = isRachat ? 'epaviste' : 'rachat-voiture';
  const serviceLabel = isRachat ? 'Rachat voiture' : 'Épaviste';
  const otherLabel = isRachat ? 'Épaviste' : 'Rachat voiture';
  const accent = isRachat ? 'text-brand-gold' : 'text-brand-red';
  const towns = intent.towns
    .map((t) => getIdfCityRef(t.deptSlug, t.slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const sources = intent.sources.map((k) => INTENT_SOURCES[k]);

  return (
    <>
      <Header />

      <LocationHero accentColor={isRachat ? 'gold' : 'red'}>
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: serviceLabel, href: `/${service}` },
              { label: 'Île-de-France', href: `/${service}/ile-de-france` },
              { label: intent.label },
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-6">
          <span className={`w-2 h-2 rounded-full ${isRachat ? 'bg-brand-gold' : 'bg-brand-red'} animate-pulse`}></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            {isRachat ? 'Estimation gratuite · paiement le jour de l’enlèvement' : 'Enlèvement gratuit · certificat de destruction remis sur place'} · Île-de-France
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.08] tracking-tight text-brand-navy">
          {intent.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {intent.description} ☎ 06 02 42 73 45.
        </p>

        <QuickContact service={isRachat ? 'rachat' : 'epaviste'} location="Île-de-France" departmentName="Île-de-France" className="justify-center mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">{isRachat ? 'Offre ferme' : '100 % gratuit'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">8 départements</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">Agréé VHU</span>
          </div>
        </div>
      </LocationHero>

      {/* Hand-written content */}
      <article className="py-16 sm:py-24 bg-white" data-idf-intent="unique">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {intent.intro.map((p, i) => (
              <p key={i} className="text-lg text-neutral-700 leading-relaxed mb-6">{p}</p>
            ))}

            {intent.sections.map((section) => (
              <section key={section.title} className="mt-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-5">{section.title}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-neutral-700 leading-relaxed mb-5">{p}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2 mb-5">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-neutral-700 leading-relaxed">
                        <CheckCircle size={20} weight="fill" className={`${accent} flex-shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="mt-10 text-xs text-neutral-400">
              Sources&nbsp;: {sources.join(' · ')}. Mis à jour le {new Date(intent.updatedAt).toLocaleDateString('fr-FR')}.
            </p>
          </div>
        </div>
      </article>

      {/* CTA block with the form */}
      <section id="contact" className="py-16 sm:py-20 bg-brand-surface border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className={`inline-block ${accent} text-sm font-semibold tracking-wider uppercase mb-4`}>
                {isRachat ? 'Estimation gratuite' : 'Enlèvement gratuit'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-tight">
                {isRachat ? 'Combien vaut votre véhicule ?' : 'Demander l’enlèvement en Île-de-France'}
              </h2>
              <p className="text-neutral-600 flex items-center justify-center gap-2 flex-wrap">
                <Phone size={16} weight="bold" /> 06 02 42 73 45 · {RESPONSE_TIME_COPY} · photos par WhatsApp
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService={isRachat ? 'rachat' : 'epaviste'} pageType="pillar" departmentName="Île-de-France" />
          </div>
        </div>
      </section>

      {/* Links: hubs, departments, towns, sibling service, other situations */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-brand-surface rounded-2xl border border-neutral-200">
              <h2 className="text-lg font-bold text-brand-navy mb-4">{serviceLabel} en Île-de-France</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/${service}/ile-de-france`} className="font-semibold text-brand-navy hover:text-brand-red">
                    {serviceLabel} Île-de-France
                  </Link>
                </li>
                {IDF_NAV_DEPARTMENTS.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${service}/${d.slug}`} className="text-neutral-700 hover:text-brand-red">
                      {d.name} ({d.code})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-brand-surface rounded-2xl border border-neutral-200">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Communes où ce cas est fréquent</h2>
              <ul className="space-y-3 text-sm">
                {towns.map((t) => (
                  <li key={`${t.deptSlug}/${t.slug}`}>
                    <Link href={`/${service}/${t.deptSlug}/${t.slug}`} className="flex items-center gap-2 text-neutral-700 hover:text-brand-red">
                      <MapPin size={16} weight="bold" className={accent} /> {serviceLabel} {t.name} ({t.deptCode})
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-bold text-brand-navy mt-6 mb-2">Autre service</h3>
              <Link href={`/${otherService}/ile-de-france`} className="text-sm text-neutral-700 hover:text-brand-red inline-flex items-center gap-1">
                {otherLabel} en Île-de-France <CaretRight size={14} />
              </Link>
            </div>

            <div className="p-6 bg-brand-surface rounded-2xl border border-neutral-200">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Autres situations</h2>
              <ul className="space-y-2 text-sm">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${service}/ile-de-france/${s.slug}`} className="text-neutral-700 hover:text-brand-red">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <IdfFaq faqItems={intent.faq} service={isRachat ? 'rachat' : 'epaviste'} />
    </>
  );
}

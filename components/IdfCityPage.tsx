import Link from 'next/link';
import { MapPin, CaretRight, CheckCircle, Clock, Shield, CurrencyEur, Truck, FileText, Phone } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import ConversionForm from '@/components/ConversionForm';
import IdfFaq from '@/components/IdfFaq';
import IdfExtraContent from '@/components/IdfExtraContent';
import IdfInternalLinks from '@/components/IdfInternalLinks';
import IdfAeoSection from '@/components/IdfAeoSection';
import type { ResolvedIdfCity } from '@/lib/idf-city-content';
import type { IdfDeptContent } from '@/data/idf-extra-content';
import type { FaqItem } from '@/lib/faq';
import { idfLocative } from '@/lib/idf';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';

interface IdfCityPageProps {
  service: 'epaviste' | 'rachat-voiture';
  city: ResolvedIdfCity;
  deptContent: IdfDeptContent | null;
  /** IDF-generic questions rendered by <IdfFaq> below the town-specific ones. */
  regionFaq: FaqItem[];
  guides: Array<{ title: string; href: string }>;
}

const PETITE_COURONNE = new Set(['75', '92', '93', '94']);

const DOCUMENTS = [
  { title: 'Certificat d’immatriculation (carte grise)', text: 'Barré, daté et signé avec la mention « cédé le … pour destruction ». S’il est perdu, une déclaration de perte suffit dans la plupart des cas.' },
  { title: 'Pièce d’identité', text: 'Celle du titulaire de la carte grise, ou une procuration + copie de sa pièce d’identité si un tiers nous reçoit.' },
  { title: 'Certificat de situation administrative', text: 'Le « non-gage », gratuit en ligne, de moins de 15 jours : il prouve que le véhicule peut être cédé.' },
  { title: 'Déclaration de cession', text: 'Nous la remplissons avec vous sur place (Cerfa 15776) et nous effectuons la déclaration en ligne ; vous en gardez un exemplaire.' },
];

/**
 * Île-de-France commune page (P3.2 / P3.3 / P4.3) — server component for
 * both services. Static sections are in the HTML; the only client islands
 * are the header, the CTA row, the form and the accordion FAQ. The
 * commune-specific content lives inside [data-idf-content="unique"], which
 * the similarity check compares between communes.
 */
export default function IdfCityPage({ service, city, deptContent, regionFaq, guides }: IdfCityPageProps) {
  const isRachat = service === 'rachat-voiture';
  const { ref, facts } = city;
  const name = ref.name;
  const cp = ref.postalCode;
  const accent = isRachat ? 'text-brand-gold' : 'text-brand-red';
  const otherService = isRachat ? 'epaviste' : 'rachat-voiture';
  const otherLabel = isRachat ? 'Épaviste' : 'Rachat voiture';
  const serviceLabel = isRachat ? 'Rachat voiture' : 'Épaviste';
  const petiteCouronne = PETITE_COURONNE.has(ref.deptCode);
  const delay = petiteCouronne ? 'sous 2 h' : 'sous 24 h, souvent le jour même';
  const townFaq = isRachat ? city.faqRachat : city.faqEpaviste;
  const locative = idfLocative(ref.deptCode, ref.deptName);

  return (
    <>
      <Header />

      <LocationHero accentColor={isRachat ? 'gold' : 'red'}>
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: serviceLabel, href: `/${service}` },
              { label: 'Île-de-France', href: `/${service}/ile-de-france` },
              { label: `${ref.deptName} (${ref.deptCode})`, href: `/${service}/${ref.deptSlug}` },
              { label: name },
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-6">
          <span className={`w-2 h-2 rounded-full ${isRachat ? 'bg-brand-gold' : 'bg-brand-red'} animate-pulse`}></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            {isRachat ? 'Estimation gratuite · paiement cash' : 'Enlèvement gratuit · certificat de destruction remis sur place'} · {name}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          {isRachat ? 'Rachat de voiture' : 'Épaviste'} à {name} ({cp})&nbsp;:{' '}
          <br />
          <span className={accent}>{isRachat ? 'paiement cash immédiat' : "enlèvement d'épave gratuit"}</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {isRachat
            ? `Nous rachetons votre voiture à ${name}, roulante ou non, avec ou sans contrôle technique : estimation gratuite, offre ferme, enlèvement inclus et paiement le jour du départ du véhicule.`
            : `Épaviste agréé VHU à ${name} (${cp}) : enlèvement d'épave 100 % gratuit, intervention ${delay}, sous-sol et fourrière compris, certificat de destruction remis sur place.`}{' '}
          ☎ 06 02 42 73 45.
        </p>

        <QuickContact
          service={isRachat ? 'rachat' : 'epaviste'}
          location={`${name} (${cp})`}
          cityName={name}
          departmentName={ref.deptName}
          className="justify-center mb-10"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">{isRachat ? 'Paiement cash' : '100 % gratuit'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">Intervention {petiteCouronne ? 'sous 2 h' : 'sous 24 h'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={22} weight="fill" className={accent} />
            <span className="font-semibold text-neutral-700">Agréé VHU</span>
          </div>
        </div>
      </LocationHero>

      {/* Rachat: the estimation block comes first (P3.3) */}
      {isRachat && (
        <section id="estimation" className="py-16 sm:py-20 bg-brand-surface border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Estimation gratuite</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-tight">
                  Combien vaut ma voiture à {name}&nbsp;?
                </h2>
                <p className="text-neutral-600">
                  Marque, modèle, année, état&nbsp;: l&apos;estimation est gratuite et sans engagement. {RESPONSE_TIME_COPY}.
                </p>
              </div>
              <ConversionForm trigger="inline" defaultService="rachat" pageType="city" cityName={name} departmentName={ref.deptName} />
            </div>
          </div>
        </section>
      )}

      {/* ── Commune-specific content ──────────────────────────────────────── */}
      <article className="py-16 sm:py-24 bg-white" data-idf-content="unique" data-idf-tier={city.tier} data-idf-source={city.source}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">
              {isRachat ? `Vendre sa voiture à ${name} (${cp})` : `Enlèvement d'épave à ${name} (${cp})`}
            </h2>
            <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
              {(isRachat ? city.rachatIntro : city.intro).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="text-sm text-neutral-500">
                {name} ({cp}) — {ref.population.toLocaleString('fr-FR')} habitants (INSEE)
                {facts?.surfaceKm2 ? `, ${facts.surfaceKm2.toLocaleString('fr-FR')} km²` : ''}
                {facts?.epci ? `, ${facts.epci}` : ''}
                {city.distanceToParisKm !== null ? `, à ${city.distanceToParisKm} km du centre de Paris` : ''}. Commune {locative}.
              </p>
            </div>

            {/* Situations fréquentes */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-14 mb-6 tracking-tight">
              Situations fréquentes à {name}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {(isRachat ? city.rachatSituations : city.situations).map((s) => (
                <li key={s.title} className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                  <h3 className="font-bold text-brand-navy mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ul>

            {/* Fourrière */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-14 mb-6 tracking-tight">
              Fourrière à {name}&nbsp;: où est mon véhicule&nbsp;?
            </h2>
            {city.fourriere ? (
              <div className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200">
                <p className="font-bold text-brand-navy flex items-center gap-2">
                  <MapPin size={20} weight="bold" className={accent} /> {city.fourriere.name}
                </p>
                <p className="text-neutral-700 mt-2">{city.fourriere.address}</p>
                {city.fourriere.phone && <p className="text-neutral-700">☎ {city.fourriere.phone}</p>}
                {city.fourriere.hours && <p className="text-neutral-700">Horaires&nbsp;: {city.fourriere.hours}</p>}
                {city.fourriere.tarif && <p className="text-neutral-700">Tarif&nbsp;: {city.fourriere.tarif}</p>}
                {city.fourriere.note && <p className="text-sm text-neutral-600 mt-3 leading-relaxed">{city.fourriere.note}</p>}
              </div>
            ) : (
              <p className="text-neutral-700 leading-relaxed">{city.fourriereText}</p>
            )}

            {/* Accès et contraintes */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-14 mb-6 tracking-tight">
              Accès et contraintes à {name}
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              {city.acces.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Town-specific FAQ — visible, so it belongs in the page's single FAQPage */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy mt-14 mb-6 tracking-tight">
              Questions fréquentes à {name}
            </h2>
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {townFaq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-brand-navy">
                    <span>{f.question}</span>
                    <span className="text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-neutral-700 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>

            <p className="mt-8 text-xs text-neutral-400">Sources&nbsp;: {city.sources.join(' · ')}.</p>
          </div>
        </div>
      </article>

      {/* Rachat: the five typical cases (P3.3) */}
      {isRachat && (
        <section className="py-16 sm:py-24 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
                Nous rachetons votre voiture à {name} dans tous les cas
              </h2>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Rachat de voiture sans contrôle technique à {name}</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Le contrôle technique n&apos;est pas obligatoire pour vendre à un professionnel. Si votre voiture a été recalée, si le CT est périmé ou
                  si vous préférez ne pas engager les frais d&apos;une contre-visite, nous la reprenons à {name} en l&apos;état. L&apos;offre tient compte
                  des réparations à prévoir, mais elle vous évite les passages au centre de contrôle, les réparations obligatoires et les semaines
                  d&apos;attente. Vous nous remettez la carte grise et les clés, nous nous chargeons de la cession.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Rachat de voiture accidentée à {name}</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Après un accrochage ou un sinistre plus lourd, l&apos;expert de l&apos;assurance a peut-être déclaré le véhicule économiquement
                  irréparable. Vous pouvez tout de même le vendre&nbsp;: nous rachetons à {name} les voitures accidentées, roulantes ou non, pour la
                  valeur de leurs pièces et de leur remise en état. Le plateau vient la chercher là où elle est immobilisée, garage ou parking,
                  et le paiement se fait le jour de l&apos;enlèvement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Rachat de voiture HS à {name}</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Une voiture hors service n&apos;est pas forcément une épave. Boîte de vitesses, embrayage, électronique, corrosion&nbsp;: si
                  le véhicule est complet, il a une valeur pour les pièces d&apos;occasion et les matériaux. Nous l&apos;estimons sur photos et
                  carte grise, puis nous venons l&apos;enlever à {name}. Si la valeur est nulle, nous vous le disons franchement et le
                  véhicule part en enlèvement gratuit avec certificat de destruction.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Rachat de voiture en panne à {name}</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Une panne dont le devis dépasse la valeur de la voiture est le cas le plus fréquent à {name}. Plutôt que de payer une
                  réparation à perte ou de laisser le véhicule chez le garagiste, vendez-le en l&apos;état&nbsp;: nous reprenons les voitures
                  en panne, même immobilisées depuis des mois, et nous réglons directement avec le garage la question de l&apos;enlèvement
                  sur son parking si nécessaire.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Rachat de voiture moteur cassé ou moteur HS à {name}</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Courroie de distribution rompue, joint de culasse, casse moteur&nbsp;: la remise en état coûte souvent plus que la
                  voiture. Nous rachetons à {name} les véhicules dont le moteur est hors service, pour la carrosserie, la boîte, les
                  trains roulants et l&apos;électronique. Indiquez-nous le modèle, l&apos;année, le kilométrage et la nature de la panne&nbsp;:
                  l&apos;estimation est faite le jour même.
                </p>
              </div>

              {/* Rachat vs enlèvement gratuit */}
              <div className="pt-6 border-t border-neutral-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-6">
                  Rachat ou enlèvement gratuit à {name}&nbsp;: lequel choisir&nbsp;?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-brand-gold/30">
                    <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><CurrencyEur size={20} weight="fill" className="text-brand-gold" /> Rachat</h3>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>• Le véhicule est complet et a encore de la valeur (roulant, récent, pièces recherchées).</li>
                      <li>• Vous recevez une offre ferme, puis le paiement le jour de l&apos;enlèvement.</li>
                      <li>• La cession est déclarée par nos soins&nbsp;: plus d&apos;assurance ni de carte grise à votre nom.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-brand-red/30">
                    <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><Truck size={20} weight="fill" className="text-brand-red" /> Enlèvement gratuit</h3>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>• Le véhicule est hors d&apos;usage, incomplet, brûlé ou trop ancien pour être revendu.</li>
                      <li>• L&apos;enlèvement est gratuit, y compris en sous-sol ou en fourrière.</li>
                      <li>• Vous recevez le certificat de destruction, qui met fin à votre responsabilité.</li>
                    </ul>
                    <Link href={`/epaviste/${ref.deptSlug}/${ref.slug}`} className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-red hover:underline underline-offset-4">
                      Épaviste à {name}&nbsp;: enlèvement gratuit <CaretRight size={12} weight="bold" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Documents + how it works (épaviste) */}
      {!isRachat && (
        <section className="py-16 sm:py-24 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-6">Documents à préparer</h2>
              <ul className="grid sm:grid-cols-2 gap-4 mb-14">
                {DOCUMENTS.map((d) => (
                  <li key={d.title} className="flex gap-3 p-4 bg-white rounded-xl border border-neutral-200">
                    <FileText size={22} weight="fill" className="text-brand-red flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-brand-navy text-sm mb-1">{d.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{d.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-6">Comment ça se passe à {name}</h2>
              <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { n: '1', t: 'Vous nous contactez', d: `Appel, WhatsApp ou formulaire : décrivez le véhicule, son emplacement à ${name} et son état (roulant, roues bloquées, sous-sol).` },
                  { n: '2', t: 'Nous fixons un créneau', d: `Intervention ${delay}. Nous confirmons l'heure et le matériel (plateau, treuil, chariot).` },
                  { n: '3', t: 'Enlèvement sur place', d: `Vérification des documents, signature de la cession, chargement. Comptez 30 à 45 minutes, sous-sol compris.` },
                  { n: '4', t: 'Certificat de destruction', d: `Remis sur place ou envoyé sous quelques jours ; vous pouvez résilier l'assurance et vous êtes dégagé de toute responsabilité.` },
                ].map((s) => (
                  <li key={s.n} className="p-5 bg-white rounded-2xl border border-neutral-200">
                    <span className="inline-flex w-8 h-8 rounded-full bg-brand-red text-white items-center justify-center font-bold text-sm mb-3">{s.n}</span>
                    <h3 className="font-bold text-brand-navy mb-2 text-sm">{s.t}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Nearby communes + department/region/guides + sibling service */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-2 text-center">
              {serviceLabel} près de {name}
            </h2>
            <p className="text-neutral-600 text-center mb-8">Les communes les plus proches, desservies dans la même tournée.</p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {city.nearest.map((n) => (
                <li key={`${n.deptSlug}/${n.slug}`}>
                  <Link
                    href={`/${service}/${n.deptSlug}/${n.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <MapPin size={18} weight="bold" className={`${accent} flex-shrink-0`} />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors truncate">{n.name}</div>
                      <div className="text-xs text-neutral-500">{n.postalCode} · {Math.round(n.distanceKm)} km</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                <h3 className="text-sm font-bold text-brand-navy mb-3">Autour de {name}</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${service}/${ref.deptSlug}`} className="text-neutral-700 hover:text-brand-red font-medium">{serviceLabel} {ref.deptName} ({ref.deptCode})</Link></li>
                  <li><Link href={`/${service}/ile-de-france`} className="text-neutral-700 hover:text-brand-red font-medium">{serviceLabel} Île-de-France</Link></li>
                </ul>
              </div>
              <div className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                <h3 className="text-sm font-bold text-brand-navy mb-3">Guides utiles</h3>
                <ul className="space-y-2 text-sm">
                  {guides.map((g) => (
                    <li key={g.href}><Link href={g.href} className="text-neutral-700 hover:text-brand-red underline-offset-4 hover:underline">{g.title}</Link></li>
                  ))}
                </ul>
              </div>
              <div className={`p-5 rounded-2xl border ${isRachat ? 'bg-brand-red/5 border-brand-red/20' : 'bg-brand-gold/5 border-brand-gold/20'}`}>
                <h3 className="text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
                  {isRachat ? <Truck size={18} weight="fill" className="text-brand-red" /> : <CurrencyEur size={18} weight="fill" className="text-brand-gold" />}
                  {isRachat ? 'Véhicule sans valeur ?' : 'Votre voiture a encore de la valeur ?'}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  {isRachat ? `Enlèvement gratuit à ${name} avec certificat de destruction.` : `Demandez une estimation de rachat à ${name} : offre ferme, paiement le jour de l'enlèvement.`}
                </p>
                <Link href={`/${otherService}/${ref.deptSlug}/${ref.slug}`} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${isRachat ? 'text-brand-red' : 'text-brand-gold'} hover:underline underline-offset-4`}>
                  {otherLabel} à {name} <CaretRight size={12} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form (épaviste) */}
      {!isRachat && (
        <section className="py-16 sm:py-24 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Devis gratuit</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-tight">Demander un enlèvement à {name}</h2>
                <p className="text-neutral-600 flex items-center justify-center gap-2"><Phone size={16} weight="bold" /> 06 02 42 73 45 · {RESPONSE_TIME_COPY}</p>
              </div>
              <ConversionForm trigger="inline" defaultService="epaviste" pageType="city" cityName={name} departmentName={ref.deptName} />
            </div>
          </div>
        </section>
      )}

      {/* Department-level content (legacy sections) — Tier B/C only: the
          hand-written Tier A text supersedes it (D1). It carried no links
          and no FAQ, so nothing is lost on Tier A pages. */}
      {deptContent && city.tier !== 'A' && (
        <IdfExtraContent deptContent={deptContent} testimonials={[]} service={isRachat ? 'rachat' : 'epaviste'} locationName={`${name} (${ref.deptName})`} pageSlug={ref.slug} />
      )}
      <IdfInternalLinks service={service} currentDeptSlug={ref.deptSlug} currentCitySlug={ref.slug} />
      <IdfAeoSection clusters={['eligibilite', 'cas-particuliers']} service={isRachat ? 'rachat' : 'epaviste'} />

      {/* IDF-generic FAQ (rendered → part of the single FAQPage) */}
      <IdfFaq faqItems={regionFaq} service={isRachat ? 'rachat' : 'epaviste'} />
    </>
  );
}

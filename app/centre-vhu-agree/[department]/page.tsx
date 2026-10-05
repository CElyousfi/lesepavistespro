import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, FileText, Truck, Phone } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Breadcrumb from '@/components/Breadcrumb';
import ConversionForm from '@/components/ConversionForm';
import { generateMeta, centreVhuText as centreVhuMeta } from '@/lib/seo';
import { getBreadcrumbData, getWebPageData, renderJSONLD } from '@/lib/structured-data';
import { buildFaqPage, type FaqItem } from '@/lib/faq';
import { getSiteUrl } from '@/lib/site';
import { formatFrenchDate } from '@/lib/lastmod';
import { getDepartmentBySlug } from '@/lib/locations-complete';
import { CENTRE_VHU_DEPTS, CENTRE_VHU_SOURCES, CENTRE_VHU_UPDATED_AT, getCentreVhuDept, type CentreVhuDept } from '@/data/centre-vhu';

export const dynamicParams = false;

export function generateStaticParams() {
  return CENTRE_VHU_DEPTS.map((d) => ({ department: d.slug }));
}

const PATH = (d: CentreVhuDept) => `/centre-vhu-agree/${d.slug}`;

export async function generateMetadata({ params }: { params: Promise<{ department: string }> }): Promise<Metadata> {
  const { department } = await params;
  const d = getCentreVhuDept(department);
  if (!d) return {};
  return generateMeta({ ...centreVhuMeta(d), path: PATH(d) });
}

function faqFor(d: CentreVhuDept): FaqItem[] {
  return [
    {
      question: `Où trouver un centre VHU agréé ${d.locative} ?`,
      answer: `La liste officielle des centres VHU agréés est publiée sur le site de l'ANTS (annuaire des démolisseurs). Vous n'avez pas besoin d'y aller vous-même : nous enlevons gratuitement le véhicule ${d.locative} et le remettons à un centre VHU agréé partenaire, qui établit le certificat de destruction.`,
    },
    {
      question: 'La destruction d’un véhicule est-elle payante ?',
      answer: "Non : la remise d'un véhicule complet — moteur, catalyseur et batterie présents — à un centre VHU agréé est gratuite. Un véhicule incomplet ou brûlé est un cas particulier : nous vous le disons avant de nous déplacer.",
    },
    {
      question: 'Quels documents faut-il pour faire détruire une voiture ?',
      answer: "La carte grise barrée avec la mention « Cédé le … pour destruction », datée et signée, un certificat de situation administrative de moins de 15 jours, le cerfa n° 15776 (déclaration de cession) et une pièce d'identité. En cas de perte ou de vol de la carte grise, la déclaration correspondante la remplace.",
    },
    {
      question: 'Que faire du certificat de destruction ?',
      answer: "Conservez-le : il prouve que le véhicule a été remis à un centre agréé et met fin à votre responsabilité. Transmettez-en une copie à votre assureur pour résilier le contrat.",
    },
    {
      question: `Les Épavistes Pro est-il un centre VHU ${d.locative} ?`,
      answer: "Non. Nous sommes épaviste : nous enlevons le véhicule et l'acheminons vers un centre VHU agréé partenaire. C'est ce centre qui le dépollue, le démonte et délivre le certificat de destruction.",
    },
  ];
}

const CHECKS = [
  'Le centre figure dans l’annuaire officiel des centres VHU agréés (site de l’ANTS) et affiche son numéro d’agrément préfectoral.',
  'Le certificat de destruction vous est remis : il porte le numéro d’agrément du centre et l’immatriculation du véhicule.',
  'La carte grise est barrée « Cédé le … pour destruction », datée et signée ; vous gardez une copie.',
  'Le certificat de situation administrative a moins de 15 jours.',
  'La remise est gratuite si le véhicule est complet (moteur, catalyseur, batterie).',
  'Vous informez votre assureur pour résilier le contrat.',
];

export default async function CentreVhuPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const d = getCentreVhuDept(department);
  if (!d) notFound();
  const dept = getDepartmentBySlug(d.slug);
  const base = getSiteUrl();
  const url = `${base}${PATH(d)}`;
  const faq = faqFor(d);
  const faqPage = buildFaqPage(faq);
  const meta = centreVhuMeta(d);
  const title = `Centre VHU agréé ${d.locative} : destruction et certificat de destruction`;

  const structuredData = [
    getWebPageData(url, title, meta.description),
    getBreadcrumbData([
      { name: 'Accueil', url: base },
      { name: 'Épaviste', url: `${base}/epaviste` },
      { name: `${d.name} (${d.code})`, url: `${base}/epaviste/${d.slug}` },
      { name: 'Centre VHU agréé', url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Enlèvement et remise à un centre VHU agréé ${d.locative}`,
      serviceType: 'Enlèvement de véhicule hors d’usage vers un centre VHU agréé',
      url,
      provider: { '@id': `${base}/#business` },
      areaServed: { '@type': 'AdministrativeArea', name: d.name },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
    },
    ...(faqPage ? [faqPage] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJSONLD(structuredData)} />
      <Header />
      <main className="pt-28 md:pt-32 bg-white">
        <section className="pt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Breadcrumb items={[{ label: 'Épaviste', href: '/epaviste' }, { label: `${d.name} (${d.code})`, href: `/epaviste/${d.slug}` }, { label: 'Centre VHU agréé' }]} />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy tracking-tight leading-[1.1] mb-6">{title}</h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Pour faire détruire un véhicule {d.locative}, il doit être remis à un <strong>centre VHU agréé</strong> : c&apos;est le seul
                professionnel habilité à le dépolluer et à délivrer le <strong>certificat de destruction</strong>. Nous enlevons gratuitement
                le véhicule là où il se trouve et le remettons à un centre VHU agréé partenaire. ☎ 06 02 42 73 45.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Mis à jour le <time dateTime={CENTRE_VHU_UPDATED_AT}>{formatFrenchDate(CENTRE_VHU_UPDATED_AT)}</time>
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-14 text-neutral-700 leading-relaxed">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Qu&apos;est-ce qu&apos;un centre VHU agréé ?</h2>
              <p>
                Un centre VHU (véhicules hors d&apos;usage) est l&apos;installation qui reçoit, entrepose, dépollue et démonte les véhicules en fin
                de vie (code de l&apos;environnement, article R.543-154). Il doit être <strong>agréé par le préfet</strong>, sur la base d&apos;un
                cahier des charges qui fixe ses obligations : retrait des fluides, de la batterie et des éléments dangereux, réemploi des pièces,
                remise de la carcasse à un broyeur agréé. Les centres agréés se reconnaissent à leur logo officiel et à leur numéro
                d&apos;agrément.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Ce que dit la loi</h2>
              <ul className="space-y-3 list-disc ml-5">
                <li>Un véhicule hors d&apos;usage ne peut être confié qu&apos;à un centre VHU agréé, ou à un organisme agréé par le constructeur (code de l&apos;environnement, articles R.543-153 et suivants).</li>
                <li>Le centre VHU délivre au détenteur un <strong>certificat de destruction</strong> (code de la route, article R.322-9) : c&apos;est ce document qui met fin à votre responsabilité.</li>
                <li>La remise d&apos;un véhicule complet est <strong>gratuite</strong> (service-public.gouv.fr).</li>
                <li>Abandonner un véhicule sur la voie publique ou un terrain est sanctionné, et le véhicule peut être mis en fourrière puis détruit à vos frais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">
                Comment nous acheminons votre véhicule vers un centre VHU agréé {d.locative}
              </h2>
              <p className="mb-6">{d.local}</p>
              <ol className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Phone, t: 'Vous nous appelez', x: 'Véhicule, adresse, état, documents disponibles : nous confirmons la gratuité et le créneau.' },
                  { icon: Truck, t: 'Enlèvement gratuit', x: 'Plateau avec treuil, rue, cour, sous-sol ; signature de la cession pour destruction sur place.' },
                  { icon: FileText, t: 'Certificat de destruction', x: 'Le centre VHU agréé partenaire prend en charge le véhicule et établit le certificat.' },
                ].map((s) => (
                  <li key={s.t} className="p-5 bg-brand-surface rounded-2xl border border-neutral-200">
                    <s.icon size={24} weight="bold" className="text-brand-red mb-3" />
                    <h3 className="font-bold text-brand-navy mb-1">{s.t}</h3>
                    <p className="text-sm">{s.x}</p>
                  </li>
                ))}
              </ol>
              {dept && (
                <p className="mt-6 text-sm text-neutral-500">
                  {dept.name} ({dept.code}) — {dept.cities.length.toLocaleString('fr-FR')} communes,{' '}
                  {dept.cities.reduce((n, c) => n + (c.population ?? 0), 0).toLocaleString('fr-FR')} habitants (INSEE).
                </p>
              )}
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Les points officiels à vérifier</h2>
              <ul className="space-y-3">
                {CHECKS.map((c) => (
                  <li key={c} className="flex gap-3">
                    <CheckCircle size={20} weight="fill" className="text-brand-red flex-shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">Questions fréquentes</h2>
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {faq.map((f) => (
                  <details key={f.question} className="group py-4">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-brand-navy">
                      <span>{f.question}</span>
                      <span className="text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <p className="mt-3">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="p-6 bg-brand-surface rounded-2xl border border-neutral-200">
              <h2 className="text-lg font-bold text-brand-navy mb-3">Pages utiles {d.locative}</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <li><Link href={`/epaviste/${d.slug}`} className="text-brand-red hover:underline underline-offset-4">Épaviste {d.name} ({d.code})</Link></li>
                <li><Link href={`/rachat-voiture/${d.slug}`} className="text-brand-gold hover:underline underline-offset-4">Rachat voiture {d.name} ({d.code})</Link></li>
                {d.idf && (
                  <>
                    <li><Link href="/epaviste/ile-de-france/sans-carte-grise" className="text-brand-navy hover:underline underline-offset-4">Épave sans carte grise</Link></li>
                    <li><Link href="/guides/fourrieres-ile-de-france" className="text-brand-navy hover:underline underline-offset-4">Fourrières d&apos;Île-de-France</Link></li>
                    <li><Link href="/epaviste/ile-de-france" className="text-brand-navy hover:underline underline-offset-4">Épaviste Île-de-France</Link></li>
                  </>
                )}
                <li><Link href="/conformite-vhu" className="text-brand-navy hover:underline underline-offset-4">Conformité VHU</Link></li>
              </ul>
              <p className="mt-4 text-xs text-neutral-400">
                Sources :{' '}
                {CENTRE_VHU_SOURCES.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ' · '}
                    <a href={s.url} rel="noopener" className="underline underline-offset-2">{s.label}</a>
                  </span>
                ))}
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-6 text-center">Demander un enlèvement {d.locative}</h2>
              <ConversionForm trigger="inline" defaultService="epaviste" pageType="department" departmentName={d.name} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

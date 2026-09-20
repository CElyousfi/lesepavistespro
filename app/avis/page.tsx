import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, ShieldCheck, Clock, FileText, Star } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewCta from '@/components/ReviewCta';
import { generateMeta } from '@/lib/seo';
import { getBreadcrumbData, getWebPageData, renderJSONLD } from '@/lib/structured-data';
import { getVerifiedTestimonials } from '@/lib/reviews';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';

const URL = 'https://www.lesepavistespro.fr/avis';

export const metadata: Metadata = generateMeta({
  title: 'Avis clients – ce que vous pouvez attendre de nous',
  description:
    "Ce que vous pouvez attendre de nos interventions en Île-de-France, comment se déroule un enlèvement ou un rachat, et où laisser votre avis après notre passage.",
  path: '/avis',
});

const EXPECTATIONS = [
  { icon: Clock, title: 'Une réponse rapide, 7j/7', text: `Un appel ou un message WhatsApp avec des photos, et une réponse claire : enlèvement gratuit, rachat avec une offre ferme, ou explication de ce qui bloque. ${RESPONSE_TIME_COPY}.` },
  { icon: ShieldCheck, title: 'Un cadre légal respecté', text: 'Cession pour destruction ou vente à un professionnel, certificat de situation administrative, déclaration de cession enregistrée en ligne, certificat de destruction remis : les mêmes règles que celles publiées par l’administration, appliquées à chaque véhicule.' },
  { icon: CheckCircle, title: 'Un prix annoncé qui ne bouge pas', text: 'Pour un rachat, l’offre est faite sur photos et carte grise avant le déplacement et ne change pas à l’arrivée du plateau ; pour un enlèvement, la gratuité d’un véhicule complet est la règle, et un cas particulier vous est annoncé avant notre venue.' },
  { icon: FileText, title: 'Des documents en main', text: 'Vous repartez avec votre exemplaire de la déclaration de cession et, pour une destruction, le certificat qui met fin à l’assurance et à votre responsabilité.' },
];

const STEPS = [
  { title: 'Vous nous contactez', text: 'Téléphone, WhatsApp ou formulaire : décrivez la situation (véhicule, lieu, état, documents disponibles) et envoyez quelques photos.' },
  { title: 'Nous vous répondons', text: 'Enlèvement gratuit ou rachat, documents à préparer, éventuel blocage (opposition, succession) : la réponse est donnée dans la journée.' },
  { title: 'Rendez-vous sur place', text: 'Parking souterrain, rue, pavillon, garage ou fourrière, dans les huit départements ; vérification des documents et signature de la cession.' },
  { title: 'Chargement et remise des documents', text: 'Le véhicule est chargé — au treuil s’il ne roule plus — et vous conservez vos exemplaires ; nous enregistrons la déclaration de cession en ligne.' },
];

export default function AvisPage() {
  const testimonials = getVerifiedTestimonials();
  const structuredData = [
    getWebPageData(URL, 'Avis clients – Les Épavistes Pro', metadata.description ?? undefined),
    getBreadcrumbData([
      { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
      { name: 'Avis clients', url: URL },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJSONLD(structuredData)} />
      <Header />
      <main className="pt-28 sm:pt-32">
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Avis clients</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy tracking-tight mb-6">
                Ce que nos clients peuvent attendre de nous
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Nous ne publions que des avis réels, recueillis sur Google. Cette page explique comment se déroule une
                intervention en Île-de-France, ce à quoi vous avez droit, et comment nous laisser votre avis après notre passage.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-brand-surface border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
              {EXPECTATIONS.map((e) => (
                <div key={e.title} className="p-6 bg-white rounded-2xl border border-neutral-200">
                  <e.icon size={28} weight="fill" className="text-brand-red mb-4" />
                  <h2 className="text-lg font-bold text-brand-navy mb-2">{e.title}</h2>
                  <p className="text-neutral-600 leading-relaxed text-sm">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-8 text-center">Comment se déroule le service</h2>
              <ol className="space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-5">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center">{i + 1}</span>
                    <div>
                      <h3 className="font-bold text-brand-navy mb-1">{s.title}</h3>
                      <p className="text-neutral-600 leading-relaxed text-sm">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="laisser-un-avis" className="py-16 bg-brand-surface border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Star size={32} weight="fill" className="text-brand-gold mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-3">Laisser un avis</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Votre avis aide les habitants d&apos;Île-de-France qui cherchent un épaviste ou un rachat sérieux. Deux minutes
                  suffisent, et chaque avis est lu.
                </p>
              </div>
              <ReviewCta />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-6 text-center">Avis vérifiés</h2>
              {testimonials.length === 0 ? (
                <p className="text-center text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Nous n&apos;affichons ici que des avis vérifiés, importés de notre fiche Google. Il n&apos;y en a pas encore de
                  publié sur cette page&nbsp;: aucun avis, aucune note et aucun nombre d&apos;avis ne sont inventés.
                </p>
              ) : (
                <ul className="grid sm:grid-cols-2 gap-6">
                  {testimonials.map((t) => (
                    <li key={`${t.name}-${t.date}`} className="p-6 bg-white rounded-2xl border border-neutral-200">
                      <p className="text-neutral-700 leading-relaxed mb-4">« {t.text} »</p>
                      <p className="text-sm font-semibold text-brand-navy">{t.name} — {t.location}</p>
                      <p className="text-xs text-neutral-500">{t.source ?? 'Google'} · {new Date(t.date).toLocaleDateString('fr-FR')}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-brand-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg mb-4">Une épave à enlever ou une voiture à vendre en Île-de-France&nbsp;?</p>
            <a href="tel:+33602427345" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-red font-semibold hover:bg-brand-red/90">
              <Phone size={18} weight="bold" /> 06 02 42 73 45
            </a>
            <p className="mt-4 text-sm text-neutral-300">
              <Link href="/epaviste/ile-de-france" className="underline underline-offset-4">Épaviste Île-de-France</Link> ·{' '}
              <Link href="/rachat-voiture/ile-de-france" className="underline underline-offset-4">Rachat voiture Île-de-France</Link> ·{' '}
              <Link href="/contact" className="underline underline-offset-4">Contact</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Shield, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { regions } from '@/lib/locations-complete';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { getRachatServiceData, getPillarFAQData } from '@/lib/structured-data';
import { generateRachatPillarMeta } from '@/lib/seo';
import { getBreadcrumbSchema, getSpeakableSchema } from '@/lib/schema';

export const metadata = generateRachatPillarMeta();

export default function RachatVoiturePage() {
  const serviceData = getRachatServiceData();
  const faqData = getPillarFAQData();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Rachat Voiture France', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
  ]);
  const speakableSchema = getSpeakableSchema('https://www.lesepavistespro.fr/rachat-voiture');

  const metroRegions = regions.filter(r => !['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));
  const outremerRegions = regions.filter(r => ['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));

  return (
    <>
      {/* Structured Data for SEO - Rendered in head */}
      <Script
        id="structured-data-rachat-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <Script
        id="structured-data-rachat-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Script
        id="structured-data-rachat-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="structured-data-rachat-speakable"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/[0.05] rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span className="text-sm font-medium text-brand-navy/70">Rachat Cash Partout en France</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
              Rachat De Voiture
              <br /><span className="text-brand-gold">Paiement Immédiat</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Nous rachetons tous types de véhicules : voitures HS, accidentées, en panne, sans CT.
              Estimation gratuite et paiement cash immédiat lors de l&apos;enlèvement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <ConversionForm
                trigger="button"
                defaultService="rachat"
                buttonText="Estimer ma Voiture"
                pageType="pillar"
                className="w-full sm:w-auto min-w-[280px]"
              />
              <a
                href="tel:0979049486"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy/5 hover:bg-brand-navy/10 border border-neutral-200 text-brand-navy rounded-full font-semibold transition-all"
              >
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a
                href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20vendre%20ma%20voiture"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp text-white rounded-full font-semibold transition-all hover:bg-whatsapp-hover"
              >
                <WhatsappLogo size={20} weight="fill" />
                WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-neutral-200 pt-8">
              <div className="flex flex-col items-center gap-2">
                <CurrencyEur size={22} weight="fill" className="text-brand-gold" />
                <span className="font-semibold text-neutral-700">Paiement Cash</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle size={22} weight="fill" className="text-brand-gold" />
                <span className="font-semibold text-neutral-700">Estimation Gratuite</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield size={22} weight="fill" className="text-brand-gold" />
                <span className="font-semibold text-neutral-700">Meilleur Prix</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock size={22} weight="fill" className="text-brand-gold" />
                <span className="font-semibold text-neutral-700">Rapide 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-8 leading-tight tracking-tight">
              Rachat de voiture <span className="text-brand-gold">partout en France</span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p>
                Vous souhaitez vendre rapidement votre voiture ? Notre service de rachat
                de véhicules intervient partout en France et vous propose une estimation gratuite et un paiement immédiat pour tous types
                de voitures : véhicules d&apos;occasion, voitures accidentées, véhicules en panne, épaves,
                voitures sans contrôle technique.
              </p>
              <div className="bg-white p-6 rounded-2xl border-l-2 border-brand-gold shadow-sm">
                <p className="font-medium text-neutral-700 m-0">
                  Nous intervenons dans les 18 régions de France, 101 départements et plus de 35 000 communes
                  pour racheter votre véhicule au meilleur prix. Le paiement s&apos;effectue immédiatement en
                  espèces, par chèque ou par virement selon votre préférence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-gold font-semibold tracking-wider uppercase text-sm mb-4 block">Types de véhicules</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nous rachetons tous types de véhicules
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures accidentées</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Nous rachetons votre véhicule accidenté en l&apos;état, roulant ou non.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures en panne</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Moteur HS, boîte de vitesse cassée, panne électronique... Nous reprenons tout.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures sans CT</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Vendez votre voiture sans contrôle technique. Nous nous occupons des démarches.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Épaves et VHU</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Rachat d&apos;épaves pour pièces ou destruction. Valorisation au poids ou à la pièce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Zones d&apos;intervention</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Rachat de voiture partout en France
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Sélectionnez votre région pour trouver l&apos;expert le plus proche
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg font-semibold text-brand-navy mb-6 border-b border-neutral-200 pb-4">France métropolitaine</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {metroRegions.map((region) => (
                  <Link
                    key={region.slug}
                    href={`/rachat-voiture/${region.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <MapPin size={18} weight="bold" className="text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                        {region.name}
                      </div>
                      <div className="text-xs text-neutral-500">{region.departments.length} dép.</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-navy mb-6 border-b border-neutral-200 pb-4">Outre-mer</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {outremerRegions.map((region) => (
                  <Link
                    key={region.slug}
                    href={`/rachat-voiture/${region.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <MapPin size={18} weight="bold" className="text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                        {region.name}
                      </div>
                      <div className="text-xs text-neutral-500">{region.departments.length} dép.</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-b border-neutral-200">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Estimation gratuite</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Obtenez votre estimation gratuite
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire &bull; Paiement cash immédiat &bull; Meilleur prix garanti
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="rachat" />
          </div>
        </div>
      </section>

      {/* FAQ & Footer */}
      <CTASection />
      <FAQ />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

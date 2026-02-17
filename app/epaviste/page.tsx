import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { regions } from '@/lib/locations-complete';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { getEpavisteServiceData, getPillarFAQData } from '@/lib/structured-data';
import { generateEpavistePillarMeta } from '@/lib/seo';
import { getEpaveRemovalHowToSchema, getBreadcrumbSchema, getSpeakableSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';

export const metadata: Metadata = generateEpavistePillarMeta();

export default function EpavistePage() {
  const serviceData = getEpavisteServiceData();
  const faqData = getPillarFAQData();
  const howToSchema = getEpaveRemovalHowToSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Épaviste France', url: 'https://www.lesepavistespro.fr/epaviste' },
  ]);
  const speakableSchema = getSpeakableSchema('https://www.lesepavistespro.fr/epaviste');

  // Separate metropolitan and overseas regions
  const metroRegions = regions.filter(r => !['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));
  const outremerRegions = regions.filter(r => ['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));

  return (
    <>
      {/* Structured Data for SEO - Rendered in head */}
      <Script
        id="structured-data-epaviste-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <Script
        id="structured-data-epaviste-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Script
        id="structured-data-epaviste-howto"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="structured-data-epaviste-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="structured-data-epaviste-speakable"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/[0.04] rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
              <span className="text-sm font-medium text-brand-navy/70">Service gratuit disponible 24h/24</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
              Épaviste Agréé VHU
              <br /><span className="text-brand-red">France Entière</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Service d&apos;enlèvement d&apos;épave 100% gratuit partout en France.
              Épaviste agréé VHU, intervention 24h/24, certificat de destruction fourni.
              18 régions couvertes. 09 79 04 94 86.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <ConversionForm
                trigger="button"
                defaultService="epaviste"
                buttonText="Demander un Enlèvement"
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
                href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20un%20devis"
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
                <CheckCircle size={22} weight="fill" className="text-brand-red" />
                <span className="font-semibold text-neutral-700">100% Gratuit</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock size={22} weight="fill" className="text-brand-red" />
                <span className="font-semibold text-neutral-700">Intervention 24h</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield size={22} weight="fill" className="text-brand-red" />
                <span className="font-semibold text-neutral-700">Agréé VHU</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin size={22} weight="fill" className="text-brand-red" />
                <span className="font-semibold text-neutral-700">Toute France</span>
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
              Service d&apos;enlèvement d&apos;épave <span className="text-brand-red">partout en France</span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p>
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever ?
                Notre service d&apos;épaviste agréé VHU intervient gratuitement dans toute la France métropolitaine
                et les départements d&apos;outre-mer. Nous couvrons 18 régions, 101 départements et plus de 35 000 communes.
              </p>
              <p>
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé ou simplement
                trop ancien, nous nous chargeons de son enlèvement gratuit et de toutes les démarches
                administratives. Le certificat de destruction vous est remis immédiatement.
              </p>
              <div className="bg-white p-6 rounded-2xl border-l-2 border-brand-red shadow-sm">
                <p className="font-medium text-neutral-700 m-0">
                  Notre réseau d&apos;épavistes professionnels dispose de l&apos;équipement nécessaire pour intervenir
                  même dans les situations difficiles : parking souterrain, terrain enclavé, voirie publique, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-4 block">Nos Engagements</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Pourquoi choisir notre service ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Service 100% gratuit</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Aucun frais pour l&apos;enlèvement de votre épave. Le déplacement, le remorquage et la destruction sont entièrement pris en charge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <Clock size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Intervention rapide</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Prise en charge sous 24-48h partout en France. Service d&apos;urgence disponible pour les situations critiques.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <Shield size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Agréé préfecture</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Nous sommes un centre VHU agréé. Nous vous fournissons le certificat de destruction officiel immédiatement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <MapPin size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Couverture nationale</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Présent dans 18 régions et 101 départements. Plus de 35 000 communes desservies en France métropolitaine et outre-mer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid - Metropolitan */}
      <section className="py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Zones d&apos;intervention</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Choisissez votre région
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Sélectionnez votre région pour trouver l&apos;épaviste agréé le plus proche de chez vous.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg font-semibold text-brand-navy mb-6 border-b border-neutral-200 pb-4">France métropolitaine</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {metroRegions.map((region) => (
                  <Link
                    key={region.slug}
                    href={`/epaviste/${region.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <MapPin size={18} weight="bold" className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors">
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
                    href={`/epaviste/${region.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <MapPin size={18} weight="bold" className="text-brand-red" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors">
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
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Devis gratuit</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Demandez votre enlèvement gratuit
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire &bull; Réponse sous 15 minutes &bull; Service 100% gratuit
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="epaviste" />
          </div>
        </div>
      </section>

      {/* FAQ & Footer */}
      <CTASection />
      <FAQ />
      <VHUCertification />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

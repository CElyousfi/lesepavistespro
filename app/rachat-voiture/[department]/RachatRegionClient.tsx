'use client';

import dynamic from 'next/dynamic';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin, CurrencyEur } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import type { RegionData } from '@/lib/page-data';
import type { IdfRegionContent } from '@/data/idf-extra-content';
import type { IdfFaqItem } from '@/data/idf-faq';
import type { IdfTestimonial } from '@/data/idf-testimonials';

const ConversionForm = dynamic(() => import('@/components/ConversionForm'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), { ssr: false });
const IdfExtraContent = dynamic(() => import('@/components/IdfExtraContent'), { ssr: true });
const IdfInternalLinks = dynamic(() => import('@/components/IdfInternalLinks'), { ssr: true });
const IdfFaq = dynamic(() => import('@/components/IdfFaq'), { ssr: true });
const IdfAeoSection = dynamic(() => import('@/components/IdfAeoSection'), { ssr: true });

interface RachatRegionClientProps {
  region: RegionData;
  isIdf: boolean;
  idfRegionContent: IdfRegionContent | null;
  idfTestimonials: IdfTestimonial[];
  idfFaqItems: IdfFaqItem[];
}

export default function RachatRegionClientPage({ region, isIdf, idfRegionContent, idfTestimonials, idfFaqItems }: RachatRegionClientProps) {
  const totalCities = region.departments.reduce((sum, dept) => sum + dept.cities.length, 0);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <LocationHero accentColor="gold">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Rachat Voiture', href: '/rachat-voiture' },
              { label: region.name },
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Rachat cash en {region.name}
          </span>
        </div>

        {isIdf && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8 sm:mb-10 ml-2">
            <span className="text-xs sm:text-sm font-semibold text-brand-gold/90">
              Prime à la conversion 2026 — jusqu&apos;à 6 000€
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          Rachat Voiture {region.name}
          <br /><span className="text-brand-gold">Paiement Immédiat</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Nous rachetons tous types de véhicules en {region.name} :
          voitures d'occasion, véhicules accidentés, en panne, sans contrôle technique.
          Paiement cash immédiat dans tous les départements.
          09 79 04 94 86.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <ConversionForm
            trigger="button"
            defaultService="rachat"
            buttonText="Estimer ma Voiture"
            pageType="department"
            className="w-full sm:w-auto sm:min-w-[280px]"
          />
          <a href="tel:0979049486" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy/5 hover:bg-brand-navy/10 border border-neutral-200 text-brand-navy rounded-full font-semibold transition-all">
            <Phone size={20} weight="bold" />
            09 79 04 94 86
          </a>
          <a
            href={`https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture en ${region.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp text-white rounded-full font-semibold transition-all hover:bg-whatsapp-hover"
          >
            <WhatsappLogo size={20} weight="fill" />
            Estimation WhatsApp
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center gap-2">
            <CurrencyEur size={22} weight="fill" className="text-brand-gold" />
            <span className="font-semibold text-neutral-700">Paiement Cash</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={22} weight="fill" className="text-brand-gold" />
            <span className="font-semibold text-neutral-700">Estimation Gratuite</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={22} weight="fill" className="text-brand-gold" />
            <span className="font-semibold text-neutral-700">Meilleur Prix</span>
          </div>
        </div>
      </LocationHero>

      {/* Service Description */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 sm:mb-8 leading-tight tracking-tight">
              Rachat de voiture <span className="text-brand-gold">en {region.name}</span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p className="mb-4">
                Vous souhaitez vendre rapidement votre voiture en {region.name} ?
                Notre service de rachat de véhicules intervient dans les {region.departments.length} départements
                de la région pour acheter votre voiture au meilleur prix, quel que soit son état.
              </p>
              <p className="mb-4">
                Nous rachetons tous types de véhicules en {region.name} : voitures d'occasion,
                véhicules accidentés, voitures en panne, épaves, véhicules sans contrôle technique.
                Paiement immédiat par espèces, chèque ou virement selon votre préférence.
              </p>
              <p>
                Plus de {totalCities.toLocaleString('fr-FR')} communes desservies en {region.name}.
                Estimation gratuite et enlèvement de votre véhicule à domicile inclus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments List */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Zones d'intervention</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Rachat de voiture dans tous les départements
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {region.departments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/rachat-voiture/${dept.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                    <MapPin size={18} weight="bold" className="text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                      {dept.name} ({dept.code})
                    </div>
                    <div className="text-xs text-neutral-500">{dept.cities.length} communes</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-gold font-semibold tracking-wider uppercase text-sm mb-4 block">Types de véhicules</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nous rachetons tous types de véhicules
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures accidentées</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Rachat de véhicules accidentés, même gravement endommagés. Nous évaluons les pièces récupérables.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures en panne</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Achat de voitures HS, avec problème moteur, boîte de vitesse ou tout autre panne mécanique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Voitures sans CT</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Rachat de véhicules sans contrôle technique valide, même avec contre-visite refusée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors text-brand-gold">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Épaves et véhicules anciens</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Achat d'épaves et de vieilles voitures, même non roulantes. Paiement selon l'état et les pièces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Internal Linking */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Services associés</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nos autres services en {region.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/epaviste/${region.slug}`}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  Épaviste en {region.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Service d'enlèvement d'épave 100% gratuit dans toute la région {region.name}. Agréé VHU, certificat de destruction fourni.
                </p>
                <span className="text-brand-red font-semibold text-sm">
                  Voir le service épaviste →
                </span>
              </Link>
              <Link
                href="/rachat-voiture"
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                  Rachat voiture partout en France
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Découvrez notre service de rachat de voiture dans toutes les régions de France.
                </p>
                <span className="text-brand-gold font-semibold text-sm">
                  Voir toutes nos zones →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-b border-neutral-200">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Estimation gratuite</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
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

      {/* IDF Extra Content */}
      {isIdf && idfRegionContent && (
        <IdfExtraContent
          deptContent={idfRegionContent}
          testimonials={idfTestimonials}
          service="rachat"
          locationName="Île-de-France"
        />
      )}

      {/* IDF Internal Links */}
      {isIdf && (
        <IdfInternalLinks service="rachat-voiture" />
      )}

      {/* CTA Section */}
      <CTASection />

      {/* AEO — cas particuliers extractibles par les IA */}
      {isIdf && (
        <IdfAeoSection
          clusters={['eligibilite', 'cas-particuliers', 'comparaison']}
          service="rachat"
        />
      )}

      {/* FAQ */}
      {isIdf ? <IdfFaq faqItems={idfFaqItems} service="rachat" /> : <FAQ />}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

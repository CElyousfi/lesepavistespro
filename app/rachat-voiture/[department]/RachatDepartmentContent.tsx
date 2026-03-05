'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Shield, MapPin, Clock, CaretDown } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import type { DepartmentData, ParentRegionData } from '@/lib/page-data';
import type { IdfDeptContent } from '@/data/idf-extra-content';
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

interface RachatDepartmentProps {
  dept: DepartmentData;
  parentRegion: ParentRegionData | null;
  isIdf: boolean;
  idfContent: IdfDeptContent | null;
  idfTestimonials: IdfTestimonial[];
  idfFaqItems: IdfFaqItem[];
}

export default function RachatDepartmentContent({ dept, parentRegion, isIdf, idfContent, idfTestimonials, idfFaqItems }: RachatDepartmentProps) {
  const CITIES_PER_PAGE = 20;
  const [visibleCities, setVisibleCities] = useState(CITIES_PER_PAGE);
  const hasMoreCities = dept.cities.length > visibleCities;
  const displayedCities = dept.cities.slice(0, visibleCities);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <LocationHero accentColor="gold">
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-8 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Rachat cash dans le {dept.name}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          Rachat Voiture {dept.name} ({dept.code})
          <br /><span className="text-brand-gold">Paiement Immédiat</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Nous rachetons tous types de véhicules dans le {dept.name} ({dept.code}) :
          voitures d'occasion, véhicules accidentés, en panne, sans contrôle technique.
          Paiement cash immédiat. Estimation gratuite.
          09 79 04 94 86.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <ConversionForm
            trigger="button"
            defaultService="rachat"
            buttonText="Estimer ma Voiture"
            pageType="department"
            departmentName={dept.name}
            className="w-full sm:w-auto sm:min-w-[280px]"
          />
          <a href="tel:0979049486" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy/5 hover:bg-brand-navy/10 border border-neutral-200 text-brand-navy rounded-full font-semibold transition-all">
            <Phone size={20} weight="bold" />
            09 79 04 94 86
          </a>
          <a 
            href={`https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture dans le ${dept.name}`}
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
              Rachat de voiture <span className="text-brand-gold">dans le {dept.name}</span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p className="mb-4">
                Vous souhaitez vendre rapidement votre voiture dans le département {dept.name} ({dept.code}) ? 
                Nous rachetons tous types de véhicules au meilleur prix : voitures d'occasion, véhicules accidentés, 
                voitures en panne, épaves, véhicules sans contrôle technique, etc.
              </p>
              <p className="mb-4">
                Notre service de rachat de voiture vous garantit une estimation gratuite et transparente, 
                un paiement immédiat (espèces, chèque ou virement) et l'enlèvement gratuit de votre véhicule 
                partout dans le {dept.name}.
              </p>
              <p>
                Que votre voiture soit roulante ou non, récente ou ancienne, nous vous proposons le meilleur prix 
                en fonction de son état, de sa marque, de son modèle et de la demande en pièces détachées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
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

      {/* Cities List */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Zones d'intervention</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Rachat de voiture dans toutes les villes du {dept.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Service de rachat disponible dans tout le département {dept.code}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayedCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/rachat-voiture/${dept.slug}/${city.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                >
                  <MapPin size={18} weight="bold" className="text-brand-gold flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors truncate">
                      {city.name}
                    </div>
                    <div className="text-xs text-neutral-500">{city.postalCode}</div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMoreCities && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCities(prev => prev + CITIES_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-neutral-200 hover:border-brand-gold/30 text-brand-navy hover:text-brand-gold rounded-full font-semibold transition-all hover:shadow-md"
                >
                  <CaretDown size={20} weight="bold" />
                  Voir plus de communes ({dept.cities.length - visibleCities} restantes)
                </button>
              </div>
            )}

            {!hasMoreCities && dept.cities.length > CITIES_PER_PAGE && (
              <div className="text-center mt-6">
                <p className="text-sm text-neutral-500">
                  {dept.cities.length} communes affichées
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-gold font-semibold tracking-wider uppercase text-sm mb-4 block">Comment ça marche</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                3 étapes simples
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Contactez-nous</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Appelez-nous au 09 79 04 94 86 ou envoyez-nous un message WhatsApp avec les informations de votre véhicule.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Estimation gratuite</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Nous évaluons votre véhicule et vous proposons un prix d'achat immédiat, sans engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Paiement et enlèvement</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Si vous acceptez notre offre, nous venons chercher votre véhicule et vous payons immédiatement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Internal Linking */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Services associés</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nos autres services dans le {dept.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/epaviste/${dept.slug}`}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  Épaviste {dept.name} ({dept.code})
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Service d'enlèvement d'épave 100% gratuit dans le {dept.name}. Agréé VHU, certificat de destruction fourni.
                </p>
                <span className="text-brand-red font-semibold text-sm">
                  Voir le service épaviste →
                </span>
              </Link>
              <Link
                href={parentRegion ? `/rachat-voiture/${parentRegion.slug}` : '/rachat-voiture'}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                  Rachat voiture {parentRegion ? parentRegion.name : 'France'}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Découvrez notre service de rachat de voiture dans tous les départements {parentRegion ? `de la région ${parentRegion.name}` : 'de France'}.
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
      {isIdf && idfContent && (
        <IdfExtraContent
          deptContent={idfContent}
          testimonials={idfTestimonials}
          service="rachat"
          locationName={dept.name}
        />
      )}

      {/* IDF Internal Links */}
      {isIdf && (
        <IdfInternalLinks service="rachat-voiture" currentDeptSlug={dept.slug} />
      )}

      {/* CTA Section */}
      <CTASection />

      {/* FAQ */}
      {isIdf ? <IdfFaq faqItems={idfFaqItems} service="rachat" /> : <FAQ />}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

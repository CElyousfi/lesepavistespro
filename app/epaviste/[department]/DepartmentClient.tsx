'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin, CaretDown } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import type { DepartmentData, ParentRegionData } from '@/lib/page-data';
import type { IdfDeptContent } from '@/data/idf-extra-content';
import type { IdfFaqItem } from '@/data/idf-faq';
import type { IdfTestimonial } from '@/data/idf-testimonials';

// Dynamic imports for below-fold heavy components
const ConversionForm = dynamic(() => import('@/components/ConversionForm'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), { ssr: false });
const IdfExtraContent = dynamic(() => import('@/components/IdfExtraContent'), { ssr: true });
const IdfInternalLinks = dynamic(() => import('@/components/IdfInternalLinks'), { ssr: true });
const IdfFaq = dynamic(() => import('@/components/IdfFaq'), { ssr: true });

interface DepartmentClientProps {
  dept: DepartmentData;
  parentRegion: ParentRegionData | null;
  isIdf: boolean;
  idfContent: IdfDeptContent | null;
  idfTestimonials: IdfTestimonial[];
  idfFaqItems: IdfFaqItem[];
}

export default function DepartmentClientPage({ dept, parentRegion, isIdf, idfContent, idfTestimonials, idfFaqItems }: DepartmentClientProps) {
  const CITIES_PER_PAGE = 20;
  const [visibleCities, setVisibleCities] = useState(CITIES_PER_PAGE);
  const hasMoreCities = dept.cities.length > visibleCities;
  const displayedCities = dept.cities.slice(0, visibleCities);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <LocationHero>
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Service disponible 24h/24, 7j/7 dans le {dept.name}
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
          Épaviste {dept.name} ({dept.code})
          <br /><span className="text-brand-red">Enlèvement Gratuit 24h</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Épaviste agréé VHU dans tout le département {dept.name} ({dept.code}). 
          Enlèvement d'épave 100% GRATUIT 24h/24, certificat de destruction fourni.
          Intervention rapide sous {isIdf ? '2h' : '24-48h'}.
          09 79 04 94 86.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <ConversionForm
            trigger="button"
            defaultService="epaviste"
            buttonText="Demander un Enlèvement"
            pageType="department"
            departmentName={dept.name}
            className="w-full sm:w-auto sm:min-w-[280px]"
          />
          <a href="tel:0979049486" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy/5 hover:bg-brand-navy/10 border border-neutral-200 text-brand-navy rounded-full font-semibold transition-all">
            <Phone size={20} weight="bold" />
            09 79 04 94 86
          </a>
          <a 
            href={`https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave dans le ${dept.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp text-white rounded-full font-semibold transition-all hover:bg-whatsapp-hover"
          >
            <WhatsappLogo size={20} weight="fill" />
            WhatsApp
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm border-t border-neutral-200 pt-8">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={22} weight="fill" className="text-brand-red" />
            <span className="font-semibold text-neutral-700">100% Gratuit</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={22} weight="fill" className="text-brand-red" />
            <span className="font-semibold text-neutral-700">Intervention {isIdf ? '2h' : '24-48h'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={22} weight="fill" className="text-brand-red" />
            <span className="font-semibold text-neutral-700">Agréé VHU</span>
          </div>
        </div>
      </LocationHero>

      {/* Service Description */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 sm:mb-8 leading-tight tracking-tight">
              Service d'enlèvement d'épave dans le {dept.name}
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p className="mb-4">
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever dans le département {dept.name} ({dept.code}) ? 
                Notre service d'épaviste agréé VHU (centre de destruction automobile agréé préfecture) intervient gratuitement dans toutes les villes du département pour la destruction et le recyclage de votre véhicule hors d'usage.
              </p>
              <p className="mb-4">
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé, immobilisé ou simplement trop ancien, 
                nous nous chargeons de son enlèvement gratuit et de toutes les démarches administratives obligatoires. 
                Le certificat de destruction (déclaration de cession préfectorale) vous est remis immédiatement pour vous libérer de toute responsabilité légale.
              </p>
              <p>
                Notre équipe de professionnels de la casse automobile dispose de l'équipement nécessaire pour intervenir même dans 
                les situations difficiles : parking souterrain, copropriété, terrain enclavé, voirie publique, fourrière. 
                Service de dépollution et démontage conforme aux normes environnementales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Zones d'intervention</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Villes desservies dans le {dept.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Nous intervenons dans toutes les communes du département {dept.code}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayedCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/epaviste/${dept.slug}/${city.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                >
                  <MapPin size={18} weight="bold" className="text-brand-red flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors truncate">
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
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-neutral-200 hover:border-brand-red/30 text-brand-navy hover:text-brand-red rounded-full font-semibold transition-all hover:shadow-md"
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

      {/* Why Choose Us — only on non-IDF pages (IdfExtraContent has a detailed IDF version) */}
      {!isIdf && (
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-4 block">Nos Engagements</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Pourquoi choisir notre service dans le {dept.name} ?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <CheckCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Service 100% gratuit</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Aucun frais pour l'enlèvement de votre épave dans le {dept.code}, même en sous-sol ou terrain difficile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <Clock size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Intervention rapide</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Prise en charge sous 24-48h dans tout le {dept.name}. Service d'urgence disponible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <Shield size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Agréé préfecture</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Centre VHU agréé, certificat de destruction officiel fourni immédiatement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors text-brand-red">
                    <MapPin size={24} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">Couverture totale</h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Toutes les villes du {dept.name} desservies, aucun frais de déplacement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Related Services - Internal Linking */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Services associés</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nos autres services dans le {dept.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/rachat-voiture/${dept.slug}`}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                  Rachat voiture {dept.name} ({dept.code})
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Nous rachetons également tous types de véhicules dans le {dept.name}. Paiement cash immédiat, sans contrôle technique.
                </p>
                <span className="text-brand-gold font-semibold text-sm">
                  Voir le service rachat →
                </span>
              </Link>
              <Link
                href={parentRegion ? `/epaviste/${parentRegion.slug}` : '/epaviste'}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  Épaviste {parentRegion ? parentRegion.name : 'France'}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Découvrez notre service d'enlèvement d'épave dans tous les départements {parentRegion ? `de la région ${parentRegion.name}` : 'de France'}.
                </p>
                <span className="text-brand-red font-semibold text-sm">
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
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Devis gratuit</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Demandez votre enlèvement gratuit
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire • Réponse sous 15 minutes • Service 100% gratuit
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="epaviste" />
          </div>
        </div>
      </section>

      {/* IDF Extra Content (conditionally rendered for IDF departments only) */}
      {isIdf && idfContent && (
        <IdfExtraContent
          deptContent={idfContent}
          testimonials={idfTestimonials}
          service="epaviste"
          locationName={dept.name}
        />
      )}

      {/* IDF Internal Links */}
      {isIdf && (
        <IdfInternalLinks service="epaviste" currentDeptSlug={dept.slug} />
      )}

      {/* CTA Section */}
      <CTASection />

      {/* FAQ */}
      {isIdf ? <IdfFaq faqItems={idfFaqItems} service="epaviste" /> : <FAQ />}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

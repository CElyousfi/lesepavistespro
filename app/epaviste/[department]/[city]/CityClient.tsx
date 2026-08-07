'use client';

import dynamic from 'next/dynamic';
import { CheckCircle, Clock, Shield, MapPin, CaretRight, Car, CurrencyEur } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import TrustBadges from '@/components/TrustBadges';
import ServiceCard from '@/components/ServiceCard';
import type { CityData, DepartmentData } from '@/lib/page-data';
import type { CityLocalData } from '@/lib/city-local-data';
import type { IdfTestimonial } from '@/data/idf-testimonials';
import type { IdfDeptContent } from '@/data/idf-extra-content';
import type { IdfFaqItem } from '@/data/idf-faq';

const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: true });
const ConversionForm = dynamic(() => import('@/components/ConversionForm'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), { ssr: false });
const IdfInternalLinks = dynamic(() => import('@/components/IdfInternalLinks'), { ssr: true });
const IdfExtraContent = dynamic(() => import('@/components/IdfExtraContent'), { ssr: true });
const IdfFaq = dynamic(() => import('@/components/IdfFaq'), { ssr: true });
const IdfAeoSection = dynamic(() => import('@/components/IdfAeoSection'), { ssr: true });

interface CityEpavisteClientProps {
  city: CityData;
  department: DepartmentData;
  localData: CityLocalData | null;
  isIdf: boolean;
  // Optional IDF-only data (passed only when isIdf=true)
  idfDeptTestimonials?: IdfTestimonial[];
  idfDeptContent?: IdfDeptContent | null;
  idfFaqItems?: IdfFaqItem[];
}

export default function CityEpavisteClient({
  city,
  department,
  localData,
  isIdf,
  idfDeptTestimonials = [],
  idfDeptContent = null,
  idfFaqItems = [],
}: CityEpavisteClientProps) {
  // Get nearby cities (first 6 from same department, excluding current)
  const nearbyCities = department.cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 6);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <LocationHero>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Épaviste', href: '/epaviste' },
              { label: department.name, href: `/epaviste/${department.slug}` },
              { label: city.name }
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Service disponible 24h/24, 7j/7 à {city.name}
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
          Épaviste {city.name}
          <br /><span className="text-brand-red">Enlèvement Gratuit ({city.postalCode})</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Épaviste agréé VHU à {city.name}. Enlèvement d'épave 100% GRATUIT 24h/24,
          certificat de destruction fourni. Intervention rapide sous {isIdf ? '2h' : '24-48h'}.
          06 02 42 73 45.
        </p>

        {/* CTA Buttons */}
        <QuickContact 
          service="epaviste" 
          location={`${city.name} (${city.postalCode})`}
          cityName={city.name}
          departmentName={department.name}
          className="justify-center mb-12 sm:mb-16"
        />

        {/* Trust Indicators */}
        <TrustBadges service="epaviste" isIdf={isIdf} />
      </LocationHero>

      {/* Service Description */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 sm:mb-8 leading-tight tracking-tight">
              Enlèvement d'épave à {city.name} ({city.postalCode})
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <h3 className="text-xl font-bold text-brand-navy mb-3">Service d'enlèvement à {city.name}</h3>
              <p className="mb-3">
                Vous habitez {city.name} ({city.postalCode}) et vous avez besoin de faire enlever une épave ? 
                Notre service d'épaviste agréé VHU intervient gratuitement pour récupérer votre véhicule hors d'usage.
              </p>
              
              <h3 className="text-xl font-bold text-brand-navy mb-3 mt-6">Délai d'intervention</h3>
              <p className="mb-3">
                Intervention rapide sous {isIdf ? '2-4h' : '24-48h'} à {city.name} et dans tout le {department.name}. 
                En urgence, nous pouvons intervenir le jour même.
              </p>
              
              <h3 className="text-xl font-bold text-brand-navy mb-3 mt-6">Comment nous contacter</h3>
              <p className="mb-4">
                ☎️ Appelez le 06 02 42 73 45 pour une intervention urgente<br/>
                💬 WhatsApp ou formulaire pour une demande de devis
              </p>
              
              {/* Local specific content */}
              {localData && (
                <>
                  {localData.acces && (
                    <div className="bg-white p-4 sm:p-6 rounded-2xl border-l-2 border-brand-red shadow-sm my-6">
                      <h3 className="font-bold text-brand-navy mb-2">Accès et intervention à {city.name}</h3>
                      <p className="text-sm text-neutral-600">{localData.acces}</p>
                    </div>
                  )}
                  
                  {localData.specificites && localData.specificites.length > 0 && (
                    <div className="my-6">
                      <h3 className="font-bold text-brand-navy mb-3">Spécificités locales :</h3>
                      <ul className="space-y-2">
                        {localData.specificites.map((spec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle size={20} weight="fill" className="text-brand-red flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-700">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Local Fourrière & Parking Info */}
      {localData && (localData.fourriere || localData.parkings.length > 0) && (
        <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Infos pratiques</span>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                  Informations pratiques à {city.name}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Fourrière Info */}
                {localData.fourriere && (
                  <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
                    <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                      <MapPin size={24} weight="bold" className="text-brand-red flex-shrink-0" />
                      Fourrière locale
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>{localData.fourriere.name}</strong></p>
                      <p className="text-neutral-600">{localData.fourriere.address}</p>
                      <p className="text-neutral-600">☎️ {localData.fourriere.phone}</p>
                      <div className="pt-3 mt-3 border-t border-neutral-200">
                        <p className="text-neutral-700"><strong>Tarif :</strong> {localData.fourriere.tarif}</p>
                        <p className="text-neutral-700"><strong>Délai :</strong> {localData.fourriere.delai}</p>
                      </div>
                      <div className="pt-3 mt-3 bg-green-50 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 rounded-b-2xl">
                        <p className="text-sm text-green-800">
                          💡 <strong>Astuce :</strong> Nous pouvons récupérer votre véhicule directement en fourrière et gérer les démarches.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Parking Info */}
                {localData.parkings.length > 0 && (
                  <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
                    <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                      <Car size={24} weight="fill" className="text-brand-red flex-shrink-0" />
                      Parkings principaux
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Nous intervenons dans tous les parkings de {city.name}, notamment :
                    </p>
                    <ul className="space-y-2">
                      {localData.parkings.slice(0, 5).map((parking, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle size={16} weight="fill" className="text-brand-blue flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{parking}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 mt-3 bg-blue-50 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 rounded-b-2xl">
                      <p className="text-sm text-blue-800">
                        🚛 <strong>Équipement :</strong> Treuil et matériel adapté pour sous-sols et rampes étroites.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Local Benefits */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-4 block">Nos Engagements</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Notre service à {city.name}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ServiceCard
                icon={CheckCircle}
                title="Enlèvement 100% gratuit"
                description={`Aucun frais pour l'enlèvement de votre épave à ${city.name}.`}
                color="red"
              />
              <ServiceCard
                icon={Clock}
                title="Intervention rapide"
                description={`Prise en charge sous ${isIdf ? '2-4h' : '24-48h'} à ${city.name}.`}
                color="red"
              />
              <ServiceCard
                icon={Shield}
                title="Centre VHU agréé"
                description="Certificat de destruction officiel fourni immédiatement."
                color="red"
              />
              <ServiceCard
                icon={MapPin}
                title="Connaissance locale"
                description={`Nos épavistes connaissent parfaitement ${city.name}.`}
                color="red"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Villes proches</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                  Nous intervenons aussi près de {city.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/epaviste/${department.slug}/${nearbyCity.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <MapPin size={18} weight="bold" className="text-brand-red flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors truncate">
                        {nearbyCity.name}
                      </div>
                      <div className="text-xs text-neutral-500">{nearbyCity.postalCode}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href={`/epaviste/${department.slug}`}
                  className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red/80 font-semibold transition-colors"
                >
                  Voir toutes les villes du {department.name}
                  <CaretRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />

      {/* Conversion Form */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-b border-neutral-200">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Devis gratuit</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Demandez votre devis gratuit à {city.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire &bull; Réponse sous 15 minutes &bull; Service 100% gratuit
              </p>
            </div>
            <ConversionForm trigger="inline" />
          </div>
        </div>
      </section>

      {/* Internal Linking - Related Services & Cities */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Cross-link to Rachat */}
            <div className="mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
              <h3 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                <CurrencyEur size={24} weight="fill" className="text-brand-gold" />
                Vous souhaitez plutôt vendre votre voiture ?
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                Découvrez notre service de rachat de voiture à {city.name}. Paiement cash immédiat, tous véhicules acceptés.
              </p>
              <Link
                href={`/rachat-voiture/${department.slug}/${city.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-full font-semibold transition-all shadow-sm hover:shadow-md text-sm"
              >
                Rachat voiture à {city.name}
                <CaretRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Neighboring Cities */}
            {department.cities.length > 1 && (
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-6">
                  Épaviste dans les villes voisines
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {department.cities
                    .filter(c => c.slug !== city.slug)
                    .slice(0, 8)
                    .map((neighborCity) => (
                      <Link
                        key={neighborCity.slug}
                        href={`/epaviste/${department.slug}/${neighborCity.slug}`}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                      >
                        <MapPin size={18} weight="bold" className="text-brand-red flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors truncate">
                            {neighborCity.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IDF: extra hyper-local content (Pourquoi nous + Étude de cas + ZFE-m + Avis IDF) */}
      {isIdf && idfDeptContent && (
        <IdfExtraContent
          deptContent={idfDeptContent}
          testimonials={idfDeptTestimonials}
          service="epaviste"
          locationName={`${city.name} (${department.name})`}
          pageSlug={city.slug}
        />
      )}

      {/* IDF Internal Links */}
      {isIdf && (
        <IdfInternalLinks service="epaviste" currentDeptSlug={department.slug} currentCitySlug={city.slug} />
      )}

      {/* AEO — questions extractibles par les IA, affichées sur les pages city IDF */}
      {isIdf && (
        <IdfAeoSection
          clusters={['eligibilite', 'cas-particuliers']}
          service="epaviste"
        />
      )}

      {/* FAQ — IDF cities get hyper-local IdfFaq, others get the generic FAQ */}
      {isIdf && idfFaqItems.length > 0 ? (
        <IdfFaq faqItems={idfFaqItems} service="epaviste" />
      ) : (
        <FAQ />
      )}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

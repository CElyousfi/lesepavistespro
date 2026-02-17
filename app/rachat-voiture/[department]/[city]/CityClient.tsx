'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/locations-complete';
import { CheckCircle, CurrencyEur, Shield, MapPin, Clock, CaretRight, Car } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import TrustBadges from '@/components/TrustBadges';
import ServiceCard from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getBreadcrumbData, getCityFAQData, renderJSONLD } from '@/lib/structured-data';
import { getCityLocalData } from '@/lib/city-local-data';

export default function CityRachatClient({ citySlug }: { citySlug: string }) {
  const result = getCityBySlug(citySlug);

  if (!result) {
    notFound();
  }

  const { city, department } = result;

  // Get local data (fourrière, parking, etc.)
  const localData = getCityLocalData(city.slug);

  // Structured Data
  const breadcrumbData = getBreadcrumbData([
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}` },
    { name: city.name, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}/${city.slug}` }
  ]);

  const cityFAQData = getCityFAQData(city.name, department.name, city.slug);

  // Get nearby cities (first 6 from same department, excluding current)
  const nearbyCities = department.cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 6);

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id={`breadcrumb-rachat-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id={`faq-rachat-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityFAQData) }}
      />
      
      <Header />
      {/* Hero Section */}
      <LocationHero accentColor="gold">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Rachat Voiture', href: '/rachat-voiture' },
              { label: department.name, href: `/rachat-voiture/${department.slug}` },
              { label: city.name }
            ]}
          />
        </div>

        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-8 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Rachat cash à {city.name}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          Rachat Voiture {city.name}
          <br /><span className="text-brand-gold">Paiement Immédiat ({city.postalCode})</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Nous rachetons tous types de véhicules à {city.name} :
          voitures d'occasion en bon état, véhicules accidentés, voitures en panne,
          épaves, véhicules sans contrôle technique. Paiement cash immédiat.
          09 79 04 94 86.
        </p>

        {/* CTA Buttons */}
        <QuickContact 
          service="rachat" 
          location={`${city.name} (${city.postalCode})`}
          cityName={city.name}
          departmentName={department.name}
          className="justify-center mb-12 sm:mb-16"
        />

        {/* Trust Indicators */}
        <TrustBadges service="rachat" />
      </LocationHero>

      {/* Service Description */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 sm:mb-8 leading-tight tracking-tight">
              Rachat de voiture <span className="text-brand-gold">à {city.name} ({city.postalCode})</span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p className="mb-4">
                Vous habitez {city.name} et vous souhaitez vendre rapidement votre voiture ? 
                Notre service de rachat de véhicules intervient à {city.name} ({city.postalCode}) 
                pour acheter votre voiture au meilleur prix, quel que soit son état.
              </p>
              <p className="mb-4">
                Nous rachetons tous types de véhicules à {city.name} : voitures d'occasion en bon état, 
                véhicules accidentés, voitures en panne, épaves, véhicules sans contrôle technique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Benefits */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-gold font-semibold tracking-wider uppercase text-sm mb-4 block">Nos Engagements</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Pourquoi nous choisir à {city.name} ?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ServiceCard
                icon={CurrencyEur}
                title="Meilleur prix garanti"
                description={`Nous vous proposons le meilleur prix pour votre véhicule à ${city.name}.`}
                color="orange"
              />
              <ServiceCard
                icon={Clock}
                title="Paiement immédiat"
                description={`Vous êtes payé immédiatement lors de l'enlèvement à ${city.name}.`}
                color="orange"
              />
              <ServiceCard
                icon={Shield}
                title="Service professionnel"
                description="Estimation gratuite, démarches administratives prises en charge."
                color="orange"
              />
              <ServiceCard
                icon={MapPin}
                title="Enlèvement gratuit"
                description={`Nous venons chercher votre véhicule gratuitement à ${city.name}.`}
                color="orange"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 sm:py-24 bg-brand-surface">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Villes proches</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                  Rachat de voiture près de {city.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/rachat-voiture/${department.slug}/${nearbyCity.slug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <MapPin size={18} weight="bold" className="text-brand-gold flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors truncate">
                        {nearbyCity.name}
                      </div>
                      <div className="text-xs text-neutral-500">{nearbyCity.postalCode}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href={`/rachat-voiture/${department.slug}`}
                  className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors"
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
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-wider uppercase mb-4">Estimation gratuite</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                Demandez votre estimation gratuite à {city.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire &bull; Paiement cash immédiat &bull; Meilleur prix garanti
              </p>
            </div>
            <ConversionForm trigger="inline" />
          </div>
        </div>
      </section>

      {/* Internal Linking - Related Services & Cities */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Cross-link to Épaviste */}
            <div className="mb-8 sm:mb-12 p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:shadow-md transition-all duration-500">
              <h3 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                <Car size={24} weight="fill" className="text-brand-red" />
                Votre voiture est une épave ?
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                Découvrez notre service d'enlèvement d'épave à {city.name}. Service 100% gratuit, intervention rapide.
              </p>
              <Link
                href={`/epaviste/${department.slug}/${city.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-full font-semibold transition-all shadow-sm hover:shadow-md text-sm"
              >
                Épaviste à {city.name}
                <CaretRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Neighboring Cities */}
            {department.cities.length > 1 && (
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-6">
                  Rachat voiture dans les villes voisines
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {department.cities
                    .filter(c => c.slug !== city.slug)
                    .slice(0, 8)
                    .map((neighborCity) => (
                      <Link
                        key={neighborCity.slug}
                        href={`/rachat-voiture/${department.slug}/${neighborCity.slug}`}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
                      >
                        <MapPin size={18} weight="bold" className="text-brand-gold flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-gold transition-colors truncate">
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

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

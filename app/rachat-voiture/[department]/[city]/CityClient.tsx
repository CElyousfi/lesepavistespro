'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/locations-complete';
import { CheckCircle, CurrencyEur, Shield, MapPin, Clock, CaretRight, Car } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
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
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture/' },
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}/` },
    { name: city.name, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}/${city.slug}/` }
  ]);

  const cityFAQData = getCityFAQData(city.name, department.name);

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
      <section className="relative bg-brand-navy text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95"></div>
        
        <div className="container mx-auto px-[5%] relative z-10">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: 'Rachat Voiture', href: '/rachat-voiture' },
                { label: department.name, href: `/rachat-voiture/${department.slug}` },
                { label: city.name }
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-gold font-semibold text-sm">
                Rachat cash à {city.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rachat Voiture {city.name}
              <span className="block text-brand-gold mt-2">Paiement Immédiat ({city.postalCode})</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Rachat de voiture à {city.name} dans le {department.name} ({department.code}). 
              Nous achetons tous véhicules : HS, accidentés, en panne, sans CT. 
              Estimation gratuite et paiement cash immédiat.
            </p>

            {/* CTA Buttons */}
            <QuickContact 
              service="rachat" 
              location={`${city.name} (${city.postalCode})`}
              className="justify-center mb-12"
            />

            {/* Trust Indicators */}
            <TrustBadges service="rachat" />
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Rachat de voiture à {city.name} ({city.postalCode})
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
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
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Pourquoi nous choisir à {city.name} ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
                Rachat de voiture près de {city.name}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/rachat-voiture/${department.slug}/${nearbyCity.slug}`}
                    className="flex items-center gap-2 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-200 hover:border-brand-gold hover:shadow-md transition-all group"
                  >
                    <MapPin size={18} weight="bold" className="text-brand-gold flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 group-hover:text-brand-gold transition-colors text-sm truncate">
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
                  className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-dark font-semibold transition-colors"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Demandez votre estimation gratuite à {city.name}
            </h2>
            <p className="text-lg text-neutral-600">
              Obtenez le meilleur prix pour votre véhicule en moins de 15 minutes
            </p>
          </div>
          <ConversionForm trigger="inline" />
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

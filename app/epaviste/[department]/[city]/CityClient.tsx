'use client';

import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/locations-complete';
import { CheckCircle, Clock, Shield, MapPin, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import QuickContact from '@/components/QuickContact';
import TrustBadges from '@/components/TrustBadges';
import ServiceCard from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function CityEpavisteClient({ citySlug }: { citySlug: string }) {
  const result = getCityBySlug(citySlug);

  if (!result) {
    notFound();
  }

  const { city, department } = result;

  // Get nearby cities (first 6 from same department, excluding current)
  const nearbyCities = department.cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 6);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95"></div>
        
        <div className="container mx-auto px-[5%] relative z-10">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: 'Épaviste', href: '/epaviste' },
                { label: department.name, href: `/epaviste/${department.slug}` },
                { label: city.name }
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-red font-semibold text-sm">
                Service disponible 24h/24, 7j/7 à {city.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Épaviste {city.name}
              <span className="block text-brand-red mt-2">Enlèvement Gratuit ({city.postalCode})</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Épaviste agréé VHU à {city.name} dans le {department.name} ({department.code}). 
              Enlèvement d'épave 100% gratuit, intervention rapide sous 24h, 
              certificat de destruction fourni immédiatement.
            </p>

            {/* CTA Buttons */}
            <QuickContact 
              service="epaviste" 
              location={`${city.name} (${city.postalCode})`}
              className="justify-center mb-12"
            />

            {/* Trust Indicators */}
            <TrustBadges service="epaviste" />
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Enlèvement d'épave à {city.name} ({city.postalCode})
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous habitez {city.name} et vous avez besoin de faire enlever une épave de voiture, moto, scooter ou utilitaire ? 
                Notre service d'épaviste agréé VHU intervient gratuitement à {city.name} ({city.postalCode}) 
                pour récupérer votre véhicule hors d'usage, quel que soit son état.
              </p>
              <p className="mb-4">
                Nous sommes spécialisés dans l'enlèvement d'épaves à {city.name} et dans tout le {department.name}. 
                Notre équipe peut intervenir rapidement, généralement sous 24 à 48 heures après votre demande.
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
              Notre service à {city.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <ServiceCard
                icon={CheckCircle}
                title="Enlèvement 100% gratuit"
                description={`Aucun frais pour l'enlèvement de votre épave à ${city.name}.`}
                color="red"
              />
              <ServiceCard
                icon={Clock}
                title="Intervention rapide"
                description={`Prise en charge sous 24-48h à ${city.name}.`}
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
                Nous intervenons aussi près de {city.name}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/epaviste/${department.slug}/${nearbyCity.slug}`}
                    className="flex items-center gap-2 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-md transition-all group"
                  >
                    <MapPin size={18} weight="bold" className="text-brand-red flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors text-sm truncate">
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
                  className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark font-semibold transition-colors"
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

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

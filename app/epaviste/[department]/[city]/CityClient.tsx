'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getCityBySlug } from '@/lib/locations-complete';
import { CheckCircle, Clock, Shield, MapPin, CaretRight, Car, CurrencyEur } from '@phosphor-icons/react';
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

export default function CityEpavisteClient({ citySlug }: { citySlug: string }) {
  const result = getCityBySlug(citySlug);

  if (!result) {
    notFound();
  }

  const { city, department } = result;

  // Get local data (fourrière, parking, etc.)
  const localData = getCityLocalData(city.slug);

  // Structured Data
  const breadcrumbData = getBreadcrumbData([
    { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste/' },
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/epaviste/${department.slug}/` },
    { name: city.name, url: `https://www.lesepavistespro.fr/epaviste/${department.slug}/${city.slug}/` }
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
        id={`breadcrumb-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id={`faq-${city.slug}`}
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
              
              {/* Local specific content */}
              {localData && (
                <>
                  {localData.acces && (
                    <div className="bg-blue-50 border-l-4 border-brand-blue p-4 my-6">
                      <h3 className="font-bold text-brand-navy mb-2">Accès et intervention à {city.name}</h3>
                      <p className="text-sm text-neutral-700">{localData.acces}</p>
                    </div>
                  )}
                  
                  {localData.specificites && localData.specificites.length > 0 && (
                    <div className="my-6">
                      <h3 className="font-bold text-neutral-900 mb-3">Spécificités locales :</h3>
                      <ul className="space-y-2">
                        {localData.specificites.map((spec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle size={20} weight="bold" className="text-brand-blue flex-shrink-0 mt-0.5" />
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
        <section className="py-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                Informations pratiques à {city.name}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Fourrière Info */}
                {localData.fourriere && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm">
                    <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                      <MapPin size={24} weight="bold" className="text-brand-red" />
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
                      <div className="pt-3 mt-3 bg-green-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                        <p className="text-sm text-green-800">
                          💡 <strong>Astuce :</strong> Nous pouvons récupérer votre véhicule directement en fourrière et gérer les démarches.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Parking Info */}
                {localData.parkings.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm">
                    <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                      <Car size={24} weight="bold" className="text-brand-blue" />
                      Parkings principaux
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Nous intervenons dans tous les parkings de {city.name}, notamment :
                    </p>
                    <ul className="space-y-2">
                      {localData.parkings.slice(0, 5).map((parking, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={16} weight="bold" className="text-brand-blue flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{parking}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 mt-3 bg-blue-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
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

      {/* Conversion Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Demandez votre devis gratuit à {city.name}
            </h2>
            <p className="text-lg text-neutral-600">
              Remplissez le formulaire ci-dessous pour recevoir votre estimation en moins de 15 minutes
            </p>
          </div>
          <ConversionForm trigger="inline" />
        </div>
      </section>

      {/* Internal Linking - Related Services & Cities */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            {/* Cross-link to Rachat */}
            <div className="mb-12 p-6 bg-gradient-to-r from-brand-gold/10 to-yellow-50 border-2 border-brand-gold/20 rounded-2xl">
              <h3 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <CurrencyEur size={24} weight="bold" className="text-brand-gold" />
                Vous souhaitez plutôt vendre votre voiture ?
              </h3>
              <p className="text-neutral-700 mb-4">
                Découvrez notre service de rachat de voiture à {city.name}. Paiement cash immédiat, tous véhicules acceptés.
              </p>
              <Link
                href={`/rachat-voiture/${department.slug}/${city.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                💰 Rachat voiture à {city.name}
                <CaretRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Neighboring Cities */}
            {department.cities.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Épaviste dans les villes voisines
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {department.cities
                    .filter(c => c.slug !== city.slug)
                    .slice(0, 8)
                    .map((neighborCity) => (
                      <Link
                        key={neighborCity.slug}
                        href={`/epaviste/${department.slug}/${neighborCity.slug}`}
                        className="flex items-center gap-2 p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-brand-red hover:shadow-md transition-all group"
                      >
                        <MapPin size={20} weight="bold" className="text-brand-red flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-brand-red transition-colors truncate text-sm">
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

'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getRegionBySlug, type Region } from '@/lib/locations-complete';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin, CurrencyEur } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getBreadcrumbData } from '@/lib/structured-data';

export default function RachatRegionClientPage({ regionSlug }: { regionSlug: string }) {
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    notFound();
  }

  const totalCities = region.departments.reduce((sum, dept) => sum + dept.cities.length, 0);

  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr/' },
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
    { name: region.name, url: `https://www.lesepavistespro.fr/rachat-voiture/${region.slug}` },
  ]);

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.lesepavistespro.fr/#business',
    name: 'Les Épavistes Pro',
    url: `https://www.lesepavistespro.fr/rachat-voiture/${region.slug}`,
    telephone: '+33979049486',
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: [
      { '@type': 'AdministrativeArea', name: region.name },
      ...region.departments.map(dept => ({
        '@type': 'AdministrativeArea',
        name: `${dept.name} (${dept.code})`,
      })),
    ],
  };

  const structuredData = [localBusinessData, breadcrumbData];

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id={`rachat-region-${region.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95"></div>

        <div className="container mx-auto px-[5%] relative z-10">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Rachat Voiture', href: '/rachat-voiture' },
                { label: region.name },
              ]}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-gold font-semibold text-sm">
                Rachat cash en {region.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rachat Voiture {region.name}
              <span className="block text-brand-gold mt-2">Paiement Immédiat</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-200 mb-4 leading-relaxed">
              Rachat de voiture dans toute la région {region.name}.
              Nous achetons tous véhicules dans les {region.departments.length} départements :
              HS, accidentés, en panne, sans CT. Paiement cash immédiat.
            </p>

            <p className="text-sm md:text-base text-brand-gold/90 font-semibold mb-8">
              💰 Estimation gratuite et paiement immédiat
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a
                href={`https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture en ${region.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <WhatsappLogo size={20} weight="fill" />
                Estimation WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CurrencyEur size={20} weight="bold" className="text-brand-gold" />
                <span>Paiement Cash</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} weight="bold" className="text-brand-gold" />
                <span>Estimation Gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} weight="bold" className="text-brand-gold" />
                <span>Meilleur Prix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Rachat de voiture en {region.name}
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
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
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Rachat de voiture dans tous les départements
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {region.departments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/rachat-voiture/${dept.slug}`}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-neutral-200 hover:border-brand-gold hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors flex-shrink-0">
                    <MapPin size={28} weight="bold" className="text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-gold transition-colors">
                      {dept.name}
                    </div>
                    <div className="text-sm text-neutral-500">Département {dept.code}</div>
                    <div className="text-xs text-neutral-400 mt-1">{dept.cities.length} communes</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Nous rachetons tous types de véhicules
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures accidentées
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules accidentés, même gravement endommagés. Nous évaluons les pièces récupérables.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures en panne
                </h3>
                <p className="text-neutral-600">
                  Achat de voitures HS, avec problème moteur, boîte de vitesse ou tout autre panne mécanique.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures sans CT
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules sans contrôle technique valide, même avec contre-visite refusée.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Épaves et véhicules anciens
                </h3>
                <p className="text-neutral-600">
                  Achat d'épaves et de vieilles voitures, même non roulantes. Paiement selon l'état et les pièces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Internal Linking */}
      <section className="py-16 md:py-20 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
              Nos autres services en {region.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/epaviste/${region.slug}`}
                className="group p-6 bg-gradient-to-br from-brand-red/5 to-red-50 rounded-xl border-2 border-brand-red/20 hover:border-brand-red hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-red transition-colors">
                  Épaviste en {region.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  Service d'enlèvement d'épave 100% gratuit dans toute la région {region.name}. Agréé VHU, certificat de destruction fourni.
                </p>
                <span className="text-brand-red font-semibold group-hover:underline">
                  Voir le service épaviste →
                </span>
              </Link>
              <Link
                href="/rachat-voiture"
                className="group p-6 bg-gradient-to-br from-brand-blue/5 to-brand-blue/10 rounded-xl border-2 border-brand-blue/20 hover:border-brand-blue hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-blue transition-colors">
                  Rachat voiture partout en France
                </h3>
                <p className="text-neutral-600 mb-4">
                  Découvrez notre service de rachat de voiture dans toutes les régions de France.
                </p>
                <span className="text-brand-blue font-semibold group-hover:underline">
                  Voir toutes nos zones →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Obtenez votre estimation gratuite
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire • Paiement cash immédiat • Meilleur prix garanti
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="rachat" />
          </div>
        </div>
      </section>

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

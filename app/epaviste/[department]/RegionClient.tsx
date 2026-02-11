'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getRegionBySlug, type Region } from '@/lib/locations-complete';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getBreadcrumbData } from '@/lib/structured-data';

export default function RegionClientPage({ regionSlug }: { regionSlug: string }) {
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    notFound();
  }

  const totalCities = region.departments.reduce((sum, dept) => sum + dept.cities.length, 0);

  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr/' },
    { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste' },
    { name: region.name, url: `https://www.lesepavistespro.fr/epaviste/${region.slug}` },
  ]);

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.lesepavistespro.fr/#business',
    name: 'Les Épavistes Pro',
    url: `https://www.lesepavistespro.fr/epaviste/${region.slug}`,
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
        id={`region-${region.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden flex items-center justify-center p-1 md:p-[0.25%] pt-24">
        <div className="w-full md:w-[99.5%] relative z-10">
          <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Breadcrumb
                  items={[
                    { label: 'Accueil', href: '/' },
                    { label: 'Épaviste', href: '/epaviste' },
                    { label: region.name },
                  ]}
                />
              </div>

              <div className="inline-block bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6">
                <span className="text-brand-red font-semibold text-sm">
                  Service disponible 24h/24, 7j/7 en {region.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Épaviste {region.name}
                <span className="block text-brand-red mt-2">Enlèvement Gratuit 24h</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-200 mb-4 leading-relaxed">
                Épaviste agréé VHU dans toute la région {region.name}.
                Enlèvement d'épave 100% gratuit dans les {region.departments.length} départements,
                intervention rapide sous 24-48h, certificat de destruction fourni.
              </p>

              <p className="text-sm md:text-base text-brand-red/90 font-semibold mb-8">
                🚨 Intervention urgente aujourd'hui ? Appelez maintenant
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                  <Phone size={20} weight="bold" />
                  09 79 04 94 86
                </a>
                <a
                  href={`https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave en ${region.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  WhatsApp
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-red" />
                  <span>100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} weight="bold" className="text-brand-red" />
                  <span>Intervention 24-48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={20} weight="bold" className="text-brand-red" />
                  <span>Agréé VHU</span>
                </div>
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
              Service d'enlèvement d'épave en {region.name}
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever en {region.name} ?
                Notre service d'épaviste agréé VHU (centre de destruction automobile agréé préfecture) intervient
                gratuitement dans les {region.departments.length} départements de la région pour la destruction
                et le recyclage de votre véhicule hors d'usage.
              </p>
              <p className="mb-4">
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé, immobilisé ou simplement
                trop ancien, nous nous chargeons de son enlèvement gratuit et de toutes les démarches
                administratives obligatoires. Le certificat de destruction vous est remis immédiatement.
              </p>
              <p>
                Notre équipe de professionnels dispose de l'équipement nécessaire pour intervenir même dans
                les situations difficiles : parking souterrain, copropriété, terrain enclavé, voirie publique, fourrière.
                Plus de {totalCities.toLocaleString('fr-FR')} communes desservies en {region.name}.
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
                Départements desservis en {region.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {region.departments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/epaviste/${dept.slug}`}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors flex-shrink-0">
                    <MapPin size={28} weight="bold" className="text-brand-red" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-blue transition-colors">
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

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Pourquoi choisir notre service en {region.name} ?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                    <CheckCircle size={24} weight="bold" className="text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Service 100% gratuit</h3>
                  <p className="text-neutral-600">
                    Aucun frais pour l'enlèvement de votre épave en {region.name}, même en sous-sol ou terrain difficile.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                    <Clock size={24} weight="bold" className="text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Intervention rapide</h3>
                  <p className="text-neutral-600">
                    Prise en charge sous 24-48h dans toute la région {region.name}. Service d'urgence disponible.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                    <Shield size={24} weight="bold" className="text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Agréé préfecture</h3>
                  <p className="text-neutral-600">
                    Centre VHU agréé, certificat de destruction officiel fourni immédiatement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                    <MapPin size={24} weight="bold" className="text-brand-red" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Couverture totale</h3>
                  <p className="text-neutral-600">
                    {region.departments.length} départements et {totalCities.toLocaleString('fr-FR')} communes desservis en {region.name}.
                  </p>
                </div>
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
                href={`/rachat-voiture/${region.slug}`}
                className="group p-6 bg-gradient-to-br from-brand-gold/5 to-brand-gold/10 rounded-xl border-2 border-brand-gold/20 hover:border-brand-gold hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-gold transition-colors">
                  Rachat voiture en {region.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  Nous rachetons également tous types de véhicules en {region.name}. Paiement cash immédiat, sans contrôle technique.
                </p>
                <span className="text-brand-gold font-semibold group-hover:underline">
                  Voir le service rachat →
                </span>
              </Link>
              <Link
                href="/epaviste"
                className="group p-6 bg-gradient-to-br from-brand-blue/5 to-brand-blue/10 rounded-xl border-2 border-brand-blue/20 hover:border-brand-blue hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-blue transition-colors">
                  Épaviste partout en France
                </h3>
                <p className="text-neutral-600 mb-4">
                  Découvrez notre service d'enlèvement d'épave dans toutes les régions de France.
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
                Demandez votre enlèvement gratuit
              </h2>
              <p className="text-lg text-neutral-600 mb-2">
                Remplissez le formulaire • Réponse sous 15 minutes • Service 100% gratuit
              </p>
              <p className="text-sm text-neutral-500">
                💬 Demande non urgente ? WhatsApp ou formulaire ci-dessous
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="epaviste" />
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

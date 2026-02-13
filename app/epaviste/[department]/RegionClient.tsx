'use client';

import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getRegionBySlug, type Region } from '@/lib/locations-complete';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import LocationHero from '@/components/LocationHero';
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
      <LocationHero>
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

        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-8 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-brand-navy/70">
            Service disponible 24h/24, 7j/7 en {region.name}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
          Épaviste {region.name}
          <br /><span className="text-brand-red">Enlèvement Gratuit 24h</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Épaviste agréé VHU dans toute la région {region.name}.
          Enlèvement d'épave 100% gratuit dans les {region.departments.length} départements,
          intervention rapide sous 24-48h, certificat de destruction fourni.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <ConversionForm
            trigger="button"
            defaultService="epaviste"
            buttonText="Demander un Enlèvement"
            pageType="department"
            className="w-full sm:w-auto sm:min-w-[280px]"
          />
          <a href="tel:0979049486" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy/5 hover:bg-brand-navy/10 border border-neutral-200 text-brand-navy rounded-full font-semibold transition-all">
            <Phone size={20} weight="bold" />
            09 79 04 94 86
          </a>
          <a
            href={`https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave en ${region.name}`}
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
            <span className="font-semibold text-neutral-700">Intervention 24-48h</span>
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
              Service d'enlèvement d'épave en {region.name}
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
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
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Zones d'intervention</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Départements desservis en {region.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {region.departments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/epaviste/${dept.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                    <MapPin size={18} weight="bold" className="text-brand-red" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors">
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

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-4 block">Nos Engagements</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Pourquoi choisir notre service en {region.name} ?
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
                      Aucun frais pour l'enlèvement de votre épave en {region.name}, même en sous-sol ou terrain difficile.
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
                      Prise en charge sous 24-48h dans toute la région {region.name}. Service d'urgence disponible.
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
                      {region.departments.length} départements et {totalCities.toLocaleString('fr-FR')} communes desservis en {region.name}.
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
              <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Services associés</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                Nos autres services en {region.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/rachat-voiture/${region.slug}`}
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                  Rachat voiture en {region.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Nous rachetons également tous types de véhicules en {region.name}. Paiement cash immédiat, sans contrôle technique.
                </p>
                <span className="text-brand-gold font-semibold text-sm">
                  Voir le service rachat →
                </span>
              </Link>
              <Link
                href="/epaviste"
                className="group p-5 sm:p-8 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  Épaviste partout en France
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm mb-4">
                  Découvrez notre service d'enlèvement d'épave dans toutes les régions de France.
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

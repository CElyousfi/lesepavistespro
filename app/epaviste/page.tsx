import type { Metadata } from 'next';
import Script from 'next/script';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { regions } from '@/lib/locations-complete';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { getEpavisteServiceData, getPillarFAQData } from '@/lib/structured-data';
import { generateEpavistePillarMeta } from '@/lib/seo';

export const metadata: Metadata = generateEpavistePillarMeta();

export default function EpavistePage() {
  const serviceData = getEpavisteServiceData();
  const faqData = getPillarFAQData();

  // Separate metropolitan and overseas regions
  const metroRegions = regions.filter(r => !['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));
  const outremerRegions = regions.filter(r => ['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'].includes(r.slug));

  return (
    <>
      {/* Structured Data for SEO - Rendered in head */}
      <Script
        id="structured-data-epaviste-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <Script
        id="structured-data-epaviste-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden flex items-center justify-center p-1 md:p-[0.25%] pt-24">
        <div className="w-full md:w-[99.5%] relative z-10">
          <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-red font-semibold text-sm">
                Service disponible 24h/24, 7j/7 partout en France
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Épaviste France entière
              <span className="block text-brand-red mt-2">Enlèvement Gratuit 24h</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Épaviste agréé VHU partout en France. Enlèvement d'épave 100% gratuit, 
              intervention rapide sous 24-48h, certificat de destruction fourni immédiatement.
              18 régions, 101 départements, plus de 35 000 communes desservies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a 
                href="https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave"
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
              Service d'enlèvement d'épave partout en France
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever ? 
                Notre service d'épaviste agréé VHU intervient gratuitement dans toute la France métropolitaine 
                et les départements d'outre-mer. Nous couvrons 18 régions, 101 départements et plus de 35 000 communes.
              </p>
              <p className="mb-4">
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé ou simplement 
                trop ancien, nous nous chargeons de son enlèvement gratuit et de toutes les démarches 
                administratives. Le certificat de destruction vous est remis immédiatement.
              </p>
              <p>
                Notre réseau d'épavistes professionnels dispose de l'équipement nécessaire pour intervenir 
                même dans les situations difficiles : parking souterrain, terrain enclavé, voirie publique, etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Pourquoi choisir notre service ?
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
                    Aucun frais pour l'enlèvement de votre épave, même en sous-sol ou terrain difficile.
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
                    Prise en charge sous 24-48h partout en France. Service d'urgence disponible.
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
                  <h3 className="font-bold text-neutral-900 mb-2">Couverture nationale</h3>
                  <p className="text-neutral-600">
                    18 régions, 101 départements, plus de 35 000 communes desservies en France.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid - Metropolitan */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Choisissez votre région
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre région pour voir tous les départements et villes desservis
              </p>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6">France métropolitaine</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {metroRegions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/epaviste/${region.slug}`}
                  className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-lg transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <MapPin size={32} weight="bold" className="text-brand-red" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-blue transition-colors text-sm">
                      {region.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{region.departments.length} départements</div>
                  </div>
                </Link>
              ))}
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6">Outre-mer</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {outremerRegions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/epaviste/${region.slug}`}
                  className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <MapPin size={28} weight="bold" className="text-brand-red" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-blue transition-colors text-sm">
                      {region.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{region.departments.length} département{region.departments.length > 1 ? 's' : ''}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Demandez Votre Enlèvement Gratuit
              </h2>
              <p className="text-lg text-neutral-100">
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

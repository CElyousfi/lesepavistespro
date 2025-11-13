import type { Metadata } from 'next';
import Script from 'next/script';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { allDepartments } from '@/lib/locations-complete';
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
                Service disponible 24h/24, 7j/7 en Île-de-France
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Épaviste Île-de-France
              <span className="block text-brand-red mt-2">Enlèvement Gratuit 24h</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Épaviste agréé VHU dans toute l'Île-de-France. Enlèvement d'épave 100% gratuit, 
              intervention rapide sous 24-48h, certificat de destruction fourni immédiatement.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a 
                href="https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave en Île-de-France"
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
              Service d'enlèvement d'épave en Île-de-France
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever en Île-de-France ? 
                Notre service d'épaviste agréé VHU intervient gratuitement dans tous les départements de la 
                région (Paris 75, Seine-et-Marne 77, Yvelines 78, Essonne 91, Hauts-de-Seine 92, 
                Seine-Saint-Denis 93, Val-de-Marne 94, Val-d'Oise 95).
              </p>
              <p className="mb-4">
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé ou simplement 
                trop ancien, nous nous chargeons de son enlèvement gratuit et de toutes les démarches 
                administratives. Le certificat de destruction vous est remis immédiatement.
              </p>
              <p>
                Notre équipe d'épavistes professionnels dispose de l'équipement nécessaire pour intervenir 
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
                    Prise en charge sous 24-48h dans toute l'Île-de-France. Service d'urgence disponible.
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
                    Tous les départements d'Île-de-France desservis, aucun frais de déplacement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments List */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Villes desservies en Île-de-France
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allDepartments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/epaviste/${dept.slug}`}
                  className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-lg transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <MapPin size={32} weight="bold" className="text-brand-red" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-blue transition-colors">
                      {dept.name}
                    </div>
                    <div className="text-sm text-neutral-500">({dept.code})</div>
                    <div className="text-xs text-neutral-400 mt-1">{dept.cities.length} villes</div>
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

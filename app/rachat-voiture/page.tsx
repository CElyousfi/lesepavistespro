import type { Metadata } from 'next';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Shield, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { allDepartments } from '@/lib/locations-complete';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { getRachatServiceData, getPillarFAQData, renderJSONLD } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: "Rachat Voiture Île-de-France | Paiement Cash Immédiat",
  description: "⭐ Rachat de voiture au meilleur prix en Île-de-France. Paiement cash immédiat, enlèvement gratuit. Voiture accidentée, en panne ou HS. ☎️ 09 79 04 94 86",
};

export default function RachatVoiturePage() {
  const serviceData = getRachatServiceData();
  const faqData = getPillarFAQData();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJSONLD(serviceData)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJSONLD(faqData)}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden flex items-center justify-center p-1 md:p-[0.25%] pt-24">
        <div className="w-full md:w-[99.5%] relative z-10">
          <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-gold font-semibold text-sm">
                Rachat cash en Île-de-France
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rachat de Voiture Île-de-France
              <span className="block text-brand-gold mt-2">Paiement Immédiat</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Nous rachetons tous types de véhicules en Île-de-France : voitures HS, accidentées, 
              en panne, sans contrôle technique. Estimation gratuite et paiement cash immédiat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a 
                href="https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture en Île-de-France"
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
                <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                <span>Estimation Gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} weight="bold" className="text-brand-gold" />
                <span>Meilleur Prix</span>
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
              Rachat de voiture en Île-de-France
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous souhaitez vendre rapidement votre voiture en Île-de-France ? Notre service de rachat 
                de véhicules vous propose une estimation gratuite et un paiement immédiat pour tous types 
                de voitures : véhicules d'occasion, voitures accidentées, véhicules en panne, épaves, 
                voitures sans contrôle technique.
              </p>
              <p className="mb-4">
                Nous intervenons dans tous les départements d'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) 
                pour racheter votre véhicule au meilleur prix. Le paiement s'effectue immédiatement en 
                espèces, par chèque ou par virement selon votre préférence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Nous rachetons tous types de véhicules
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures accidentées
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules accidentés, même gravement endommagés.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures en panne
                </h3>
                <p className="text-neutral-600">
                  Achat de voitures HS, avec problème moteur ou mécanique.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures sans CT
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules sans contrôle technique valide.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Épaves et véhicules anciens
                </h3>
                <p className="text-neutral-600">
                  Achat d'épaves et de vieilles voitures, même non roulantes.
                </p>
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
                Rachat de voiture dans toute l'Île-de-France
              </h2>
              <p className="text-lg text-neutral-600">
                Sélectionnez votre département pour voir toutes les villes desservies
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allDepartments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/rachat-voiture/${dept.slug}`}
                  className="flex flex-col items-center gap-3 p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-brand-gold hover:shadow-lg transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                    <MapPin size={32} weight="bold" className="text-brand-gold" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-neutral-900 group-hover:text-brand-gold transition-colors">
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
                Obtenez Votre Estimation Gratuite
              </h2>
              <p className="text-lg text-neutral-100">
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

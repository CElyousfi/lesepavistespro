'use client';

import { notFound } from 'next/navigation';
import { getDepartmentBySlug, type Department } from '@/lib/locations-complete';
import { Phone, WhatsappLogo, CheckCircle, Clock, Shield, MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function DepartmentClientPage({ departmentSlug }: { departmentSlug: string }) {
  const dept = getDepartmentBySlug(departmentSlug);

  if (!dept) {
    notFound();
  }

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden flex items-center justify-center p-1 md:p-[0.25%] pt-24">
        <div className="w-full md:w-[99.5%] relative z-10">
          <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-red font-semibold text-sm">
                Service disponible 24h/24, 7j/7 dans le {dept.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Épaviste {dept.name} ({dept.code})
              <span className="block text-brand-red mt-2">Enlèvement Gratuit 24h</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Épaviste agréé VHU dans tout le département {dept.name} ({dept.code}). 
              Enlèvement d'épave 100% gratuit, intervention rapide sous 24-48h, 
              certificat de destruction fourni.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a 
                href={`https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave dans le ${dept.name}`}
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
              Service d'enlèvement d'épave dans le {dept.name}
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous avez une épave de voiture, moto, scooter ou utilitaire à faire enlever dans le département {dept.name} ({dept.code}) ? 
                Notre service d'épaviste agréé VHU intervient gratuitement dans toutes les villes du département pour récupérer 
                votre véhicule hors d'usage.
              </p>
              <p className="mb-4">
                Que votre véhicule soit accidenté, en panne, sans contrôle technique, brûlé ou simplement trop ancien, 
                nous nous chargeons de son enlèvement gratuit et de toutes les démarches administratives. 
                Le certificat de destruction vous est remis immédiatement.
              </p>
              <p>
                Notre équipe d'épavistes professionnels dispose de l'équipement nécessaire pour intervenir même dans 
                les situations difficiles : parking souterrain, terrain enclavé, voirie publique, etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Villes desservies dans le {dept.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Nous intervenons dans toutes les communes du département {dept.code}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dept.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/epaviste/${dept.slug}/${city.slug}`}
                  className="flex items-center gap-2 p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-brand-blue hover:shadow-md transition-all group"
                >
                  <MapPin size={20} weight="bold" className="text-brand-red flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors truncate">
                      {city.name}
                    </div>
                    <div className="text-sm text-neutral-500">{city.postalCode}</div>
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
              Pourquoi choisir notre service dans le {dept.name} ?
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
                    Aucun frais pour l'enlèvement de votre épave dans le {dept.code}, même en sous-sol ou terrain difficile.
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
                    Prise en charge sous 24-48h dans tout le {dept.name}. Service d'urgence disponible.
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
                    Toutes les villes du {dept.name} desservies, aucun frais de déplacement.
                  </p>
                </div>
              </div>
            </div>
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

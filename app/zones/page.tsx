import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { allDepartments } from '@/lib/locations-complete';

export const metadata: Metadata = {
  title: "Toutes nos Zones d'Intervention en Île-de-France | Les Épavistes Pro",
  description: "Découvrez toutes les villes d'Île-de-France où nous intervenons pour l'enlèvement d'épave gratuit et le rachat de voiture. 288 villes dans 8 départements.",
  keywords: ['zones intervention', 'villes IDF', 'épaviste Île-de-France', 'rachat voiture IDF'],
};

export default function ZonesPage() {
  // Calculate total cities
  const totalCities = allDepartments.reduce((sum, dept) => sum + dept.cities.length, 0);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95"></div>
        
        <div className="container mx-auto px-[5%] relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-red font-semibold text-sm">
                Service disponible 24h/24, 7j/7
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Nos Zones d'Intervention
              <span className="block text-brand-red mt-2">en Île-de-France</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Nous intervenons dans <strong className="text-white">{totalCities} villes</strong> réparties sur <strong className="text-white">8 départements</strong> d'Île-de-France pour l'enlèvement d'épave gratuit et le rachat de voiture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0979049486"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <span>☎️</span>
                <span>09 79 04 94 86</span>
              </a>
              <a
                href="https://wa.me/33979049486"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Departments & Cities List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-7xl mx-auto">
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl text-white">
                <div className="text-4xl font-bold mb-2">{allDepartments.length}</div>
                <div className="text-sm text-neutral-200">Départements</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl text-white">
                <div className="text-4xl font-bold mb-2">{totalCities}</div>
                <div className="text-sm text-neutral-200">Villes</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-brand-blue to-blue-600 rounded-2xl text-white">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm text-neutral-200">Disponibilité</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-2xl text-white">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm text-neutral-200">Gratuit</div>
              </div>
            </div>

            {/* Departments List */}
            <div className="space-y-12">
              {allDepartments.map((department) => (
                <div key={department.slug} className="bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200">
                  {/* Department Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin size={32} weight="bold" className="text-brand-red" />
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                        {department.name} ({department.code})
                      </h2>
                    </div>
                    <p className="text-neutral-600">
                      {department.cities.length} villes couvertes • Intervention sous 24-48h
                    </p>
                  </div>

                  {/* Cities Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {department.cities
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((city) => (
                        <Link
                          key={city.slug}
                          href={`/epaviste/${department.slug}/${city.slug}`}
                          className="group p-4 bg-white hover:bg-brand-navy border-2 border-neutral-200 hover:border-brand-navy rounded-xl transition-all hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-neutral-900 group-hover:text-white transition-colors">
                                {city.name}
                              </div>
                              <div className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                {city.postalCode}
                              </div>
                            </div>
                            <div className="text-brand-red group-hover:text-white transition-colors">
                              →
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Department Links */}
                  <div className="mt-6 pt-6 border-t-2 border-neutral-200 flex flex-wrap gap-3">
                    <Link
                      href={`/epaviste/${department.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      <span>🚗</span>
                      <span>Épaviste {department.name}</span>
                    </Link>
                    <Link
                      href={`/rachat-voiture/${department.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      <span>💰</span>
                      <span>Rachat {department.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Votre ville n'est pas listée ?
              </h2>
              <p className="text-lg text-neutral-200 mb-8 max-w-2xl mx-auto">
                Contactez-nous ! Nous intervenons dans toute l'Île-de-France et pouvons nous déplacer dans votre commune.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0979049486"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <span>☎️</span>
                  <span>09 79 04 94 86</span>
                </a>
                <a
                  href="https://wa.me/33979049486?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <span>💬</span>
                  <span>Nous contacter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { regions, allDepartments } from '@/lib/locations-complete';
import { generateZonesMeta } from '@/lib/seo';

export const metadata: Metadata = generateZonesMeta();

export default function ZonesPage() {
  // Calculate total cities
  const totalCities = allDepartments.reduce((sum, dept) => sum + dept.cities.length, 0);
  const totalDepartments = allDepartments.length;

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
              <span className="block text-brand-red mt-2">partout en France</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Nous intervenons dans <strong className="text-white">{totalCities.toLocaleString('fr-FR')} communes</strong> réparties sur <strong className="text-white">{totalDepartments} départements</strong> et <strong className="text-white">{regions.length} régions</strong> pour l'enlèvement d'épave gratuit et le rachat de voiture.
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
                href="https://wa.me/33602427345"
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
                <div className="text-4xl font-bold mb-2">{regions.length}</div>
                <div className="text-sm text-neutral-200">Régions</div>
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

            {/* Regions & Departments List */}
            <div className="space-y-12">
              {regions.map((region) => (
                <div key={region.slug} className="bg-neutral-50 rounded-2xl p-8 border-2 border-neutral-200">
                  {/* Region Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin size={32} weight="bold" className="text-brand-red" />
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                        {region.name}
                      </h2>
                    </div>
                    <p className="text-neutral-600">
                      {region.departments.length} départements • {region.departments.reduce((sum, d) => sum + d.cities.length, 0).toLocaleString('fr-FR')} communes couvertes
                    </p>
                  </div>

                  {/* Departments Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {region.departments
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/epaviste/${dept.slug}`}
                          className="group p-4 bg-white hover:bg-brand-navy border-2 border-neutral-200 hover:border-brand-navy rounded-xl transition-all hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-neutral-900 group-hover:text-white transition-colors">
                                {dept.name} ({dept.code})
                              </div>
                              <div className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                {dept.cities.length} communes
                              </div>
                            </div>
                            <div className="text-brand-red group-hover:text-white transition-colors">
                              →
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Region Links */}
                  <div className="mt-6 pt-6 border-t-2 border-neutral-200 flex flex-wrap gap-3">
                    <Link
                      href={`/epaviste/${region.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      <span>🚗</span>
                      <span>Épaviste {region.name}</span>
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
                Contactez-nous ! Nous intervenons partout en France et pouvons nous déplacer dans votre commune.
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
                  href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis"
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

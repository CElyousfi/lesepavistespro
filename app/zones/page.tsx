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
      <section className="relative bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
              <span className="text-sm font-medium text-brand-navy/70">Service disponible 24h/24, 7j/7</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
              Nos Zones d&apos;Intervention
              <br /><span className="text-brand-red">partout en France</span>
            </h1>
            
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Nous intervenons dans <strong className="text-brand-navy">{totalCities.toLocaleString('fr-FR')} communes</strong> réparties sur <strong className="text-brand-navy">{totalDepartments} départements</strong> et <strong className="text-brand-navy">{regions.length} régions</strong> pour l&apos;enlèvement d&apos;épave gratuit et le rachat de voiture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0979049486"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red text-white rounded-full font-semibold hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg"
              >
                09 79 04 94 86
              </a>
              <a
                href="https://wa.me/33602427345"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-whatsapp text-white rounded-full font-semibold hover:bg-whatsapp-hover transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Departments & Cities List */}
      <section className="py-16 md:py-24 bg-brand-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="text-4xl font-bold mb-1 text-brand-navy">{regions.length}</div>
                <div className="text-sm text-neutral-500">Régions</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="text-4xl font-bold mb-1 text-brand-red">{totalCities}</div>
                <div className="text-sm text-neutral-500">Villes</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="text-4xl font-bold mb-1 text-brand-navy">24/7</div>
                <div className="text-sm text-neutral-500">Disponibilité</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="text-4xl font-bold mb-1 text-brand-gold">100%</div>
                <div className="text-sm text-neutral-500">Gratuit</div>
              </div>
            </div>

            {/* Regions & Departments List */}
            <div className="space-y-8">
              {regions.map((region) => (
                <div key={region.slug} className="bg-white rounded-2xl p-8 border border-neutral-200">
                  {/* Region Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={24} weight="bold" className="text-brand-red" />
                      <h2 className="text-xl md:text-2xl font-bold text-brand-navy">
                        {region.name}
                      </h2>
                    </div>
                    <p className="text-neutral-500 text-sm">
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
                          className="group p-3 bg-brand-surface hover:bg-neutral-100 border border-neutral-200 hover:border-brand-red/20 rounded-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-red transition-colors">
                                {dept.name} ({dept.code})
                              </div>
                              <div className="text-xs text-neutral-500">
                                {dept.cities.length} communes
                              </div>
                            </div>
                            <div className="text-neutral-400 group-hover:text-brand-red transition-colors">
                              →
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Region Links */}
                  <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap gap-3">
                    <Link
                      href={`/epaviste/${region.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 hover:bg-brand-red/20 text-brand-red rounded-full font-semibold transition-all text-sm"
                    >
                      Épaviste {region.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-brand-navy text-white rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Votre ville n&apos;est pas listée ?
              </h2>
              <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                Contactez-nous ! Nous intervenons partout en France et pouvons nous déplacer dans votre commune.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0979049486"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red text-white rounded-full font-semibold hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg"
                >
                  09 79 04 94 86
                </a>
                <a
                  href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-whatsapp text-white rounded-full font-semibold hover:bg-whatsapp-hover transition-all"
                >
                  Nous contacter
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

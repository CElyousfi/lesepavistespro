import Script from 'next/script';
import HeroNew from '@/components/HeroNew';
import ServiceSelector from '@/components/ServiceSelector';
import ProcessNew from '@/components/ProcessNew';
import Coverage from '@/components/Coverage';
import type { CoverageRegion, CoverageCity } from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import DualServiceCTA from '@/components/DualServiceCTA';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import ScrollAnimation from '@/components/ScrollAnimation';
import VHUCertification from '@/components/VHUCertification';
import { getHomeStructuredData } from '@/lib/structured-data';
import { generateHomeMeta } from '@/lib/seo';
import { getEpaveRemovalHowToSchema, getSpeakableSchema } from '@/lib/schema';
import { regions as allRegions } from '@/lib/locations-complete';

export const metadata = generateHomeMeta();

export default function Home() {
  const structuredData = getHomeStructuredData();
  const howToSchema = getEpaveRemovalHowToSchema();
  const speakableSchema = getSpeakableSchema('https://www.lesepavistespro.fr/');

  // Pre-compute Coverage data server-side to avoid shipping locations-national to client
  const overseasSlugs = ['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'];
  const IDF_REGION_SLUG_LOCAL = 'ile-de-france';
  const rawRegions = allRegions.filter(r => !overseasSlugs.includes(r.slug));
  // IDF toujours en 1ère position — signal de lien interne prioritaire
  const coverageRegions: CoverageRegion[] = [
    ...rawRegions.filter(r => r.slug === IDF_REGION_SLUG_LOCAL),
    ...rawRegions.filter(r => r.slug !== IDF_REGION_SLUG_LOCAL),
  ].map(r => ({
    name: r.name,
    slug: r.slug,
    deptCount: r.departments.length,
    cityCount: r.departments.reduce((sum, d) => sum + d.cities.length, 0),
  }));

  // Villes IDF prioritaires (toutes les 8 départements couverts) + complétion nationale
  const IDF_PRIORITY_CITIES: CoverageCity[] = [
    { name: 'Paris 15e', slug: 'paris-15e', deptSlug: 'paris-75' },
    { name: 'Paris 18e', slug: 'paris-18e', deptSlug: 'paris-75' },
    { name: 'Boulogne-Billancourt', slug: 'boulogne-billancourt', deptSlug: 'hauts-de-seine-92' },
    { name: 'Nanterre', slug: 'nanterre', deptSlug: 'hauts-de-seine-92' },
    { name: 'Saint-Denis', slug: 'saint-denis', deptSlug: 'seine-saint-denis-93' },
    { name: 'Montreuil', slug: 'montreuil', deptSlug: 'seine-saint-denis-93' },
    { name: 'Créteil', slug: 'creteil', deptSlug: 'val-de-marne-94' },
    { name: 'Vitry-sur-Seine', slug: 'vitry-sur-seine', deptSlug: 'val-de-marne-94' },
    { name: 'Argenteuil', slug: 'argenteuil', deptSlug: 'val-d-oise-95' },
    { name: 'Cergy', slug: 'cergy', deptSlug: 'val-d-oise-95' },
    { name: 'Meaux', slug: 'meaux', deptSlug: 'seine-et-marne-77' },
    { name: 'Versailles', slug: 'versailles', deptSlug: 'yvelines-78' },
    { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes', deptSlug: 'essonne-91' },
    { name: 'Massy', slug: 'massy', deptSlug: 'essonne-91' },
  ];
  const keyDepts = allRegions
    .filter(r => r.slug !== IDF_REGION_SLUG_LOCAL && !overseasSlugs.includes(r.slug))
    .flatMap(r => r.departments)
    .slice(0, 11);
  const coverageCities: CoverageCity[] = [
    ...IDF_PRIORITY_CITIES,
    ...keyDepts.flatMap(dept =>
      dept.cities.slice(0, 1).map(city => ({
        name: city.name,
        slug: city.slug,
        deptSlug: dept.slug,
      }))
    ),
  ];

  return (
    <>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-home-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <Script
        id="structured-data-howto"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="structured-data-speakable"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main>
          {/* Hero with Header inside */}
          <HeroNew />

          {/* Services Section */}
          <section className="py-24 md:py-32 bg-brand-surface">
            <div className="container mx-auto px-4">
              <ScrollAnimation className="w-full">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Nos services</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                      Votre solution complète
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                      Choisissez le service dont vous avez besoin
                    </p>
                  </div>
                  <ServiceSelector />
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Divider */}
          <div className="divider-glow"></div>

          {/* Process */}
          <ProcessNew />

          {/* Conversion Form Section */}
          <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-b border-neutral-200">

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Devis gratuit</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                    Obtenez votre devis en 2 minutes
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Remplissez le formulaire et recevez une réponse sous 15 minutes
                  </p>
                </div>
                <ConversionForm trigger="inline" />
              </div>
            </div>
          </section>

          {/* VHU Certification */}
          <VHUCertification />

          {/* Coverage */}
          <Coverage regions={coverageRegions} topCities={coverageCities} />

          {/* Testimonials */}
          <Testimonials />

          {/* Divider */}
          <div className="divider-glow"></div>

          {/* CTA */}
          <DualServiceCTA />

          {/* FAQ */}
          <FAQ />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}

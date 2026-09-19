import IdfHero from '@/components/IdfHero';
import IdfCoverage from '@/components/IdfCoverage';
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
import { getEpaveRemovalHowToSchema } from '@/lib/schema';
import { regions as allRegions } from '@/lib/locations-complete';
import { IDF_REGION_SLUG } from '@/lib/idf';
import { getIdfDepartments, getTopIdfCities } from '@/lib/idf-cities';
import { RESPONSE_TIME_COPY } from '@/lib/business-claims';

export const metadata = generateHomeMeta();

/** How many of the most-searched IDF communes to surface above the fold. */
const TOP_IDF_CITIES = 16;

export default function Home() {
  const structuredData = getHomeStructuredData();
  const howToSchema = getEpaveRemovalHowToSchema();

  // Île-de-France first — everything below is derived from the dataset, so a
  // renamed or re-slugged commune can never leave a dead link on the homepage.
  const idfDepartments = getIdfDepartments().map(d => ({
    name: d.name,
    code: d.code,
    slug: d.slug,
    cityCount: d.cities.length,
  }));
  const topIdfCities = getTopIdfCities(TOP_IDF_CITIES).map(c => ({
    name: c.name,
    slug: c.slug,
    deptSlug: c.deptSlug,
    deptCode: c.deptCode,
  }));

  // National coverage keeps its section further down — nothing is removed.
  const overseasSlugs = ['guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'];
  const rawRegions = allRegions.filter(r => !overseasSlugs.includes(r.slug));
  const coverageRegions: CoverageRegion[] = [
    ...rawRegions.filter(r => r.slug === IDF_REGION_SLUG),
    ...rawRegions.filter(r => r.slug !== IDF_REGION_SLUG),
  ].map(r => ({
    name: r.name,
    slug: r.slug,
    deptCount: r.departments.length,
    cityCount: r.departments.reduce((sum, d) => sum + d.cities.length, 0),
  }));
  const keyDepts = allRegions
    .filter(r => r.slug !== IDF_REGION_SLUG && !overseasSlugs.includes(r.slug))
    .flatMap(r => r.departments)
    .slice(0, 12);
  const coverageCities: CoverageCity[] = keyDepts.flatMap(dept =>
    dept.cities.slice(0, 1).map(city => ({ name: city.name, slug: city.slug, deptSlug: dept.slug }))
  );

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main>
          {/* Hero with Header inside — Île-de-France */}
          <IdfHero departments={idfDepartments} />

          {/* The 8 IDF departments + most-searched communes, above the fold */}
          <IdfCoverage departments={idfDepartments} topCities={topIdfCities} />

          {/* Services Section */}
          <section className="py-24 md:py-32 bg-white">
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
                    Remplissez le formulaire&nbsp;: {RESPONSE_TIME_COPY.toLowerCase()}
                  </p>
                </div>
                <ConversionForm trigger="inline" />
              </div>
            </div>
          </section>

          {/* VHU Certification */}
          <VHUCertification />

          {/* National coverage — "Nous intervenons aussi partout en France" */}
          <Coverage regions={coverageRegions} topCities={coverageCities} />

          {/* Testimonials */}
          <Testimonials />

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

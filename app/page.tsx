import Script from 'next/script';
import HeroNew from '@/components/HeroNew';
import ServiceSelector from '@/components/ServiceSelector';
import ProcessNew from '@/components/ProcessNew';
import Coverage from '@/components/Coverage';
import AnimatedStats from '@/components/AnimatedStats';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import DualServiceCTA from '@/components/DualServiceCTA';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import ScrollAnimation from '@/components/ScrollAnimation';
import { getHomeStructuredData } from '@/lib/structured-data';
import { generateHomeMeta } from '@/lib/seo';
import { getEpaveRemovalHowToSchema, getDefaultReviewsSchema, getSpeakableSchema } from '@/lib/schema';

export const metadata = generateHomeMeta();

export default function Home() {
  const structuredData = getHomeStructuredData();
  const howToSchema = getEpaveRemovalHowToSchema();
  const reviewsSchema = getDefaultReviewsSchema();
  const speakableSchema = getSpeakableSchema('https://www.lesepavistespro.fr/');

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
        id="structured-data-reviews"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
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

          {/* VHU Agrément Badge */}
          <section className="py-12 bg-brand-navy/[0.03] border-t border-b border-neutral-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <img
                  src="/images/centre-vhu-agree.jpeg"
                  alt="Centre VHU Agréé - Partenaire avec centre VHU agréé N° PR9500003D"
                  width={140}
                  height={90}
                  className="rounded-xl"
                />
                <div className="text-center sm:text-left">
                  <p className="text-brand-navy font-bold text-lg mb-1">Partenaire avec centre VHU agréé</p>
                  <p className="text-brand-red font-semibold text-base">N° d&apos;agrément : PR9500003D</p>
                  <p className="text-neutral-500 text-sm mt-1">Destruction légale et écologique garantie</p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <AnimatedStats />

          {/* Coverage */}
          <Coverage />

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

import Header from '@/components/Header';
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header is now inside HeroNew */}
      <main>
        <HeroNew />
        
        {/* Dual Service Selector with Beautiful Illustrated Cards */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-[5%]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 md:mb-6 tracking-tight">
                  Nos Services en Île-de-France
                </h2>
                <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto px-4 font-light leading-relaxed">
                  Choisissez le service dont vous avez besoin
                </p>
              </div>
              <ServiceSelector />
            </div>
          </div>
        </section>
        
        <ProcessNew />
        
        {/* Conversion Form Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-[5%]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Obtenez Votre Devis Gratuit en 2 Minutes
                </h2>
                <p className="text-lg text-neutral-200">
                  Remplissez le formulaire et recevez une réponse sous 15 minutes
                </p>
              </div>
              <ConversionForm trigger="inline" />
            </div>
          </div>
        </section>
        
        <Coverage />
        <AnimatedStats />
        
        {/* Decorative Separator */}
        <div className="relative py-12 bg-white">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-neutral-300"></div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-neutral-300 to-neutral-300"></div>
              </div>
            </div>
          </div>
        </div>
        
        <DualServiceCTA />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

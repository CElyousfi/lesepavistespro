'use client';

import { Phone, CheckCircle, Clock, Shield } from 'lucide-react';
import Button from './Button';
import { trackCallClick } from '@/lib/analytics';

const Hero = () => {
  const handleCallClick = () => {
    trackCallClick('hero');
  };

  return (
    <section className="relative bg-brand-navy text-white overflow-hidden min-h-screen flex items-center justify-center pt-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy opacity-90"></div>
      
      {/* Decorative elements - very subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
      </div>

      {/* 90% width container - 100vh height */}
      <div className="w-[90%] max-w-7xl mx-auto py-12 relative z-10">
        <div className="text-center">
          {/* Main Headline - Clean and Bold */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Enlèvement d'épave{' '}
            <span className="text-brand-red italic">100% gratuit</span>
            {' '}en Île-de-France
          </h1>

          {/* Subheadline - Lighter weight */}
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Épaviste agréé VHU disponible 7j/7. Service rapide d'enlèvement gratuit et rachat de véhicules 
            accidentés, HS ou en panne dans toute l'Île-de-France.
          </p>

          {/* CTA Button - Rounded rectangle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="tel:0617948585" onClick={handleCallClick}>
              <Button size="lg" className="w-full sm:w-auto bg-brand-red hover:bg-brand-red/90 text-white border-0 shadow-lg rounded-xl">
                <Phone className="mr-2 h-5 w-5" />
                06 17 94 85 85
              </Button>
            </a>
          </div>

          {/* Key Benefits - Minimal style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-5 w-5 text-brand-red mb-2" strokeWidth={1.5} />
              <span className="text-sm font-medium text-white">Enlèvement 100% gratuit</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="h-5 w-5 text-brand-red mb-2" strokeWidth={1.5} />
              <span className="text-sm font-medium text-white">Intervention sous 24h</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-5 w-5 text-brand-red mb-2" strokeWidth={1.5} />
              <span className="text-sm font-medium text-white">Centre VHU agréé</span>
            </div>
          </div>

          {/* Horizontal scrolling carousel - inside hero */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {/* Placeholder cards - you'll add your images */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 h-48 bg-white rounded-2xl shadow-md flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">Image {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
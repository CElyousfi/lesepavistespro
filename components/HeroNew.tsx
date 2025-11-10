'use client';

import Image from 'next/image';
import { Phone, CheckCircle, Clock, Shield } from '@phosphor-icons/react';
import Button from './Button';
import Header from './Header';
import { trackCallClick } from '@/lib/analytics';

const HeroNew = () => {
  
  const handleCallClick = () => {
    trackCallClick('hero');
  };

  const handleContactClick = () => {
    // Scroll to FAQ section which has contact buttons
    const faqSection = document.querySelector('section:has(h2)');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId) || document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hero carousel images
  const marqueeImages = [
    { id: 1, src: '/hero/hero1.png', alt: 'Épaviste professionnel' },
    { id: 2, src: '/hero/hero2.jpg', alt: 'Enlèvement dépave' },
    { id: 3, src: '/hero/hero3.png', alt: 'Rachat voiture' },
    { id: 4, src: '/hero/hero4.png', alt: 'Service VHU agréé' },
    { id: 5, src: '/hero/hero5.jpg', alt: 'Certificat destruction' },
    { id: 6, src: '/hero/hero6.png', alt: 'Intervention rapide' },
  ];

  return (
    <>
      {/* Use the better Header component */}
      <Header />
      
      <section className="relative bg-white overflow-hidden flex items-center justify-center p-1 md:p-[0.25%] pt-24 sm:pt-32 md:pt-40">
        <div className="w-full md:w-[99.5%] relative z-10">
          {/* Bordered box container with navy background */}
          <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-xl sm:rounded-2xl md:rounded-3xl px-4 sm:px-6 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
            {/* Subtle gradient overlay inside box */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
            
            <div className="relative z-10">
          {/* Centered Content */}
          <div className="content text-center max-w-4xl mx-auto mb-8 md:mb-16 px-2">
            <div className="heading-wrapper mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Enlèvement d'épave{' '}
                <span className="text-brand-red italic">100% gratuit</span>
                {' '}en Île-de-France
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed max-w-3xl mx-auto px-2">
                Épaviste agréé VHU disponible 7j/7. Service rapide d'enlèvement gratuit et rachat de véhicules 
                accidentés, HS ou en panne dans toute l'Île-de-France.
              </p>
            </div>

            {/* Actions */}
            <div className="actions mb-6 md:mb-8">
              <a href="tel:0979049486" onClick={handleCallClick}>
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white rounded-xl shadow-lg w-full sm:w-auto text-base md:text-lg group">
                  <Phone size={20} weight="bold" className="mr-2 icon-cta-pulse group-hover:icon-cta-shake" />
                  09 79 04 94 86
                </Button>
              </a>
            </div>

            {/* Reinsurance list - CENTERED */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
              <li className="flex items-center gap-2 justify-center sm:justify-start group">
                <div className="icon-wrapper w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} weight="bold" className="text-brand-red icon-hover-grow" />
                </div>
                <span className="text-xs sm:text-sm font-medium">Enlèvement 100% gratuit</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start group">
                <div className="icon-wrapper w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} weight="bold" className="text-brand-red icon-hover-grow" />
                </div>
                <span className="text-xs sm:text-sm font-medium">Intervention sous 24h</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start group">
                <div className="icon-wrapper w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} weight="bold" className="text-brand-red icon-hover-grow" />
                </div>
                <span className="text-xs sm:text-sm font-medium">Centre VHU agréé</span>
              </li>
            </ul>
          </div>

          {/* Horizontal scrolling images below - RESPONSIVE HEIGHT */}
          <div className="hero-mosaic overflow-hidden -mx-4 md:-mx-6 lg:-mx-8 mt-auto">
            <div className="marquee-horizontal flex gap-3 md:gap-6 animate-marquee-horizontal">
              {/* First group */}
              {marqueeImages.map((image) => (
                <div
                  key={`group1-${image.id}`}
                  className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {marqueeImages.map((image) => (
                <div
                  key={`group2-${image.id}`}
                  className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default HeroNew;

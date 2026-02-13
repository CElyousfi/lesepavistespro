'use client';

import { Phone, ArrowRight } from '@phosphor-icons/react';
import Button from './Button';
import Header from './Header';
import { trackCallClick } from '@/lib/analytics';

const HeroNew = () => {

  const handleCallClick = () => {
    trackCallClick('hero');
  };

  return (
    <>
      <Header />

      <section className="relative bg-white overflow-hidden pt-32 pb-8 lg:pt-44 lg:pb-16">

        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/[0.04] rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[200px] w-[500px] h-[500px] bg-brand-gold/[0.05] rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">

          <div className="max-w-5xl mx-auto text-center">

            {/* Announcement pill */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
              <span className="text-sm font-medium text-brand-navy/70">Service 100% Gratuit &amp; Agréé VHU</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-navy mb-8 leading-[1.05] tracking-tight animate-fade-in-up">
              Votre service{' '}
              <span className="text-brand-red">d&apos;épaviste</span>
              <br />
              partout en France
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Intervention rapide 7j/7 pour l&apos;enlèvement gratuit et le rachat de votre véhicule. Simple, efficace et conforme à la réglementation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
              <a href="tel:0979049486" onClick={handleCallClick}>
                <Button size="lg" className="h-14 min-w-[220px] text-base gap-2">
                  <Phone size={20} weight="bold" />
                  09 79 04 94 86
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                className="h-14 min-w-[220px] text-base gap-2"
                onClick={() => {
                  const formSection = document.querySelector('section:has(form)');
                  if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Estimation Gratuite
                <ArrowRight size={18} weight="bold" />
              </Button>
            </div>

          </div>
        </div>

        {/* Scrolling stats marquee */}
        <div className="mt-20 lg:mt-28 overflow-hidden border-t border-b border-neutral-200 py-6">
          <div className="marquee-track">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-12 px-6">
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">+250</span>
                  <span className="text-sm text-neutral-500 font-medium">Clients<br/>satisfaits</span>
                </div>
                <span className="text-neutral-300 text-2xl">+</span>
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span className="text-4xl md:text-5xl font-bold text-brand-red tracking-tight">100%</span>
                  <span className="text-sm text-neutral-500 font-medium">Gratuit<br/>&amp; agréé</span>
                </div>
                <span className="text-neutral-300 text-2xl">+</span>
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">24h</span>
                  <span className="text-sm text-neutral-500 font-medium">Intervention<br/>rapide</span>
                </div>
                <span className="text-neutral-300 text-2xl">+</span>
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <span className="text-4xl md:text-5xl font-bold text-brand-red tracking-tight">7j/7</span>
                  <span className="text-sm text-neutral-500 font-medium">Disponibilité<br/>totale</span>
                </div>
                <span className="text-neutral-300 text-2xl">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroNew;

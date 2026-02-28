'use client';

import Image from 'next/image';

const TrustBar = () => {
  const partners = [
    { name: 'Agréé Préfecture', logo: '/images/agraee-vhu.png' }, // We'll display text if logo is missing
    { name: 'France Relance', logo: 'france-relance' },
    { name: 'Partenaire Assurances', logo: 'assurances' },
    { name: 'Normes Européennes', logo: 'eu-norms' },
    { name: 'Paiement Sécurisé', logo: 'secure-pay' }
  ];

  return (
    <div className="bg-brand-surface border-y border-neutral-200 py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">
          Ils nous font confiance au quotidien
        </p>

        {/* Since actual partner logos aren't readily available as image files, we'll design a highly credible text-icon array that looks like partner badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          
          <div className="flex items-center gap-3">
             {/* Simple SVG icon acting as logo */}
            <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M5.42 10.17L11.25 16A2.652 2.652 0 0015 12.25l-5.83-5.83M15 12.25l-5.83-5.83m0 0L3.34 1.51M9.17 10.17l-5.83 5.83A2.652 2.652 0 007.09 19.75l5.83-5.83" />
            </svg>
            <span className="font-bold text-lg text-neutral-800 tracking-tight">Assurances Partenaires</span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="font-bold text-lg text-neutral-800 tracking-tight">Agréé Préfecture</span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
            <span className="font-bold text-lg text-neutral-800 tracking-tight">Conformité SIV</span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span className="font-bold text-lg text-neutral-800 tracking-tight">100% Recyclage Européen</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustBar;

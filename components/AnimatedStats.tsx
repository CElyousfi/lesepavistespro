'use client';

import ScrollAnimation from './ScrollAnimation';

interface Stat {
  number: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: '+250',
    label: 'Clients satisfaits',
    description: 'Service rapide et professionnel garanti partout en France.'
  },
  {
    number: '100%',
    label: 'Gratuit',
    description: 'Aucun frais caché, certificat de destruction inclus.'
  },
  {
    number: '7j/7',
    label: 'Disponibilité',
    description: 'Service client réactif tous les jours de la semaine.'
  },
  {
    number: '24h',
    label: 'Intervention',
    description: 'Prise en charge rapide sous 24-48h en France.'
  }
];

export default function AnimatedStats() {
  return (
    <section className="py-20 md:py-24 bg-brand-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white tracking-tight">
                    {stat.number}
                  </div>
                  <div className="h-px w-8 bg-brand-gold/60 mx-auto mb-3 group-hover:w-16 transition-all duration-500"></div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-[160px] mx-auto leading-relaxed hidden md:block">
                    {stat.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
}

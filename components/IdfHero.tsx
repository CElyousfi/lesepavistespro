import Link from 'next/link';
import Header from './Header';
import HeroCtas from './HeroCtas';
import { IDF_STATS } from '@/lib/idf';

interface IdfHeroProps {
  departments: Array<{ name: string; code: string; slug: string }>;
}

/**
 * Homepage hero — Île-de-France first. Server component: the H1 and the
 * intro copy are in the static HTML with no animation / opacity:0 state, so
 * the LCP text paints immediately (P4.3). Only the CTA row is a client island.
 */
export default function IdfHero({ departments }: IdfHeroProps) {
  return (
    <>
      <Header />

      <section className="relative bg-white overflow-hidden pt-32 pb-8 lg:pt-44 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/[0.04] rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[200px] w-[500px] h-[500px] bg-brand-gold/[0.05] rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
              <span className="text-sm font-medium text-brand-navy/70">Épaviste agréé VHU · Paris &amp; Île-de-France · 24h/24</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy mb-8 leading-[1.05] tracking-tight">
              Épaviste en Île-de-France&nbsp;:
              <br />
              <span className="text-brand-red">enlèvement d&apos;épave gratuit</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Enlèvement d&apos;épave 100&nbsp;% gratuit et rachat de voiture à Paris et dans les 8 départements
              d&apos;Île-de-France&nbsp;: intervention sous 2&nbsp;h en petite couronne, certificat de destruction remis
              sur place, 7j/7 et 24h/24.
            </p>

            <p className="text-sm sm:text-base text-neutral-500 mb-12 max-w-3xl mx-auto">
              {departments.map((d, i) => (
                <span key={d.slug}>
                  <Link href={`/epaviste/${d.slug}`} className="text-brand-navy font-medium hover:text-brand-red underline-offset-4 hover:underline">
                    {d.name} ({d.code})
                  </Link>
                  {i < departments.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>

            <HeroCtas />
          </div>
        </div>

        {/* Verifiable IDF facts only — no invented client counts here. */}
        <div className="mt-20 lg:mt-28 border-t border-b border-neutral-200 py-8">
          <dl className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
            {IDF_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-sm text-neutral-500 font-medium order-2">{stat.label}</dt>
                <dd className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">{stat.number}</dd>
                <dd className="text-xs text-neutral-500 mt-1">{stat.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

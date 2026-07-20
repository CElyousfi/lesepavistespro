'use client';

import { Quotes } from '@phosphor-icons/react';
import ScrollAnimation from './ScrollAnimation';

/**
 * Testimonials component — placeholder until real verified reviews are collected.
 * Previous version contained fabricated testimonials with invented names/quotes.
 * See CONTENT-INTEGRITY.md for details.
 */
const Testimonials = () => {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">

            <div className="container mx-auto px-4 relative z-10">
                <ScrollAnimation className="w-full">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Témoignages</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight mb-6">
                            Avis clients
                        </h2>
                        <div className="bg-brand-surface rounded-2xl p-8 border border-neutral-200">
                            <Quotes size={32} weight="fill" className="text-brand-red/20 mx-auto mb-4" />
                            <p className="text-neutral-600 leading-relaxed text-[15px]">
                                Nous collectons actuellement les avis de nos clients.
                                Vous avez fait appel à nos services ? Partagez votre expérience en nous contactant directement.
                            </p>
                            <a
                                href="tel:0979049486"
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand-red text-white rounded-full font-semibold text-sm hover:bg-brand-red/90 transition-all"
                            >
                                Laissez votre avis : 09 79 04 94 86
                            </a>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default Testimonials;

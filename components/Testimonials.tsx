'use client';

import { Quotes } from '@phosphor-icons/react';
import ScrollAnimation from './ScrollAnimation';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Jean D.",
            role: "Paris (75)",
            text: "Service impeccable. L'épaviste est arrivé à l'heure, très pro. Enlèvement fait en 15 minutes. Je recommande vivement pour le sérieux.",
        },
        {
            id: 2,
            name: "Sarah M.",
            role: "Lyon (69)",
            text: "J'ai vendu ma vieille Clio en panne. Estimation juste et paiement immédiat par virement instantané. Rien à redire.",
        },
        {
            id: 3,
            name: "Mohamed B.",
            role: "Saint-Denis (93)",
            text: "Gratuit comme promis. J'avais peur des arnaques mais là tout est carré. Certificat de cession rempli sur place.",
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">

            <div className="container mx-auto px-4 relative z-10">
                <ScrollAnimation className="w-full">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-block text-brand-red text-sm font-semibold tracking-wider uppercase mb-4">Témoignages</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
                            Avis clients vérifiés
                        </h2>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {reviews.map((review, index) => (
                        <ScrollAnimation key={review.id} delay={index * 0.15}>
                            <div className="relative bg-white rounded-2xl p-8 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-500 h-full flex flex-col">
                                <Quotes size={32} weight="fill" className="text-brand-red/20 mb-6" />

                                <p className="text-neutral-700 leading-relaxed flex-1 text-[15px]">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-brand-navy text-sm">{review.name}</div>
                                        <div className="text-xs text-neutral-500">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FAQ from '@/components/FAQ';
import { Question } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
    title: 'Questions Fréquentes (FAQ) | Enlèvement Épave',
    description: 'Toutes les réponses à vos questions sur l\'enlèvement d\'épave gratuit, les documents à fournir, la prime à la conversion et le rachat de voiture.',
};

export default function FAQPage() {
    return (
        <>
            <Header />

            <main className="bg-white min-h-screen">
                {/* Hero Section */}
                <section className="relative bg-white overflow-hidden pt-32 pb-20">

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] text-sm font-medium text-brand-navy/70 mb-8">
                            Centre d&apos;Aide
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-brand-navy">
                            Questions Fréquentes
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Nous répondons aux questions les plus courantes pour vous aider à comprendre l&apos;enlèvement d&apos;épave.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <FAQ />

                            <div className="mt-16 bg-brand-surface rounded-2xl p-8 md:p-12 text-center border border-neutral-200">
                                <div className="w-14 h-14 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <Question size={28} weight="fill" className="text-brand-red" />
                                </div>
                                <h2 className="text-2xl font-bold text-brand-navy mb-4">
                                    Vous ne trouvez pas votre réponse ?
                                </h2>
                                <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                                    Notre équipe est disponible 7j/7 pour répondre à toutes vos interrogations par téléphone ou message.
                                </p>
                                <a
                                    href="tel:0979049486"
                                    className="inline-flex items-center justify-center bg-brand-red text-white font-semibold py-3 px-8 rounded-full hover:bg-brand-red/90 transition-all hover:scale-[1.02]"
                                >
                                    Contactez-nous au 09 79 04 94 86
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { ShieldCheck, FileText, Recycle } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Conformité VHU & Agrément Préfectoral | Les Épavistes Pro',
    description: 'Tout savoir sur l\'agrément VHU, le certificat de destruction et le recyclage écologique de votre véhicule hors d\'usage.',
    alternates: {
        canonical: 'https://www.lesepavistespro.fr/conformite-vhu',
    },
};

export default function ConformiteVHUPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
        { name: 'Conformité VHU', url: 'https://www.lesepavistespro.fr/conformite-vhu' },
    ]);

    return (
        <>
            <Script
                id="structured-data-vhu-breadcrumb"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />

            <main className="bg-white min-h-screen">
                {/* Hero Section */}
                <section className="relative bg-white overflow-hidden pt-32 pb-20">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] text-sm font-medium text-brand-navy/70 mb-8">
                            Réglementation &amp; Écologie
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-brand-navy">
                            Conformité VHU
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Nous garantissons un traitement légal et écologique de votre épave dans un centre VHU agréé par la préfecture.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto space-y-4">

                            <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                                    <ShieldCheck size={24} weight="fill" className="text-brand-red" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-brand-navy mb-3">Qu&apos;est-ce que l&apos;agrément VHU ?</h2>
                                    <p className="text-neutral-600 leading-relaxed mb-3 text-sm">
                                        La destruction d&apos;un véhicule hors d&apos;usage (VHU) est strictement encadrée par la loi. Seuls les centres VHU agréés par la préfecture sont habilités à procéder à la dépollution et au broyage des véhicules.
                                    </p>
                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                        Faire appel à un épaviste agréé comme <strong className="text-brand-navy">Les Épavistes Pro</strong>, c&apos;est l&apos;assurance que votre véhicule sera traité dans le respect des normes environnementales strictes.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                                    <FileText size={24} weight="fill" className="text-brand-red" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-brand-navy mb-3">Le Certificat de Destruction (Cerfa n°14365*01)</h2>
                                    <p className="text-neutral-600 leading-relaxed mb-3 text-sm">
                                        Lors de l&apos;enlèvement de votre épave, nous vous remettons immédiatement un certificat de cession pour destruction. Ce document officiel prouve que vous n&apos;êtes plus propriétaire du véhicule.
                                    </p>
                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                        Le centre VHU émet ensuite un <strong className="text-brand-navy">Certificat de Destruction</strong> qui est transmis à la préfecture pour annuler l&apos;immatriculation du véhicule dans le SIV.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 hover:border-brand-gold/20 hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Recycle size={24} weight="fill" className="text-brand-gold" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-brand-navy mb-3">Dépollution et Recyclage</h2>
                                    <p className="text-neutral-600 leading-relaxed mb-3 text-sm">
                                        Une épave contient des déchets dangereux (huiles, batterie, liquides de frein/refroidissement, filtres...) qui doivent être extraits et traités spécifiquement.
                                    </p>
                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                        Notre processus garantit un taux de réutilisation et de recyclage d&apos;au moins 95% de la masse du véhicule, contribuant ainsi à l&apos;économie circulaire.
                                    </p>
                                </div>
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

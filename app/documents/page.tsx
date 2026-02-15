import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { IdentificationCard, FileText, CheckCircle, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Documents à Fournir pour Enlèvement Épave | Liste Complète',
    description: 'Liste des documents obligatoires pour l\'enlèvement de votre épave (Carte Grise, Certificat de non-gage, Pièce d\'identité). Téléchargez les CERFA.',
    alternates: {
        canonical: 'https://www.lesepavistespro.fr/documents',
    },
};

export default function DocumentsPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
        { name: 'Documents', url: 'https://www.lesepavistespro.fr/documents' },
    ]);

    return (
        <>
            <Script
                id="structured-data-documents-breadcrumb"
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
                            Guide Administratif
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-brand-navy">
                            Documents à Fournir
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Pour que l&apos;enlèvement de votre épave soit légal et rapide, voici la liste des documents obligatoires à préparer.
                        </p>
                    </div>
                </section>

                {/* Checklist Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid gap-8">

                            {/* Doc 1: Carte Grise */}
                            <div className="bg-white rounded-2xl p-8 border border-neutral-200 border-l-2 border-l-brand-red hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-xl flex items-center justify-center">
                                        <IdentificationCard size={24} weight="fill" />
                                    </div>
                                </div>
                                <div className="grow">
                                    <h2 className="text-xl font-bold text-brand-navy mb-2">1. La Carte Grise (Originale)</h2>
                                    <p className="text-neutral-600 mb-4 text-sm">
                                        Vous devez fournir l&apos;original de la carte grise du véhicule.
                                    </p>
                                    <ul className="space-y-2 text-sm text-neutral-600 bg-brand-surface p-4 rounded-lg border border-neutral-200">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={18} weight="fill" className="text-brand-red shrink-0 mt-0.5" />
                                            <span>Elle doit être barrée avec la mention <strong className="text-brand-navy">&quot;Vendu le [Date] pour destruction&quot;</strong> ou <strong className="text-brand-navy">&quot;Cédé le [Date] pour destruction&quot;</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={18} weight="fill" className="text-brand-red shrink-0 mt-0.5" />
                                            <span>Signée par le(s) titulaire(s).</span>
                                        </li>
                                    </ul>
                                    <div className="mt-4 text-xs text-neutral-500 italic">
                                        * En cas de perte, une déclaration de perte ou de vol (tamponnée par la gendarmerie/commissariat) est nécessaire.
                                    </div>
                                </div>
                            </div>

                            {/* Doc 2: Identité */}
                            <div className="bg-white rounded-2xl p-8 border border-neutral-200 border-l-2 border-l-neutral-300 hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-neutral-100 text-neutral-500 rounded-xl flex items-center justify-center">
                                        <IdentificationCard size={24} weight="fill" />
                                    </div>
                                </div>
                                <div className="grow">
                                    <h2 className="text-xl font-bold text-brand-navy mb-2">2. Pièce d&apos;Identité</h2>
                                    <p className="text-neutral-600 mb-4 text-sm">
                                        Une copie de la pièce d&apos;identité du titulaire de la carte grise.
                                    </p>
                                    <ul className="space-y-2 text-sm text-neutral-600">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={18} weight="fill" className="text-brand-red shrink-0" />
                                            <span>Carte Nationale d&apos;Identité (CNI)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={18} weight="fill" className="text-brand-red shrink-0" />
                                            <span>Passeport</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle size={18} weight="fill" className="text-brand-red shrink-0" />
                                            <span>Titre de Séjour</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Doc 3: Non-Gage */}
                            <div className="bg-white rounded-2xl p-8 border border-neutral-200 border-l-2 border-l-brand-gold hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center">
                                        <FileText size={24} weight="fill" />
                                    </div>
                                </div>
                                <div className="grow">
                                    <h2 className="text-xl font-bold text-brand-navy mb-2">3. Certificat de Non-Gage</h2>
                                    <p className="text-neutral-600 mb-4 text-sm">
                                        Aussi appelé &quot;Certificat de Situation Administrative&quot; (CSA), il prouve qu&apos;aucun gage ni opposition n&apos;empêche la destruction du véhicule.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-6">
                                        <a
                                            href="https://siv.interieur.gouv.fr/map-usg-ui/do/accueil_certificat"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-full font-semibold text-sm hover:bg-brand-red/90 transition-colors"
                                        >
                                            <DownloadSimple size={18} weight="bold" />
                                            Télécharger sur le site officiel
                                        </a>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-3">
                                        * Ce document doit dater de moins de 15 jours.
                                    </p>
                                </div>
                            </div>

                            {/* Doc 4: Certificat de Cession */}
                            <div className="bg-white rounded-2xl p-8 border border-neutral-200 border-l-2 border-l-neutral-300 hover:shadow-md transition-all duration-500 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-neutral-100 text-neutral-500 rounded-xl flex items-center justify-center">
                                        <FileText size={24} weight="fill" />
                                    </div>
                                </div>
                                <div className="grow">
                                    <h2 className="text-xl font-bold text-brand-navy mb-2">4. Certificat de Cession (Cerfa n°15776*02)</h2>
                                    <p className="text-neutral-600 mb-4 text-sm">
                                        Ce formulaire sera rempli et signé le jour de l&apos;enlèvement avec notre épaviste. Il officialise le transfert de propriété pour destruction.
                                    </p>
                                    <div className="bg-brand-red/[0.04] p-4 rounded-lg border border-brand-red/10">
                                        <p className="text-sm text-brand-navy font-semibold">
                                            Nous fournissons ce document le jour J. Vous n&apos;avez pas besoin de l&apos;imprimer.
                                        </p>
                                    </div>
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

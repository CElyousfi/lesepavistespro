import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { IdentificationCard, FileText, CheckCircle, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Documents pour l'enlèvement d'épave",
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
            <script
                type="application/ld+json"
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

                {/* Special cases */}
                <section className="py-16 md:py-20 border-t border-neutral-200">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">
                                Les cas particuliers
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-8">
                                Les quatre documents ci-dessus couvrent la grande majorité des enlèvements.
                                Il arrive pourtant qu&apos;une situation sorte du cadre habituel : véhicule hérité,
                                carte grise introuvable, propriétaire injoignable. Aucune de ces situations
                                n&apos;empêche l&apos;enlèvement — elles demandent simplement une pièce
                                supplémentaire.
                            </p>

                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-brand-navy mb-2">Carte grise perdue ou volée</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Une déclaration de perte ou de vol (Cerfa 13753*04) remplace la carte grise,
                                        accompagnée d&apos;un certificat de situation administrative de moins de 15
                                        jours. Si le véhicule est immatriculé au format ancien (FNI), joignez également
                                        un justificatif de domicile. La déclaration se fait en ligne sur le site de
                                        l&apos;ANTS et est gratuite.
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-brand-navy mb-2">Véhicule issu d&apos;une succession</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Il faut un acte de notoriété ou une attestation notariée désignant les
                                        héritiers, ainsi que l&apos;accord écrit de chacun d&apos;eux. Si vous êtes
                                        l&apos;unique héritier, une attestation sur l&apos;honneur signée suffit
                                        généralement, accompagnée du certificat de décès. La carte grise n&apos;a pas
                                        besoin d&apos;être remise à votre nom pour une destruction.
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-brand-navy mb-2">Vous n&apos;êtes pas le titulaire de la carte grise</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Une procuration écrite et signée par le titulaire, avec la copie de sa pièce
                                        d&apos;identité, vous autorise à signer la cession à sa place. Sans cet accord,
                                        nous ne pouvons pas procéder : la destruction d&apos;un véhicule engage la
                                        responsabilité de son propriétaire légal.
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-brand-navy mb-2">Véhicule gagé, saisi ou en opposition</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Le certificat de situation administrative fera apparaître le gage ou
                                        l&apos;opposition. Un gage doit être levé par le créancier avant toute
                                        destruction ; une opposition pour amendes impayées se lève auprès du Trésor
                                        public. Nous vous indiquons la démarche exacte selon la mention qui figure sur
                                        votre certificat.
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-brand-navy mb-2">Véhicule en fourrière</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Vous pouvez abandonner le véhicule au profit de la fourrière ou nous mandater
                                        pour le récupérer. Dans le second cas, les frais de garde restent dus au
                                        gestionnaire de la fourrière : nous vous disons à l&apos;avance à combien ils
                                        s&apos;élèvent afin que vous puissiez arbitrer en connaissance de cause.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mt-14 mb-4">
                                Après l&apos;enlèvement
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-4">
                                Conservez votre exemplaire de la déclaration de cession : c&apos;est lui qui met fin à
                                votre responsabilité de propriétaire dès la signature. Le{' '}
                                <Link href="/conformite-vhu" className="text-brand-red hover:underline">certificat de destruction</Link>{' '}
                                vous parvient sous 15 jours et vaut preuve définitive : il vous permet de résilier
                                l&apos;assurance sans préavis et, le cas échéant, de constituer un dossier de prime à
                                la conversion. La carte grise est annulée dans le fichier national des immatriculations
                                au même moment.
                            </p>
                            <p className="text-neutral-600 leading-relaxed">
                                Si votre véhicule roule encore, la destruction n&apos;est pas votre seule option :
                                un <Link href="/rachat-voiture" className="text-brand-red hover:underline">rachat de voiture</Link>{' '}
                                est souvent plus intéressant, même{' '}
                                <Link href="/guides/rachat-sans-ct" className="text-brand-red hover:underline">sans contrôle technique valide</Link>.
                                Dans le doute, envoyez-nous quelques photos : nous vous disons franchement laquelle des
                                deux solutions vous rapporte le plus. Voir aussi nos{' '}
                                <Link href="/zones" className="text-brand-red hover:underline">zones d&apos;intervention</Link>{' '}
                                et notre <Link href="/faq" className="text-brand-red hover:underline">FAQ</Link>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <VHUCertification />
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

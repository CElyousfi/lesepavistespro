import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Image from 'next/image';
import { ShieldCheck, FileText, Recycle, Certificate } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Conformité VHU & agrément préfectoral',
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

                            <div className="bg-gradient-to-br from-brand-navy to-brand-navy/95 rounded-2xl p-8 md:p-10 border border-brand-navy/20 shadow-lg">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="shrink-0">
                                        <div className="relative w-[200px] h-[110px]">
                                          <Image
                                            src="/images/centre-vhu-agree.webp"
                                            alt="Centre VHU Agréé - Partenaire avec centre VHU agréé N° PR9500003D"
                                            fill
                                            sizes="200px"
                                            className="rounded-xl border-2 border-white/20 object-cover"
                                          />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                                                <Certificate size={22} weight="fill" className="text-brand-gold" />
                                            </div>
                                            <h2 className="text-xl font-bold text-white">Notre Agrément VHU Officiel</h2>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed text-sm mb-4">
                                            <strong className="text-white">Les Épavistes Pro</strong> est partenaire avec un centre VHU agréé par la préfecture. Chaque véhicule pris en charge est traité dans le strict respect de la réglementation environnementale.
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20">
                                            <span className="text-brand-gold font-bold text-lg">N° d&apos;agrément : PR9500003D</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Regulatory detail */}
                <section className="py-16 md:py-20 border-t border-neutral-200">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">
                                Ce que la réglementation impose
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                Un véhicule hors d&apos;usage est un déchet dangereux au sens du code de
                                l&apos;environnement : il contient des huiles, du liquide de refroidissement, du
                                carburant, une batterie au plomb et, sur les modèles récents, des gaz de climatisation
                                et des cartouches pyrotechniques d&apos;airbag. Sa prise en charge n&apos;est donc pas
                                libre. Seul un centre titulaire d&apos;un agrément préfectoral peut le dépolluer, le
                                démonter et faire annuler sa carte grise.
                            </p>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                Confier son véhicule à un intervenant non agréé expose le propriétaire, pas seulement
                                le récupérateur. Tant que la destruction n&apos;est pas enregistrée dans le fichier
                                national, le titulaire de la carte grise reste responsable du véhicule : amendes,
                                stationnement abusif, pollution du terrain sur lequel il finit. C&apos;est la raison
                                pour laquelle le certificat de destruction n&apos;est pas une formalité mais la seule
                                preuve qui vous libère.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                                Comment vérifier qu&apos;un épaviste est réellement agréé
                            </h2>
                            <ul className="space-y-3 mb-8 text-neutral-600 leading-relaxed list-disc pl-5">
                                <li>
                                    <strong className="text-brand-navy">Demandez le numéro d&apos;agrément.</strong> Il
                                    se présente sous la forme PRxxxxxxxx et doit être communiqué sans hésitation, avant
                                    l&apos;intervention.
                                </li>
                                <li>
                                    <strong className="text-brand-navy">Vérifiez-le.</strong> La liste des centres VHU
                                    agréés est publiée par chaque préfecture et consolidée au niveau national ; le
                                    numéro doit y figurer, associé au nom du centre.
                                </li>
                                <li>
                                    <strong className="text-brand-navy">Exigez le certificat de destruction par écrit.</strong>{' '}
                                    Un professionnel agréé s&apos;engage sur un délai — 15 jours dans notre cas. Un
                                    intervenant qui élude la question ne détruira pas réglementairement le véhicule.
                                </li>
                                <li>
                                    <strong className="text-brand-navy">Méfiez-vous des frais de dernière minute.</strong>{' '}
                                    L&apos;enlèvement d&apos;un véhicule complet est gratuit. Un surcoût annoncé une
                                    fois la dépanneuse sur place n&apos;a pas de fondement réglementaire.
                                </li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                                Le taux de valorisation de 95 %
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                La directive européenne 2000/53/CE, transposée en droit français, fixe un objectif de
                                réutilisation et de valorisation de 95 % de la masse du véhicule, dont 85 % en
                                réutilisation et recyclage. Concrètement : les fluides sont extraits et traités, la
                                batterie et le pot catalytique sont déposés, les pièces en bon état repartent en
                                réemploi, puis la carcasse est broyée et les métaux séparés pour refonte. Les 5 %
                                restants — plastiques composites, mousses, verre feuilleté — partent en valorisation
                                énergétique.
                            </p>
                            <p className="text-neutral-600 leading-relaxed">
                                C&apos;est cette économie de la matière qui rend l&apos;{' '}
                                <Link href="/epaviste" className="text-brand-red hover:underline">enlèvement d&apos;épave gratuit</Link>{' '}
                                possible : le centre se rémunère sur les matières et les pièces, pas sur le
                                propriétaire. Pour préparer votre dossier, consultez la liste des{' '}
                                <Link href="/documents" className="text-brand-red hover:underline">documents à fournir</Link> ;
                                si votre véhicule roule encore, comparez d&apos;abord avec un{' '}
                                <Link href="/rachat-voiture" className="text-brand-red hover:underline">rachat de voiture</Link>, y compris{' '}
                                <Link href="/guides/rachat-sans-ct" className="text-brand-red hover:underline">sans contrôle technique</Link>.
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

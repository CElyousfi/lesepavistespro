import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import VHUCertification from '@/components/VHUCertification';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Politique des Cookies | Les Épavistes Pro',
    description: 'Informations sur l\'utilisation des cookies sur le site Les Épavistes Pro.',
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.lesepavistespro.fr/cookies',
    },
};

export default function CookiesPage() {
    return (
        <>
            <Header />

            <main className="bg-white min-h-screen">
                {/* Hero Section */}
                <section className="relative bg-white overflow-hidden pt-32 md:pt-36 pb-12">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
                            Politique des Cookies
                        </h1>
                        <p className="text-lg text-neutral-500">
                            Transparence sur l&apos;utilisation de vos données
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <div className="bg-brand-surface rounded-2xl border border-neutral-200 p-8 md:p-12 max-w-none text-neutral-600">

                            <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
                            <p>
                                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site internet. Il permet au site de mémoriser certaines informations sur votre visite, comme votre langue préférée et d'autres paramètres, afin de faciliter votre navigation ultérieure.
                            </p>

                            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. Les cookies que nous utilisons</h2>
                            <p>
                                Nous utilisons différents types de cookies pour améliorer le fonctionnement du site et l'expérience utilisateur :
                            </p>
                            <ul className="list-disc ml-6 space-y-2 mt-4">
                                <li>
                                    <strong>Cookies essentiels :</strong> Indispensables au fonctionnement du site, ils vous permettent de naviguer et d'utiliser ses fonctionnalités de base (ex: accès aux zones sécurisées).
                                </li>
                                <li>
                                    <strong>Cookies de performance (Google Analytics) :</strong> Ils nous aident à comprendre comment les visiteurs interagissent avec le site en collectant et en signalant des informations de manière anonyme. Cela nous permet d'améliorer l'ergonomie et le contenu.
                                </li>
                            </ul>

                            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Gestion des cookies</h2>
                            <p>
                                Vous avez le choix d'accepter ou de refuser les cookies. La plupart des navigateurs web acceptent automatiquement les cookies, mais vous pouvez généralement modifier les paramètres de votre navigateur pour les refuser si vous le préférez.
                            </p>
                            <p>
                                Notez que le refus des cookies peut vous empêcher de profiter pleinement de certaines fonctionnalités du site.
                            </p>
                            <div className="bg-white p-4 rounded-lg mt-4 text-sm border-l-2 border-brand-red">
                                Pour gérer les cookies Google Analytics, vous pouvez installer le <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-red underline">module complémentaire de navigateur pour la désactivation de Google Analytics</a>.
                            </div>

                            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Durée de conservation</h2>
                            <p>
                                Les cookies ont une durée de vie limitée à treize (13) mois après leur premier dépôt dans l'équipement terminal de l'utilisateur.
                            </p>

                            <div className="mt-12 pt-8 border-t border-neutral-200">
                                <p>
                                    Pour plus d&apos;informations sur la protection de vos données, consultez notre <Link href="/politique-de-confidentialite" className="text-brand-red font-bold hover:underline">Politique de Confidentialité</Link>.
                                </p>
                            </div>

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

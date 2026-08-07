import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { Phone, EnvelopeSimple, MapPin, Clock, WhatsappLogo, MessengerLogo } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';

export const metadata: Metadata = {
    title: 'Contactez Les Épavistes Pro | Enlèvement Épave Gratuit',
    description: 'Besoin d\'un épaviste ou d\'un rachat de voiture ? Contactez-nous par téléphone, WhatsApp ou via notre formulaire. Intervention rapide 7j/7 partout en France.',
    keywords: [
        "contact épaviste",
        "numéro épaviste gratuit",
        "adresse les épavistes pro",
        "devis rachat voiture",
    ],
    alternates: {
        canonical: 'https://www.lesepavistespro.fr/contact',
    },
};

export default function ContactPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
        { name: 'Contact', url: 'https://www.lesepavistespro.fr/contact' },
    ]);

    return (
        <>
            <Script
                id="structured-data-contact-breadcrumb"
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
                            Service Client 7j/7
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-brand-navy">
                            Contactez-nous
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            Une question, une demande d&apos;enlèvement ou une estimation ?<br />
                            Notre équipe vous répond immédiatement.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

                            {/* Left Column: Contact Info */}
                            <div>
                                <h2 className="text-2xl font-bold text-brand-navy mb-8">
                                    Nos Coordonnées
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all">
                                        <div className="w-11 h-11 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                                            <Phone size={20} weight="bold" className="text-brand-red" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy mb-0.5">Téléphone</h3>
                                            <p className="text-neutral-500 text-xs mb-2">Réponse immédiate</p>
                                            <a href="tel:+33602427345" className="text-xl font-bold text-brand-navy hover:text-brand-red transition-colors block">
                                                06 02 42 73 45
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-200 hover:border-whatsapp/20 hover:shadow-md transition-all">
                                        <div className="w-11 h-11 rounded-xl bg-whatsapp/10 flex items-center justify-center shrink-0">
                                            <WhatsappLogo size={20} weight="fill" className="text-whatsapp" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy mb-0.5">WhatsApp</h3>
                                            <p className="text-neutral-500 text-xs mb-2">Envoyez vos photos</p>
                                            <a
                                                href="https://wa.me/33602427345?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xl font-bold text-brand-navy hover:text-whatsapp transition-colors block"
                                            >
                                                +33 6 02 42 73 45
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all">
                                        <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                                            <EnvelopeSimple size={20} weight="bold" className="text-neutral-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy mb-0.5">Email</h3>
                                            <p className="text-neutral-500 text-xs mb-2">Pour les documents</p>
                                            <a href="mailto:lesepavistespro@gmail.com" className="text-lg font-bold text-brand-navy hover:text-brand-red transition-colors block break-all">
                                                lesepavistespro@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-gold/20 hover:shadow-md transition-all">
                                        <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                                            <Clock size={20} weight="bold" className="text-brand-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy mb-2">Horaires</h3>
                                            <ul className="space-y-1">
                                                <li className="flex justify-between w-full min-w-[200px] text-neutral-500 text-sm">
                                                    <span>Lundi - Samedi</span>
                                                    <span className="font-semibold text-brand-navy">08h - 20h</span>
                                                </li>
                                                <li className="flex justify-between w-full min-w-[200px] text-neutral-500 text-sm">
                                                    <span>Dimanche</span>
                                                    <span className="font-semibold text-brand-navy">09h - 19h</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Form */}
                            <div>
                                <h2 className="text-2xl font-bold text-brand-navy mb-2">
                                    Demande de Devis Gratuit
                                </h2>
                                <p className="text-neutral-600 mb-8 text-sm">
                                    Remplissez ce formulaire pour recevoir une estimation immédiate.
                                </p>
                                <ConversionForm />
                            </div>

                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="bg-brand-surface py-16 border-t border-neutral-200">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold text-brand-navy mb-4">
                            Zone d&apos;Intervention
                        </h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto mb-12">
                            Nous intervenons gratuitement partout en France pour l&apos;enlèvement d&apos;épaves.
                        </p>

                        <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] w-full max-w-6xl mx-auto border border-neutral-200 shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d336634.69778742516!2d2.100985558117769!3d48.85883713917812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1709224483751!5m2!1sfr!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Zone d'intervention Les Épavistes Pro"
                            ></iframe>
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

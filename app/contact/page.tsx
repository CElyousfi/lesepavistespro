import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConversionForm from '@/components/ConversionForm';
import { Phone, EnvelopeSimple, Clock, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { getBreadcrumbSchema } from '@/lib/schema';
import { buildFaqPage, type FaqItem } from '@/lib/faq';
import VHUCertification from '@/components/VHUCertification';
import { whatsappUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
    title: 'Contact – Épaviste & rachat voiture 7j/7',
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

/** IDF departments, for the service-area links below. */
const IDF_DEPARTMENTS = [
    { name: 'Paris', code: '75', slug: 'paris-75' },
    { name: 'Seine-et-Marne', code: '77', slug: 'seine-et-marne-77' },
    { name: 'Yvelines', code: '78', slug: 'yvelines-78' },
    { name: 'Essonne', code: '91', slug: 'essonne-91' },
    { name: 'Hauts-de-Seine', code: '92', slug: 'hauts-de-seine-92' },
    { name: 'Seine-Saint-Denis', code: '93', slug: 'seine-saint-denis-93' },
    { name: 'Val-de-Marne', code: '94', slug: 'val-de-marne-94' },
    { name: "Val-d'Oise", code: '95', slug: 'val-d-oise-95' },
];

export default function ContactPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
        { name: 'Contact', url: 'https://www.lesepavistespro.fr/contact' },
    ]);

    // Rendered below and emitted as this page's single FAQPage node.
    const contactFaq: FaqItem[] = [
        {
            question: 'Sous quel délai serai-je rappelé ?',
            answer: "Par téléphone, la réponse est immédiate aux horaires d'ouverture. Une demande envoyée par WhatsApp ou via le formulaire est traitée sous 1 heure en journée, et au plus tard le lendemain matin si elle nous parvient la nuit. Précisez votre code postal et l'état du véhicule : cela nous permet de vous confirmer un créneau dès le premier échange.",
        },
        {
            question: 'Que se passe-t-il après ma demande ?',
            answer: "Nous vérifions d'abord que le véhicule est bien éligible à l'enlèvement gratuit ou au rachat, puis nous fixons ensemble un créneau. Le jour J, notre dépanneuse se présente à l'adresse convenue, vous signez la déclaration de cession (Cerfa 15776*02) sur place, et le véhicule part vers un centre VHU agréé. Le certificat de destruction vous est envoyé sous 15 jours.",
        },
        {
            question: 'Quels documents dois-je préparer avant votre passage ?',
            answer: "La carte grise originale, une pièce d'identité en cours de validité et un certificat de situation administrative (non-gage) de moins de 15 jours. Si vous n'êtes pas le titulaire de la carte grise, prévoyez en plus une procuration et la copie de la pièce d'identité du titulaire. La liste complète est détaillée sur notre page Documents.",
        },
        {
            question: "L'enlèvement est-il vraiment gratuit ?",
            answer: "Oui, pour tout véhicule complet — moteur, roues et éléments essentiels présents. Ce sont la revente des matières et des pièces réutilisables qui financent l'intervention, pas vous. Un véhicule incomplet ou situé dans un accès très contraint peut faire l'objet d'un devis : dans ce cas le montant vous est annoncé avant toute intervention, jamais après.",
        },
        {
            question: 'Intervenez-vous en dehors de la région parisienne ?',
            answer: "Oui. L'Île-de-France est notre zone de prédilection, avec une intervention généralement sous 2 heures, mais nous couvrons l'ensemble des départements français. Hors Île-de-France, comptez 24 à 48 heures selon la commune.",
        },
    ];
    const contactFaqPage = buildFaqPage(contactFaq);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {contactFaqPage && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqPage) }}
                />
            )}
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
                                                href={whatsappUrl('Bonjour, je souhaite obtenir un devis')}
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


                {/* How it works after contacting us */}
                <section className="py-16 md:py-24 border-t border-neutral-200">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">
                                Ce qui se passe après votre appel
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                Nous savons qu&apos;une épave immobilisée devant chez vous, dans un sous-sol de
                                copropriété ou en fourrière est avant tout une contrainte administrative. Notre rôle
                                est de la faire disparaître proprement, sans frais et sans que vous ayez à courir
                                après un document. Voici précisément comment se déroule une intervention, du premier
                                contact jusqu&apos;au certificat de destruction.
                            </p>

                            <ol className="space-y-5 mb-10">
                                <li className="flex gap-4">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-sm">1</span>
                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">Qualification de votre véhicule</h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            Marque, modèle, année, état général, et surtout l&apos;adresse exacte où se
                                            trouve le véhicule. Ces quelques informations suffisent à déterminer si vous
                                            relevez de l&apos;<Link href="/epaviste" className="text-brand-red hover:underline">enlèvement d&apos;épave gratuit</Link>{' '}
                                            ou d&apos;un <Link href="/rachat-voiture" className="text-brand-red hover:underline">rachat de voiture</Link>{' '}
                                            avec paiement immédiat — un véhicule roulant, même sans contrôle technique,
                                            a souvent encore une valeur de reprise.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-sm">2</span>
                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">Choix du créneau</h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            Nous convenons d&apos;une date et d&apos;une plage horaire. En Île-de-France,
                                            une intervention le jour même est fréquente ; ailleurs, comptez 24 à 48 heures.
                                            Si le véhicule est en sous-sol, en box fermé ou en fourrière, dites-le à ce
                                            moment-là : nous adaptons l&apos;équipement (treuil, chariot) et gérons la
                                            coordination avec le gardien ou la fourrière.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-sm">3</span>
                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">Enlèvement et signature</h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            Le jour J, la déclaration de cession pour destruction (Cerfa 15776*02) est
                                            signée sur place. Vous conservez un exemplaire : c&apos;est lui qui met fin à
                                            votre responsabilité de propriétaire et qui vous permet de résilier
                                            l&apos;assurance sans attendre.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-sm">4</span>
                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">Certificat de destruction</h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            Le véhicule est dépollué puis démonté dans un{' '}
                                            <Link href="/conformite-vhu" className="text-brand-red hover:underline">centre VHU agréé</Link>.
                                            Vous recevez le certificat de destruction sous 15 jours, et la carte grise est
                                            annulée dans le fichier national. C&apos;est le seul document qui prouve que le
                                            véhicule est légalement détruit.
                                        </p>
                                    </div>
                                </li>
                            </ol>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                                Les documents à préparer
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-4">
                                Réunir trois documents avant notre passage suffit à éviter tout report d&apos;intervention :
                            </p>
                            <ul className="space-y-2 mb-4 text-neutral-600 leading-relaxed list-disc pl-5">
                                <li>
                                    la <strong className="text-brand-navy">carte grise originale</strong>, barrée avec la
                                    mention « cédé le » suivie de la date, de l&apos;heure et de votre signature ;
                                </li>
                                <li>
                                    une <strong className="text-brand-navy">pièce d&apos;identité</strong> en cours de validité ;
                                </li>
                                <li>
                                    un <strong className="text-brand-navy">certificat de situation administrative</strong>{' '}
                                    (non-gage) de moins de 15 jours, gratuit sur le site de l&apos;ANTS.
                                </li>
                            </ul>
                            <p className="text-neutral-600 leading-relaxed mb-10">
                                Les cas particuliers — véhicule en indivision, succession, carte grise perdue, propriétaire
                                absent le jour de l&apos;enlèvement — sont détaillés sur notre page{' '}
                                <Link href="/documents" className="text-brand-red hover:underline">documents à fournir</Link>,
                                avec les formulaires correspondants. En cas de doute, appelez-nous : il est presque
                                toujours possible de trouver une solution.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                                Où nous intervenons
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-5">
                                Nous couvrons la France entière, avec une présence renforcée en{' '}
                                <Link href="/epaviste/ile-de-france" className="text-brand-red hover:underline">Île-de-France</Link>,
                                où nos équipes interviennent le plus souvent sous deux heures. Choisissez votre département
                                pour voir les communes desservies et les particularités locales (fourrières, accès, zones
                                à circulation restreinte) :
                            </p>
                            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-10">
                                {IDF_DEPARTMENTS.map((dept) => (
                                    <li key={dept.slug}>
                                        <Link
                                            href={`/epaviste/${dept.slug}`}
                                            className="text-neutral-600 hover:text-brand-red transition-colors"
                                        >
                                            Épaviste {dept.name} ({dept.code})
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/zones" className="font-semibold text-brand-navy hover:text-brand-red transition-colors">
                                        Toutes nos zones d&apos;intervention →
                                    </Link>
                                </li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">
                                Questions fréquentes avant de nous contacter
                            </h2>
                            <div className="space-y-5">
                                {contactFaq.map((item) => (
                                    <div key={item.question} className="bg-white rounded-2xl border border-neutral-200 p-6">
                                        <h3 className="font-bold text-brand-navy mb-2">{item.question}</h3>
                                        <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
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

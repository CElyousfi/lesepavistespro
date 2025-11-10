'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CaretDown, Phone, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react';
import Script from 'next/script';
import { getFAQSchema } from '@/lib/schema';

const faqs = [
  {
    question: 'L’enlèvement d’épave est-il vraiment gratuit ?',
    answer: 'Oui, l’enlèvement est 100% gratuit pour tout véhicule complet (avec moteur et éléments essentiels). Aucun frais caché, même si votre véhicule est en sous-sol ou difficile d’accès. C’est la loi française qui impose aux centres VHU agréés d’accepter gratuitement les véhicules hors d’usage.',
  },
  {
    question: 'Quels documents faut-il fournir ?',
    answer: 'Vous devez fournir : la carte grise originale avec la mention "cédé le" + date et signature, un certificat de non-gage de moins de 15 jours, une copie de votre pièce d’identité, et le formulaire Cerfa 15776*02 rempli. Nous vous aidons pour toutes ces démarches.',
  },
  {
    question: 'Puis-je faire enlever une épave sans carte grise ?',
    answer: 'Dans certains cas particuliers (véhicule très ancien, perte de papiers, succession), nous pouvons intervenir. Contactez-nous pour étudier votre situation. Des démarches spécifiques seront nécessaires.',
  },
  {
    question: 'Combien de temps prend l’intervention ?',
    answer: 'Nous intervenons généralement sous 24 à 48h après votre demande. En urgence, nous pouvons intervenir sous 2h en région parisienne. L’enlèvement lui-même prend environ 30 minutes.',
  },
  {
    question: 'Qu’est-ce que la prime à la conversion ?',
    answer: 'C’est une aide gouvernementale pouvant atteindre plusieurs milliers d’euros si vous mettez votre vieille voiture à la casse et achetez un véhicule propre. Nous vous fournissons le certificat de destruction nécessaire pour en bénéficier.',
  },
  {
    question: 'Que devient mon véhicule après l’enlèvement ?',
    answer: 'Votre véhicule est acheminé vers notre centre VHU agréé où il est dépollué (retrait des fluides toxiques), démonté (récupération des pièces réutilisables) et recyclé (jusqu’à 95% du poids). Vous recevez un certificat de destruction officiel sous 15 jours.',
  },
  {
    question: 'Intervenez-vous partout en Île-de-France ?',
    answer: 'Oui, nous couvrons l’intégralité de l’Île-de-France : Paris (75) et les 7 départements (77, 78, 91, 92, 93, 94, 95). Plus de 1 200 communes desservies sans frais supplémentaires.',
  },
  {
    question: 'Puis-je vendre mon épave au lieu de la faire enlever gratuitement ?',
    answer: 'Oui ! Si votre véhicule a encore de la valeur (pièces récupérables, métaux), nous pouvons vous le racheter. Le prix dépend de l’état, du modèle et de l’année. Contactez-nous pour une estimation gratuite.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Title */}
            <div className="lg:sticky lg:top-8">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Vos questions les plus fréquentes
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Si vous avez d'autres questions ou envie d'en parler, n'hésitez pas à nous contacter, 
                nous serions ravis de vous répondre !
              </p>
              
              {/* Illustration */}
              <div className="w-full max-w-sm mb-8 relative aspect-square">
                <Image
                  src="/FAQ.png"
                  alt="Questions fréquentes épaviste"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* CTA Buttons */}
              <div className="space-y-3">
                <a 
                  href="tel:0979049486"
                  className="flex items-center gap-3 px-6 py-4 bg-brand-red hover:bg-brand-red-light text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl w-full"
                >
                  <Phone size={20} weight="bold" />
                  <span>Appelez-nous : 09 79 04 94 86</span>
                </a>
                
                <a 
                  href="https://wa.me/33602427345?text=Bonjour, je souhaite un devis pour l'enlèvement d'une épave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl w-full"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href="mailto:contact@lesepavistespro.fr?subject=Demande d'information&body=Bonjour, je souhaite obtenir des informations sur l'enlèvement d'épave."
                  className="flex items-center gap-3 px-6 py-4 bg-brand-navy hover:bg-brand-blue text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl w-full"
                >
                  <EnvelopeSimple size={20} weight="bold" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Right Column - Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-neutral-50 rounded-2xl border-2 border-neutral-200 overflow-hidden transition-all hover:border-brand-blue hover:shadow-md"
                  open={openIndex === index}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFAQ(index);
                  }}
                >
                  <summary className="px-6 py-5 cursor-pointer list-none flex items-center justify-between">
                    <span className="font-semibold text-neutral-900 pr-4">
                      {faq.question}
                    </span>
                    <CaretDown
                      size={20}
                      weight="bold"
                      className={`text-brand-navy flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </summary>
                  <div className="px-6 pb-6 text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQ;
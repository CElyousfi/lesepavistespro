import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CTASection from '@/components/CTASection';
import { CheckCircle, Warning, FileText, CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import { getBlogArticleData, renderJSONLD, getBreadcrumbData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: "Rachat sans CT en France : Démarches & Légalité",
  description: "Guide complet sur le rachat de voiture sans contrôle technique. Démarches légales, documents nécessaires, prix et conseils d'experts.",
  keywords: ['rachat sans CT', 'voiture sans contrôle technique', 'vente sans CT', 'France'],
  alternates: {
    canonical: 'https://www.lesepavistespro.fr/guides/rachat-sans-ct',
  },
};

export default function RachatSansCTPage() {
  const articleData = getBlogArticleData({
    title: "Rachat sans CT en France : Démarches & Légalité",
    description: "Guide complet sur le rachat de voiture sans contrôle technique. Tout ce qu'il faut savoir sur la légalité, les démarches et les prix.",
    author: 'Les Épavistes Pro',
    publishDate: '2024-11-11',
    url: 'https://www.lesepavistespro.fr/guides/rachat-sans-ct'
  });

  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Guides', url: 'https://www.lesepavistespro.fr/guides/rachat-sans-ct' },
    { name: 'Rachat sans CT', url: 'https://www.lesepavistespro.fr/guides/rachat-sans-ct' },
  ]);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <Script
        id="structured-data-guide-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJSONLD(articleData)}
      />
      
      <Header />
      
      <main className="pt-28 md:pt-32 pb-20 bg-white">
        {/* Hero */}
        <section className="relative bg-white overflow-hidden pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] mb-10">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span className="text-sm font-medium text-brand-navy/70">Guide pratique</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-brand-navy">
                Rachat sans CT en France
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                Démarches, légalité et conseils pour vendre votre voiture sans contrôle technique
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              <h2>Est-il légal de vendre une voiture sans CT ?</h2>
              <p>
                <strong>Oui, c'est parfaitement légal</strong> de vendre une voiture sans contrôle technique valide en France, 
                mais sous certaines conditions importantes :
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 not-prose">
                <div className="flex gap-4">
                  <CheckCircle size={24} weight="bold" className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Vente légale sans CT si :</h3>
                    <ul className="text-green-800 space-y-2">
                      <li>✅ Vente à un professionnel de l'automobile</li>
                      <li>✅ Vente pour destruction (épaviste agréé VHU)</li>
                      <li>✅ Vente pour pièces détachées</li>
                      <li>✅ Véhicule de collection (+ de 30 ans)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 not-prose">
                <div className="flex gap-4">
                  <Warning size={24} weight="bold" className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">Vente INTERDITE sans CT si :</h3>
                    <ul className="text-red-800 space-y-2">
                      <li>❌ Vente à un particulier pour usage routier</li>
                      <li>❌ CT expiré depuis plus de 6 mois</li>
                      <li>❌ Contre-visite refusée non régularisée</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2>Documents nécessaires pour la vente sans CT</h2>
              <p>Pour vendre légalement votre voiture sans contrôle technique à un professionnel :</p>

              <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                  <FileText size={32} weight="fill" className="text-brand-red mb-3" />
                  <h3 className="font-bold text-brand-navy mb-2">Documents obligatoires</h3>
                  <ul className="text-neutral-700 space-y-2 text-sm">
                    <li>• Carte grise (certificat d'immatriculation)</li>
                    <li>• Certificat de situation administrative (non-gage)</li>
                    <li>• Pièce d'identité valide</li>
                    <li>• Déclaration de cession (Cerfa 15776*02)</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                  <Warning size={32} weight="fill" className="text-brand-gold mb-3" />
                  <h3 className="font-bold text-brand-navy mb-2">Mentions obligatoires</h3>
                  <ul className="text-neutral-700 space-y-2 text-sm">
                    <li>• "Vendu sans contrôle technique"</li>
                    <li>• "Vendu pour destruction" ou "pour pièces"</li>
                    <li>• Date et signature du vendeur</li>
                    <li>• Barrer la carte grise</li>
                  </ul>
                </div>
              </div>

              <h2>Prix de rachat sans CT : à quoi s'attendre ?</h2>
              <p>
                Le prix de rachat d'une voiture sans CT dépend de plusieurs facteurs :
              </p>

              <div className="bg-brand-blue/5 p-6 rounded-xl my-6 not-prose">
                <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <CurrencyEur size={24} weight="bold" />
                  Facteurs influençant le prix
                </h3>
                <div className="space-y-3 text-neutral-700">
                  <div>
                    <strong className="text-brand-navy">État général du véhicule :</strong>
                    <p className="text-sm mt-1">Carrosserie, intérieur, pneus, vitres</p>
                  </div>
                  <div>
                    <strong className="text-brand-navy">Pièces récupérables :</strong>
                    <p className="text-sm mt-1">Moteur, boîte, optiques, sièges, électronique</p>
                  </div>
                  <div>
                    <strong className="text-brand-navy">Marque et modèle :</strong>
                    <p className="text-sm mt-1">Demande en pièces détachées sur le marché</p>
                  </div>
                  <div>
                    <strong className="text-brand-navy">Poids et métaux :</strong>
                    <p className="text-sm mt-1">Valeur de l'acier, aluminium, cuivre</p>
                  </div>
                </div>
              </div>

              <h2>Démarches étape par étape</h2>
              
              <div className="space-y-4 my-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-2">Contactez-nous</h3>
                    <p className="text-neutral-700">
                      Appelez le <strong>09 79 04 94 86</strong> ou envoyez un message WhatsApp avec les informations de votre véhicule 
                      (marque, modèle, année, état, photos si possible).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-2">Estimation gratuite</h3>
                    <p className="text-neutral-700">
                      Nous évaluons votre véhicule et vous proposons un prix de rachat immédiat, sans engagement. 
                      Estimation transparente basée sur l'état réel.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-2">Paiement et enlèvement</h3>
                    <p className="text-neutral-700">
                      Si vous acceptez notre offre, nous venons chercher votre véhicule à domicile et vous payons immédiatement 
                      (espèces, chèque ou virement selon votre préférence).
                    </p>
                  </div>
                </div>
              </div>

              <h2>Pourquoi choisir Les Épavistes Pro ?</h2>
              
              <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <CheckCircle size={48} weight="fill" className="text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-brand-navy mb-2">100% Légal</h3>
                  <p className="text-sm text-neutral-600">Professionnel agréé, toutes démarches conformes</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <CurrencyEur size={48} weight="fill" className="text-brand-gold mx-auto mb-3" />
                  <h3 className="font-bold text-brand-navy mb-2">Meilleur Prix</h3>
                  <p className="text-sm text-neutral-600">Estimation juste et paiement immédiat</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <FileText size={48} weight="fill" className="text-brand-red mx-auto mb-3" />
                  <h3 className="font-bold text-brand-navy mb-2">Sans Tracas</h3>
                  <p className="text-sm text-neutral-600">On s'occupe de tout, enlèvement gratuit</p>
                </div>
              </div>

              <h2>Questions fréquentes</h2>
              
              <div className="space-y-4 my-6">
                <details className="bg-brand-surface p-6 rounded-2xl">
                  <summary className="font-bold text-brand-navy cursor-pointer">
                    Puis-je vendre ma voiture avec un CT refusé ?
                  </summary>
                  <p className="mt-3 text-neutral-700">
                    Oui, vous pouvez vendre votre voiture même avec une contre-visite refusée, mais uniquement à un professionnel 
                    (épaviste, casse auto, garage). La vente à un particulier est interdite.
                  </p>
                </details>

                <details className="bg-brand-surface p-6 rounded-2xl">
                  <summary className="font-bold text-brand-navy cursor-pointer">
                    Quel est le délai pour vendre sans CT ?
                  </summary>
                  <p className="mt-3 text-neutral-700">
                    Vous pouvez vendre immédiatement. Nous intervenons sous 24-48h partout en France. 
                    Estimation et paiement le jour même de l'enlèvement.
                  </p>
                </details>

                <details className="bg-brand-surface p-6 rounded-2xl">
                  <summary className="font-bold text-brand-navy cursor-pointer">
                    Que devient ma voiture après la vente ?
                  </summary>
                  <p className="mt-3 text-neutral-700">
                    Selon l'état, elle est soit démontée pour récupérer les pièces réutilisables, soit envoyée en centre VHU agréé 
                    pour dépollution et recyclage. Vous recevez un certificat de destruction si nécessaire.
                  </p>
                </details>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

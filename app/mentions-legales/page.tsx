import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site Les Épavistes Pro - Épaviste agréé VHU en Île-de-France.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden pt-32 md:pt-36 pb-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-neutral-600">
              Informations légales concernant le site lesepavistespro.fr
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* 1. Éditeur du site */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Éditeur du site</h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-3">
                    Le site <strong>lesepavistespro.fr</strong> est édité par :
                  </p>
                  <ul className="list-none space-y-2 ml-0">
                    <li><strong>Raison sociale :</strong> Les Épavistes Pro</li>
                    <li><strong>Forme juridique :</strong> SARL (Société à Responsabilité Limitée)</li>
                    <li><strong>Capital social :</strong> 10 000 €</li>
                    <li><strong>Siège social :</strong> Île-de-France, France</li>
                    <li><strong>SIRET :</strong> [À compléter]</li>
                    <li><strong>TVA intracommunautaire :</strong> [À compléter]</li>
                    <li><strong>Téléphone :</strong> <a href="tel:0979049486" className="text-brand-red hover:underline">09 79 04 94 86</a></li>
                    <li><strong>Email :</strong> <a href="mailto:contact@lesepavistespro.fr" className="text-brand-red hover:underline">contact@lesepavistespro.fr</a></li>
                  </ul>
                </div>
              </div>

              {/* 2. Directeur de la publication */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Directeur de la publication</h2>
                <p className="text-neutral-700">
                  Le directeur de la publication du site est le représentant légal de la société Les Épavistes Pro.
                </p>
              </div>

              {/* 3. Hébergement */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Hébergement du site</h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-3">Le site est hébergé par :</p>
                  <ul className="list-none space-y-2 ml-0">
                    <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                    <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                    <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">https://vercel.com</a></li>
                  </ul>
                </div>
              </div>

              {/* 4. Propriété intellectuelle */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Propriété intellectuelle</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de Les Épavistes Pro, sauf mention contraire.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Les Épavistes Pro.
                  </p>
                  <p>
                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                  </p>
                </div>
              </div>

              {/* 5. Données personnelles */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Protection des données personnelles</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                  </p>
                  <p>
                    Pour exercer ces droits, vous pouvez nous contacter :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Par email : <a href="mailto:contact@lesepavistespro.fr" className="text-brand-red hover:underline">contact@lesepavistespro.fr</a></li>
                    <li>Par téléphone : <a href="tel:0979049486" className="text-brand-red hover:underline">09 79 04 94 86</a></li>
                  </ul>
                  <p className="mt-4">
                    Pour plus d'informations, consultez notre{' '}
                    <Link href="/politique-de-confidentialite" className="text-brand-red hover:underline font-semibold">
                      Politique de confidentialité
                    </Link>.
                  </p>
                </div>
              </div>

              {/* 6. Cookies */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Cookies</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic via Google Analytics.
                  </p>
                  <p>
                    Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. Cependant, cela peut affecter certaines fonctionnalités du site.
                  </p>
                </div>
              </div>

              {/* 7. Responsabilité */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Limitation de responsabilité</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Les Épavistes Pro s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
                  </p>
                  <p>
                    Toutefois, Les Épavistes Pro ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                  </p>
                  <p>
                    En conséquence, Les Épavistes Pro décline toute responsabilité :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site</li>
                    <li>Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site</li>
                    <li>Pour tous dommages directs ou indirects, quelles qu'en soient les causes, origines, natures ou conséquences, provoqués à raison de l'accès de quiconque au site ou de l'impossibilité d'y accéder</li>
                  </ul>
                </div>
              </div>

              {/* 8. Liens hypertextes */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">8. Liens hypertextes</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Le site peut contenir des liens hypertextes vers d'autres sites. Les Épavistes Pro n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                  </p>
                  <p>
                    La création de liens hypertextes vers le site lesepavistespro.fr nécessite l'autorisation préalable écrite de Les Épavistes Pro.
                  </p>
                </div>
              </div>

              {/* 9. Droit applicable */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">9. Droit applicable et juridiction</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Les présentes mentions légales sont régies par le droit français.
                  </p>
                  <p>
                    En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                  </p>
                </div>
              </div>

              {/* 10. Contact */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">10. Contact</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                  </p>
                  <div className="bg-neutral-50 rounded-xl p-6 mt-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">Téléphone :</span>
                        <a href="tel:0979049486" className="text-brand-red hover:underline">09 79 04 94 86</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">Email :</span>
                        <a href="mailto:contact@lesepavistespro.fr" className="text-brand-red hover:underline">contact@lesepavistespro.fr</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">WhatsApp :</span>
                        <a href="https://wa.me/33602427345" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">+33 6 02 42 73 45</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">Horaires :</span>
                        <span>24h/24, 7j/7</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Date de mise à jour */}
              <div className="pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  <strong>Dernière mise à jour :</strong> Novembre 2024
                </p>
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

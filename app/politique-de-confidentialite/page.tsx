import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles - Les Épavistes Pro.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden pt-32 md:pt-36 pb-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-neutral-600">
              Protection de vos données personnelles sur lesepavistespro.fr
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* Introduction */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">Introduction</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Les Épavistes Pro accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, stockons et protégeons vos données conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                  </p>
                  <p>
                    En utilisant notre site web <strong>lesepavistespro.fr</strong>, vous acceptez les pratiques décrites dans cette politique.
                  </p>
                </div>
              </div>

              {/* 1. Responsable du traitement */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Responsable du traitement des données</h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-3">
                    Le responsable du traitement de vos données personnelles est :
                  </p>
                  <ul className="list-none space-y-2 ml-0">
                    <li><strong>Raison sociale :</strong> Les Épavistes Pro</li>
                    <li><strong>Adresse :</strong> Île-de-France, France</li>
                    <li><strong>Téléphone :</strong> <a href="tel:0979049486" className="text-brand-red hover:underline">09 79 04 94 86</a></li>
                    <li><strong>Email :</strong> <a href="mailto:contact@lesepavistespro.fr" className="text-brand-red hover:underline">contact@lesepavistespro.fr</a></li>
                  </ul>
                </div>
              </div>

              {/* 2. Données collectées */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Données personnelles collectées</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Nous collectons les données personnelles suivantes :
                  </p>
                  
                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">2.1. Données fournies directement</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Formulaire de contact / Devis :</strong> Nom, prénom, téléphone, email, adresse, informations sur le véhicule</li>
                    <li><strong>Newsletter :</strong> Adresse email</li>
                    <li><strong>Appels téléphoniques :</strong> Numéro de téléphone, informations communiquées lors de l'appel</li>
                    <li><strong>Messages WhatsApp :</strong> Numéro de téléphone, contenu des messages</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">2.2. Données collectées automatiquement</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées, durée de visite</li>
                    <li><strong>Cookies :</strong> Cookies de session, cookies analytiques (Google Analytics)</li>
                    <li><strong>Données techniques :</strong> Type d'appareil, système d'exploitation, résolution d'écran</li>
                  </ul>
                </div>
              </div>

              {/* 3. Finalités du traitement */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Finalités du traitement</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Gestion des demandes de devis :</strong> Traiter vos demandes d'enlèvement d'épave ou de rachat de véhicule</li>
                    <li><strong>Communication :</strong> Vous contacter pour répondre à vos questions et confirmer les rendez-vous</li>
                    <li><strong>Newsletter :</strong> Vous envoyer des informations sur nos services (avec votre consentement)</li>
                    <li><strong>Amélioration du site :</strong> Analyser l'utilisation du site pour améliorer l'expérience utilisateur</li>
                    <li><strong>Obligations légales :</strong> Respecter nos obligations légales et réglementaires</li>
                    <li><strong>Statistiques :</strong> Mesurer l'audience et les performances du site via Google Analytics</li>
                  </ul>
                </div>
              </div>

              {/* 4. Base légale */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Base légale du traitement</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Le traitement de vos données repose sur les bases légales suivantes :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Exécution d'un contrat :</strong> Traitement de votre demande de service</li>
                    <li><strong>Consentement :</strong> Inscription à la newsletter, cookies analytiques</li>
                    <li><strong>Intérêt légitime :</strong> Amélioration de nos services, sécurité du site</li>
                    <li><strong>Obligation légale :</strong> Conservation des données pour obligations fiscales et comptables</li>
                  </ul>
                </div>
              </div>

              {/* 5. Destinataires des données */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Destinataires des données</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Vos données personnelles sont destinées aux personnes suivantes :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Personnel autorisé :</strong> Équipe Les Épavistes Pro (service commercial, service client)</li>
                    <li><strong>Prestataires techniques :</strong> Hébergeur web (Vercel), service d'emailing</li>
                    <li><strong>Outils d'analyse :</strong> Google Analytics (données anonymisées)</li>
                    <li><strong>Sous-traitants :</strong> Partenaires pour l'enlèvement et le traitement des véhicules</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Important :</strong> Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins commerciales.
                  </p>
                </div>
              </div>

              {/* 6. Durée de conservation */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">6. Durée de conservation des données</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Vos données sont conservées pendant les durées suivantes :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Demandes de devis :</strong> 3 ans à compter de la dernière interaction</li>
                    <li><strong>Clients :</strong> 10 ans (obligations comptables et fiscales)</li>
                    <li><strong>Newsletter :</strong> Jusqu'à désinscription ou 3 ans d'inactivité</li>
                    <li><strong>Cookies analytiques :</strong> 13 mois maximum</li>
                    <li><strong>Logs de connexion :</strong> 12 mois</li>
                  </ul>
                  <p className="mt-4">
                    À l'issue de ces durées, vos données sont supprimées ou anonymisées.
                  </p>
                </div>
              </div>

              {/* 7. Vos droits */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">7. Vos droits sur vos données</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  
                  <div className="bg-neutral-50 rounded-xl p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit d'accès</h4>
                      <p className="text-sm">Obtenir une copie de vos données personnelles</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit de rectification</h4>
                      <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit à l'effacement</h4>
                      <p className="text-sm">Demander la suppression de vos données (sous conditions)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit d'opposition</h4>
                      <p className="text-sm">Vous opposer au traitement de vos données (marketing, profilage)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit à la limitation</h4>
                      <p className="text-sm">Limiter le traitement de vos données dans certains cas</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit à la portabilité</h4>
                      <p className="text-sm">Recevoir vos données dans un format structuré</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">✓ Droit de retirer votre consentement</h4>
                      <p className="text-sm">Retirer votre consentement à tout moment (newsletter, cookies)</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">Comment exercer vos droits ?</h3>
                  <p>
                    Pour exercer vos droits, contactez-nous :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Par email : <a href="mailto:contact@lesepavistespro.fr" className="text-brand-red hover:underline">contact@lesepavistespro.fr</a></li>
                    <li>Par téléphone : <a href="tel:0979049486" className="text-brand-red hover:underline">09 79 04 94 86</a></li>
                    <li>Par courrier : Les Épavistes Pro, Île-de-France, France</li>
                  </ul>
                  <p className="mt-4">
                    Nous nous engageons à répondre à votre demande dans un délai d'<strong>un mois</strong> maximum.
                  </p>
                  <p className="mt-4 text-sm bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <strong>Note :</strong> Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
                  </p>
                </div>
              </div>

              {/* 8. Cookies */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">8. Utilisation des cookies</h2>
                <div className="text-neutral-700 space-y-4">
                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">Qu'est-ce qu'un cookie ?</h3>
                  <p>
                    Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations sur votre navigation.
                  </p>

                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">Types de cookies utilisés</h3>
                  <div className="space-y-4">
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">🔹 Cookies essentiels (obligatoires)</h4>
                      <p className="text-sm">Nécessaires au fonctionnement du site (session, sécurité)</p>
                      <p className="text-sm text-neutral-600 mt-1">Durée : Session</p>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">📊 Cookies analytiques (Google Analytics)</h4>
                      <p className="text-sm">Mesure d'audience et statistiques de visite</p>
                      <p className="text-sm text-neutral-600 mt-1">Durée : 13 mois</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">Gestion des cookies</h3>
                  <p>
                    Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                    <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                    <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                    <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                  </ul>
                  <p className="mt-4 text-sm text-neutral-600">
                    <strong>Note :</strong> La désactivation des cookies peut affecter certaines fonctionnalités du site.
                  </p>
                </div>
              </div>

              {/* 9. Sécurité */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">9. Sécurité des données</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>La destruction accidentelle ou illicite</li>
                    <li>La perte accidentelle</li>
                    <li>L'altération, la diffusion ou l'accès non autorisés</li>
                    <li>Toute autre forme de traitement illicite</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Mesures de sécurité mises en place :</strong>
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Protocole HTTPS (chiffrement SSL/TLS)</li>
                    <li>Hébergement sécurisé (Vercel)</li>
                    <li>Accès restreint aux données (personnel autorisé uniquement)</li>
                    <li>Sauvegardes régulières</li>
                    <li>Mises à jour de sécurité régulières</li>
                  </ul>
                </div>
              </div>

              {/* 10. Transfert de données */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">10. Transfert de données hors UE</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Certains de nos prestataires (Google Analytics, Vercel) peuvent être situés hors de l'Union Européenne.
                  </p>
                  <p>
                    Dans ce cas, nous nous assurons que :
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Le pays bénéficie d'une décision d'adéquation de la Commission Européenne</li>
                    <li>Ou que des garanties appropriées sont mises en place (clauses contractuelles types)</li>
                  </ul>
                </div>
              </div>

              {/* 11. Mineurs */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">11. Protection des mineurs</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Notre site n'est pas destiné aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles concernant des mineurs.
                  </p>
                  <p>
                    Si vous êtes parent ou tuteur légal et que vous découvrez que votre enfant nous a fourni des données personnelles, contactez-nous pour que nous puissions les supprimer.
                  </p>
                </div>
              </div>

              {/* 12. Modifications */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">12. Modifications de la politique</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page.
                  </p>
                  <p>
                    Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
                  </p>
                  <p>
                    En cas de modification substantielle, nous vous en informerons par email (si vous êtes inscrit à notre newsletter) ou par un avis sur notre site.
                  </p>
                </div>
              </div>

              {/* 13. Contact */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">13. Nous contacter</h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous :
                  </p>
                  <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-xl p-6 mt-4 text-white">
                    <h3 className="text-xl font-bold mb-4">Les Épavistes Pro</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">📞 Téléphone :</span>
                        <a href="tel:0979049486" className="hover:text-brand-red transition-colors">09 79 04 94 86</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">📧 Email :</span>
                        <a href="mailto:contact@lesepavistespro.fr" className="hover:text-brand-red transition-colors">contact@lesepavistespro.fr</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">💬 WhatsApp :</span>
                        <a href="https://wa.me/33602427345" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">+33 6 02 42 73 45</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="font-semibold min-w-[100px]">🕐 Disponibilité :</span>
                        <span>24h/24, 7j/7</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Date de mise à jour */}
              <div className="pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 mb-4">
                  <strong>Dernière mise à jour :</strong> Novembre 2024
                </p>
                <p className="text-sm text-neutral-600">
                  Consultez également nos{' '}
                  <Link href="/mentions-legales" className="text-brand-red hover:underline font-semibold">
                    Mentions Légales
                  </Link>
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

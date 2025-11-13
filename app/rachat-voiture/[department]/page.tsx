import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getDepartmentBySlug, allDepartments } from '@/lib/locations-complete';
import { Phone, WhatsappLogo, CheckCircle, CurrencyEur, Shield, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import ConversionForm from '@/components/ConversionForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import type { Metadata } from 'next';
import { getDepartmentLocalBusiness, getBreadcrumbData } from '@/lib/structured-data';
import { generateRachatDepartmentMeta } from '@/lib/seo';

export async function generateStaticParams() {
  return allDepartments.map((dept) => ({
    department: dept.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ department: string }> }): Promise<Metadata> {
  const { department } = await params;
  const dept = getDepartmentBySlug(department);
  
  if (!dept) {
    return {
      title: 'Page non trouvée',
    };
  }

  return generateRachatDepartmentMeta(dept.name, dept.slug);
}

export default async function DepartmentRachatPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const dept = getDepartmentBySlug(department);

  if (!dept) {
    notFound();
  }

  const localBusinessData = getDepartmentLocalBusiness(
    dept.code,
    `${dept.name} (${dept.code})`,
    `https://www.lesepavistespro.fr/rachat-voiture/${dept.slug}/`
  );

  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr/' },
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
    { name: `${dept.name}`, url: `https://www.lesepavistespro.fr/rachat-voiture/${dept.slug}` },
  ]);

  const structuredData = [localBusinessData, breadcrumbData];

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id={`department-rachat-${dept.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95"></div>
        
        <div className="container mx-auto px-[5%] relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="text-brand-gold font-semibold text-sm">
                Rachat cash dans le {dept.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rachat Voiture {dept.name} ({dept.code})
              <span className="block text-brand-gold mt-2">Paiement Immédiat</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
              Rachat de voiture dans tout le département {dept.name} ({dept.code}). 
              Nous achetons tous véhicules : HS, accidentés, en panne, sans CT. 
              Paiement cash immédiat au meilleur prix.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:0979049486" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <Phone size={20} weight="bold" />
                09 79 04 94 86
              </a>
              <a 
                href={`https://wa.me/33602427345?text=Bonjour, je souhaite vendre ma voiture dans le ${dept.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <WhatsappLogo size={20} weight="fill" />
                Estimation WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CurrencyEur size={20} weight="bold" className="text-brand-gold" />
                <span>Paiement Cash</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} weight="bold" className="text-brand-gold" />
                <span>Estimation Gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} weight="bold" className="text-brand-gold" />
                <span>Meilleur Prix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Rachat de voiture dans le {dept.name}
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="mb-4">
                Vous souhaitez vendre rapidement votre voiture dans le département {dept.name} ({dept.code}) ? 
                Nous rachetons tous types de véhicules au meilleur prix : voitures d'occasion, véhicules accidentés, 
                voitures en panne, épaves, véhicules sans contrôle technique, etc.
              </p>
              <p className="mb-4">
                Notre service de rachat de voiture vous garantit une estimation gratuite et transparente, 
                un paiement immédiat (espèces, chèque ou virement) et l'enlèvement gratuit de votre véhicule 
                partout dans le {dept.name}.
              </p>
              <p>
                Que votre voiture soit roulante ou non, récente ou ancienne, nous vous proposons le meilleur prix 
                en fonction de son état, de sa marque, de son modèle et de la demande en pièces détachées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Nous rachetons tous types de véhicules
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures accidentées
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules accidentés, même gravement endommagés. Nous évaluons les pièces récupérables.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures en panne
                </h3>
                <p className="text-neutral-600">
                  Achat de voitures HS, avec problème moteur, boîte de vitesse ou tout autre panne mécanique.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Voitures sans CT
                </h3>
                <p className="text-neutral-600">
                  Rachat de véhicules sans contrôle technique valide, même avec contre-visite refusée.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} weight="bold" className="text-brand-gold" />
                  Épaves et véhicules anciens
                </h3>
                <p className="text-neutral-600">
                  Achat d'épaves et de vieilles voitures, même non roulantes. Paiement selon l'état et les pièces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Rachat de voiture dans toutes les villes du {dept.name}
              </h2>
              <p className="text-lg text-neutral-600">
                Service de rachat disponible dans tout le département {dept.code}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dept.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/rachat-voiture/${dept.slug}/${city.slug}`}
                  className="flex items-center gap-2 p-4 bg-neutral-50 rounded-xl border-2 border-neutral-200 hover:border-brand-gold hover:shadow-md transition-all group"
                >
                  <MapPin size={20} weight="bold" className="text-brand-gold flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 group-hover:text-brand-gold transition-colors truncate">
                      {city.name}
                    </div>
                    <div className="text-sm text-neutral-500">{city.postalCode}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Comment ça marche ?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Contactez-nous</h3>
                  <p className="text-neutral-600">
                    Appelez-nous au 09 79 04 94 86 ou envoyez-nous un message WhatsApp avec les informations de votre véhicule.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Estimation gratuite</h3>
                  <p className="text-neutral-600">
                    Nous évaluons votre véhicule et vous proposons un prix d'achat immédiat, sans engagement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2">Paiement et enlèvement</h3>
                  <p className="text-neutral-600">
                    Si vous acceptez notre offre, nous venons chercher votre véhicule et vous payons immédiatement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Form Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Obtenez votre estimation gratuite
              </h2>
              <p className="text-lg text-neutral-600">
                Remplissez le formulaire • Paiement cash immédiat • Meilleur prix garanti
              </p>
            </div>
            <ConversionForm trigger="inline" defaultService="rachat" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </>
  );
}

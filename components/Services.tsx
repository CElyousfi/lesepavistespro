import { Truck, Euro, Shield, Recycle, FileCheck, Clock } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Enlèvement d’épave gratuit',
    description: 'Service 100% gratuit pour tous types de véhicules : voitures, motos, scooters, utilitaires. Aucun frais caché, même en sous-sol.',
  },
  {
    icon: Euro,
    title: 'Rachat de véhicule cash',
    description: 'Nous rachetons votre véhicule HS, accidenté ou en panne au meilleur prix. Paiement immédiat par chèque, espèces ou virement.',
  },
  {
    icon: Shield,
    title: 'Centre VHU agréé',
    description: 'Agrément préfecture officiel. Dépollution et recyclage aux normes européennes. Jusqu’à 95% du véhicule valorisé.',
  },
  {
    icon: FileCheck,
    title: 'Démarches administratives',
    description: 'Nous gérons tout : certificat de destruction, déclaration préfecture, aide au certificat de non-gage. Zéro paperasse pour vous.',
  },
  {
    icon: Clock,
    title: 'Intervention rapide 7j/7',
    description: 'Disponibles 7 jours sur 7, de 8h à 21h. Intervention sous 24h partout en Île-de-France. Urgence possible sous 2h.',
  },
  {
    icon: Recycle,
    title: 'Prime à la conversion',
    description: 'Conseils et accompagnement pour bénéficier de la prime gouvernementale. Attestation de destruction fournie.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header - Clean and minimal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Nos experts au service de votre trésorerie
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Un service complet pour vous débarrasser de votre véhicule hors d'usage en toute légalité et simplicité.
          </p>
        </div>

        {/* Services Grid - Clean white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                {/* Icon - Minimal circle */}
                <div className="w-14 h-14 rounded-full bg-accent-purple/10 flex items-center justify-center mb-6 group-hover:bg-accent-purple transition-all duration-300">
                  <Icon className="h-6 w-6 text-accent-purple group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
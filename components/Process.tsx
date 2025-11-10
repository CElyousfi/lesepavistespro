import { Phone, Truck, Leaf } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Appelez-nous',
    description: 'Contactez-nous par téléphone ou formulaire. Nous prenons rendez-vous selon vos disponibilités. Devis gratuit et sans engagement.',
  },
  {
    icon: Truck,
    number: '02',
    title: 'Récupération de l’épave',
    description: 'Nos épavistes viennent avec une dépanneuse. Nous récupérons les documents nécessaires et vous remettons le certificat de cession pour destruction.',
  },
  {
    icon: Leaf,
    number: '03',
    title: 'Dépollution & Recyclage',
    description: 'Votre véhicule est acheminé vers notre centre VHU agréé. Dépollution complète et recyclage aux normes. Certificat de destruction sous 15 jours.',
  },
];

const Process = () => {
  return (
    <section id="comment-ca-marche" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D3250] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600">
            Un processus simple et rapide en 3 étapes pour vous débarrasser de votre épave en toute sérénité.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#9B9FE8] via-[#7077A1] to-[#9B9FE8] -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2D3250] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Icon className="h-10 w-10 text-[#9B9FE8]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#2D3250] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
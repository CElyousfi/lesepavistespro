import { Users, TrendingUp, Euro, Leaf } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '+250',
    label: 'Clients satisfaits',
    description: 'Nous font déjà confiance',
  },
  {
    icon: TrendingUp,
    value: '100%',
    label: 'Satisfaction',
    description: 'Service de qualité garanti',
  },
  {
    icon: Euro,
    value: '+1M€',
    label: 'Économies réalisées',
    description: 'Pour nos clients',
  },
  {
    icon: Leaf,
    value: '95%',
    label: 'Recyclage',
    description: 'Du véhicule valorisé',
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2D3250] to-[#424769] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nos résultats parlent d'eux-mêmes
          </h2>
          <p className="text-lg text-gray-200">
            Des chiffres qui témoignent de notre expertise et de notre engagement envers nos clients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-[#9B9FE8]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#9B9FE8]">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
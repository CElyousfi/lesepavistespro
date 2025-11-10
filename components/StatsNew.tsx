const stats = [
  {
    prefix: '+',
    number: '1500',
    suffix: '',
    label: 'Véhicules enlevés',
  },
  {
    prefix: '',
    number: '100',
    suffix: '%',
    label: 'Gratuit et sans frais cachés',
  },
  {
    prefix: '+',
    number: '500',
    suffix: 'K€',
    label: 'Versés à nos clients',
  },
];

const StatsNew = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-[5%]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="content">
              <div className="heading-wrapper mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
                  Nos résultats
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Des résultats immédiats. Un service professionnel sur le long terme.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Chez Les Épavistes Pro, nos interventions génèrent des résultats concrets et mesurables : 
                  enlèvements gratuits, rachats au meilleur prix, certificats de destruction rapides... 
                  autant de services que nous assurons pour nos clients en Île-de-France.
                </p>
              </div>

              {/* Key Numbers */}
              <ul className="space-y-6">
                {stats.map((stat, index) => (
                  <li key={index} className="border-l-4 border-brand-red pl-6">
                    <div className="flex items-baseline gap-1 mb-2">
                      {stat.prefix && (
                        <span className="text-4xl md:text-5xl font-bold text-brand-red">
                          {stat.prefix}
                        </span>
                      )}
                      <span className="text-4xl md:text-5xl font-bold text-brand-red">
                        {stat.number}
                      </span>
                      {stat.suffix && (
                        <span className="text-4xl md:text-5xl font-bold text-brand-red">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-700 font-medium">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side - Image */}
            <div className="img-wrapper">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center">
                  <span className="text-neutral-400">Image placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsNew;

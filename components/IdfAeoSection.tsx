'use client';

import { getAeoBlocks, type AeoBlock } from '@/data/idf-aeo-content';

interface IdfAeoSectionProps {
  /** Clusters à afficher. Si vide, affiche tout. */
  clusters?: AeoBlock['cluster'][];
  service?: 'epaviste' | 'rachat';
  className?: string;
}

/**
 * Section AEO/GEO — affiche des blocs question/réponse extractibles par les
 * moteurs IA (Google AI Overviews, Perplexity, ChatGPT).
 * Chaque bloc est rendu en <article><h3>/<p> pour maximiser l'extraction.
 */
export default function IdfAeoSection({
  clusters,
  service = 'epaviste',
  className = '',
}: IdfAeoSectionProps) {
  // Pour le service rachat, on exclut les clusters trop spécifiques à l'épaviste
  const activeClusters = clusters ?? (service === 'rachat'
    ? ['eligibilite', 'comparaison', 'cas-particuliers'] as AeoBlock['cluster'][]
    : undefined);

  const blocks = getAeoBlocks(activeClusters);

  if (blocks.length === 0) return null;

  const isGold = service === 'rachat';
  const accentCls = isGold ? 'text-brand-gold' : 'text-brand-red';
  const borderCls = isGold ? 'border-brand-gold/20' : 'border-brand-red/20';
  const bgCls    = isGold ? 'bg-brand-gold/5' : 'bg-brand-red/5';

  // Regrouper par cluster pour afficher des sous-titres
  const clusterLabels: Record<AeoBlock['cluster'], string> = {
    'eligibilite': 'Éligibilité & documents',
    'comparaison': 'Épaviste vs fourrière vs casse',
    'zfe': 'ZFE-m & réglementation 2026',
    'recyclage': 'Devenir du véhicule',
    'cas-particuliers': 'Cas particuliers',
    'responsabilite': 'Responsabilité légale',
  };

  const grouped = blocks.reduce<Partial<Record<AeoBlock['cluster'], AeoBlock[]>>>((acc, block) => {
    if (!acc[block.cluster]) acc[block.cluster] = [];
    acc[block.cluster]!.push(block);
    return acc;
  }, {});

  return (
    <section className={`py-16 sm:py-24 bg-white border-y border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className={`${accentCls} font-semibold tracking-wider uppercase text-sm mb-4 block`}>
            Questions fréquentes — cas particuliers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-4 leading-tight tracking-tight">
            Toutes vos questions sur l&apos;enlèvement d&apos;épave en Île-de-France
          </h2>
          <p className="text-neutral-600 text-lg mb-12">
            Des situations complexes aux cas courants — nos réponses directes pour chaque contexte.
          </p>

          <div className="space-y-14">
            {(Object.entries(grouped) as [AeoBlock['cluster'], AeoBlock[]][]).map(([cluster, items]) => (
              <div key={cluster}>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${bgCls} ${accentCls} border ${borderCls}`}>
                  {clusterLabels[cluster]}
                </div>
                <div className="space-y-8">
                  {items.map((block, i) => (
                    <article
                      key={i}
                      className="border-l-2 border-neutral-200 pl-6 hover:border-brand-red/40 transition-colors"
                    >
                      {/* h3 extractible par les moteurs IA */}
                      <h3 className="text-lg font-bold text-brand-navy mb-3 leading-snug">
                        {block.question}
                      </h3>
                      {/* 1ère phrase = réponse directe extractible */}
                      <p className="text-neutral-600 text-base leading-relaxed">
                        {block.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA contextuel */}
          <div className="mt-12 p-6 bg-brand-surface rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-brand-navy mb-1">Votre situation n&apos;est pas listée ci-dessus ?</p>
              <p className="text-sm text-neutral-600">Appelez-nous — nous traitons tous les cas, même les plus complexes.</p>
            </div>
            <a
              href="tel:0979049486"
              className={`shrink-0 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-[1.02] ${isGold ? 'bg-brand-gold hover:bg-brand-gold/90' : 'bg-brand-red hover:bg-brand-red/90'}`}
            >
              09 79 04 94 86
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

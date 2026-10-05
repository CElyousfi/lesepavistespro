import type { GscAnswer as GscAnswerData } from '@/lib/gsc-answer';

/**
 * The H2 that answers a page's top Search Console query (S3.1.c) — server
 * component, rendered only on the T1 pages listed in data/gsc-actions.ts.
 */
export default function GscAnswer({ answer, className = '' }: { answer: GscAnswerData; className?: string }) {
  return (
    <section className={className} data-gsc-answer={answer.query}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight tracking-tight">{answer.h2}</h2>
      <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
        {answer.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

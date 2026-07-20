import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'Cette page n\'existe pas. Retrouvez nos services d\'épaviste et de rachat voiture.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-semibold">
          Erreur 404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
          Page introuvable
        </h1>

        <p className="text-neutral-500 text-lg leading-relaxed">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Pas de panique, nos services restent disponibles&nbsp;!
        </p>

        {/* Action links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/epaviste"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-red text-white font-semibold hover:bg-brand-red/90 transition-colors text-center"
          >
            Enlèvement d&apos;épave
          </Link>
          <Link
            href="/rachat-voiture"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-200 text-brand-navy font-semibold hover:bg-neutral-50 transition-colors text-center"
          >
            Rachat de voiture
          </Link>
        </div>

        {/* Phone fallback */}
        <div className="pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-400 mb-2">Besoin d&apos;aide immédiate&nbsp;?</p>
          <a
            href="tel:0979049486"
            className="text-lg font-bold text-brand-navy hover:text-brand-red transition-colors"
          >
            ☎ 09 79 04 94 86
          </a>
          <p className="text-xs text-neutral-400 mt-1">Disponible 24h/24, 7j/7</p>
        </div>

        {/* Home link */}
        <Link
          href="/"
          className="inline-block text-sm text-neutral-400 hover:text-brand-red transition-colors underline underline-offset-4"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GoogleLogo, ChatCircleDots } from '@phosphor-icons/react';
import { GBP_REVIEW_URL, REVIEW_CTA_ENABLED } from '@/lib/reviews';
import { trackReviewCtaClick } from '@/lib/analytics';

/**
 * "Laisser un avis" — opens the Google Business Profile review link and
 * records review_cta_click with the acquisition source (?src=sms|whatsapp).
 * Hidden while GBP_REVIEW_URL is not set (TODO(owner) in lib/reviews.ts);
 * the page text then explains that reviews are collected on Google.
 */
function ReviewCtaInner() {
  const params = useSearchParams();
  const src = params.get('src') || 'site';
  const fromMessage = src === 'sms' || src === 'whatsapp';

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 text-center">
      {fromMessage && (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy bg-brand-surface rounded-full px-4 py-2 mb-5">
          <ChatCircleDots size={18} weight="fill" className="text-brand-red" />
          Merci d&apos;avoir fait appel à nous&nbsp;: votre avis prend deux minutes.
        </p>
      )}
      {REVIEW_CTA_ENABLED ? (
        <a
          href={GBP_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackReviewCtaClick(src)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-navy text-white font-semibold hover:bg-brand-navy/90 transition-colors"
        >
          <GoogleLogo size={22} weight="bold" />
          Laisser un avis sur Google
        </a>
      ) : (
        <p className="text-neutral-600 leading-relaxed">
          Les avis sont recueillis sur notre fiche Google&nbsp;: recherchez «&nbsp;Les Épavistes Pro&nbsp;» sur Google Maps et
          cliquez sur «&nbsp;Rédiger un avis&nbsp;». Le lien direct sera ajouté ici dès que notre fiche sera publiée.
        </p>
      )}
    </div>
  );
}

export default function ReviewCta() {
  return (
    <Suspense fallback={<div className="rounded-2xl border border-neutral-200 bg-white p-8 min-h-[120px]" />}>
      <ReviewCtaInner />
    </Suspense>
  );
}

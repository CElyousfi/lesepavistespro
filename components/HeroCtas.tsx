'use client';

import { Phone, ArrowRight } from '@phosphor-icons/react';
import Button from './Button';
import { trackCallClick } from '@/lib/analytics';

/** The hero's CTA row — the only client island of the hero. */
export default function HeroCtas() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="tel:+33602427345" onClick={() => trackCallClick('hero')}>
        <Button size="lg" className="h-14 min-w-[220px] text-base gap-2">
          <Phone size={20} weight="bold" />
          06 02 42 73 45
        </Button>
      </a>
      <Button
        variant="outline"
        size="lg"
        className="h-14 min-w-[220px] text-base gap-2"
        onClick={() => {
          const formSection = document.querySelector('section:has(form)');
          if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Estimation gratuite
        <ArrowRight size={18} weight="bold" />
      </Button>
    </div>
  );
}

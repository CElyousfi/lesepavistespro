'use client';

import Link from 'next/link';
import { House, CaretRight } from '@phosphor-icons/react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-6 sm:mb-8" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center gap-1 text-neutral-500 hover:text-brand-navy transition-colors"
        aria-label="Accueil"
      >
        <House size={16} weight="bold" />
        <span className="hidden sm:inline">Accueil</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <CaretRight size={12} weight="bold" className="text-neutral-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-neutral-500 hover:text-brand-navy transition-colors truncate max-w-[120px] sm:max-w-[200px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-navy font-semibold truncate max-w-[120px] sm:max-w-[200px]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  variant?: 'default' | 'compact';
}

export default function RelatedLinks({ 
  title = "Articles et Pages Connexes", 
  links,
  variant = 'default'
}: RelatedLinksProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
        <ul className="space-y-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href}
                className="flex items-center gap-2 text-brand-blue hover:text-brand-red transition-colors group"
              >
                <ArrowRight size={16} weight="bold" className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="font-medium">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-200">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors mb-1">
                  {link.title}
                </h4>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {link.description}
                </p>
              </div>
              <ArrowRight 
                size={20} 
                weight="bold" 
                className="flex-shrink-0 text-brand-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

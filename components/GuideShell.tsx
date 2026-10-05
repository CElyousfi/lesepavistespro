import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Breadcrumb from '@/components/Breadcrumb';
import { formatFrenchDate } from '@/lib/lastmod';

/**
 * Layout of the Île-de-France data guides (S3.3): breadcrumb, H1, lead,
 * visible « Mis à jour le » date, content, then the hub links every guide
 * carries. Server component.
 */
export default function GuideShell({
  title,
  lead,
  updatedAt,
  crumb,
  children,
}: {
  title: string;
  lead: string;
  updatedAt: string;
  crumb: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-white">
        <section className="pt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: crumb }]} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy tracking-tight leading-[1.1] mb-6">{title}</h1>
              <p className="text-lg text-neutral-600 leading-relaxed">{lead}</p>
              <p className="mt-4 text-sm text-neutral-500">
                Mis à jour le <time dateTime={updatedAt}>{formatFrenchDate(updatedAt)}</time> · Les Épavistes Pro · ☎ 06 02 42 73 45
              </p>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-14">{children}</div>
        </div>
        <section className="py-12 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Nos services en Île-de-France</h2>
              <ul className="flex flex-wrap gap-2">
                {[
                  { href: '/epaviste/ile-de-france', label: 'Épaviste Île-de-France' },
                  { href: '/epaviste/paris-75', label: 'Épaviste Paris' },
                  { href: '/rachat-voiture/ile-de-france', label: 'Rachat voiture Île-de-France' },
                  { href: '/epaviste/ile-de-france/fourriere', label: 'Voiture en fourrière : la faire détruire' },
                  { href: '/epaviste/ile-de-france/zfe-vieux-vehicule', label: 'Vieux véhicule et ZFE' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block px-3 py-1.5 rounded-full text-sm border border-neutral-200 bg-white hover:border-brand-red/40 text-brand-navy font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

import Link from 'next/link';
import { getGscBoostLinksFrom } from '@/data/gsc-actions';

/**
 * Contextual links towards the T1 pages of the Search Console loop (S3.1.c):
 * each T1 page is linked from 3 topically related pages with its query as
 * anchor. Renders nothing on pages that link to no T1 target.
 */
export default function GscBoostLinks({ fromPath, title }: { fromPath: string; title: string }) {
  const links = getGscBoostLinksFrom(fromPath);
  if (!links.length) return null;
  return (
    <div className="p-5 bg-brand-surface rounded-2xl border border-neutral-200" data-gsc-links>
      <h3 className="text-sm font-bold text-brand-navy mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-neutral-700 hover:text-brand-red font-medium underline-offset-4 hover:underline">
              {l.anchor}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

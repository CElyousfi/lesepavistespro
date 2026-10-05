import Link from 'next/link';
import { getCentreVhuDept } from '@/data/centre-vhu';

/** Link from a department page to its centre VHU page (S3.4), when one exists. */
export default function CentreVhuLink({ deptSlug, variant = 'inline' }: { deptSlug: string; variant?: 'inline' | 'section' }) {
  const d = getCentreVhuDept(deptSlug);
  if (!d) return null;
  const link = (
    <Link href={`/centre-vhu-agree/${d.slug}`} className="font-semibold text-brand-red hover:underline underline-offset-4">
      Centre VHU agréé {d.locative} : destruction et certificat
    </Link>
  );
  if (variant === 'inline') return <p className="text-sm text-neutral-700">{link}</p>;
  return (
    <section className="py-10 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <p className="max-w-4xl mx-auto text-center text-neutral-700">
          Faire détruire un véhicule {d.locative} ? {link}.
        </p>
      </div>
    </section>
  );
}

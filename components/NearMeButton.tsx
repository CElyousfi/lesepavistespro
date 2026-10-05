'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, NavigationArrow } from '@phosphor-icons/react';

interface Nearest {
  name: string;
  slug: string;
  deptSlug: string;
  deptCode: string;
  km: number;
}

/** Beyond this distance from the nearest IDF commune, the visitor is outside our main area. */
const OUTSIDE_IDF_KM = 25;

/**
 * Opt-in geolocation (S3.4): nothing happens until the visitor clicks, the
 * browser asks for permission, and the position is sent only to /api/nearest
 * (not stored, not tracked). Without permission the server-rendered
 * department links stay the answer.
 */
export default function NearMeButton({ service }: { service: 'epaviste' | 'rachat-voiture' }) {
  const [state, setState] = useState<'idle' | 'locating' | 'done' | 'denied' | 'error'>('idle');
  const [nearest, setNearest] = useState<Nearest[]>([]);
  const label = service === 'rachat-voiture' ? 'Rachat voiture' : 'Épaviste';

  const locate = () => {
    if (!('geolocation' in navigator)) {
      setState('error');
      return;
    }
    setState('locating');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`/api/nearest?lat=${pos.coords.latitude.toFixed(4)}&lng=${pos.coords.longitude.toFixed(4)}`);
          const body = (await res.json()) as { nearest?: Nearest[] };
          setNearest(body.nearest ?? []);
          setState('done');
        } catch {
          setState('error');
        }
      },
      () => setState('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  };

  if (state === 'done' && nearest.length) {
    const outside = nearest[0].km > OUTSIDE_IDF_KM;
    return (
      <div className="mt-6">
        {outside && (
          <p className="text-sm text-neutral-600 mb-3">
            Vous semblez être hors d&apos;Île-de-France : voici les communes franciliennes les plus proches, ou{' '}
            <Link href="/zones" className="font-semibold text-brand-red underline underline-offset-4">toutes nos zones d&apos;intervention</Link>.
          </p>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {nearest.map((c) => (
            <li key={`${c.deptSlug}/${c.slug}`}>
              <Link
                href={`/${service}/${c.deptSlug}/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-neutral-200 hover:border-brand-red/30 hover:shadow-md text-sm"
              >
                <MapPin size={16} weight="bold" className="text-brand-red flex-shrink-0" />
                <span className="font-semibold text-brand-navy">{label} {c.name}</span>
                <span className="ml-auto text-xs text-neutral-500">{c.km.toLocaleString('fr-FR')} km</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={locate}
        disabled={state === 'locating'}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy/90 disabled:opacity-60"
      >
        <NavigationArrow size={18} weight="bold" />
        {state === 'locating' ? 'Localisation…' : 'Trouver les communes les plus proches de moi'}
      </button>
      <p className="mt-2 text-xs text-neutral-500">
        {state === 'denied'
          ? 'Localisation refusée : choisissez votre département ci-dessus.'
          : state === 'error'
            ? 'Localisation indisponible : choisissez votre département ci-dessus.'
            : 'Votre position n’est ni enregistrée ni utilisée pour la publicité ou les statistiques.'}
      </p>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { getAllIdfCities, distanceKm } from '@/lib/idf-cities';

/**
 * « Près de chez vous » (S3.4): the 5 nearest Île-de-France communes to a
 * position the visitor chose to share. Nothing is stored or logged, and the
 * coordinates never reach analytics — the response is the only output.
 */
export const dynamic = 'force-dynamic';

const LIMIT = 5;

export async function GET(request: NextRequest) {
  const lat = Number(request.nextUrl.searchParams.get('lat'));
  const lng = Number(request.nextUrl.searchParams.get('lng'));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return NextResponse.json({ error: 'invalid coordinates' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
  const here = { lat, lng };
  const nearest = getAllIdfCities()
    .filter((c) => c.lat !== undefined && c.lng !== undefined)
    .map((c) => ({ name: c.name, slug: c.slug, deptSlug: c.deptSlug, deptCode: c.deptCode, km: distanceKm(here, { lat: c.lat as number, lng: c.lng as number }) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, LIMIT)
    .map((c) => ({ ...c, km: Math.round(c.km * 10) / 10 }));
  return NextResponse.json({ nearest }, { headers: { 'Cache-Control': 'no-store' } });
}

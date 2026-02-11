import { Metadata } from 'next';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
import { generateRachatCityMeta } from '@/lib/seo';
import CityRachatClient from './CityClient';

// Allow on-demand rendering for cities not pre-built
export const dynamicParams = true;

// Revalidate every 24 hours for ISR
export const revalidate = 86400;

// Pre-render only Île-de-France cities at build time (high-traffic)
// All other cities are rendered on-demand with ISR
export async function generateStaticParams() {
  const idfCodes = ['75', '77', '78', '91', '92', '93', '94', '95'];
  const params: { department: string; city: string }[] = [];
  
  allDepartments
    .filter(dept => idfCodes.includes(dept.code))
    .forEach((dept) => {
      dept.cities.forEach((city) => {
        params.push({
          department: dept.slug,
          city: city.slug,
        });
      });
    });
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const result = getCityBySlug(citySlug);
  
  if (!result) {
    return {
      title: 'Page non trouvée',
    };
  }

  const { city, department } = result;

  return generateRachatCityMeta(city.name, department.slug, city.slug, city.postalCode);
}

export default async function CityRachatPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CityRachatClient citySlug={city} />;
}

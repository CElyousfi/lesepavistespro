import { Metadata } from 'next';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
import { generateRachatCityMeta } from '@/lib/seo';
import CityRachatClient from './CityClient';

// Generate static params for all cities
export async function generateStaticParams() {
  const params: { department: string; city: string }[] = [];
  
  allDepartments.forEach((dept) => {
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

  return generateRachatCityMeta(city.name, department.slug, city.slug);
}

export default async function CityRachatPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CityRachatClient citySlug={city} />;
}

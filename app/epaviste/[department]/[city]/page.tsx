import { Metadata } from 'next';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
import CityEpavisteClient from './CityClient';

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

  return {
    title: `Épaviste ${city.name} (${city.postalCode}) | Enlèvement Gratuit 24h`,
    description: `⭐ Épaviste agréé VHU à ${city.name} (${city.postalCode}) dans le ${department.name}. Enlèvement d'épave 100% GRATUIT sous 24h. ☎️ 09 79 04 94 86`,
  };
}

export default async function CityEpavistePage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CityEpavisteClient citySlug={city} />;
}

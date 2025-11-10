import { Metadata } from 'next';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
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

  return {
    title: `Rachat Voiture ${city.name} (${city.postalCode}) | Achat Cash Immédiat`,
    description: `⭐ Rachat de voiture à ${city.name} (${city.postalCode}). Achat cash de véhicules HS, accidentés, en panne. Paiement immédiat. ☎️ 09 79 04 94 86`,
  };
}

export default async function CityRachatPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CityRachatClient citySlug={city} />;
}

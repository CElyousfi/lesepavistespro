import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
import { generateRachatCityMeta } from '@/lib/seo';
import { getBreadcrumbData, getCityFAQData } from '@/lib/structured-data';
import { getCityLocalData } from '@/lib/city-local-data';
import { isIdfDepartment } from '@/lib/idf';
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
  const { city: citySlug } = await params;
  const result = getCityBySlug(citySlug);
  if (!result) notFound();

  const { city, department } = result;
  const localData = getCityLocalData(city.slug);
  const isIdf = isIdfDepartment(department.slug);

  const breadcrumbData = getBreadcrumbData([
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}` },
    { name: city.name, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}/${city.slug}` }
  ]);
  const cityFAQData = getCityFAQData(city.name, department.name, city.slug);
  const structuredData = [breadcrumbData, cityFAQData];

  const cityData = { name: city.name, slug: city.slug, postalCode: city.postalCode };
  const deptData = {
    name: department.name, code: department.code, slug: department.slug,
    cities: department.cities.map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CityRachatClient
        city={cityData}
        department={deptData}
        localData={localData}
        isIdf={isIdf}
      />
    </>
  );
}

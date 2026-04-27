import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDepartments, getCityBySlug } from '@/lib/locations-complete';
import { generateEpavisteCityMeta } from '@/lib/seo';
import { getBreadcrumbData, getCityFAQData, getIdfCityStructuredData } from '@/lib/structured-data';
import { getCityLocalData } from '@/lib/city-local-data';
import { isIdfDepartment } from '@/lib/idf';
import { getIdfTestimonialsByDept } from '@/data/idf-testimonials';
import { getIdfDeptContent } from '@/data/idf-extra-content';
import { idfEpavisteFaq } from '@/data/idf-faq';
import CityEpavisteClient from './CityClient';

// Allow on-demand rendering for cities not pre-built
export const dynamicParams = true;

/**
 * ISR — IDF cities are crawled and updated weekly to surface
 * fresh-content signals (Google Feb 2026 update). Non-IDF cities
 * keep the original 24h revalidate.
 *
 * Note: Next.js requires a constant export, so use the conservative
 * 30-min revalidate. IDF / non-IDF differentiation is enforced via the
 * sitemap <changefreq> + <priority> + content depth (already in place).
 */
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

  return generateEpavisteCityMeta(city.name, department.slug, city.slug, city.postalCode);
}

export default async function CityEpavistePage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const result = getCityBySlug(citySlug);
  if (!result) notFound();

  const { city, department } = result;
  const localData = getCityLocalData(city.slug);
  const isIdf = isIdfDepartment(department.slug);

  const cityUrl = `https://www.lesepavistespro.fr/epaviste/${department.slug}/${city.slug}`;
  const breadcrumbData = getBreadcrumbData([
    { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste' },
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/epaviste/${department.slug}` },
    { name: city.name, url: cityUrl }
  ]);
  const cityFAQData = getCityFAQData(city.name, department.name, city.slug);
  let structuredData: any[] = [breadcrumbData, cityFAQData];

  if (isIdf) {
    const idfSchemas = getIdfCityStructuredData(
      city.name,
      city.postalCode,
      department.code,
      department.name,
      cityUrl,
      'epaviste'
    );
    if (idfSchemas) structuredData = [...structuredData, ...idfSchemas];
  }

  // IDF-only data
  const idfDeptTestimonials = isIdf ? getIdfTestimonialsByDept(department.code) : [];
  const idfDeptContent = isIdf ? getIdfDeptContent(department.code) ?? null : null;
  const idfFaqItems = isIdf ? idfEpavisteFaq : [];

  // Serialize only needed data
  const cityData = { name: city.name, slug: city.slug, postalCode: city.postalCode };
  const deptData = {
    name: department.name, code: department.code, slug: department.slug,
    cities: department.cities.map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CityEpavisteClient
        city={cityData}
        department={deptData}
        localData={localData}
        isIdf={isIdf}
        idfDeptTestimonials={idfDeptTestimonials}
        idfDeptContent={idfDeptContent}
        idfFaqItems={idfFaqItems}
      />
    </>
  );
}

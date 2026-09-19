import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDepartments, getCityInDepartment, isHomonymCity } from '@/lib/locations-complete';
import { generateRachatCityMeta } from '@/lib/seo';
import { getBreadcrumbData, getCityServiceData, getWebPageData } from '@/lib/structured-data';
import { buildFaqPage, getCityFaqItems, genericFaqItems, type FaqItem } from '@/lib/faq';
import { getCityLocalData } from '@/lib/city-local-data';
import { isIdfDepartment } from '@/lib/idf';
import { getNearestIdfCities } from '@/lib/idf-cities';
import { getIdfGuideLinks } from '@/lib/internal-linking';
import { shouldNoIndex } from '@/lib/geo-targeting';
import { getIdfTestimonialsByDept } from '@/data/idf-testimonials';
import { getIdfDeptContent } from '@/data/idf-extra-content';
import { idfRachatFaq } from '@/data/idf-faq';
import CityRachatClient from './CityClient';
import Footer from '@/components/Footer';
import IdfCityPage from '@/components/IdfCityPage';
import { resolveIdfCity } from '@/lib/idf-city-content';
import AlsoInIdf from '@/components/AlsoInIdf';

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
export async function generateMetadata({
  params,
}: {
  params: Promise<{ department: string; city: string }>;
}): Promise<Metadata> {
  const { department: deptSlug, city: citySlug } = await params;
  // Resolve within the URL's department — never by slug alone (homonym cities).
  const result = getCityInDepartment(deptSlug, citySlug);

  if (!result) {
    return {
      title: 'Page non trouvée',
      robots: { index: false, follow: true },
    };
  }

  const { city, department } = result;
  const noIndex = shouldNoIndex(department.slug, city.slug);

  return generateRachatCityMeta(
    city.name,
    department.slug,
    city.slug,
    city.postalCode,
    noIndex,
    isHomonymCity(city.slug)
  );
}

export default async function CityRachatPage({
  params,
}: {
  params: Promise<{ department: string; city: string }>;
}) {
  const { department: deptSlug, city: citySlug } = await params;
  // Unknown (department, city) combinations are 404 — they must never render
  // a homonym city from another department (unbounded duplicate URL space).
  const result = getCityInDepartment(deptSlug, citySlug);
  if (!result) notFound();

  const { city, department } = result;
  const localData = getCityLocalData(department.slug, city.slug);
  const isIdf = isIdfDepartment(department.slug);

  const cityUrl = `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}/${city.slug}`;
  // IDF cities carry the region level: Accueil › Rachat Voiture › Île-de-France › Dept (code) › Ville.
  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Rachat Voiture', url: 'https://www.lesepavistespro.fr/rachat-voiture' },
    ...(isIdf ? [{ name: 'Île-de-France', url: 'https://www.lesepavistespro.fr/rachat-voiture/ile-de-france' }] : []),
    { name: `${department.name} (${department.code})`, url: `https://www.lesepavistespro.fr/rachat-voiture/${department.slug}` },
    { name: city.name, url: cityUrl }
  ]);

  // IDF-only data
  const idfDeptTestimonials = isIdf ? getIdfTestimonialsByDept(department.code) : [];
  const idfDeptContent = isIdf ? getIdfDeptContent(department.code) ?? null : null;

  // Île-de-France: hand-written or generated commune content (P3.2).
  const idfCity = isIdf ? resolveIdfCity(department.slug, city.slug) : null;

  // ONE FAQ list: rendered by the page AND turned into the page's single
  // FAQPage node. A FAQPage may only contain visible questions.
  const faqItems: FaqItem[] = idfCity
    ? [...idfCity.faqRachat, ...idfRachatFaq]
    : [
    ...getCityFaqItems(city.name, localData),
    ...(isIdf ? idfRachatFaq : genericFaqItems),
  ];
  const faqPage = buildFaqPage(faqItems);

  const structuredData = [
    getWebPageData(cityUrl, `Rachat voiture ${city.name} (${city.postalCode})`),
    breadcrumbData,
    // A Service node, not a per-city LocalBusiness: we serve the city, we have
    // no premises there. See lib/structured-data.ts.
    getCityServiceData(
      city.name,
      city.postalCode,
      department.code,
      department.name,
      cityUrl,
      'rachat'
    ),
    ...(faqPage ? [faqPage] : []),
  ];

  const cityData = { name: city.name, slug: city.slug, postalCode: city.postalCode };
  // The city page renders at most 6 nearby links plus an 8-item neighbours
  // grid, so send only those — not every commune in the department.
  const NEARBY_LIMIT = 8;
  const deptData = {
    name: department.name,
    code: department.code,
    slug: department.slug,
    cityCount: department.cities.length,
    // IDF: the geographically nearest communes, any IDF department (P2.3).
    // Elsewhere: same-department neighbours in data order.
    nearbyCities: isIdf
      ? getNearestIdfCities(department.slug, city.slug, NEARBY_LIMIT).map(c => ({
          name: c.name,
          slug: c.slug,
          postalCode: c.postalCode,
          deptSlug: c.deptSlug,
        }))
      : department.cities
          .filter(c => c.slug !== city.slug)
          .slice(0, NEARBY_LIMIT)
          .map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
  };
  const guides = isIdf ? getIdfGuideLinks('rachat-voiture').map(g => ({ title: g.text, href: g.href })) : [];

  if (idfCity) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <IdfCityPage
          service="rachat-voiture"
          city={idfCity}
          deptContent={idfDeptContent}
          regionFaq={idfRachatFaq}
          guides={guides}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CityRachatClient
        city={cityData}
        department={deptData}
        localData={localData}
        isIdf={isIdf}
        idfDeptTestimonials={idfDeptTestimonials}
        idfDeptContent={idfDeptContent}
        faqItems={faqItems}
        guides={guides}
      />
      {/* Non-IDF pages link both IDF hubs once, contextually (P2.3). */}
      {!isIdf && <AlsoInIdf context={`à ${city.name}`} />}
      <Footer />
    </>
  );
}

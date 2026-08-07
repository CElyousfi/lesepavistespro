import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDepartments, getDepartmentBySlug, getRegionForDepartment, regions, getRegionBySlug } from '@/lib/locations-complete';
import { generateEpavisteDepartmentMeta, generateEpavisteRegionMeta } from '@/lib/seo';
import { getDepartmentLocalBusiness, getBreadcrumbData, getIdfDepartmentStructuredData, getIdfRegionStructuredData } from '@/lib/structured-data';
import { isIdfDepartment, isIdfRegion } from '@/lib/idf';
import { getIdfDeptContent, idfRegionContent } from '@/data/idf-extra-content';
import { idfEpavisteFaq } from '@/data/idf-faq';
import { getIdfTestimonialsByDept, getAllIdfTestimonials } from '@/data/idf-testimonials';
import DepartmentClientPage from './DepartmentClient';
import RegionClientPage from './RegionClient';

// Generate static params for all departments AND all regions
export async function generateStaticParams() {
  const regionParams = regions.map((region) => ({
    department: region.slug,
  }));
  const deptParams = allDepartments.map((dept) => ({
    department: dept.slug,
  }));
  return [...regionParams, ...deptParams];
}

// Generate metadata for SEO — region or department
export async function generateMetadata({ params }: { params: Promise<{ department: string }> }): Promise<Metadata> {
  const { department: slug } = await params;

  // Check region first
  const region = getRegionBySlug(slug);
  if (region) {
    return generateEpavisteRegionMeta(region.name, region.slug);
  }

  // Then department
  const dept = getDepartmentBySlug(slug);
  if (dept) {
    return generateEpavisteDepartmentMeta(dept.name, dept.slug);
  }

  return { title: 'Page non trouvée' };
}

export default async function DepartmentOrRegionEpavistePage({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = await params;

  // --- Region path ---
  const region = getRegionBySlug(slug);
  if (region) {
    const isIdf = isIdfRegion(slug);
    // Contenu région IDF dédié — distinct du département Paris (75)
    const idfRegionContentData = isIdf ? idfRegionContent : null;
    const idfTestimonials = isIdf ? getAllIdfTestimonials().filter(t => t.service === 'epaviste') : [];

    const breadcrumbData = getBreadcrumbData([
      { name: 'Accueil', url: 'https://www.lesepavistespro.fr/' },
      { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste' },
      { name: region.name, url: `https://www.lesepavistespro.fr/epaviste/${region.slug}` },
    ]);
    const localBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://www.lesepavistespro.fr/#business',
      name: 'Les Épavistes Pro',
      url: `https://www.lesepavistespro.fr/epaviste/${region.slug}`,
      telephone: '+33602427345',
      openingHours: 'Mo-Su 00:00-23:59',
    };
    let structuredData: any[] = [localBusinessData, breadcrumbData];
    if (isIdf) {
      const idfSchemas = getIdfRegionStructuredData('epaviste');
      structuredData = [...structuredData, ...idfSchemas];
    }

    // Serialize region data (strip functions, keep only plain data)
    const regionData = {
      name: region.name,
      slug: region.slug,
      departments: region.departments.map(d => ({
        name: d.name,
        code: d.code,
        slug: d.slug,
        cities: d.cities.map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <RegionClientPage
          region={regionData}
          isIdf={isIdf}
          idfRegionContent={idfRegionContentData}
          idfTestimonials={idfTestimonials}
          idfFaqItems={isIdf ? idfEpavisteFaq : []}
        />
      </>
    );
  }

  // --- Department path ---
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  const parentRegion = getRegionForDepartment(slug);
  const isIdf = isIdfDepartment(slug);
  const idfContent = isIdf ? getIdfDeptContent(dept.code) : null;
  const idfTestimonials = isIdf ? getIdfTestimonialsByDept(dept.code) : [];

  const localBusinessData = getDepartmentLocalBusiness(
    dept.code,
    `${dept.name} (${dept.code})`,
    `https://www.lesepavistespro.fr/epaviste/${dept.slug}`
  );
  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste' },
    { name: `${dept.name}`, url: `https://www.lesepavistespro.fr/epaviste/${dept.slug}` },
  ]);
  let structuredData: any[] = [localBusinessData, breadcrumbData];
  if (isIdf) {
    const idfSchemas = getIdfDepartmentStructuredData(dept.code, dept.name, `https://www.lesepavistespro.fr/epaviste/${dept.slug}`, 'epaviste');
    if (idfSchemas) structuredData = [...structuredData, ...idfSchemas];
  }

  // Serialize department data
  const deptData = {
    name: dept.name,
    code: dept.code,
    slug: dept.slug,
    cities: dept.cities.map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
  };
  const parentRegionData = parentRegion ? { name: parentRegion.name, slug: parentRegion.slug } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DepartmentClientPage
        dept={deptData}
        parentRegion={parentRegionData}
        isIdf={isIdf}
        idfContent={idfContent ?? null}
        idfTestimonials={idfTestimonials}
        idfFaqItems={isIdf ? idfEpavisteFaq : []}
      />
    </>
  );
}

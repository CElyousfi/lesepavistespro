import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDepartments, getDepartmentBySlug, getRegionForDepartment, regions, getRegionBySlug } from '@/lib/locations-complete';
import { generateEpavisteDepartmentMeta, generateEpavisteRegionMeta } from '@/lib/seo';
import {
  getBreadcrumbData,
  getDepartmentServiceData,
  getRegionServiceData,
  getWebPageData,
} from '@/lib/structured-data';
import { buildFaqPage, genericFaqItems, type FaqItem } from '@/lib/faq';
import { isIdfDepartment, isIdfRegion } from '@/lib/idf';
import { isIndexedDepartment } from '@/lib/geo-targeting';
import { getIdfDeptContent, getIdfDeptHub, idfRegionContent } from '@/data/idf-extra-content';
import { getIdfGuideLinks } from '@/lib/internal-linking';
import IdfDepartmentPage from '@/components/IdfDepartmentPage';
import IdfRegionPage from '@/components/IdfRegionPage';
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
    const regionUrl = `https://www.lesepavistespro.fr/epaviste/${region.slug}`;
    // ONE FAQ list — rendered by the client component and turned into this
    // page's single FAQPage node.
    const regionFaqItems: FaqItem[] = isIdf ? idfEpavisteFaq : genericFaqItems;
    const regionFaqPage = buildFaqPage(regionFaqItems);

    const structuredData = [
      getWebPageData(regionUrl, `Épaviste ${region.name}`),
      breadcrumbData,
      // A Service node referencing the one #business entity — never a second
      // definition of #business with region-specific data.
      getRegionServiceData(
        region.name,
        region.slug,
        'epaviste',
        region.departments.map(d => `${d.name} (${d.code})`)
      ),
      ...(regionFaqPage ? [regionFaqPage] : []),
    ];

    // Serialize region data (strip functions, keep only plain data)
    const regionData = {
      name: region.name,
      slug: region.slug,
      // Region pages render only the commune COUNT per department; serialising
      // every city here made them the heaviest pages on the site (485 KB).
      departments: region.departments.map(d => ({
        name: d.name,
        code: d.code,
        slug: d.slug,
        cityCount: d.cities.length,
      })),
    };

    // Île-de-France: dedicated server-rendered hub (P2.2).
    if (isIdf) {
      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <IdfRegionPage
            service="epaviste"
            faqItems={regionFaqItems}
            guides={getIdfGuideLinks('epaviste').map(g => ({ title: g.text, href: g.href }))}
          />
        </>
      );
    }

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
          faqItems={regionFaqItems}
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

  const deptUrl = `https://www.lesepavistespro.fr/epaviste/${dept.slug}`;
  // IDF departments get the region level in the trail: Accueil › Épaviste › Île-de-France › Dept.
  const breadcrumbData = getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Épaviste', url: 'https://www.lesepavistespro.fr/epaviste' },
    ...(isIdf ? [{ name: 'Île-de-France', url: 'https://www.lesepavistespro.fr/epaviste/ile-de-france' }] : []),
    { name: `${dept.name} (${dept.code})`, url: `https://www.lesepavistespro.fr/epaviste/${dept.slug}` },
  ]);
  const deptFaqItems: FaqItem[] = isIdf ? idfEpavisteFaq : genericFaqItems;
  const deptFaqPage = buildFaqPage(deptFaqItems);

  const structuredData = [
    getWebPageData(deptUrl, `Épaviste ${dept.name} (${dept.code})`),
    breadcrumbData,
    getDepartmentServiceData(
      dept.code,
      dept.name,
      dept.slug,
      'epaviste',
      dept.cities.map(c => c.name)
    ),
    ...(deptFaqPage ? [deptFaqPage] : []),
  ];

  // Serialize department data
  const deptData = {
    name: dept.name,
    code: dept.code,
    slug: dept.slug,
    cities: dept.cities.map(c => ({ name: c.name, slug: c.slug, postalCode: c.postalCode })),
  };
  const parentRegionData = parentRegion ? { name: parentRegion.name, slug: parentRegion.slug } : null;

  // Île-de-France: the dedicated server-rendered hub (P2.2). Non-IDF
  // departments keep the national template below, untouched.
  const hub = isIdf ? getIdfDeptHub(dept.code) : undefined;
  if (isIdf && hub) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <IdfDepartmentPage
          service="epaviste"
          dept={deptData}
          hub={hub}
          faqItems={deptFaqItems}
          guides={getIdfGuideLinks('epaviste').map(g => ({ title: g.text, href: g.href }))}
        />
      </>
    );
  }

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
        faqItems={deptFaqItems}
        // Every city page in an indexed department must be linked from here,
        // otherwise it is orphaned (reachable only from the sitemap).
        linkAllCities={isIndexedDepartment(dept.slug)}
      />
    </>
  );
}

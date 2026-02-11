import { Metadata } from 'next';
import { allDepartments, getDepartmentBySlug, regions, getRegionBySlug } from '@/lib/locations-complete';
import { generateEpavisteDepartmentMeta, generateEpavisteRegionMeta } from '@/lib/seo';
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

  // Check region first
  const region = getRegionBySlug(slug);
  if (region) {
    return <RegionClientPage regionSlug={slug} />;
  }

  // Fall back to department
  return <DepartmentClientPage departmentSlug={slug} />;
}

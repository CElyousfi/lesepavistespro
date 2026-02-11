import { Metadata } from 'next';
import { allDepartments, getDepartmentBySlug, regions, getRegionBySlug } from '@/lib/locations-complete';
import { generateRachatDepartmentMeta, generateRachatRegionMeta } from '@/lib/seo';
import RachatDepartmentContent from './RachatDepartmentContent';
import RachatRegionClientPage from './RachatRegionClient';

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
    return generateRachatRegionMeta(region.name, region.slug);
  }

  // Then department
  const dept = getDepartmentBySlug(slug);
  if (dept) {
    return generateRachatDepartmentMeta(dept.name, dept.slug);
  }

  return { title: 'Page non trouvée' };
}

export default async function DepartmentOrRegionRachatPage({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = await params;

  // Check region first
  const region = getRegionBySlug(slug);
  if (region) {
    return <RachatRegionClientPage regionSlug={slug} />;
  }

  // Fall back to department
  return <RachatDepartmentContent departmentSlug={slug} />;
}

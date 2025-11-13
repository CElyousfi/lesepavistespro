import { Metadata } from 'next';
import { allDepartments, getDepartmentBySlug } from '@/lib/locations-complete';
import { generateEpavisteDepartmentMeta } from '@/lib/seo';
import DepartmentClientPage from './DepartmentClient';

// Generate static params for all departments
export async function generateStaticParams() {
  return allDepartments.map((dept) => ({
    department: dept.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ department: string }> }): Promise<Metadata> {
  const { department } = await params;
  const dept = getDepartmentBySlug(department);
  
  if (!dept) {
    return {
      title: 'Page non trouvée',
    };
  }

  return generateEpavisteDepartmentMeta(dept.name, dept.slug);
}

export default async function DepartmentEpavistePage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  return <DepartmentClientPage departmentSlug={department} />;
}

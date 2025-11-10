import { Metadata } from 'next';
import { allDepartments, getDepartmentBySlug } from '@/lib/locations-complete';
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

  return {
    title: `Épaviste ${dept.name} (${dept.code}) | Enlèvement d'épave gratuit 24h`,
    description: `⭐ Épaviste agréé VHU dans le ${dept.name} (${dept.code}). Enlèvement d'épave 100% GRATUIT 24h/24, 7j/7. ☎️ 09 79 04 94 86`,
  };
}

export default async function DepartmentEpavistePage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  return <DepartmentClientPage departmentSlug={department} />;
}

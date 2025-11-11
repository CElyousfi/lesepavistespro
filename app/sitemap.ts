import { MetadataRoute } from 'next';
import { allDepartments } from '@/lib/locations-complete';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lesepavistespro.fr';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/epaviste`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rachat-voiture`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Department pages for épaviste
  const departmentEpavistePages: MetadataRoute.Sitemap = allDepartments.map((dept) => ({
    url: `${baseUrl}/epaviste/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Department pages for rachat-voiture
  const departmentRachatPages: MetadataRoute.Sitemap = allDepartments.map((dept) => ({
    url: `${baseUrl}/rachat-voiture/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // City pages for épaviste (ALL cities in ALL departments)
  const cityEpavistePages: MetadataRoute.Sitemap = [];
  allDepartments.forEach((dept) => {
    dept.cities.forEach((city) => {
      cityEpavistePages.push({
        url: `${baseUrl}/epaviste/${dept.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });
  });

  // City pages for rachat-voiture (ALL cities in ALL departments)
  const cityRachatPages: MetadataRoute.Sitemap = [];
  allDepartments.forEach((dept) => {
    dept.cities.forEach((city) => {
      cityRachatPages.push({
        url: `${baseUrl}/rachat-voiture/${dept.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });
  });

  // Blog post pages
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...blogPostPages,
    ...departmentEpavistePages,
    ...departmentRachatPages,
    ...cityEpavistePages,
    ...cityRachatPages,
  ];
}

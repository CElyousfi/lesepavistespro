import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * Sitemap Index - points to child sitemaps
 * This is the main sitemap.xml that search engines will crawl
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  
  return [
    {
      url: `${base}/sitemap-static.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-blog.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-epaviste-departements.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-rachat-departements.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-epaviste-cities.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-rachat-cities.xml`,
      lastModified: new Date(),
    },
  ];
}

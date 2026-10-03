import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';
import { properties } from '@/data/properties';
import { articles } from '@/data/articles';
import { propertyUrl, blogUrl } from '@/lib/format';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/properties', '/blog', '/about', '/contact', '/terms'].map((path) => ({
      url: siteUrl + path,
    })),
    ...properties.map((p) => ({ url: siteUrl + propertyUrl(p), lastModified: p.date })),
    ...articles.map((a) => ({ url: siteUrl + blogUrl(a) })),
  ];
}

import type { Metadata } from 'next';
export const siteUrl = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export function pageMetadata(
  title: string,
  path: string,
  description?: string,
  image?: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      locale: 'fa_IR',
      type: 'website',
      siteName: 'املاک هخامنش',
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

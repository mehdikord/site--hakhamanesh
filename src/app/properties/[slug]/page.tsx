import { notFound } from 'next/navigation';
import { properties } from '@/data/properties';
import { PropertyDetail } from '@/components/properties/PropertyDetail';
import { pageMetadata } from '@/lib/metadata';
import { propertyUrl } from '@/lib/format';
type Props = { params: Promise<{ slug: string }> };
function find(slug: string) {
  return properties.find((p) => p.code.toLowerCase() === slug.toLowerCase());
}
export async function generateMetadata({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();
  return pageMetadata(p.title, propertyUrl(p), p.desc, p.images[0]);
}
export default async function PropertyPage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();
  const similar = properties
    .filter((x) => x.id !== p.id && (x.type === p.type || x.city === p.city || x.hood === p.hood))
    .slice(0, 3);
  return (
    <PropertyDetail
      property={p}
      similar={similar.length ? similar : properties.filter((x) => x.id !== p.id).slice(0, 3)}
    />
  );
}

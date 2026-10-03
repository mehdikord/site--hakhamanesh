import { PropertyBrowser } from '@/components/properties/PropertyBrowser';
import { properties } from '@/data/properties';
import { pageMetadata } from '@/lib/metadata';
export const metadata = {
  ...pageMetadata('جست‌وجوی املاک', '/search'),
  robots: { index: false, follow: true },
};
export default function SearchPage() {
  return <PropertyBrowser properties={properties} />;
}

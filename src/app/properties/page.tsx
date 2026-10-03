import { PropertyBrowser } from '@/components/properties/PropertyBrowser';
import { properties } from '@/data/properties';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'بانک املاک',
  '/properties',
  'خرید، فروش، رهن و اجاره املاک منتخب هخامنش',
);
export default function PropertiesPage() {
  return <PropertyBrowser properties={properties} />;
}

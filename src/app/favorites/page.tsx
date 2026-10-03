import { Favorites } from '@/components/properties/Favorites';
import { properties } from '@/data/properties';
import { pageMetadata } from '@/lib/metadata';
export const metadata = {
  ...pageMetadata('علاقه‌مندی‌های شما', '/favorites'),
  robots: { index: false, follow: true },
};
export default function FavoritesPage() {
  return <Favorites properties={properties} />;
}

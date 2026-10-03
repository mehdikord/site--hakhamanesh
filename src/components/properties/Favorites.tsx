'use client';
import Link from 'next/link';
import { useFavorites } from '@/lib/favorites';
import type { Property } from '@/data/types';
import { PropertyCard } from './PropertyCard';
import { Icon } from '@/components/shared/Icon';
export function Favorites({ properties }: { properties: Property[] }) {
  const { ids } = useFavorites();
  const list = properties.filter((p) => ids.includes(p.id));
  return (
    <section id="page-favorites" className="page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <div className="ornament mb-3">
            <Icon name="heart" className="w-5 h-5 text-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            علاقه‌مندی‌های <span className="gold-text">شما</span>
          </h1>
          <p className="text-muted mt-2 text-sm">
            فایل‌های ذخیره‌شده در همین دستگاه نگهداری می‌شوند
          </p>
        </div>
        <div id="favGrid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        {!list.length && (
          <div id="favEmpty" className="text-center py-16 card-luxe rounded-3xl px-4">
            <Icon name="heart-off" className="w-14 h-14 text-gold mx-auto mb-4" />
            <h3 className="font-black text-xl">هنوز ملکی ذخیره نکرده‌اید</h3>
            <p className="text-muted text-sm mt-2">
              روی قلب هر ملک بزنید تا اینجا ذخیره شود و بعداً مقایسه کنید.
            </p>
            <Link
              prefetch={false}
              href="/properties"
              className="gold-btn inline-block px-6 py-3.5 rounded-xl text-sm mt-5"
            >
              مشاهده املاک
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

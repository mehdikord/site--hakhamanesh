'use client';
import Link from 'next/link';
import { useFavorites } from '@/lib/favorites';
import { faNum } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
import { useSite } from '@/components/shared/useSite';
export function FavoriteButton({ id, className = '' }: { id: number; className?: string }) {
  const { ids, toggle } = useFavorites();
  const { toast } = useSite();
  const active = ids.includes(id);
  return (
    <button
      type="button"
      aria-label={active ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      aria-pressed={active}
      className={`${className} ${active ? 'fav-active' : ''}`}
      onClick={() => {
        const { added, persisted } = toggle(id);
        toast(
          added ? (
            <>
              به علاقه‌مندی‌ها اضافه شد.{' '}
              <Link prefetch={false} href="/favorites" className="text-gold underline mr-1">
                مشاهده
              </Link>
            </>
          ) : (
            'از علاقه‌مندی‌ها حذف شد.'
          ),
        );
        if (!persisted)
          toast('ذخیره‌سازی مرورگر غیرفعال است؛ این فهرست فقط تا بستن صفحه باقی می‌ماند.', 'err');
      }}
    >
      <Icon name="heart" className="w-5 h-5" />
    </button>
  );
}
export function FavoriteCount() {
  const { ids } = useFavorites();
  return (
    <span
      id="favCount"
      className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full badge-gold text-[11px] font-bold flex items-center justify-center"
    >
      {faNum(ids.length)}
    </span>
  );
}

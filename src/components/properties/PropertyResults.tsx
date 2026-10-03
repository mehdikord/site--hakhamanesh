'use client';
import { useState } from 'react';
import type { Property } from '@/data/types';
import { PropertyCard } from './PropertyCard';
import { Icon } from '@/components/shared/Icon';
import { ConsultButton } from '@/components/shared/Actions';
export function PropertyResults({
  properties,
  onReset,
}: {
  properties: Property[];
  onReset: () => void;
}) {
  const [visible, setVisible] = useState(9);
  return (
    <>
      <div id="listGrid" className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.slice(0, visible).map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
      {properties.length === 0 && (
        <div id="emptyState" className="text-center py-20 card-luxe rounded-3xl px-4">
          <Icon name="search-x" className="w-14 h-14 text-gold mx-auto mb-4" />
          <h3 className="font-black text-xl">ملکی با این مشخصات یافت نشد</h3>
          <p className="text-muted text-sm mt-2">
            فیلترها را تغییر دهید یا درخواست ملک اختصاصی ثبت کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={onReset}
              className="ghost-btn px-5 py-3 rounded-xl text-sm"
            >
              حذف فیلترها
            </button>
            <ConsultButton className="gold-btn px-5 py-3 rounded-xl text-sm">
              درخواست ملک اختصاصی
            </ConsultButton>
          </div>
        </div>
      )}
      <div className="text-center mt-8">
        {visible < properties.length && (
          <button
            type="button"
            id="loadMoreBtn"
            onClick={() => setVisible((v) => v + 6)}
            className="ghost-btn px-8 py-3.5 rounded-2xl text-sm"
          >
            نمایش موارد بیشتر
          </button>
        )}
      </div>
    </>
  );
}

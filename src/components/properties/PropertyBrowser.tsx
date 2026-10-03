'use client';
import { useMemo } from 'react';
import { useRememberResults } from '@/lib/results-history';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Property } from '@/data/types';
import {
  defaultFilters,
  parseFilters,
  serializeFilters,
  filterProperties,
  type PropertyFilters as Filters,
} from '@/lib/search';
import { faNum, typeLabel } from '@/lib/format';
import { PropertyFilters } from './PropertyFilters';
import { PropertyResults } from './PropertyResults';
import { Icon } from '@/components/shared/Icon';
export function PropertyBrowser({ properties }: { properties: Property[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  useRememberResults('properties', pathname + (params.size ? '?' + params.toString() : ''));
  const filters = useMemo(() => parseFilters(Object.fromEntries(params.entries())), [params]);
  const list = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  function change(patch: Partial<Filters>) {
    const query = serializeFilters({ ...filters, ...patch });
    // Next's native History integration keeps query state shareable, reloadable,
    // and compatible with Back/Forward without a network request on each keypress.
    window.history.replaceState(null, '', pathname + (query ? '?' + query : ''));
  }
  const reset = () => change({ ...defaultFilters, sort: filters.sort });
  const chips: { label: string; remove: () => void }[] = [];
  if (filters.deal !== 'all')
    chips.push({
      label: filters.deal === 'sale' ? 'فروش' : 'رهن و اجاره',
      remove: () => change({ deal: 'all' }),
    });
  if (filters.type !== 'all')
    chips.push({ label: typeLabel(filters.type), remove: () => change({ type: 'all' }) });
  if (filters.city !== 'all')
    chips.push({ label: filters.city, remove: () => change({ city: 'all' }) });
  if (filters.minArea)
    chips.push({
      label: 'بالای ' + faNum(filters.minArea) + ' متر',
      remove: () => change({ minArea: 0 }),
    });
  if (filters.rooms !== 'all')
    chips.push({
      label: filters.rooms === '4' ? '۴ خواب به بالا' : faNum(filters.rooms) + ' خوابه',
      remove: () => change({ rooms: 'all' }),
    });
  if (filters.budget !== 'all')
    chips.push({
      label:
        filters.budget === '61' ? 'بالای ۶۰ میلیارد' : 'تا ' + faNum(filters.budget) + ' میلیارد',
      remove: () => change({ budget: 'all' }),
    });
  if (filters.onlyFeatured)
    chips.push({ label: 'فایل‌های ویژه', remove: () => change({ onlyFeatured: false }) });
  filters.amen.forEach((a) =>
    chips.push({ label: a, remove: () => change({ amen: filters.amen.filter((x) => x !== a) }) }),
  );
  if (filters.q) chips.push({ label: '«' + filters.q + '»', remove: () => change({ q: '' }) });
  return (
    <section id="page-listings" className="page">
      <div className="relative py-16 overflow-hidden">
        <img
          src="/images/photo-1486406146926-c627a92ad1ab-1800.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="ساختمان"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/60 to-deep" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="ornament mb-3">
            <Icon name="building-2" className="w-5 h-5 text-gold" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            بانک املاک <span className="gold-text">هخامنش</span>
          </h1>
          <p className="text-muted mt-3">جست‌وجوی پیشرفته میان فایل‌های تأییدشده فروش و اجاره</p>
          <div className="max-w-2xl mx-auto mt-6 relative">
            <Icon
              name="search"
              className="w-5 h-5 text-gold absolute right-4 top-1/2 -translate-y-1/2"
            />
            <input
              id="searchInput"
              type="search"
              value={filters.q}
              onChange={(e) => change({ q: e.target.value })}
              maxLength={200}
              aria-label="جست‌وجوی ملک"
              className="inp !pr-12 !py-4 !rounded-2xl glass"
              placeholder="جست‌وجو: نام محله، کد ملک، عنوان... (مثلاً الهیه یا HX-1042)"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-[300px_1fr] gap-7 items-start">
        <PropertyFilters filters={filters} onChange={change} onReset={reset} />
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div id="resultCount" className="text-sm text-muted" role="status">
              <span className="text-white font-bold">{faNum(list.length)}</span> ملک یافت شد{' '}
              {filters.deal === 'sale' ? '· فروش' : filters.deal === 'rent' ? '· رهن و اجاره' : ''}
            </div>
            <label className="flex items-center gap-2 text-sm">
              مرتب‌سازی:
              <select
                id="sortSelect"
                value={filters.sort}
                onChange={(e) => change({ sort: e.target.value })}
                className="inp !w-auto !py-2.5 text-sm"
              >
                <option value="newest">جدیدترین</option>
                <option value="expensive">گران‌ترین</option>
                <option value="cheap">ارزان‌ترین</option>
                <option value="big">بزرگ‌ترین متراژ</option>
                <option value="rooms">بیشترین خواب</option>
              </select>
            </label>
          </div>
          <div id="activeChips" className="flex flex-wrap gap-2 mb-4">
            {chips.map((c, i) => (
              <span key={c.label + i} className="chip text-xs">
                {c.label}{' '}
                <button
                  type="button"
                  onClick={c.remove}
                  className="hover:text-red-400"
                  aria-label={'حذف ' + c.label}
                >
                  <Icon name="x" className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <PropertyResults key={params.toString()} properties={list} onReset={reset} />
        </div>
      </div>
    </section>
  );
}

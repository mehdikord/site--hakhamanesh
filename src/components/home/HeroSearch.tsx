'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/shared/Icon';
import { cities, defaultFilters, propertyTypes, serializeFilters } from '@/lib/search';
import { typeLabel } from '@/lib/format';
export function HeroSearch() {
  const [deal, setDeal] = useState('sale');
  const router = useRouter();
  return (
    <form
      action="/search"
      className="reveal in glass rounded-[26px] border border-line p-6 sm:p-7 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const filters = {
          ...defaultFilters,
          deal,
          city: String(data.get('city')),
          type: String(data.get('type')),
          budget: String(data.get('budget')),
          minArea: Number(data.get('minArea')),
        };
        router.push('/search?' + serializeFilters(filters));
      }}
    >
      <div className="hero-search-title flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Icon name="sliders-horizontal" className="w-5 h-5 text-gold" /> جست‌وجوی هوشمند ملک
        </h2>
        <span className="text-xs text-muted flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ۲۱۴ ملک فعال
        </span>
      </div>
      <input type="hidden" name="deal" value={deal} />
      <div
        className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-deep/80 border border-white/5 mb-5"
        role="group"
        aria-label="نوع معامله"
      >
        {[
          ['sale', 'خرید'],
          ['rent', 'رهن و اجاره'],
          ['all', 'همه'],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => setDeal(value)}
            aria-pressed={deal === value}
            className={`hero-tab py-3 rounded-xl text-sm transition border border-transparent ${deal === value ? 'tab-active' : 'text-muted'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">محله / شهر</span>
          <select id="heroCity" name="city" className="inp" defaultValue="all">
            <option value="all">همه مناطق</option>
            {cities.slice(0, 10).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">نوع ملک</span>
          <select id="heroType" name="type" className="inp" defaultValue="all">
            <option value="all">همه انواع</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'commercial' ? 'تجاری / اداری' : typeLabel(t)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">بودجه (فروش)</span>
          <select id="heroPrice" name="budget" className="inp" defaultValue="all">
            <option value="all">بدون محدودیت</option>
            <option value="20">تا ۲۰ میلیارد</option>
            <option value="35">تا ۳۵ میلیارد</option>
            <option value="60">تا ۶۰ میلیارد</option>
            <option value="61">بالای ۶۰ میلیارد</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">متراژ حداقل</span>
          <select id="heroArea" name="minArea" className="inp" defaultValue="0">
            <option value="0">بدون محدودیت</option>
            <option value="100">بالای ۱۰۰ متر</option>
            <option value="150">بالای ۱۵۰ متر</option>
            <option value="200">بالای ۲۰۰ متر</option>
            <option value="300">بالای ۳۰۰ متر</option>
          </select>
        </label>
      </div>
      <button
        id="heroSearchBtn"
        className="gold-btn w-full mt-5 py-4 rounded-2xl flex items-center justify-center gap-2 text-[15px]"
      >
        <Icon name="search-check" className="w-5 h-5" /> نمایش ۱۴ ملک منتخب
      </button>
      <div className="hero-trust flex items-center justify-between mt-4 text-xs text-muted">
        {[
          ['badge-check', 'کارشناسی رسمی قیمت'],
          ['file-check', 'استعلام سند و بدهی'],
          ['lock', 'محرمانگی کامل'],
        ].map(([icon, label]) => (
          <span key={icon} className="flex items-center gap-1.5">
            <Icon name={icon} className="w-4 h-4 text-gold" /> {label}
          </span>
        ))}
      </div>
    </form>
  );
}

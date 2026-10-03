'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Property } from '@/data/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Icon } from '@/components/shared/Icon';
export function FeaturedProperties({ properties }: { properties: Property[] }) {
  const [tab, setTab] = useState('all');
  const list = properties.filter((p) => p.featured && (tab === 'all' || tab === p.deal));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 reveal">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="lux-divider" />
            <span className="text-gold text-sm font-bold tracking-wide">پیشنهاد سردبیر لوکس</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            املاک <span className="gold-text">منتخب</span> هخامنش
          </h2>
          <p className="text-muted mt-2">گلچینی از ارزشمندترین فایل‌های فروش و اجاره این هفته</p>
        </div>
        <div className="featured-controls flex items-center gap-2">
          <div
            className="flex gap-2 p-1 rounded-2xl bg-surface border border-white/5"
            role="group"
            aria-label="املاک منتخب"
          >
            {[
              ['all', 'همه'],
              ['sale', 'فروش'],
              ['rent', 'اجاره'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={tab === value}
                onClick={() => setTab(value)}
                className={`feat-tab px-4 py-2.5 rounded-xl text-sm transition ${tab === value ? 'tab-active' : 'text-muted'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <Link
            prefetch={false}
            href="/properties"
            className="ghost-btn px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5"
          >
            همه املاک <Icon name="arrow-left" className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div id="featuredGrid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}

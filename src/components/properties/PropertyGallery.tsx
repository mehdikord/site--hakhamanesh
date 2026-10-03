'use client';
import { useState } from 'react';
import type { Property } from '@/data/types';
import { faNum } from '@/lib/format';
import { LightboxButton, ShareButton } from '@/components/shared/Actions';
import { FavoriteButton } from './FavoriteButton';
export function PropertyGallery({ property: p }: { property: Property }) {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="relative rounded-[26px] overflow-hidden border border-line img-zoom bg-surface">
        <LightboxButton
          src={p.images[selected]}
          imageAlt={p.title}
          className="block w-full cursor-zoom-in"
          aria-label="بزرگ‌نمایی تصویر ملک"
        >
          <img
            id="propGalleryMain"
            src={p.images[selected]}
            alt={p.title}
            fetchPriority="high"
            className="w-full h-[320px] sm:h-[480px] object-cover"
          />
        </LightboxButton>
        <div className="detail-badges absolute top-4 right-4 flex gap-2 pointer-events-none">
          <span className="chip !bg-deep/80 backdrop-blur">
            {p.dealLabel} · {p.typeLabel}
          </span>
          {p.featured && <span className="chip badge-gold !border-0">ویژه</span>}
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <FavoriteButton
            id={p.id}
            className="w-11 h-11 rounded-xl glass border border-line flex items-center justify-center hover:border-gold transition"
          />
          <ShareButton
            title={p.title}
            className="w-11 h-11 rounded-xl glass border border-line flex items-center justify-center hover:border-gold transition"
          />
        </div>
        <span className="absolute bottom-4 left-4 chip !bg-deep/85 backdrop-blur text-[11px] pointer-events-none">
          {faNum(p.views)} بازدید · کد {p.code}
        </span>
      </div>
      <div id="propThumbs" className="grid grid-cols-3 gap-3 mt-3">
        {p.images.map((src, i) => (
          <button
            type="button"
            key={src}
            aria-label={'نمایش تصویر ' + faNum(i + 1)}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            className={`gallery-thumb ${selected === i ? 'active' : ''} rounded-2xl overflow-hidden h-24 sm:h-28 w-full`}
          >
            <img
              src={src}
              alt={p.title + ' ' + faNum(i + 1)}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}

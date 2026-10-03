import Link from 'next/link';
import type { Property } from '@/data/types';
import { faNum, propertyUrl } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
import { FavoriteButton } from './FavoriteButton';
export function PropertyCard({ property: p }: { property: Property }) {
  const href = propertyUrl(p);
  return (
    <article className="card-luxe rounded-[24px] overflow-hidden group" data-property-code={p.code}>
      <div className="relative img-zoom h-60">
        <Link prefetch={false} href={href} aria-label={p.title} className="block h-full">
          <img
            src={p.images[0]}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </Link>
        <div className="absolute top-3 right-3 flex gap-2 pointer-events-none">
          <span
            className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${p.deal === 'sale' ? 'badge-gold' : 'bg-emerald-400 text-deep'}`}
          >
            {p.dealLabel}
          </span>
          {p.featured && (
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-deep/80 backdrop-blur border border-gold/50 text-champagne flex items-center gap-1">
              ویژه
            </span>
          )}
        </div>
        <FavoriteButton
          id={p.id}
          className="absolute top-3 left-3 w-10 h-10 rounded-xl glass border border-white/15 flex items-center justify-center hover:border-gold transition"
        />
        <span className="absolute bottom-3 right-3 text-[11px] bg-deep/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
          {p.hood} · {p.code}
        </span>
      </div>
      <div className="p-5">
        <div className="text-gold font-black text-[17px]">{p.priceLabel}</div>
        <div className="text-[11px] text-muted mt-0.5">{p.priceSub}</div>
        <h3 className="font-bold text-[15px] mt-2 leading-7 line-clamp-2 min-h-[56px] hover:text-champagne transition">
          <Link prefetch={false} href={href}>
            {p.title}
          </Link>
        </h3>
        <div className="property-meta flex items-center gap-4 text-xs text-muted mt-3 pt-3 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <Icon name="ruler" className="w-4 h-4 text-gold" /> {faNum(p.area)} متر
          </span>
          {!!p.rooms && (
            <span className="flex items-center gap-1.5">
              <Icon name="bed-double" className="w-4 h-4 text-gold" /> {faNum(p.rooms)} خواب
            </span>
          )}
          {!!p.baths && (
            <span className="flex items-center gap-1.5">
              <Icon name="bath" className="w-4 h-4 text-gold" /> {faNum(p.baths)} حمام
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Link
            prefetch={false}
            href={href}
            className="gold-btn py-2.5 rounded-xl text-[13px] flex items-center justify-center gap-1.5"
          >
            <Icon name="eye" className="w-4 h-4" /> جزئیات
          </Link>
          <a
            href="tel:02122008888"
            className="ghost-btn py-2.5 rounded-xl text-[13px] flex items-center justify-center gap-1.5"
          >
            <Icon name="phone" className="w-4 h-4" /> تماس
          </a>
        </div>
      </div>
    </article>
  );
}

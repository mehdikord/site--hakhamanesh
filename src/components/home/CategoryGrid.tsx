import Link from 'next/link';
import { categories } from '@/data/categories';
import { properties } from '@/data/properties';
import { faNum } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" id="catGrid">
      {categories.map((c) => (
        <Link
          prefetch={false}
          key={c.t}
          href={'/search?type=' + c.t}
          className="relative block rounded-3xl overflow-hidden h-52 sm:h-64 group text-right border border-white/5 hover:border-gold/50 transition"
        >
          <img
            src={c.img}
            alt={c.n}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[1.2s]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top,rgba(7,17,31,.95) 10%,rgba(7,17,31,.25) 60%,transparent)',
            }}
          />
          <div className="category-overlay absolute bottom-0 right-0 left-0 p-5 flex items-end justify-between">
            <div>
              <div className="category-title font-black text-lg">{c.n}</div>
              <div className="text-xs text-champagne mt-1">
                {c.d} · {faNum(properties.filter((p) => p.type === c.t).length + 18)} فایل فعال
              </div>
            </div>
            <span className="category-arrow w-11 h-11 rounded-2xl badge-gold flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition">
              <Icon name="arrow-left" className="w-5 h-5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

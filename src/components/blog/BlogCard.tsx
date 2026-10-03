import Link from 'next/link';
import type { Article } from '@/data/types';
import { blogUrl } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
export function BlogCard({ article: b }: { article: Article }) {
  return (
    <article className="card-luxe rounded-[24px] overflow-hidden group">
      <Link prefetch={false} href={blogUrl(b)} className="block">
        <div className="img-zoom h-52 relative">
          <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
          <span className="absolute top-3 right-3 text-[11px] font-bold px-3 py-1.5 rounded-full badge-gold">
            {b.cat}
          </span>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Icon name="calendar" className="w-3.5 h-3.5" />
              {b.date}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="clock" className="w-3.5 h-3.5" />
              {b.read}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="eye" className="w-3.5 h-3.5" />
              {b.views}
            </span>
          </div>
          <h3 className="font-black mt-2 leading-7 group-hover:text-champagne transition">
            {b.title}
          </h3>
          <p className="text-xs text-muted leading-6 mt-2 line-clamp-2">{b.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold mt-3">
            ادامه مطلب <Icon name="arrow-left" className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

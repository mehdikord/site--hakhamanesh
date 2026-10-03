'use client';
import { useSearchParams } from 'next/navigation';
import { useRememberResults } from '@/lib/results-history';
import type { Article } from '@/data/types';
import { normalizeSearch } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
import { BlogCard } from './BlogCard';
export function BlogBrowser({ articles }: { articles: Article[] }) {
  const params = useSearchParams();
  useRememberResults('blog', '/blog' + (params.size ? '?' + params.toString() : ''));
  const category = params.get('category') || 'همه';
  const q = params.get('q') || '';
  const categories = ['همه', ...new Set(articles.map((a) => a.cat))];
  const list = articles.filter(
    (b) =>
      (category === 'همه' || b.cat === category) &&
      (!q || normalizeSearch(b.title + b.excerpt).includes(normalizeSearch(q))),
  );
  function change(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === 'همه') next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    window.history.replaceState(null, '', '/blog' + (query ? '?' + query : ''));
  }
  return (
    <section id="page-blog" className="page">
      <div className="blog-heading relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative">
          <div className="ornament mb-3">
            <Icon name="newspaper" className="w-5 h-5 text-gold" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            مجله ملکی <span className="gold-text">هخامنش</span>
          </h1>
          <p className="text-muted mt-3">تحلیل بازار، راهنمای خرید و حقوق ملکی به زبان ساده</p>
          <div className="max-w-xl mx-auto mt-6 relative">
            <Icon
              name="search"
              className="w-5 h-5 text-gold absolute right-4 top-1/2 -translate-y-1/2"
            />
            <input
              id="blogSearch"
              type="search"
              value={q}
              onChange={(e) => change('q', e.target.value)}
              maxLength={200}
              aria-label="جست‌وجو در مقالات"
              className="inp !pr-12 !py-4 !rounded-2xl"
              placeholder="جست‌وجو در مقالات..."
            />
          </div>
          <div id="blogCats" className="flex flex-wrap justify-center gap-2 mt-5">
            {categories.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => change('category', c)}
                aria-pressed={category === c}
                className={`px-4 py-2.5 rounded-xl text-xs border transition ${category === c ? 'tab-active border-transparent' : 'border-white/10 text-muted hover:border-gold'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div id="blogGrid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.length ? (
            list.map((b) => <BlogCard key={b.id} article={b} />)
          ) : (
            <div role="status" className="col-span-full text-center text-muted py-14">
              مقاله‌ای یافت نشد.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

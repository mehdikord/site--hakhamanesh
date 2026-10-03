import Link from 'next/link';
import { BlogPreviewGrid } from '@/components/blog/BlogPreviewGrid';
import { Icon } from '@/components/shared/Icon';

export function BlogPreview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 reveal">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="lux-divider"></span>
            <span className="text-gold text-sm font-bold">مجله ملکی هخامنش</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            تحلیل و <span className="gold-text">راهنمای</span> بازار
          </h2>
        </div>
        <Link
          prefetch={false}
          className="ghost-btn px-5 py-3 rounded-xl text-sm flex items-center gap-1.5"
          href="/blog"
        >
          همه مقالات <Icon className="w-4 h-4" name="arrow-left" />
        </Link>
      </div>
      <BlogPreviewGrid />
    </div>
  );
}

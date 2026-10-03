import { BlogBrowser } from '@/components/blog/BlogBrowser';
import { articles } from '@/data/articles';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'مجله ملکی',
  '/blog',
  'تحلیل بازار، راهنمای خرید و حقوق ملکی به زبان ساده',
);
export default function BlogPage() {
  return <BlogBrowser articles={articles} />;
}

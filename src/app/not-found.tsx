import Link from 'next/link';
import { Icon } from '@/components/shared/Icon';
export default function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="ornament mb-5">
        <Icon name="search-x" className="w-8 h-8 text-gold" />
      </div>
      <div className="gold-text text-6xl font-black mb-5">۴۰۴</div>
      <h1 className="font-black text-2xl">صفحه مورد نظر یافت نشد</h1>
      <p className="text-muted mt-3">ممکن است آدرس تغییر کرده باشد یا فایل مورد نظر موجود نباشد.</p>
      <div className="flex flex-wrap justify-center gap-3 mt-7">
        <Link prefetch={false} href="/" className="gold-btn px-6 py-3 rounded-xl">
          بازگشت به خانه
        </Link>
        <Link prefetch={false} href="/properties" className="ghost-btn px-6 py-3 rounded-xl">
          مشاهده املاک
        </Link>
      </div>
    </section>
  );
}

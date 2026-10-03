'use client';
import Link from 'next/link';
import { useSite } from '@/components/shared/useSite';
import { Icon } from '@/components/shared/Icon';
import { Dialog } from '@/components/shared/Dialog';
export function MobileMenuButton() {
  const { openMenu } = useSite();
  return (
    <button
      type="button"
      id="menuBtn"
      onClick={openMenu}
      className="lg:hidden w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center"
      aria-label="باز کردن منو"
      aria-haspopup="dialog"
    >
      <Icon name="menu" className="w-5 h-5" />
    </button>
  );
}
const links = [
  ['/', 'home', 'خانه'],
  ['/properties', 'building-2', 'املاک'],
  ['/favorites', 'heart', 'علاقه‌مندی‌ها'],
  ['/about', 'landmark', 'درباره ما'],
  ['/blog', 'newspaper', 'مجله ملکی'],
  ['/contact', 'phone-call', 'تماس با ما'],
  ['/terms', 'scale', 'قوانین و حریم خصوصی'],
];
export function MobileDrawer({ onClose }: { onClose: () => void }) {
  const { openConsult } = useSite();
  return (
    <Dialog id="mobileDrawer" label="منوی اصلی" onClose={onClose} className="fixed inset-0 z-[95]">
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="بستن منو"
      />
      <aside className="absolute top-0 bottom-0 right-0 w-[320px] bg-navy border-l border-line p-6 flex flex-col gap-2 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="font-black text-lg">
            املاک <span className="gold-text">هخامنش</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
            aria-label="بستن"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>
        {links.map(([href, icon, label]) => (
          <Link
            prefetch={false}
            key={href}
            href={href}
            onClick={onClose}
            className="p-3.5 rounded-xl hover:bg-white/5 flex items-center gap-3"
          >
            <Icon name={icon} className="w-5 h-5 text-gold" /> {label}
          </Link>
        ))}
        <div className="line-gold my-3" />
        <button
          type="button"
          onClick={() => openConsult()}
          className="gold-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name="sparkles" className="w-4 h-4" /> رزرو مشاوره رایگان
        </button>
        <a
          href="tel:02122008888"
          dir="ltr"
          className="ghost-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2 mt-2"
        >
          021-2200 8888
        </a>
        <p className="text-xs text-muted text-center mt-4 leading-6">
          فرشته، خیابان مریم شرقی، پلاک ۳۲
          <br />
          شنبه تا پنجشنبه ۹ الی ۲۱
        </p>
      </aside>
    </Dialog>
  );
}

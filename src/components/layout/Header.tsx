import Link from 'next/link';
import { Icon } from '@/components/shared/Icon';
import { NavLink } from '@/components/layout/NavLink';
import { MobileMenuButton } from '@/components/layout/MobileDrawer';
import { FavoriteCount } from '@/components/properties/FavoriteButton';
import { ConsultButton } from '@/components/shared/Actions';

export function Header() {
  return (
    <header
      id="header"
      className="sticky top-0 z-[80] glass border-b border-white/5 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-4">
        <Link
          prefetch={false}
          className="flex items-center gap-3 group brand"
          aria-label="املاک هخامنش - خانه"
          href="/"
        >
          <span
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl text-deep shadow-luxe shrink-0 brand-logo"
            style={{ background: 'linear-gradient(135deg,#F6E6A8,#C9A227 60%,#8a6f16)' }}
          >
            هـ
          </span>
          <span className="text-right leading-tight brand-copy">
            <span className="block font-black text-lg brand-title">
              املاک <span className="gold-text">هخامنش</span>
            </span>
            <span className="block text-[11px] tracking-[.28em] text-muted brand-subtitle">
              HAKHAMANESH • LUXURY ESTATE
            </span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-[15px]" aria-label="منوی اصلی">
          <NavLink href="/" className="nav-link">
            خانه
          </NavLink>
          <NavLink href="/properties" className="nav-link">
            املاک
          </NavLink>
          <NavLink href="/about" className="nav-link">
            درباره ما
          </NavLink>
          <NavLink href="/blog" className="nav-link">
            مجله ملکی
          </NavLink>
          <NavLink href="/contact" className="nav-link">
            تماس با ما
          </NavLink>
          <NavLink href="/terms" className="nav-link">
            قوانین
          </NavLink>
        </nav>
        <div className="flex items-center gap-2.5 header-actions">
          <Link
            prefetch={false}
            className="relative w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold transition"
            aria-label="علاقه‌مندی‌ها"
            href="/favorites"
          >
            <Icon className="w-5 h-5" name="heart" />
            <FavoriteCount />
          </Link>
          <ConsultButton className="hidden sm:inline-flex gold-btn px-5 py-3 rounded-xl text-sm items-center gap-2 header-consult">
            <Icon className="w-4 h-4" name="calendar-check" /> مشاوره رایگان
          </ConsultButton>
          <MobileMenuButton />
        </div>
      </div>
    </header>
  );
}

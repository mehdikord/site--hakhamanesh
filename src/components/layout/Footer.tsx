import Link from 'next/link';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { SocialLink } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function Footer() {
  return (
    <footer className="bg-[#040a15] border-t border-line pt-14 pb-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl text-deep"
              style={{ background: 'linear-gradient(135deg,#F6E6A8,#C9A227 60%,#8a6f16)' }}
            >
              هـ
            </span>
            <div>
              <div className="font-black">
                املاک <span className="gold-text">هخامنش</span>
              </div>
              <div className="text-[10px] tracking-[.25em] text-muted">LUXURY ESTATE • 1387</div>
            </div>
          </div>
          <p className="text-xs text-muted leading-7">
            مرجع تخصصی املاک لوکس شمال تهران؛ خرید، فروش، رهن و اجاره با امنیت حقوقی کامل و تجربه‌ای
            در شأن شما.
          </p>
          <div className="flex gap-2 mt-4">
            <SocialLink
              aria-label="اینستاگرام"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
              channel="instagram"
            >
              <Icon className="w-4 h-4" name="instagram" />
            </SocialLink>
            <SocialLink
              aria-label="لینکدین"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
              channel="linkedin"
            >
              <Icon className="w-4 h-4" name="linkedin" />
            </SocialLink>
            <SocialLink
              aria-label="تلگرام"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
              channel="telegram"
            >
              <Icon className="w-4 h-4" name="send" />
            </SocialLink>
            <SocialLink
              aria-label="واتساپ"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
              channel="whatsapp"
            >
              <Icon className="w-4 h-4" name="message-circle" />
            </SocialLink>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm">دسترسی سریع</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/"
              >
                خانه
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/properties"
              >
                بانک املاک
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/about"
              >
                درباره هخامنش
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/blog"
              >
                مجله ملکی
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/contact"
              >
                تماس با ما
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block"
                href="/terms"
              >
                قوانین و حریم خصوصی
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm">محبوب‌ترین محله‌ها</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block text-center"
                href="/search?city=الهیه"
              >
                الهیه و فرشته
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block text-center"
                href="/search?city=زعفرانیه"
              >
                زعفرانیه
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block text-center"
                href="/search?city=فرمانیه"
              >
                فرمانیه و نیاوران
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block text-center"
                href="/search?city=لواسان"
              >
                لواسان
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                className="hover:text-champagne transition inline-block text-center"
                href="/search?city=سعادت‌آباد"
              >
                سعادت‌آباد
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm">تماس و نماد اعتماد</h4>
          <div className="text-sm space-y-2.5 text-muted">
            <p className="flex gap-2">
              <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="map-pin" /> فرشته، مریم
              شرقی، پلاک ۳۲
            </p>
            <p className="flex gap-2">
              <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="phone" />{' '}
              <span dir="ltr">021-2200 8888</span>
            </p>
            <p className="flex gap-2">
              <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="mail" />{' '}
              <span dir="ltr">info@hakhamanesh.estate</span>
            </p>
          </div>
          <NewsletterForm compact />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <span>
          © <span id="year">۱۴۰۵</span> املاک هخامنش · کلیه حقوق محفوظ است.
        </span>
        <span className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-gold" name="shield-check" /> مجوز رسمی اتحادیه · کد رهگیری
          هوشمند
        </span>
      </div>
    </footer>
  );
}

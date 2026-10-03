import { SocialLink } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function TopBar() {
  return (
    <div className="hidden md:block bg-[#050c18] border-b border-white/5 text-[13px]">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between text-muted topbar-content">
        <div className="flex items-center gap-6 topbar-info">
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gold" name="shield-check" /> دارای مجوز رسمی اتحادیه
            مشاوران املاک تهران
          </span>
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gold" name="clock" /> شنبه تا پنجشنبه ۹ تا ۲۱ — جمعه ۱۰ تا
            ۱۸
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="tel:02122008888"
            dir="ltr"
            className="flex items-center gap-2 hover:text-champagne transition"
          >
            <Icon className="w-4 h-4 text-gold" name="phone" /> 021-2200 8888
          </a>
          <span className="flex items-center gap-3">
            <SocialLink
              aria-label="اینستاگرام"
              className="hover:text-gold transition"
              channel="instagram"
            >
              <Icon className="w-4 h-4" name="instagram" />
            </SocialLink>
            <SocialLink
              aria-label="لینکدین"
              className="hover:text-gold transition"
              channel="linkedin"
            >
              <Icon className="w-4 h-4" name="linkedin" />
            </SocialLink>
            <SocialLink
              aria-label="تلگرام"
              className="hover:text-gold transition"
              channel="telegram"
            >
              <Icon className="w-4 h-4" name="send" />
            </SocialLink>
          </span>
        </div>
      </div>
    </div>
  );
}

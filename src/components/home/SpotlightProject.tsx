import Link from 'next/link';
import { ConsultButton, LightboxButton } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function SpotlightProject() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="rounded-[30px] overflow-hidden border border-line grid lg:grid-cols-2 bg-surface reveal">
        <div className="relative min-h-[340px]">
          <img
            src="/images/photo-1545324418-cc1a3fa10c00-1200.jpg"
            alt="برج هخامنش الهیه"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#101D31]/40"></div>
          <span className="absolute top-5 right-5 chip !bg-deep/80 backdrop-blur">
            <Icon className="w-4 h-4 text-gold" name="sparkles" /> پروژه انحصاری · پیش‌فروش فاز ۲
          </span>
          <LightboxButton
            className="absolute bottom-5 right-5 glass border border-line px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:border-gold transition"
            src="/images/photo-1545324418-cc1a3fa10c00-1200.jpg"
            imageAlt="برج هخامنش الهیه"
          >
            <Icon className="w-4 h-4 text-gold" name="play" /> تور ویدیویی برج
          </LightboxButton>
        </div>
        <div className="p-8 sm:p-10">
          <div className="text-gold text-sm font-bold mb-2">الهیه · خیابان فرشته</div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug">
            برج مسکونی <span className="gold-text">هخامنش پالاس</span>
            <br />
            ۲۸ واحد · لابی ۹ متری · روف‌لژ
          </h3>
          <p className="text-muted text-sm leading-7 mt-3">
            طراحی معماری مینیمال با سنگ تراورتن عباس‌آباد، سیستم هوشمند KNX، استخر无限، سالن
            اجتماعات و ۳ طبقه پارکینگ باکس‌دار. تحویل زمستان ۱۴۰۵.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6 text-center">
            <div className="bg-deep/70 border border-white/5 rounded-2xl p-3">
              <div className="font-black text-lg">۱۸۰ تا ۴۲۰</div>
              <div className="text-[11px] text-muted">متراژ (متر)</div>
            </div>
            <div className="bg-deep/70 border border-white/5 rounded-2xl p-3">
              <div className="font-black text-lg gold-text">۸۷٪</div>
              <div className="text-[11px] text-muted">پیشرفت فیزیکی</div>
            </div>
            <div className="bg-deep/70 border border-white/5 rounded-2xl p-3">
              <div className="font-black text-lg">از متری ۱۹۸م</div>
              <div className="text-[11px] text-muted">قیمت پیش‌فروش</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span>ظرفیت باقی‌مانده فاز ۲</span>
              <span className="text-champagne font-bold">۶ واحد از ۱۴ واحد</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full w-[57%] rounded-full"
                style={{ background: 'linear-gradient(90deg,#E3C76F,#C9A227)' }}
              ></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <ConsultButton
              className="gold-btn px-6 py-3.5 rounded-xl text-sm flex items-center gap-2"
              kind="project"
            >
              <Icon className="w-4 h-4" name="calendar-days" /> رزرو بازدید از شوروم
            </ConsultButton>
            <Link
              prefetch={false}
              className="ghost-btn px-6 py-3.5 rounded-xl text-sm inline-block"
              href="/contact"
            >
              دریافت بروشور
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

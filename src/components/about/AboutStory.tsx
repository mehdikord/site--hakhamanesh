import { Icon } from '@/components/shared/Icon';

export function AboutStory() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-2 gap-10 items-center">
      <div className="rounded-[28px] overflow-hidden border border-line img-zoom">
        <img
          src="/images/photo-1497366216548-37526070297c-1200.jpg"
          className="w-full h-[420px] object-cover"
          alt="دفتر هخامنش"
          loading="lazy"
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="lux-divider"></span>
          <span className="text-gold text-sm font-bold">منشور ما</span>
        </div>
        <h2 className="text-3xl font-black leading-snug">
          معماریِ اعتماد،
          <br />
          مهندسیِ <span className="gold-text">سرمایه</span>
        </h2>
        <p className="text-muted text-sm leading-8 mt-4">
          هخامنش با الهام از شکوه معماری ایران باستان و استانداردهای روز مشاوره املاک جهان تأسیس شد.
          ما ملک نمی‌فروشیم؛ سبک زندگی، امنیت دارایی و آینده مالی می‌سازیم. هر فایل پیش از انتشار از
          ۴۰ فیلتر کیفی، حقوقی و قیمتی عبور می‌کند.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6 about-values">
          <div className="bg-surface border border-white/5 rounded-2xl p-4 flex gap-3">
            <Icon className="w-6 h-6 text-gold shrink-0" name="eye" />
            <div>
              <div className="font-bold text-sm">شفافیت</div>
              <div className="text-xs text-muted">قیمت واقعی، سند شفاف</div>
            </div>
          </div>
          <div className="bg-surface border border-white/5 rounded-2xl p-4 flex gap-3">
            <Icon className="w-6 h-6 text-gold shrink-0" name="gem" />
            <div>
              <div className="font-bold text-sm">پرستیژ</div>
              <div className="text-xs text-muted">تجربه‌ای در شأن شما</div>
            </div>
          </div>
          <div className="bg-surface border border-white/5 rounded-2xl p-4 flex gap-3">
            <Icon className="w-6 h-6 text-gold shrink-0" name="brain" />
            <div>
              <div className="font-bold text-sm">تخصص</div>
              <div className="text-xs text-muted">تحلیل‌گر بازار، نه واسطه</div>
            </div>
          </div>
          <div className="bg-surface border border-white/5 rounded-2xl p-4 flex gap-3">
            <Icon className="w-6 h-6 text-gold shrink-0" name="lock" />
            <div>
              <div className="font-bold text-sm">امنیت</div>
              <div className="text-xs text-muted">وکیل و بیمه قرارداد</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

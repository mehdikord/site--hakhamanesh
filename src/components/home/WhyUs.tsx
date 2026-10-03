import { Calculator } from '@/components/home/Calculator';
import { Icon } from '@/components/shared/Icon';

export function WhyUs() {
  return (
    <div className="bg-[#050c18] border-y border-line py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-2">
            <span className="lux-divider"></span>
            <span className="text-gold text-sm font-bold">چرا هخامنش؟</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black leading-snug">
            اعتماد، <span className="gold-text">امضای</span> ماست
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-7">
            <div className="bg-surface border border-white/5 rounded-2xl p-5 hover:border-gold/40 transition">
              <Icon className="w-7 h-7 text-gold mb-3" name="shield-check" />
              <h4 className="font-bold mb-1">امنیت حقوقی ۱۰۰٪</h4>
              <p className="text-xs text-muted leading-6">
                وکیل ملکی اختصاصی، استعلام ثبتی، شهرداری و بدهی بانکی پیش از هر قرارداد.
              </p>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl p-5 hover:border-gold/40 transition">
              <Icon className="w-7 h-7 text-gold mb-3" name="gem" />
              <h4 className="font-bold mb-1">استاندارد لوکس</h4>
              <p className="text-xs text-muted leading-6">
                فقط فایل‌های درجه A با سند تک‌برگ، پایان‌کار و متریال درجه یک.
              </p>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl p-5 hover:border-gold/40 transition">
              <Icon className="w-7 h-7 text-gold mb-3" name="line-chart" />
              <h4 className="font-bold mb-1">تحلیل سرمایه‌گذاری</h4>
              <p className="text-xs text-muted leading-6">
                گزارش رشد محله، پیش‌بینی ۵ ساله و مشاوره سبد ملکی اختصاصی.
              </p>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl p-5 hover:border-gold/40 transition">
              <Icon className="w-7 h-7 text-gold mb-3" name="headset" />
              <h4 className="font-bold mb-1">پشتیبانی مادام‌العمر</h4>
              <p className="text-xs text-muted leading-6">
                از بازدید تا دکوراسیون، اجاره‌داری و فروش مجدد در کنار شمائیم.
              </p>
            </div>
          </div>
        </div>
        <Calculator />
      </div>
    </div>
  );
}

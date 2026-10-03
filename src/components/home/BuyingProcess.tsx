import { Icon } from '@/components/shared/Icon';

export function BuyingProcess() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10 reveal">
        <div className="ornament mb-3">
          <Icon className="w-5 h-5 text-gold" name="route" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black">
          مسیر شما تا <span className="gold-text">کلید طلایی</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="relative card-luxe rounded-3xl p-6 reveal">
          <span className="text-5xl font-black text-white/5 absolute top-4 left-5">۰۱</span>
          <div className="w-12 h-12 rounded-2xl badge-gold flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" name="messages-square" />
          </div>
          <h4 className="font-bold mb-1.5">مشاوره و نیازسنجی</h4>
          <p className="text-xs text-muted leading-6">
            جلسه حضوری یا آنلاین، تعیین بودجه، محله و هدف سرمایه‌گذاری.
          </p>
        </div>
        <div className="relative card-luxe rounded-3xl p-6 reveal">
          <span className="text-5xl font-black text-white/5 absolute top-4 left-5">۰۲</span>
          <div className="w-12 h-12 rounded-2xl badge-gold flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" name="building" />
          </div>
          <h4 className="font-bold mb-1.5">بازدید VIP</h4>
          <p className="text-xs text-muted leading-6">
            تور اختصاصی با خودروی مجموعه + گزارش کارشناسی هر ملک.
          </p>
        </div>
        <div className="relative card-luxe rounded-3xl p-6 reveal">
          <span className="text-5xl font-black text-white/5 absolute top-4 left-5">۰۳</span>
          <div className="w-12 h-12 rounded-2xl badge-gold flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" name="scale" />
          </div>
          <h4 className="font-bold mb-1.5">مذاکره و قرارداد</h4>
          <p className="text-xs text-muted leading-6">
            چانه‌زنی حرفه‌ای، تنظیم مبایعه‌نامه رسمی با کد رهگیری.
          </p>
        </div>
        <div className="relative card-luxe rounded-3xl p-6 reveal">
          <span className="text-5xl font-black text-white/5 absolute top-4 left-5">۰۴</span>
          <div className="w-12 h-12 rounded-2xl badge-gold flex items-center justify-center mb-4">
            <Icon className="w-6 h-6" name="key-round" />
          </div>
          <h4 className="font-bold mb-1.5">سند و تحویل</h4>
          <p className="text-xs text-muted leading-6">
            همراهی در دفترخانه، تسویه، تحویل کلید و خدمات پس از فروش.
          </p>
        </div>
      </div>
    </div>
  );
}

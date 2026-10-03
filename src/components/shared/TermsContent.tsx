import { ConsultButton } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function TermsContent() {
  return (
    <section id="page-terms" className="page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <div className="ornament mb-3">
            <Icon className="w-5 h-5 text-gold" name="scale" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            قوانین، کمیسیون و <span className="gold-text">حریم خصوصی</span>
          </h1>
          <p className="text-muted text-sm mt-2">
            آخرین به‌روزرسانی: مهر ۱۴۰۵ · شفاف، بدون بند پنهان
          </p>
        </div>
        <div className="card-luxe rounded-3xl p-7 sm:p-9 space-y-7 text-sm leading-8 text-[#D6DCE6]">
          <div>
            <h3 className="font-black text-lg mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl badge-gold text-deep font-black flex items-center justify-center text-sm">
                ۱
              </span>{' '}
              تعاریف و scope خدمات
            </h3>
            <p className="text-muted">
              املاک هخامنش (دارای مجوز رسمی اتحادیه مشاوران املاک تهران) ارائه‌دهنده خدمات خرید،
              فروش، رهن و اجاره، کارشناسی قیمت، مدیریت پیمان و مشاوره سرمایه‌گذاری ملکی است. کلیه
              فایل‌ها با کد اختصاصی (HX) و استعلام ثبتی منتشر می‌شوند.
            </p>
          </div>
          <div>
            <h3 className="font-black text-lg mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl badge-gold text-deep font-black flex items-center justify-center text-sm">
                ۲
              </span>{' '}
              کمیسیون قانونی
            </h3>
            <p className="text-muted">
              کمیسیون طبق تعرفه مصوب اتحادیه: برای معاملات فروش ۰/۵٪ از هر طرف + ۱۰٪ مالیات بر ارزش
              افزوده؛ برای رهن و اجاره معادل یک‌چهارم اجاره ماهانه از هر طرف (حداقل‌ها طبق مصوبه
              سال). فاکتور رسمی و کد رهگیری برای هر قرارداد صادر می‌شود.
            </p>
          </div>
          <div>
            <h3 className="font-black text-lg mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl badge-gold text-deep font-black flex items-center justify-center text-sm">
                ۳
              </span>{' '}
              حریم خصوصی و محرمانگی
            </h3>
            <p className="text-muted">
              اطلاعات تماس، بودجه و فایل‌های بازدیدشده شما کاملاً محرمانه است و بدون رضایت کتبی در
              اختیار ثالث قرار نمی‌گیرد. داده‌ها روی سرورهای داخل کشور با رمزنگاری نگهداری و با
              درخواست شما حذف می‌شوند. عضویت در خبرنامه با یک کلیک لغو می‌شود.
            </p>
          </div>
          <div>
            <h3 className="font-black text-lg mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl badge-gold text-deep font-black flex items-center justify-center text-sm">
                ۴
              </span>{' '}
              تضمین صحت فایل‌ها
            </h3>
            <p className="text-muted">
              هر ملک پیش از انتشار، استعلام سند، پایان‌کار، بدهی شهرداری و رهن بانکی می‌شود. در صورت
              مغایرت اساسی مشخصات با واقعیت، هزینه کارشناسی عودت و قرارداد بدون جریمه فسخ می‌شود.
            </p>
          </div>
          <div className="rounded-2xl bg-deep/60 border border-line p-5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-muted">
              سؤالی درباره قراردادها دارید؟ وکیل ملکی ما رایگان پاسخ می‌دهد.
            </span>
            <ConsultButton className="gold-btn px-5 py-3 rounded-xl text-xs" kind="legal">
              مشاوره حقوقی رایگان
            </ConsultButton>
          </div>
        </div>
      </div>
    </section>
  );
}

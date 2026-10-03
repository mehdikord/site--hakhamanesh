export function CompanyTimeline() {
  return (
    <div className="bg-[#050c18] border-y border-line py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-10">
          مسیر <span className="gold-text">افتخار</span>
        </h2>
        <div className="relative timeline-line space-y-7 pr-12">
          <div className="relative">
            <span className="absolute -right-12 top-0 w-10 h-10 rounded-full badge-gold font-black text-sm flex items-center justify-center">
              ۸۷
            </span>
            <div className="card-luxe rounded-2xl p-5">
              <div className="font-bold">۱۳۸۷ · تأسیس در فرشته</div>
              <p className="text-xs text-muted mt-1 leading-6">
                شروع با ۳ مشاور و تمرکز بر آپارتمان‌های نوساز الهیه و فرشته.
              </p>
            </div>
          </div>
          <div className="relative">
            <span className="absolute -right-12 top-0 w-10 h-10 rounded-full bg-surface border border-gold/40 text-gold font-black text-sm flex items-center justify-center">
              ۹۴
            </span>
            <div className="card-luxe rounded-2xl p-5">
              <div className="font-bold">۱۳۹۴ · دپارتمان ویلا و زمین</div>
              <p className="text-xs text-muted mt-1 leading-6">
                ورود به لواسان، کردان و فشم با تیم کارشناسی رسمی دادگستری.
              </p>
            </div>
          </div>
          <div className="relative">
            <span className="absolute -right-12 top-0 w-10 h-10 rounded-full bg-surface border border-gold/40 text-gold font-black text-sm flex items-center justify-center">
              ۹۹
            </span>
            <div className="card-luxe rounded-2xl p-5">
              <div className="font-bold">۱۳۹۹ · پلتفرم دیجیتال و تور مجازی</div>
              <p className="text-xs text-muted mt-1 leading-6">
                اولین مجموعه تهران با تور سه‌بعدی، قرارداد آنلاین و باشگاه مشتریان.
              </p>
            </div>
          </div>
          <div className="relative">
            <span className="absolute -right-12 top-0 w-10 h-10 rounded-full badge-gold font-black text-sm flex items-center justify-center">
              ۰۵
            </span>
            <div className="card-luxe rounded-2xl p-5">
              <div className="font-bold">۱۴۰۵ · برج هخامنش پالاس</div>
              <p className="text-xs text-muted mt-1 leading-6">
                ورود به توسعه‌گری انحصاری؛ ۲۸ واحد لوکس در الهیه با فروش ۸۷٪ در پیش‌فروش.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

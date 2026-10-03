import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { ConsultButton } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function ValuationCTA() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="reveal relative rounded-[30px] overflow-hidden border border-gold/30">
        <img
          src="/images/photo-1600607687939-ce8a6c25118c-1600.jpg"
          alt="دکوراسیون لوکس"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to left,rgba(7,17,31,.95),rgba(7,17,31,.65))' }}
        ></div>
        <div className="relative p-8 sm:p-14 grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black leading-snug">
              ملک شما امروز چقدر <span className="gold-text">می‌ارزد؟</span>
              <br />
              کارشناسی رایگان در ۲۴ ساعت
            </h2>
            <p className="text-muted mt-3 text-sm sm:text-base">
              فرم را پر کنید؛ کارشناس ارشد منطقه شما تماس می‌گیرد و گزارش مکتوب قیمت + استراتژی فروش
              ارسال می‌شود.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <ConsultButton
                className="gold-btn px-7 py-4 rounded-2xl text-sm flex items-center gap-2"
                kind="sell"
              >
                <Icon className="w-5 h-5" name="badge-dollar-sign" /> درخواست کارشناسی رایگان
              </ConsultButton>
              <a
                href="tel:02122008888"
                className="glass border border-line px-7 py-4 rounded-2xl text-sm flex items-center gap-2 hover:border-gold transition"
              >
                <Icon className="w-5 h-5 text-gold" name="phone" />{' '}
                <span dir="ltr">021-2200 8888</span>
              </a>
            </div>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}

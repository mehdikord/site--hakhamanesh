import { ContactForm } from '@/components/forms/ContactForm';
import { FaqAccordion } from '@/components/contact/FaqAccordion';
import { Icon } from '@/components/shared/Icon';

export function ContactContent() {
  return (
    <section id="page-contact" className="page">
      <div className="relative py-16 overflow-hidden text-center">
        <img
          src="/images/photo-1560518883-ce09059eeffa-1800.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="تماس"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/60 to-deep"></div>
        <div className="relative">
          <div className="ornament mb-3">
            <Icon className="w-5 h-5 text-gold" name="phone-call" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            در کنار <span className="gold-text">شما</span> هستیم
          </h1>
          <p className="text-muted mt-3">پاسخ‌گویی در کمتر از ۱۵ دقیقه در ساعات کاری</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid lg:grid-cols-[1fr_1.1fr] gap-7 items-start">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="tel:02122008888" className="card-luxe rounded-3xl p-5 block">
              <Icon className="w-6 h-6 text-gold mb-2" name="phone" />
              <div className="font-bold text-sm">تلفن دفتر مرکزی</div>
              <div dir="ltr" className="text-champagne font-black mt-1 text-right">
                021-2200 8888
              </div>
            </a>
            <a href="tel:09121234567" className="card-luxe rounded-3xl p-5 block">
              <Icon className="w-6 h-6 text-gold mb-2" name="smartphone" />
              <div className="font-bold text-sm">خط ویژه VIP</div>
              <div dir="ltr" className="text-champagne font-black mt-1 text-right">
                0912-123 4567
              </div>
            </a>
            <div className="card-luxe rounded-3xl p-5">
              <Icon className="w-6 h-6 text-gold mb-2" name="map-pin" />
              <div className="font-bold text-sm">نشانی</div>
              <div className="text-xs text-muted mt-1 leading-6">
                تهران، فرشته، مریم شرقی، پلاک ۳۲، ساختمان هخامنش
              </div>
            </div>
            <div className="card-luxe rounded-3xl p-5">
              <Icon className="w-6 h-6 text-gold mb-2" name="clock" />
              <div className="font-bold text-sm">ساعات کاری</div>
              <div className="text-xs text-muted mt-1 leading-6">
                شنبه تا پنجشنبه ۹ تا ۲۱
                <br />
                جمعه ۱۰ تا ۱۸
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-line">
            <iframe
              title="نقشه دفتر"
              src="https://www.google.com/maps?q=Fereshteh,Tehran&output=embed"
              className="w-full h-64 grayscale invert-[.92]"
              loading="lazy"
            ></iframe>
          </div>
          <div className="card-luxe rounded-3xl p-6">
            <h3 className="font-black mb-4">سوالات پرتکرار</h3>
            <FaqAccordion />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

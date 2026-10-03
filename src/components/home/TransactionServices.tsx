import Link from 'next/link';
import { ConsultButton } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function TransactionServices() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 reveal">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="lux-divider"></span>
            <span className="text-gold text-sm font-bold">نوع معامله شما چیست؟</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            خدمات <span className="gold-text">خرید، فروش، رهن و اجاره</span>
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-luxe rounded-[26px] p-8 relative overflow-hidden reveal group">
          <img
            src="/images/photo-1560518883-ce09059eeffa-800.jpg"
            alt="خرید ملک"
            className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a2e] via-[#0d1a2e]/80 to-transparent"></div>
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl badge-gold flex items-center justify-center mb-5 shadow-luxe">
              <Icon className="w-7 h-7" name="key-round" />
            </div>
            <h3 className="text-xl font-black mb-2">خرید اختصاصی</h3>
            <p className="text-muted text-sm leading-7 mb-5">
              جست‌وجوی آف‌مارکت، کارشناسی قیمت، مذاکره حرفه‌ای و همراهی حقوقی تا انتقال سند. میانگین
              ۱۲٪ زیر قیمت بازار می‌خریم.
            </p>
            <ul className="text-sm space-y-2.5 mb-6">
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> دسترسی
                به فایل‌های اختصاصی و پیش‌فروش
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> گزارش
                کارشناسی ۴۰ آیتمی + استعلام ثبتی
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> مشاور
                اختصاصی و بازدید VIP
              </li>
            </ul>
            <Link
              prefetch={false}
              className="gold-btn w-full py-3.5 rounded-xl text-sm inline-block text-center"
              href="/search?deal=sale"
            >
              مشاهده فایل‌های خرید
            </Link>
          </div>
        </div>
        <div
          className="card-luxe rounded-[26px] p-8 relative overflow-hidden reveal group !border-gold/40"
          style={{
            boxShadow: '0 0 0 1px rgba(201,162,39,.25),0 30px 80px -25px rgba(201,162,39,.35)',
          }}
        >
          <img
            src="/images/photo-1600585154340-be6161a56a0c-800.jpg"
            alt="فروش ملک"
            className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a2e] via-[#0d1a2e]/80 to-transparent"></div>
          <div className="relative">
            <div className="inline-flex chip mb-4 !text-[11px]">
              پرفروش‌ترین سرویس · فروش ۳ برابر سریع‌تر
            </div>
            <div className="w-14 h-14 rounded-2xl badge-gold flex items-center justify-center mb-5 shadow-luxe">
              <Icon className="w-7 h-7" name="trending-up" />
            </div>
            <h3 className="text-xl font-black mb-2">فروش به بالاترین قیمت</h3>
            <p className="text-muted text-sm leading-7 mb-5">
              عکاسی سینمایی، تیزر هوایی، هوم‌استیجینگ و بازاریابی در ۱۲ پلتفرم. رکورد فروش پنت‌هاوس
              الهیه در ۹ روز.
            </p>
            <ul className="text-sm space-y-2.5 mb-6">
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" />{' '}
                قیمت‌گذاری علمی با هوش بازار شمال تهران
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> عکاسی،
                فیلمبرداری و تور مجازی رایگان
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> تسویه و
                انتقال سند در ۴۸ ساعت
              </li>
            </ul>
            <ConsultButton className="gold-btn w-full py-3.5 rounded-xl text-sm" kind="sell">
              ثبت درخواست فروش
            </ConsultButton>
          </div>
        </div>
        <div className="card-luxe rounded-[26px] p-8 relative overflow-hidden reveal group">
          <img
            src="/images/photo-1522708323590-d24dbb6b0267-800.jpg"
            alt="رهن و اجاره"
            className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a2e] via-[#0d1a2e]/80 to-transparent"></div>
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl badge-gold flex items-center justify-center mb-5 shadow-luxe">
              <Icon className="w-7 h-7" name="file-signature" />
            </div>
            <h3 className="text-xl font-black mb-2">رهن و اجاره مطمئن</h3>
            <p className="text-muted text-sm leading-7 mb-5">
              اعتبارسنجی مستأجر و موجر، قرارداد رسمی با کد رهگیری، بیمه اجاره و مدیریت سالانه ملک
              شما.
            </p>
            <ul className="text-sm space-y-2.5 mb-6">
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> تبدیل
                رهن و اجاره با بهترین فرمول روز
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" /> مدیریت
                کامل ملک اجاره‌ای (۰ تا ۱۰۰)
              </li>
              <li className="flex gap-2">
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" name="check-circle-2" />{' '}
                پشتیبانی حقوقی یک‌ساله قرارداد
              </li>
            </ul>
            <Link
              prefetch={false}
              className="gold-btn w-full py-3.5 rounded-xl text-sm inline-block text-center"
              href="/search?deal=rent"
            >
              مشاهده فایل‌های اجاره
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

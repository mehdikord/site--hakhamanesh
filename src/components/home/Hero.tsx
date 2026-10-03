import Link from 'next/link';
import { HeroSearch } from '@/components/home/HeroSearch';
import { ConsultButton } from '@/components/shared/Actions';
import { Icon } from '@/components/shared/Icon';

export function Hero() {
  return (
    <div className="relative min-h-[96vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/photo-1613490493576-7fde63acd811-2000.jpg"
          alt="ویلای لوکس مدرن در شب"
          className="w-full h-full object-cover hero-kenburns"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left,rgba(7,17,31,.96) 20%,rgba(7,17,31,.72) 55%,rgba(7,17,31,.35) 100%)',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top,#07111F 2%,transparent 45%)' }}
        ></div>
        <div className="absolute inset-0 dot-pattern opacity-40"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 w-full grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
        <div className="reveal in">
          <div className="inline-flex items-center gap-2 chip !py-2 !px-4 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span> از ۱۳۸۷ · مرجع
            املاک لوکس شمال تهران
          </div>
          <h1 className="text-[2.4rem] sm:text-6xl lg:text-[4.2rem] font-black leading-[1.15]">
            سکونت در شأنِ
            <br />
            <span className="gold-text">میراثِ هخامنش</span>
          </h1>
          <p className="text-muted text-base sm:text-lg leading-8 mt-5 max-w-xl">
            خرید، فروش، رهن و اجاره آپارتمان، ویلا، زمین و املاک تجاری با استاندارد جهانی؛ کارشناسی
            دقیق، امنیت حقوقی کامل و همراهی اختصاصی تا سند.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-7">
            <Link
              prefetch={false}
              className="gold-btn px-7 py-4 rounded-2xl flex items-center gap-2 text-[15px]"
              href="/search"
            >
              <Icon className="w-5 h-5" name="search" /> جست‌وجوی املاک لوکس
            </Link>
            <ConsultButton className="ghost-btn px-7 py-4 rounded-2xl flex items-center gap-2 text-[15px] bg-white/5 backdrop-blur">
              <Icon className="w-5 h-5 text-gold" name="video" /> مشاوره تصویری رایگان
            </ConsultButton>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex avatar-stack">
              <img
                className="w-11 h-11 rounded-full border-2 border-navy object-cover"
                src="/images/photo-1560250097-0b93528c311a-200.jpg"
                alt="مشتری"
              />
              <img
                className="w-11 h-11 rounded-full border-2 border-navy object-cover"
                src="/images/photo-1573496359142-b8d87734a5a2-200.jpg"
                alt="مشتری"
              />
              <img
                className="w-11 h-11 rounded-full border-2 border-navy object-cover"
                src="/images/photo-1472099645785-5658abf4ff4e-200.jpg"
                alt="مشتری"
              />
              <span className="w-11 h-11 rounded-full border-2 border-navy bg-gold text-deep text-xs font-black flex items-center justify-center">
                ۴.۹
              </span>
            </div>
            <div className="text-sm leading-6">
              <div className="flex gap-1 text-gold">
                <Icon className="w-4 h-4 fill-current" name="star" />
                <Icon className="w-4 h-4 fill-current" name="star" />
                <Icon className="w-4 h-4 fill-current" name="star" />
                <Icon className="w-4 h-4 fill-current" name="star" />
                <Icon className="w-4 h-4 fill-current" name="star" />
              </div>
              <span className="text-white font-bold">+۴٬۸۰۰ معامله موفق</span>{' '}
              <span className="text-muted">· رضایت ۹۸٪ مشتریان</span>
            </div>
          </div>
        </div>

        <HeroSearch />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted text-xs">
        <span>اسکرول کنید</span>
        <span className="w-[22px] h-9 rounded-full border border-white/20 flex justify-center pt-1.5">
          <span className="w-1 h-2 rounded-full bg-gold animate-bounce"></span>
        </span>
      </div>
    </div>
  );
}

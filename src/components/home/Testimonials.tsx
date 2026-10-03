'use client';
import { useEffect, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { Icon } from '@/components/shared/Icon';
import { faNum } from '@/lib/format';
export function Testimonials() {
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(timer);
  }, [paused]);
  const t = testimonials[index];
  const step = (n: number) => setIndex((i) => (i + n + testimonials.length) % testimonials.length);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8 reveal">
        <div className="ornament mb-3">
          <Icon name="quote" className="w-5 h-5 text-gold" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black">
          صدای <span className="gold-text">مشتریان</span> ما
        </h2>
      </div>
      <div
        className="reveal card-luxe rounded-[28px] p-8 sm:p-10 relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
      >
        <Icon name="quote" className="w-16 h-16 text-gold/10 absolute top-6 left-6" />
        <div id="testiBox" className="relative min-h-[190px]">
          <div className="flex gap-1 text-gold mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-base sm:text-lg leading-9">«{t.text}»</p>
          <div className="flex items-center gap-3 mt-5">
            <img
              src={t.img}
              alt={t.name}
              loading="lazy"
              className="w-14 h-14 rounded-2xl object-cover border border-gold/40"
            />
            <div>
              <div className="font-bold text-sm">{t.name}</div>
              <div className="text-xs text-gold">{t.role}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div id="testiDots" className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setIndex(i)}
                aria-label={'نظر ' + faNum(i + 1)}
                aria-pressed={index === i}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-gold' : 'w-2 bg-white/15'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold transition"
              aria-label="قبلی"
            >
              <Icon name="chevron-right" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold transition"
              aria-label="بعدی"
            >
              <Icon name="chevron-left" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="rounded-2xl border border-white/5 bg-surface p-4">
          <img
            src="/images/photo-1560518883-ce09059eeffa-200.jpg"
            className="h-8 mx-auto object-contain opacity-60 grayscale"
            loading="lazy"
            alt="اتحادیه املاک"
          />
          <div className="text-[11px] text-muted mt-1">عضو رسمی اتحادیه</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface p-4">
          <div className="font-black gold-text">ISO 9001</div>
          <div className="text-[11px] text-muted mt-1">مدیریت کیفیت</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface p-4">
          <div className="font-black gold-text">نشان اعتماد</div>
          <div className="text-[11px] text-muted mt-1">۵ سال متوالی برند برتر</div>
        </div>
      </div>
    </div>
  );
}

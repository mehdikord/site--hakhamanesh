'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
export function SiteEffects() {
  const path = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  const toTop = useRef<HTMLButtonElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let width = 0;
    const bar = setInterval(() => {
      width += 18;
      if (loadBar.current) loadBar.current.style.width = Math.min(width, 100) + '%';
      if (width >= 100) clearInterval(bar);
    }, 120);
    const timer = setTimeout(() => setLoaded(true), 1100);
    return () => {
      clearInterval(bar);
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.enhanced = 'true';
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => observer.observe(el));
    let frame = 0;
    function update() {
      const html = document.documentElement;
      const denominator = html.scrollHeight - html.clientHeight;
      if (progress.current)
        progress.current.style.width =
          (denominator > 0 ? (html.scrollTop / denominator) * 100 : 0) + '%';
      if (toTop.current) toTop.current.style.display = html.scrollTop > 600 ? 'block' : 'none';
      const header = document.getElementById('header');
      if (header)
        header.style.boxShadow = html.scrollTop > 10 ? '0 10px 40px -12px rgba(0,0,0,.6)' : 'none';
    }
    function scroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);
  return (
    <>
      <div id="preloader" className={loaded ? 'hide' : ''} aria-hidden="true">
        <div className="loader-ring">
          <span className="text-3xl font-black gold-text">هـ</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black tracking-tight">
            املاک <span className="gold-text">هخامنش</span>
          </div>
          <div className="text-xs text-muted mt-1 tracking-[.3em]">
            HAKHAMANESH ESTATE • SINCE 1387
          </div>
        </div>
        <div className="w-52 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={loadBar}
            className="h-full w-0 bg-gradient-to-l from-champagne to-gold transition-all"
          />
        </div>
      </div>
      <div className="fixed top-0 right-0 left-0 h-[3px] z-[90] bg-transparent">
        <div
          ref={progress}
          className="h-full w-0 bg-gradient-to-l from-champagne via-gold to-champagne"
        />
      </div>
      <div className="fixed bottom-5 left-5 z-[70] flex flex-col gap-2.5">
        <button
          type="button"
          ref={toTop}
          id="toTop"
          style={{ display: 'none' }}
          className="w-12 h-12 rounded-2xl glass border border-line items-center justify-center hover:border-gold transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="بازگشت به بالا"
        >
          <Icon name="arrow-up" className="w-5 h-5 mx-auto" />
        </button>
        <a
          href="tel:02122008888"
          className="w-12 h-12 rounded-2xl gold-btn flex items-center justify-center shadow-luxe"
          aria-label="تماس سریع"
        >
          <Icon name="phone-call" className="w-5 h-5" />
        </a>
      </div>
    </>
  );
}

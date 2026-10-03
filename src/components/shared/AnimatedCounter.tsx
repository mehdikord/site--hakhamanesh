'use client';
import { useEffect, useRef, useState } from 'react';
import { faNum } from '@/lib/format';
export function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        let count = 0;
        const step = Math.max(1, Math.ceil(value / 60));
        setCurrent(0);
        timer = setInterval(() => {
          count = Math.min(value, count + step);
          setCurrent(count);
          if (count === value) clearInterval(timer);
        }, 28);
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [value]);
  return <span ref={ref}>{faNum(current)}</span>;
}

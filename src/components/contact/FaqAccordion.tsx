'use client';
import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Icon } from '@/components/shared/Icon';
export function FaqAccordion() {
  const [open, setOpen] = useState<number[]>([0]);
  return (
    <div id="faqWrap" className="space-y-3">
      {faqs.map((f, i) => (
        <div
          key={f.q}
          className={`faq-item bg-deep/60 border border-white/5 rounded-2xl overflow-hidden ${open.includes(i) ? 'open' : ''}`}
        >
          <button
            type="button"
            aria-expanded={open.includes(i)}
            aria-controls={'faq-' + i}
            onClick={() =>
              setOpen((old) => (old.includes(i) ? old.filter((x) => x !== i) : [...old, i]))
            }
            className="w-full flex items-center justify-between gap-3 p-4 text-sm font-bold text-right"
          >
            {f.q}
            <Icon name="chevron-down" className="faq-chevron w-4 h-4 text-gold shrink-0" />
          </button>
          <div id={'faq-' + i} className="faq-body" aria-hidden={!open.includes(i)}>
            <p className="px-4 pb-4 text-xs text-muted leading-7">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

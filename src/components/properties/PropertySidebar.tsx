import type { Property } from '@/data/types';
import { agents } from '@/data/agents';
import { Icon } from '@/components/shared/Icon';
import { ConsultButton } from '@/components/shared/Actions';
import { VisitForm } from '@/components/forms/VisitForm';
export function PropertySidebar({ property: p }: { property: Property }) {
  const agent = agents[p.agent];
  return (
    <div className="space-y-5 lg:sticky lg:top-24">
      <div className="card-luxe rounded-3xl p-6">
        <h3 className="font-black flex items-center gap-2 mb-4">
          <Icon name="user-check" className="w-5 h-5 text-gold" /> مشاور اختصاصی این ملک
        </h3>
        <div className="flex items-center gap-3">
          <img
            src={agent.img}
            alt={agent.name}
            className="w-16 h-16 rounded-2xl object-cover border border-gold/30"
          />
          <div>
            <div className="font-bold text-sm">{agent.name}</div>
            <div className="text-xs text-gold mt-0.5">{agent.role}</div>
            <div className="text-[11px] text-muted">
              {agent.exp} · <span dir="ltr">{agent.phone}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <a
            href="tel:02122008888"
            className="gold-btn py-3 rounded-xl text-sm flex items-center justify-center gap-1.5"
          >
            <Icon name="phone" className="w-4 h-4" /> تماس
          </a>
          <ConsultButton
            kind="visit"
            propertyCode={p.code}
            className="ghost-btn py-3 rounded-xl text-sm"
          >
            بازدید VIP
          </ConsultButton>
        </div>
      </div>
      <VisitForm propertyCode={p.code} />
      <div className="rounded-3xl overflow-hidden border border-line">
        <div className="bg-surface p-4 text-sm font-bold flex items-center gap-2">
          <Icon name="map" className="w-4 h-4 text-gold" /> موقعیت روی نقشه
        </div>
        <iframe
          title="موقعیت تقریبی محله ملک"
          src={
            'https://www.google.com/maps?q=' +
            encodeURIComponent(p.hood + '، ایران') +
            '&output=embed'
          }
          className="w-full h-56 grayscale invert-[.92] contrast-[.9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="rounded-3xl border border-gold/30 bg-gradient-to-bl from-gold/15 to-transparent p-5 text-sm leading-7">
        <div className="flex items-center gap-2 font-bold mb-1">
          <Icon name="shield-check" className="w-5 h-5 text-gold" /> تضمین هخامنش
        </div>
        <span className="text-muted text-xs">
          سند، پایان‌کار و بدهی این ملک توسط وکیل مجموعه استعلام و تأیید شده است. گزارش مکتوب پیش از
          بازدید ارسال می‌شود.
        </span>
      </div>
    </div>
  );
}

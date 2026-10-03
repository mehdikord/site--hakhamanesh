import type { Property } from '@/data/types';
import { faNum } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
export function PropertyOverview({ property: p }: { property: Property }) {
  const meta = [
    ['ruler', faNum(p.area) + ' متر', p.land ? 'بنا · زمین ' + faNum(p.land) : 'زیربنا'],
    ['bed-double', p.rooms ? faNum(p.rooms) + ' خواب' : '—', 'خواب'],
    ['car', p.parking ? faNum(p.parking) + ' پارکینگ' : '—', p.floor],
    ['history', p.age === 0 ? 'نوساز' : faNum(p.age) + ' ساله', 'سن بنا'],
  ];
  const specs = [
    ['کد ملک', p.code],
    ['نوع سند', 'تک‌برگ · آماده انتقال'],
    ['وضعیت', 'تخلیه و آماده بازدید'],
    ['سرویس بهداشتی', p.baths ? faNum(p.baths) + ' حمام + سرویس ایرانی و فرنگی' : '—'],
    [
      'پارکینگ',
      p.parking ? faNum(p.parking) + ' واحد · ' + (p.parking > 1 ? 'باکس‌دار' : 'مسقف') : 'ندارد',
    ],
    ['آسانسور', 'دارد · نفربر + باربر'],
    ['انباری', 'دارد · ' + faNum(8) + ' متری'],
    ['سند و پایان‌کار', 'استعلام و تأیید شده'],
  ];
  return (
    <div className="card-luxe rounded-3xl p-6 sm:p-8 mt-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted flex flex-wrap items-center gap-1.5">
            <Icon name="map-pin" className="w-3.5 h-3.5 text-gold" />{' '}
            <span>
              {p.city} · {p.hood}
            </span>{' '}
            · کد <span>{p.code}</span>
          </div>
          <h1 id="propTitle" className="text-xl sm:text-2xl font-black mt-2 leading-snug">
            {p.title}
          </h1>
        </div>
        <div className="text-left">
          <div className="text-xl sm:text-2xl font-black gold-text">{p.priceLabel}</div>
          <div className="text-xs text-muted mt-1">{p.priceSub}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {meta.map(([icon, value, label]) => (
          <div
            key={icon}
            className="bg-deep/60 border border-white/5 rounded-2xl p-3.5 text-center"
          >
            <Icon name={icon} className="w-5 h-5 text-gold mx-auto mb-1" />
            <div className="font-black">{value}</div>
            <div className="text-[11px] text-muted">{label}</div>
          </div>
        ))}
      </div>
      <div className="line-gold my-6" />
      <h3 className="font-black mb-3 flex items-center gap-2">
        <Icon name="align-right" className="w-5 h-5 text-gold" /> توضیحات ملک
      </h3>
      <p className="text-sm text-[#D6DCE6] leading-8">{p.desc}</p>
      <h3 className="font-black mt-7 mb-3 flex items-center gap-2">
        <Icon name="sparkles" className="w-5 h-5 text-gold" /> امکانات
      </h3>
      <div className="flex flex-wrap gap-2">
        {p.amen.map((a) => (
          <span key={a} className="chip text-xs">
            <Icon name="check" className="w-3.5 h-3.5 text-gold" />
            {a}
          </span>
        ))}
      </div>
      <h3 className="font-black mt-7 mb-3 flex items-center gap-2">
        <Icon name="clipboard-list" className="w-5 h-5 text-gold" /> مشخصات فنی
      </h3>
      <div className="grid sm:grid-cols-2 gap-2.5 text-sm">
        {specs.map(([k, v]) => (
          <div
            key={k}
            className="property-spec flex items-center justify-between bg-deep/60 border border-white/5 rounded-xl px-4 py-3"
          >
            <span className="text-muted text-xs">{k}</span>
            <span className="font-bold text-[13px]">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

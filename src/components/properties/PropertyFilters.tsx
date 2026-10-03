'use client';
import { amenities, cities, propertyTypes, type PropertyFilters as Filters } from '@/lib/search';
import { faNum, typeLabel } from '@/lib/format';
import { Icon } from '@/components/shared/Icon';
export function PropertyFilters({
  filters: f,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}) {
  return (
    <aside className="card-luxe rounded-3xl p-6 lg:sticky lg:top-24" aria-label="فیلتر املاک">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black flex items-center gap-2">
          <Icon name="filter" className="w-5 h-5 text-gold" /> فیلترها
        </h3>
        <button
          type="button"
          id="resetFilters"
          onClick={onReset}
          className="text-xs text-gold hover:text-champagne flex items-center gap-1"
        >
          <Icon name="rotate-ccw" className="w-3.5 h-3.5" /> حذف همه
        </button>
      </div>
      <div className="space-y-5">
        <div>
          <span className="text-xs text-muted block mb-2">نوع معامله</span>
          <div className="grid grid-cols-3 gap-2" id="dealSeg" role="group" aria-label="نوع معامله">
            {[
              ['all', 'همه'],
              ['sale', 'فروش'],
              ['rent', 'اجاره'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={f.deal === value}
                onClick={() => onChange({ deal: value })}
                className={`seg py-2.5 rounded-xl text-xs border border-white/10 transition ${f.deal === value ? 'tab-active' : 'text-muted'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="filterType" className="text-xs text-muted block mb-2">
            نوع ملک
          </label>
          <select
            id="filterType"
            value={f.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className="inp text-sm"
          >
            <option value="all">همه انواع</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'commercial' ? 'تجاری / اداری' : typeLabel(t)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filterCity" className="text-xs text-muted block mb-2">
            منطقه
          </label>
          <select
            id="filterCity"
            value={f.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="inp text-sm"
          >
            <option value="all">همه مناطق</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            {f.city !== 'all' && !cities.includes(f.city) && <option>{f.city}</option>}
          </select>
        </div>
        <div>
          <span className="text-xs text-muted block mb-2">خواب</span>
          <div className="grid grid-cols-4 gap-2" id="roomSeg" role="group" aria-label="تعداد خواب">
            {[
              ['all', 'همه'],
              ['2', '۲'],
              ['3', '۳'],
              ['4', '۴+'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={f.rooms === value}
                onClick={() => onChange({ rooms: value })}
                className={`rseg py-2 rounded-xl text-xs border border-white/10 ${f.rooms === value ? 'tab-active' : 'text-muted'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="filterArea" className="text-xs text-muted block mb-2">
            حداقل متراژ:{' '}
            <span id="areaVal" className="text-champagne font-bold">
              {f.minArea ? 'بالای ' : ''}
              {faNum(f.minArea)} متر
            </span>
          </label>
          <input
            id="filterArea"
            type="range"
            min="0"
            max="400"
            step="10"
            value={f.minArea}
            onChange={(e) => onChange({ minArea: +e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <span className="text-xs text-muted block mb-2">امکانات</span>
          <div id="amenWrap" className="flex flex-wrap gap-2">
            {amenities.map((a) => (
              <button
                type="button"
                key={a}
                aria-pressed={f.amen.includes(a)}
                onClick={() =>
                  onChange({
                    amen: f.amen.includes(a) ? f.amen.filter((x) => x !== a) : [...f.amen, a],
                  })
                }
                className={`amen-chip text-xs px-3 py-2 rounded-xl border border-white/10 transition hover:border-gold ${f.amen.includes(a) ? 'tab-active' : 'text-muted'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center justify-between bg-deep/60 border border-white/5 rounded-2xl p-3.5 cursor-pointer">
          <span className="text-sm flex items-center gap-2">
            <Icon name="crown" className="w-4 h-4 text-gold" /> فقط فایل‌های ویژه
          </span>
          <input
            id="onlyFeatured"
            type="checkbox"
            checked={f.onlyFeatured}
            onChange={(e) => onChange({ onlyFeatured: e.target.checked })}
            className="w-5 h-5 accent-[#C9A227]"
          />
        </label>
      </div>
    </aside>
  );
}

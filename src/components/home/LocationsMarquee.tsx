const places = [
  'الهیه',
  'فرشته',
  'زعفرانیه',
  'فرمانیه',
  'نیاوران',
  'سعادت‌آباد',
  'شهرک غرب',
  'جردن',
  'ونک',
  'لواسان',
  'کردان',
  'قلهک',
];
export function LocationsMarquee() {
  return (
    <div className="border-y border-line bg-[#050c18] py-4 overflow-hidden" dir="ltr">
      <div className="marquee-track text-sm text-muted">
        {[...places, ...places].map((name, i) => (
          <span
            key={i}
            aria-hidden={i >= places.length ? true : undefined}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-gold inline-block" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

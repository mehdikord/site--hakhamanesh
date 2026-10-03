export const faNum = (n: number | string) => Number(n).toLocaleString('fa-IR');
export const toLatinDigits = (value: string) =>
  value.replace(/[۰-۹٠-٩]/g, (c) => {
    const code = c.charCodeAt(0);
    return String(code >= 0x6f0 ? code - 0x6f0 : code - 0x660);
  });
export const normalizeSearch = (value: string) =>
  toLatinDigits(value)
    .normalize('NFKC')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u200c\u200e\u200f\s-]/g, '')
    .toLowerCase();
export const typeLabel = (type: string) =>
  ({
    apartment: 'آپارتمان',
    penthouse: 'پنت‌هاوس',
    villa: 'ویلا',
    house: 'خانه',
    land: 'زمین',
    commercial: 'تجاری',
  })[type] ?? type;
export const propertyUrl = (p: { code: string }) => `/properties/${p.code.toLowerCase()}`;
export const blogUrl = (b: { slug: string }) => `/blog/${b.slug}`;

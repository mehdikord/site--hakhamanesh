import type { Property } from '@/data/types';
import { normalizeSearch } from './format';

export interface PropertyFilters {
  deal: string;
  type: string;
  city: string;
  q: string;
  sort: string;
  minArea: number;
  rooms: string;
  onlyFeatured: boolean;
  amen: string[];
  budget: string;
}
export const defaultFilters: PropertyFilters = {
  deal: 'all',
  type: 'all',
  city: 'all',
  q: '',
  sort: 'newest',
  minArea: 0,
  rooms: 'all',
  onlyFeatured: false,
  amen: [],
  budget: 'all',
};
export const amenities = [
  'استخر',
  'سونا',
  'جکوزی',
  'روف‌گاردن',
  'لابی',
  'نگهبانی',
  'سیستم هوشمند',
  'شومینه',
  'پارکینگ',
  'انباری',
  'بالکن',
  'مبله',
];
export const cities = [
  'الهیه',
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
export const propertyTypes = ['apartment', 'penthouse', 'villa', 'house', 'land', 'commercial'];
export type SearchParams = Record<string, string | string[] | undefined>;
export function parseFilters(params: SearchParams): PropertyFilters {
  const get = (key: string) => {
    const x = params[key];
    return (Array.isArray(x) ? x[0] : x) ?? '';
  };
  const choice = (key: string, allowed: string[], fallback: string) =>
    allowed.includes(get(key)) ? get(key) : fallback;
  return {
    deal: choice('deal', ['all', 'sale', 'rent'], 'all'),
    type: choice('type', propertyTypes, 'all'),
    city: get('city').slice(0, 80) || 'all',
    q: get('q').slice(0, 200),
    sort: choice('sort', ['newest', 'expensive', 'cheap', 'big', 'rooms'], 'newest'),
    minArea: Math.min(400, Math.max(0, Number(get('minArea')) || 0)),
    rooms: choice('rooms', ['2', '3', '4'], 'all'),
    onlyFeatured: get('featured') === '1',
    amen: get('amen')
      .split(',')
      .filter((x) => amenities.includes(x)),
    budget: choice('budget', ['20', '35', '60', '61'], 'all'),
  };
}
export function serializeFilters(filters: PropertyFilters): string {
  const p = new URLSearchParams();
  for (const key of ['deal', 'type', 'city', 'q', 'sort', 'rooms', 'budget'] as const) {
    if (filters[key] !== defaultFilters[key]) p.set(key, filters[key]);
  }
  if (filters.minArea) p.set('minArea', String(filters.minArea));
  if (filters.onlyFeatured) p.set('featured', '1');
  if (filters.amen.length) p.set('amen', filters.amen.join(','));
  return p.toString();
}
export function filterProperties(properties: Property[], f: PropertyFilters): Property[] {
  const q = normalizeSearch(f.q);
  return properties
    .filter(
      (p) =>
        (f.deal === 'all' || p.deal === f.deal) &&
        (f.type === 'all' || p.type === f.type) &&
        (f.city === 'all' || normalizeSearch(p.hood + p.city).includes(normalizeSearch(f.city))) &&
        (f.rooms === 'all' || (f.rooms === '4' ? p.rooms >= 4 : p.rooms === Number(f.rooms))) &&
        p.area >= f.minArea &&
        (!f.onlyFeatured || p.featured) &&
        f.amen.every((a) =>
          normalizeSearch(p.amen.join(' ') + (p.parking ? 'پارکینگ' : '')).includes(
            normalizeSearch(a),
          ),
        ) &&
        (!q || normalizeSearch(p.title + p.hood + p.code + p.city).includes(q)) &&
        (f.budget === 'all' ||
          p.deal === 'rent' ||
          (f.budget === '61' ? p.priceSort > 60 : p.priceSort <= Number(f.budget))),
    )
    .sort((a, b) => {
      if (f.sort === 'expensive') return b.priceSort - a.priceSort;
      if (f.sort === 'cheap') return a.priceSort - b.priceSort;
      if (f.sort === 'big') return b.area - a.area;
      if (f.sort === 'rooms') return b.rooms - a.rooms;
      return b.date.localeCompare(a.date);
    });
}

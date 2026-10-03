import { test } from 'node:test';
import assert from 'node:assert/strict';
import { properties } from '../../src/data/properties';
import { articles } from '../../src/data/articles';
import {
  filterProperties,
  defaultFilters,
  parseFilters,
  serializeFilters,
} from '../../src/lib/search';
import { normalizeSearch, toLatinDigits } from '../../src/lib/format';
import { monthlyPayment } from '../../src/lib/calculator';
import { requestSchema } from '../../src/lib/validation';
import { allowRequest } from '../../src/lib/rate-limit';

test('original dataset: 14 properties, 6 distinct article routes', () => {
  assert.equal(properties.length, 14);
  assert.equal(articles.length, 6);
  assert.equal(new Set(properties.map((p) => p.code)).size, 14);
  assert.equal(new Set(articles.map((p) => p.slug)).size, 6);
});
test('sale budget remains applied through sorting, amenity and area refinements', () => {
  const base = { ...defaultFilters, deal: 'sale', budget: '35' };
  for (const patch of [
    {},
    { sort: 'cheap' },
    { sort: 'expensive' },
    { amen: ['پارکینگ'] },
    { minArea: 150 },
  ]) {
    const result = filterProperties(properties, { ...base, ...patch });
    assert.ok(result.every((p) => p.deal === 'sale' && p.priceSort <= 35));
  }
  assert.ok(filterProperties(properties, { ...base, budget: '61' }).every((p) => p.priceSort > 60));
});
test('query parameter round trip, multiple amenities and featured', () => {
  const filters = {
    ...defaultFilters,
    q: 'HX-۱۰۴۲',
    city: 'الهیه',
    amen: ['استخر', 'سونا'],
    budget: '61',
    onlyFeatured: true,
    minArea: 200,
    rooms: '4',
  };
  assert.deepEqual(
    parseFilters(Object.fromEntries(new URLSearchParams(serializeFilters(filters)))),
    filters,
  );
});
test('filter parser rejects malformed enums and clamps numeric values', () => {
  const f = parseFilters({
    deal: 'wrong',
    type: 'wrong',
    sort: 'wrong',
    minArea: 'Infinity',
    rooms: '-2',
    amen: 'broken,استخر',
    budget: '0',
  });
  assert.equal(f.deal, 'all');
  assert.equal(f.type, 'all');
  assert.equal(f.sort, 'newest');
  assert.equal(f.minArea, 400);
  assert.deepEqual(f.amen, ['استخر']);
});
test('Persian / Arabic digits, case and variants normalize identically', () => {
  assert.equal(toLatinDigits('۰۹۱۲٣٤٥٦٧٨٩'), '09123456789');
  assert.equal(normalizeSearch('سعادت آباد'), normalizeSearch('سعادت‌آباد'));
  assert.equal(normalizeSearch('ي ك'), normalizeSearch('ی ک'));
  assert.equal(
    filterProperties(properties, { ...defaultFilters, q: 'hx-۱۰۴۲' })[0]?.code,
    'HX-1042',
  );
});
test('sort does not mutate source data', () => {
  const ids = properties.map((p) => p.id);
  const sorted = filterProperties(properties, { ...defaultFilters, sort: 'expensive' });
  assert.deepEqual(
    properties.map((p) => p.id),
    ids,
  );
  assert.ok(sorted.every((p, i) => i === 0 || sorted[i - 1].priceSort >= p.priceSort));
});
test('loan uses millions of tomans and supports zero interest', () => {
  assert.equal(monthlyPayment(3000, 0, 10), 25_000_000);
  assert.ok(Math.abs(monthlyPayment(3000, 23, 10) - 64_064_340) < 1);
});
test('server schema validates phone, consent, email, property and past dates', () => {
  assert.equal(requestSchema.safeParse({ kind: 'newsletter', email: 'bad' }).success, false);
  const c = {
    kind: 'contact',
    name: 'کاربر آزمون',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    subject: 'خرید ملک',
    budget: 'تا ۲۰ میلیارد',
    message: 'آزمون',
    agree: true,
  };
  const parsed = requestSchema.parse(c);
  assert.ok('phone' in parsed);
  assert.equal(parsed.phone, '09123456789');
  assert.equal(requestSchema.safeParse({ ...c, agree: false }).success, false);
  assert.equal(requestSchema.safeParse({ ...c, phone: '123' }).success, false);
  assert.equal(
    requestSchema.safeParse({
      kind: 'visit',
      name: c.name,
      phone: c.phone,
      date: '2000-01-01',
      time: '۱۰ تا ۱۳',
      propertyCode: 'HX-1042',
    }).success,
    false,
  );
});
test('rate limit expires without unbounded storage', () => {
  for (let i = 0; i < 20; i++) assert.equal(allowRequest('unit', 1000), true);
  assert.equal(allowRequest('unit', 1001), false);
  assert.equal(allowRequest('unit', 601001), true);
});

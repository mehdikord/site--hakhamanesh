import { z } from 'zod';
import { toLatinDigits } from './format';
const name = z
  .string()
  .trim()
  .min(3, 'لطفاً نام کامل را وارد کنید.')
  .max(100, 'نام بیش از حد طولانی است.');
const phone = z
  .string()
  .max(32)
  .transform((v) => toLatinDigits(v).replace(/[\s-]/g, ''))
  .pipe(z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر وارد کنید (09...).'));
const message = z.string().trim().max(2000, 'توضیحات باید کمتر از ۲۰۰۰ نویسه باشد.').default('');
const propertyCode = z.string().regex(/^HX-\d{4}$/, 'کد ملک معتبر نیست.');
const date = z.string().refine((v) => {
  if (!v) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const parsed = new Date(v + 'T12:00:00Z');
  return (
    !Number.isNaN(parsed.valueOf()) &&
    parsed.toISOString().slice(0, 10) === v &&
    v >=
      new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Tehran',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date())
  );
}, 'تاریخ بازدید باید معتبر و امروز یا پس از امروز باشد.');
export const requestSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('consult'),
    name,
    phone,
    subject: z.enum(['buy', 'sell', 'rent', 'invest', 'visit', 'project', 'loan', 'legal']),
    time: z.enum(['امروز عصر', 'فردا صبح', 'فردا عصر', 'پایان هفته']),
    message,
    propertyCode: propertyCode.optional(),
  }),
  z.object({
    kind: z.literal('contact'),
    name,
    phone,
    subject: z.string().min(1).max(100),
    budget: z.string().max(100),
    message,
    agree: z.literal(true, { error: 'موافقت با قوانین الزامی است.' }),
  }),
  z.object({
    kind: z.literal('visit'),
    name,
    phone,
    date: date.default(''),
    time: z.enum(['۱۰ تا ۱۳', '۱۳ تا ۱۶', '۱۶ تا ۱۹', '۱۹ تا ۲۱']),
    propertyCode,
  }),
  z.object({
    kind: z.literal('newsletter'),
    email: z
      .email('ایمیل معتبر وارد کنید.')
      .max(254)
      .transform((v) => v.toLowerCase()),
  }),
]);
export type CustomerRequest = z.infer<typeof requestSchema>;

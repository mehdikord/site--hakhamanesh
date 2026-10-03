'use client';
import Link from 'next/link';
import { Icon } from '@/components/shared/Icon';
import { formPayload, useSubmission } from './useSubmission';
import { FormError, Honeypot, SuccessMark } from './FormFeedback';
export function ContactForm() {
  const { pending, error, code, submit, reset } = useSubmission();
  return (
    <form
      id="contactForm"
      aria-busy={pending}
      className="card-luxe rounded-[28px] p-7 sm:p-9 lg:sticky lg:top-24"
      onSubmit={async (e) => {
        e.preventDefault();
        const payload = formPayload(e.currentTarget);
        await submit({ ...payload, kind: 'contact', agree: payload.agree === 'on' });
      }}
    >
      <h2 className="text-xl font-black flex items-center gap-2">
        <Icon name="send" className="w-5 h-5 text-gold" /> ارسال پیام / درخواست مشاوره
      </h2>
      <p className="text-xs text-muted mt-1 mb-6">
        فرم را تکمیل کنید؛ کارشناس شما در کمتر از ۲ ساعت کاری تماس می‌گیرد.
      </p>
      {!code ? (
        <>
          <div id="contactFields" className="grid sm:grid-cols-2 gap-3">
            <Honeypot />
            <input
              id="cName"
              name="name"
              required
              minLength={3}
              maxLength={100}
              autoComplete="name"
              aria-label="نام و نام خانوادگی"
              className="inp text-sm"
              placeholder="نام و نام خانوادگی *"
            />
            <input
              id="cPhone"
              name="phone"
              required
              maxLength={32}
              autoComplete="tel"
              aria-label="موبایل"
              className="inp text-sm"
              inputMode="tel"
              placeholder="موبایل (09...) *"
            />
            <select id="cSubject" name="subject" className="inp text-sm" aria-label="موضوع">
              {['خرید ملک', 'فروش ملک', 'رهن و اجاره', 'سرمایه‌گذاری', 'سایر'].map((v) => (
                <option key={v}>موضوع: {v}</option>
              ))}
            </select>
            <select id="cBudget" name="budget" className="inp text-sm" aria-label="بودجه">
              {[
                'تا ۲۰ میلیارد',
                '۲۰ تا ۴۰ میلیارد',
                '۴۰ تا ۷۰ میلیارد',
                'بالای ۷۰ میلیارد',
                'اجاره',
              ].map((v) => (
                <option key={v}>بودجه: {v}</option>
              ))}
            </select>
            <textarea
              id="cMsg"
              name="message"
              maxLength={2000}
              rows={5}
              className="inp text-sm sm:col-span-2"
              aria-label="توضیحات"
              placeholder="توضیحات شما... (محله مدنظر، متراژ، شرایط خاص)"
            />
          </div>
          <label className="flex items-start gap-2 text-xs text-muted mt-4">
            <input
              id="cAgree"
              name="agree"
              type="checkbox"
              required
              defaultChecked
              className="mt-0.5 w-4 h-4 accent-[#C9A227]"
            />{' '}
            با{' '}
            <Link prefetch={false} href="/terms" className="text-gold underline">
              قوانین و حریم خصوصی
            </Link>{' '}
            موافقم.
          </label>
          <button
            disabled={pending}
            className="gold-btn w-full mt-5 py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
          >
            <Icon
              name={pending ? 'loader-circle' : 'check-circle-2'}
              className={`w-5 h-5 ${pending ? 'animate-spin' : ''}`}
            />{' '}
            {pending ? 'در حال ثبت...' : 'ثبت و ارسال درخواست'}
          </button>
          <FormError error={error} />
        </>
      ) : (
        <div id="contactSuccess" role="status" className="text-center py-10">
          <SuccessMark />
          <h3 className="font-black text-xl">پیام شما با موفقیت ثبت شد</h3>
          <p className="text-sm text-muted mt-2">
            کد پیگیری:{' '}
            <span id="trackCode" className="text-champagne font-bold break-words">
              {code}
            </span>
            <br />
            کارشناس ما به‌زودی با شما تماس می‌گیرد.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ghost-btn px-6 py-3 rounded-xl text-sm mt-5"
          >
            ثبت پیام جدید
          </button>
        </div>
      )}
    </form>
  );
}

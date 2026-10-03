'use client';
import { Icon } from '@/components/shared/Icon';
import { useSite } from '@/components/shared/useSite';
import { formPayload, useSubmission } from './useSubmission';
import { FormError, Honeypot } from './FormFeedback';
export function VisitForm({ propertyCode }: { propertyCode: string }) {
  const { pending, error, code, submit } = useSubmission();
  const { toast } = useSite();
  return (
    <form
      id="visitForm"
      aria-busy={pending}
      className="card-luxe rounded-3xl p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const result = await submit({ ...formPayload(form), kind: 'visit', propertyCode });
        if (result) {
          form.reset();
          toast('درخواست بازدید ملک ' + propertyCode + ' ثبت شد؛ مشاور هماهنگ می‌کند.');
        }
      }}
    >
      <h3 className="font-black flex items-center gap-2 mb-1">
        <Icon name="calendar-check" className="w-5 h-5 text-gold" /> رزرو بازدید حضوری
      </h3>
      <p className="text-xs text-muted mb-4">بازدید با خودروی مجموعه + پذیرایی · بدون هزینه</p>
      <div className="space-y-3">
        <Honeypot />
        <input
          id="visitName"
          name="name"
          required
          minLength={3}
          maxLength={100}
          autoComplete="name"
          aria-label="نام و نام خانوادگی"
          className="inp text-sm"
          placeholder="نام و نام خانوادگی"
        />
        <input
          id="visitPhone"
          name="phone"
          required
          maxLength={32}
          autoComplete="tel"
          aria-label="شماره موبایل"
          className="inp text-sm"
          inputMode="tel"
          placeholder="شماره موبایل (09...)"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            id="visitDate"
            name="date"
            type="date"
            aria-label="تاریخ بازدید"
            className="inp text-sm"
          />
          <select id="visitTime" name="time" aria-label="ساعت بازدید" className="inp text-sm">
            {['۱۰ تا ۱۳', '۱۳ تا ۱۶', '۱۶ تا ۱۹', '۱۹ تا ۲۱'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <button disabled={pending} className="gold-btn w-full py-3.5 rounded-xl text-sm">
          {pending ? 'در حال ثبت...' : 'تأیید رزرو بازدید'}
        </button>
      </div>
      <FormError error={error} />
      {code && (
        <p role="status" className="text-xs text-champagne mt-3 leading-6 break-words">
          درخواست ثبت شد. کد پیگیری: {code}
        </p>
      )}
    </form>
  );
}

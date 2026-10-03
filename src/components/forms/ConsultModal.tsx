'use client';
import { Dialog } from '@/components/shared/Dialog';
import { Icon } from '@/components/shared/Icon';
import type { ConsultKind } from '@/components/shared/useSite';
import { formPayload, useSubmission } from './useSubmission';
import { FormError, Honeypot, SuccessMark } from './FormFeedback';
export function ConsultModal({
  kind,
  propertyCode,
  onClose,
}: {
  kind: ConsultKind;
  propertyCode?: string;
  onClose: () => void;
}) {
  const { pending, error, code, submit } = useSubmission();
  return (
    <Dialog
      id="consultModal"
      onClose={onClose}
      label="رزرو مشاوره رایگان"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-label="بستن مشاوره"
      />
      <div className="relative w-full max-w-lg card-luxe !bg-[#0d1a2e] rounded-[26px] p-7 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold"
          aria-label="بستن"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>
        {!code ? (
          <form
            id="consultBody"
            aria-busy={pending}
            onSubmit={async (e) => {
              e.preventDefault();
              await submit({ ...formPayload(e.currentTarget), kind: 'consult', propertyCode });
            }}
          >
            <div className="w-14 h-14 rounded-2xl badge-gold flex items-center justify-center mb-4">
              <Icon name="crown" className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black">
              رزرو <span className="gold-text">مشاوره رایگان</span>
            </h3>
            <p className="text-xs text-muted mt-1 mb-5 leading-6">
              ۳۰ دقیقه گفت‌وگو با مشاور ارشد منطقه · حضوری، تلفنی یا تصویری
            </p>
            <div className="space-y-3">
              <Honeypot />
              <input
                id="qName"
                data-autofocus
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
                id="qPhone"
                name="phone"
                required
                maxLength={32}
                autoComplete="tel"
                aria-label="موبایل"
                className="inp text-sm"
                inputMode="tel"
                placeholder="موبایل (09...) *"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  id="qType"
                  name="subject"
                  defaultValue={kind}
                  className="inp text-sm"
                  aria-label="موضوع مشاوره"
                >
                  {[
                    ['buy', 'خرید ملک'],
                    ['sell', 'فروش ملک'],
                    ['rent', 'رهن و اجاره'],
                    ['invest', 'سرمایه‌گذاری'],
                    ['visit', 'بازدید ملک'],
                    ['project', 'پروژه هخامنش پالاس'],
                    ['loan', 'مشاوره وام'],
                    ['legal', 'مشاوره حقوقی'],
                  ].map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <select id="qTime" name="time" className="inp text-sm" aria-label="زمان تماس">
                  {['امروز عصر', 'فردا صبح', 'فردا عصر', 'پایان هفته'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <textarea
                id="qMsg"
                name="message"
                maxLength={2000}
                rows={3}
                className="inp text-sm"
                aria-label="توضیح کوتاه"
                placeholder="توضیح کوتاه (اختیاری)"
              />
              <button
                disabled={pending}
                className="gold-btn w-full py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
              >
                <Icon
                  name={pending ? 'loader-circle' : 'calendar-check'}
                  className={`w-5 h-5 ${pending ? 'animate-spin' : ''}`}
                />{' '}
                {pending ? 'در حال ثبت...' : 'تأیید رزرو مشاوره'}
              </button>
              <FormError error={error} />
              <p className="text-[11px] text-muted text-center flex items-center justify-center gap-1.5">
                <Icon name="lock" className="w-3.5 h-3.5 text-gold" /> اطلاعات شما کاملاً محرمانه
                می‌ماند
              </p>
            </div>
          </form>
        ) : (
          <div id="consultSuccess" role="status" className="text-center py-8">
            <SuccessMark />
            <h3 className="font-black text-xl">درخواست شما ثبت شد</h3>
            <p className="text-sm text-muted mt-2 leading-7">
              کارشناس ارشد هخامنش در بازه انتخابی با شما تماس می‌گیرد.
              <br />
              کد پیگیری:{' '}
              <span id="consultCode" className="text-champagne font-bold break-words">
                {code}
              </span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="gold-btn px-8 py-3.5 rounded-xl text-sm mt-5"
            >
              متوجه شدم
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

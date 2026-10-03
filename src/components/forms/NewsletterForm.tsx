'use client';
import { Icon } from '@/components/shared/Icon';
import { useSite } from '@/components/shared/useSite';
import { formPayload, useSubmission } from './useSubmission';
import { FormError, Honeypot } from './FormFeedback';
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { pending, error, submit } = useSubmission();
  const { toast } = useSite();
  const field = (
    <>
      <input
        type="email"
        name="email"
        required
        maxLength={254}
        autoComplete="email"
        placeholder={compact ? 'ایمیل' : 'ایمیل شما'}
        className={`inp ${compact ? '!py-2.5 text-xs' : '!py-3 text-sm'}`}
        aria-label="ایمیل"
      />
      <button
        disabled={pending}
        className={`gold-btn rounded-xl shrink-0 ${compact ? 'px-4' : 'px-5'}`}
        aria-label="عضویت"
      >
        <Icon
          name={pending ? 'loader-circle' : compact ? 'arrow-left' : 'send'}
          className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} ${pending ? 'animate-spin' : ''}`}
        />
      </button>
    </>
  );
  return (
    <form
      className={
        compact
          ? 'newsletter-form flex flex-wrap gap-2 mt-4'
          : 'newsletter-form glass border border-line rounded-3xl p-6'
      }
      aria-busy={pending}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const code = await submit({ ...formPayload(form), kind: 'newsletter' });
        if (code) {
          form.reset();
          toast('درخواست عضویت شما در باشگاه طلایی ثبت شد.');
        }
      }}
    >
      <Honeypot />
      {!compact && (
        <>
          <h4 className="font-bold mb-1">عضویت در باشگاه مشتریان طلایی</h4>
          <p className="text-xs text-muted mb-4 leading-6">
            هر هفته ۵ فایل آف‌مارکت + تحلیل بازار شمال تهران در ایمیل شما.
          </p>
        </>
      )}
      <div className={`flex gap-2 ${compact ? 'w-full' : ''}`}>{field}</div>
      <FormError error={error} />
      {!compact && (
        <p className="text-[11px] text-muted mt-3 flex items-center gap-1.5">
          <Icon name="lock" className="w-3.5 h-3.5 text-gold" /> بدون اسپم · لغو هر زمان
        </p>
      )}
    </form>
  );
}

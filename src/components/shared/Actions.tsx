'use client';
import { useState, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { useSite, type ConsultKind } from './useSite';
import { Icon } from './Icon';
export function ConsultButton({
  kind = 'buy',
  propertyCode,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: ConsultKind; propertyCode?: string }) {
  const { openConsult } = useSite();
  return <button type="button" {...props} onClick={() => openConsult(kind, propertyCode)} />;
}
export function LightboxButton({
  src,
  imageAlt,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { src: string; imageAlt: string }) {
  const { openLightbox } = useSite();
  return <button type="button" {...props} onClick={() => openLightbox(src, imageAlt)} />;
}
const socialUrls = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL,
};
export function SocialLink({
  channel,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { channel: keyof typeof socialUrls }) {
  const { toast } = useSite();
  const href = socialUrls[channel];
  return (
    <a
      {...props}
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={(event) => {
        if (!href) {
          event.preventDefault();
          toast('آدرس این شبکه اجتماعی هنوز توسط مجموعه تنظیم نشده است.', 'err');
        }
      }}
    />
  );
}
export function ShareButton({
  className,
  children,
  title,
}: ButtonHTMLAttributes<HTMLButtonElement> & { title: string }) {
  const { toast } = useSite();
  const [manualUrl, setManualUrl] = useState('');
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast('لینک کپی شد و آماده ارسال است.');
      } else if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        setManualUrl(url);
        toast('برای اشتراک، آدرس نمایش‌داده‌شده را کپی کنید.');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setManualUrl(url);
    }
  }
  return (
    <>
      <button type="button" className={className} aria-label="اشتراک" onClick={share}>
        {children ?? <Icon name="share-2" className="w-5 h-5" />}
      </button>
      {manualUrl && (
        <input
          className="inp text-xs mt-2"
          aria-label="لینک اشتراک"
          dir="ltr"
          readOnly
          value={manualUrl}
          onFocus={(e) => e.target.select()}
        />
      )}
    </>
  );
}

'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export function Dialog({
  children,
  onClose,
  label,
  className,
  id,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className: string;
  id?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const node = root.current;
    const focusable = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        ) ?? [],
      ).filter((el) => el.tabIndex >= 0 && el.getClientRects().length > 0);
    (node?.querySelector<HTMLElement>('[data-autofocus]') ?? focusable()[0] ?? node)?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (!first) {
        event.preventDefault();
        node?.focus();
        return;
      }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    // Keep background content out of the accessibility tree while the overlay is open.
    const background = document.getElementById('site-content');
    if (background) background.inert = true;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
      if (background) background.inert = false;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <div
      ref={root}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className={className}
    >
      {children}
    </div>
  );
}

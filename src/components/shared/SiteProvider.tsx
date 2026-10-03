'use client';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SiteContext, type Overlay, type ConsultKind } from './useSite';
import { Icon } from './Icon';
import { Dialog } from './Dialog';
import { ConsultModal } from '@/components/forms/ConsultModal';
import { MobileDrawer } from '@/components/layout/MobileDrawer';

export function SiteProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toasts, setToasts] = useState<{ id: number; message: ReactNode; type: 'ok' | 'err' }[]>(
    [],
  );
  const serial = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const openMenu = useCallback(() => setOverlay({ type: 'menu' }), []);
  const openConsult = useCallback(
    (kind: ConsultKind = 'buy', propertyCode?: string) =>
      setOverlay({ type: 'consult', kind, propertyCode }),
    [],
  );
  const openLightbox = useCallback(
    (src: string, alt: string) => setOverlay({ type: 'lightbox', src, alt }),
    [],
  );
  const toast = useCallback((message: ReactNode, type: 'ok' | 'err' = 'ok') => {
    const id = ++serial.current;
    setToasts((old) => [...old.slice(-3), { id, message, type }]);
    const timeout = setTimeout(() => {
      setToasts((old) => old.filter((t) => t.id !== id));
      timers.current = timers.current.filter((t) => t !== timeout);
    }, 4200);
    timers.current.push(timeout);
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const value = useMemo(
    () => ({ closeOverlay, openMenu, openConsult, openLightbox, toast }),
    [closeOverlay, openMenu, openConsult, openLightbox, toast],
  );
  return (
    <SiteContext.Provider value={value}>
      {children}
      {overlay?.type === 'menu' && <MobileDrawer onClose={closeOverlay} />}
      {overlay?.type === 'consult' && (
        <ConsultModal
          kind={overlay.kind}
          propertyCode={overlay.propertyCode}
          onClose={closeOverlay}
        />
      )}
      {overlay?.type === 'lightbox' && (
        <Dialog
          id="lightbox"
          label={overlay.alt}
          onClose={closeOverlay}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur"
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0"
            onClick={closeOverlay}
            aria-label="بستن تصویر"
          />
          <img
            src={overlay.src}
            alt={overlay.alt}
            className="relative pointer-events-none max-w-full max-h-[88vh] rounded-2xl border border-gold/40 shadow-luxe"
          />
          <button
            type="button"
            onClick={closeOverlay}
            className="absolute top-5 left-5 w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center"
            aria-label="بستن"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </Dialog>
      )}
      <div
        id="toastWrap"
        role="status"
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 right-5 z-[120] space-y-3 max-w-[340px]"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast glass border rounded-2xl p-4 flex items-start gap-3 shadow-card ${t.type === 'ok' ? 'border-emerald-400/30' : 'border-red-400/30'}`}
          >
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.type === 'ok' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}
            >
              <Icon
                name={t.type === 'ok' ? 'check-circle-2' : 'alert-circle'}
                className="w-5 h-5"
              />
            </span>
            <div className="text-sm leading-6">{t.message}</div>
          </div>
        ))}
      </div>
    </SiteContext.Provider>
  );
}

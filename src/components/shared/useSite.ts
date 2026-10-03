'use client';
import { createContext, useContext, type ReactNode } from 'react';
export type ConsultKind =
  'buy' | 'sell' | 'rent' | 'invest' | 'visit' | 'project' | 'loan' | 'legal';
export type Overlay =
  | { type: 'menu' }
  | { type: 'consult'; kind: ConsultKind; propertyCode?: string }
  | { type: 'lightbox'; src: string; alt: string }
  | null;
export interface SiteContextValue {
  openConsult: (kind?: ConsultKind, propertyCode?: string) => void;
  openLightbox: (src: string, alt: string) => void;
  openMenu: () => void;
  closeOverlay: () => void;
  toast: (message: ReactNode, type?: 'ok' | 'err') => void;
}
export const SiteContext = createContext<SiteContextValue | null>(null);
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('Site components require SiteProvider');
  return context;
}

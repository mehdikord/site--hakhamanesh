'use client';
import { useEffect, useSyncExternalStore } from 'react';
export type ResultSection = 'properties' | 'blog';
const eventName = 'hx-results-history';
function valid(section: ResultSection, path: string) {
  return section === 'properties'
    ? /^\/(?:properties|search)(?:\?[^\r\n]*)?$/.test(path)
    : /^\/blog(?:\?[^\r\n]*)?$/.test(path);
}
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}
export function useRememberResults(section: ResultSection, path: string) {
  useEffect(() => {
    if (!valid(section, path)) return;
    try {
      sessionStorage.setItem('hx_last_' + section, path);
      window.dispatchEvent(new Event(eventName));
    } catch {
      /* Navigation still works if browser storage is disabled. */
    }
  }, [section, path]);
}
export function useResultsPath(section: ResultSection) {
  const fallback = '/' + section;
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        const path = sessionStorage.getItem('hx_last_' + section) || fallback;
        return valid(section, path) ? path : fallback;
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );
}

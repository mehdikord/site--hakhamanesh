'use client';
import { useSyncExternalStore } from 'react';
const EMPTY: number[] = [];
let snapshot: number[] = EMPTY;
let raw = '';
let memoryOnly = false;
const eventName = 'hx-favorites-changed';
function getSnapshot() {
  try {
    if (!memoryOnly) {
      const next = localStorage.getItem('hx_favs') ?? '[]';
      if (next !== raw) {
        const parsed: unknown = JSON.parse(next);
        snapshot = Array.isArray(parsed)
          ? [...new Set(parsed.filter((n): n is number => Number.isInteger(n) && n > 0))]
          : EMPTY;
        raw = next;
      }
    }
  } catch {
    /* Corrupt/unavailable storage must not break rendering. */
  }
  return snapshot;
}
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(eventName, callback);
  };
}
function toggle(id: number) {
  const ids = getSnapshot();
  const added = !ids.includes(id);
  snapshot = added ? [...ids, id] : ids.filter((n) => n !== id);
  raw = JSON.stringify(snapshot);
  try {
    localStorage.setItem('hx_favs', raw);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(eventName));
  return { added, persisted: !memoryOnly };
}
export function useFavorites() {
  return { ids: useSyncExternalStore(subscribe, getSnapshot, () => EMPTY), toggle };
}

'use client';
import { useRef, useState } from 'react';
export function useSubmission() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const busy = useRef(false);
  async function submit(payload: Record<string, unknown>) {
    if (busy.current) return null;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'ثبت درخواست انجام نشد.');
      setCode(result.code);
      return result.code as string;
    } catch (error) {
      setError(
        error instanceof Error && error.message !== 'Failed to fetch'
          ? error.message
          : 'ارتباط با سرور برقرار نشد؛ دوباره تلاش کنید.',
      );
      return null;
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return {
    pending,
    error,
    code,
    submit,
    reset: () => {
      setCode('');
      setError('');
    },
  };
}
export function formPayload(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

import { Icon } from '@/components/shared/Icon';
export function FormError({ error }: { error: string }) {
  return error ? (
    <p role="alert" className="text-xs text-red-400 leading-6 mt-3">
      {error}
    </p>
  ) : null;
}
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
      aria-hidden="true"
    />
  );
}
export function SuccessMark() {
  return (
    <span className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4">
      <Icon name="check" className="w-10 h-10 text-emerald-400" />
    </span>
  );
}

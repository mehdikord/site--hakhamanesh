'use client';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-black gold-text">خطایی در بارگذاری رخ داد</h1>
      <p className="text-muted mt-4">لطفاً دوباره تلاش کنید یا با دفتر تماس بگیرید.</p>
      <button type="button" onClick={reset} className="gold-btn rounded-xl px-6 py-3 mt-6">
        تلاش دوباره
      </button>
    </section>
  );
}

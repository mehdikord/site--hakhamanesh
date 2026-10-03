import { Icon } from '@/components/shared/Icon';

export function AboutHero() {
  return (
    <div className="relative py-20 overflow-hidden text-center">
      <img
        src="/images/photo-1600585154340-be6161a56a0c-1800.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        alt="معماری"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/70 to-deep"></div>
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="ornament mb-3">
          <Icon className="w-5 h-5 text-gold" name="landmark" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">
          داستان <span className="gold-text">هخامنش</span>
        </h1>
        <p className="text-muted mt-4 leading-8">
          از یک دفتر ۴۰ متری در فرشته تا مرجع املاک لوکس شمال تهران؛ ۱۷ سال اعتماد، دقت و معماریِ
          معامله.
        </p>
      </div>
    </div>
  );
}

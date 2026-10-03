import { CategoryGrid } from '@/components/home/CategoryGrid';
import { Icon } from '@/components/shared/Icon';

export function Categories() {
  return (
    <div className="bg-[#050c18] border-y border-line py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 reveal">
          <div className="ornament mb-3">
            <Icon className="w-5 h-5 text-gold" name="crown" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            دسته‌بندی <span className="gold-text">املاک</span>
          </h2>
          <p className="text-muted mt-2">هر سلیقه‌ای، یک عمارت در هخامنش دارد</p>
        </div>
        <CategoryGrid />
      </div>
    </div>
  );
}

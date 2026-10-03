import { TeamGrid } from '@/components/shared/TeamGrid';

export function Leadership() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-3xl font-black text-center mb-8">
        تیم <span className="gold-text">رهبری</span>
      </h2>
      <TeamGrid />
    </div>
  );
}

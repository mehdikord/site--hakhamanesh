import Link from 'next/link';
import { TeamGrid } from '@/components/shared/TeamGrid';

export function TeamSection() {
  return (
    <div className="bg-[#050c18] border-y border-line py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 reveal">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="lux-divider"></span>
              <span className="text-gold text-sm font-bold">تیم مشاوران ارشد</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black">
              خبره‌هایی که <span className="gold-text">اعتماد</span> می‌سازند
            </h2>
          </div>
          <Link
            prefetch={false}
            className="ghost-btn px-5 py-3 rounded-xl text-sm inline-block"
            href="/about"
          >
            آشنایی با مجموعه
          </Link>
        </div>
        <TeamGrid />
      </div>
    </div>
  );
}

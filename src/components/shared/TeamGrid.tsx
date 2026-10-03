import { team } from '@/data/team';
import { Icon } from './Icon';
import { ConsultButton } from './Actions';
export function TeamGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((m) => (
        <div key={m.name} className="card-luxe rounded-3xl overflow-hidden group">
          <div className="img-zoom h-72">
            <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="p-5 text-center">
            <div className="font-bold">{m.name}</div>
            <div className="text-xs text-gold mt-1">{m.role}</div>
            <div className="flex justify-center gap-2 mt-3">
              <a
                href="tel:02122008888"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
                aria-label="تماس"
              >
                <Icon name="phone" className="w-4 h-4" />
              </a>
              <ConsultButton className="text-xs ghost-btn px-3 py-2 rounded-xl">
                رزرو جلسه
              </ConsultButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

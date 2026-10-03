import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Icon } from '@/components/shared/Icon';

export function Statistics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-0 py-14">
      <div id="statsRow" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-luxe rounded-3xl p-6 text-center reveal">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gold/10 border border-line flex items-center justify-center mb-3">
            <Icon className="w-6 h-6 text-gold" name="award" />
          </div>
          <div className="text-3xl font-black gold-text">
            <AnimatedCounter value={17} />+
          </div>
          <div className="text-sm text-muted mt-1">سال تجربه تخصصی</div>
        </div>
        <div className="card-luxe rounded-3xl p-6 text-center reveal">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gold/10 border border-line flex items-center justify-center mb-3">
            <Icon className="w-6 h-6 text-gold" name="key-round" />
          </div>
          <div className="text-3xl font-black gold-text">
            <AnimatedCounter value={4800} />+
          </div>
          <div className="text-sm text-muted mt-1">معامله موفق</div>
        </div>
        <div className="card-luxe rounded-3xl p-6 text-center reveal">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gold/10 border border-line flex items-center justify-center mb-3">
            <Icon className="w-6 h-6 text-gold" name="wallet" />
          </div>
          <div className="text-3xl font-black gold-text">
            <AnimatedCounter value={9200} />
          </div>
          <div className="text-sm text-muted mt-1">میلیارد ارزش معاملات (تومان)</div>
        </div>
        <div className="card-luxe rounded-3xl p-6 text-center reveal">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gold/10 border border-line flex items-center justify-center mb-3">
            <Icon className="w-6 h-6 text-gold" name="heart-handshake" />
          </div>
          <div className="text-3xl font-black gold-text">
            <AnimatedCounter value={98} />٪
          </div>
          <div className="text-sm text-muted mt-1">رضایت مشتریان</div>
        </div>
      </div>
    </div>
  );
}

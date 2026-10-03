import { ResultsBackLink } from '@/components/shared/ResultsBackLink';
import type { Article } from '@/data/types';
import { Icon } from '@/components/shared/Icon';
import { ConsultButton, ShareButton } from '@/components/shared/Actions';
import { BlogCard } from './BlogCard';
export function BlogDetail({ article: b, related }: { article: Article; related: Article[] }) {
  return (
    <section id="page-blogdetail" className="page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <ResultsBackLink
          section="blog"
          className="ghost-btn w-fit px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 mb-6"
        >
          <Icon name="arrow-right" className="w-4 h-4" /> بازگشت به مجله
        </ResultsBackLink>
        <article>
          <span className="chip text-xs">{b.cat}</span>
          <h1 className="text-2xl sm:text-4xl font-black leading-snug mt-4">{b.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted mt-3 pb-5 border-b border-white/5">
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" className="w-4 h-4 text-gold" />
              {b.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="w-4 h-4 text-gold" />
              زمان مطالعه {b.read}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="eye" className="w-4 h-4 text-gold" />
              {b.views} بازدید
            </span>
            <ShareButton
              title={b.title}
              className="mr-auto ghost-btn px-3 py-2 rounded-xl flex items-center gap-1"
            >
              <Icon name="share-2" className="w-3.5 h-3.5" /> اشتراک
            </ShareButton>
          </div>
          <img
            src={b.img}
            alt={b.title}
            fetchPriority="high"
            className="w-full h-[300px] sm:h-[420px] object-cover rounded-[26px] border border-line my-6"
          />
          <p className="text-champagne font-bold leading-9 text-[17px] border-r-4 border-gold pr-4">
            {b.excerpt}
          </p>
          <div className="space-y-4 mt-5 text-[15px] leading-9 text-[#D6DCE6]">
            {b.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-bl from-gold/10 to-transparent p-6 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-black">این موضوع برای ملک شما هم صدق می‌کند؟</div>
              <div className="text-xs text-muted mt-1">
                تحلیل رایگان وضعیت ملک‌تان را از کارشناس ارشد بگیرید.
              </div>
            </div>
            <ConsultButton className="gold-btn px-6 py-3.5 rounded-xl text-sm">
              مشاوره رایگان
            </ConsultButton>
          </div>
        </article>
        <div className="mt-10">
          <h3 className="font-black text-xl mb-5">مطالب مرتبط</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {related.map((a) => (
              <BlogCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { articles } from '@/data/articles';
import { BlogCard } from './BlogCard';
export function BlogPreviewGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {articles.slice(0, 3).map((b) => (
        <BlogCard key={b.id} article={b} />
      ))}
    </div>
  );
}

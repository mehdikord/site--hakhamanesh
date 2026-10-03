import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { BlogDetail } from '@/components/blog/BlogDetail';
import { pageMetadata } from '@/lib/metadata';
import { blogUrl } from '@/lib/format';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const article = articles.find((x) => x.slug === slug);
  if (!article) notFound();
  const meta = pageMetadata(article.title, blogUrl(article), article.excerpt, article.img);
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' } };
}
export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const article = articles.find((x) => x.slug === slug);
  if (!article) notFound();
  return (
    <BlogDetail
      article={article}
      related={articles.filter((x) => x.id !== article.id).slice(0, 2)}
    />
  );
}

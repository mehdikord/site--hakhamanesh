import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { CompanyTimeline } from '@/components/about/CompanyTimeline';
import { Leadership } from '@/components/about/Leadership';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('درباره هخامنش', '/about');
export default function AboutPage() {
  return (
    <section id="page-about" className="page">
      <AboutHero />
      <AboutStory />
      <CompanyTimeline />
      <Leadership />
    </section>
  );
}

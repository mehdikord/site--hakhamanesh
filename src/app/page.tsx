import { Hero } from '@/components/home/Hero';
import { LocationsMarquee } from '@/components/home/LocationsMarquee';
import { Statistics } from '@/components/home/Statistics';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { Categories } from '@/components/home/Categories';
import { TransactionServices } from '@/components/home/TransactionServices';
import { SpotlightProject } from '@/components/home/SpotlightProject';
import { WhyUs } from '@/components/home/WhyUs';
import { BuyingProcess } from '@/components/home/BuyingProcess';
import { TeamSection } from '@/components/home/TeamSection';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogPreview } from '@/components/home/BlogPreview';
import { ValuationCTA } from '@/components/home/ValuationCTA';
import { properties } from '@/data/properties';
export default function HomePage() {
  return (
    <section id="page-home" className="page">
      <Hero />
      <LocationsMarquee />
      <Statistics />
      <FeaturedProperties properties={properties.filter((p) => p.featured)} />
      <Categories />
      <TransactionServices />
      <SpotlightProject />
      <WhyUs />
      <BuyingProcess />
      <TeamSection />
      <Testimonials />
      <BlogPreview />
      <ValuationCTA />
    </section>
  );
}

import { ResultsBackLink } from '@/components/shared/ResultsBackLink';
import type { Property } from '@/data/types';
import { Icon } from '@/components/shared/Icon';
import { PropertyGallery } from './PropertyGallery';
import { PropertyOverview } from './PropertyOverview';
import { PropertySidebar } from './PropertySidebar';
import { PropertyCard } from './PropertyCard';
export function PropertyDetail({ property, similar }: { property: Property; similar: Property[] }) {
  return (
    <section id="page-property" className="page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ResultsBackLink
          section="properties"
          className="ghost-btn w-fit px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 mb-5"
        >
          <Icon name="arrow-right" className="w-4 h-4" /> بازگشت به املاک
        </ResultsBackLink>
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-7 items-start">
          <div>
            <PropertyGallery property={property} />
            <PropertyOverview property={property} />
          </div>
          <PropertySidebar property={property} />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-black mb-5">
            املاک <span className="gold-text">مشابه</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Headphones } from 'lucide-react';
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import TrustSection from './TrustSection';
import TechSpecs from './TechSpecs';
import { useSEO } from '../lib/seo';
import type { ProductCategory } from '../data/products';
import type { FormPrefill } from '../lib/routes';

const ACTUAL_BRANDS: { name: string; logo: string; heightClass: string }[] = [
  { name: 'HIMEL', logo: '/images/brands/himel.svg', heightClass: 'h-8 md:h-10' },
  { name: 'Fuji Electric', logo: '/images/brands/fuji-electric.svg', heightClass: 'h-10 md:h-12' },
  { name: 'Mitsubishi Electric', logo: '/images/brands/mitsubishi-electric.svg', heightClass: 'h-8 md:h-10' },
  { name: 'Schneider Electric', logo: '/images/brands/schneider-electric.svg', heightClass: 'h-8 md:h-10' },
  { name: 'Siemens', logo: '/images/brands/siemens.svg', heightClass: 'h-6 md:h-7' },
  { name: 'Omron', logo: '/images/brands/omron.svg', heightClass: 'h-7 md:h-8' },
];

const HOME_DESCRIPTION =
  "T'sys Industrial Controls Inc. supplies HIMEL low-voltage electrical products and Fuji Electric variable frequency drives and instrumentation, and fabricates custom switchgear, panelboards, and busway systems for commercial and industrial projects in the Philippines.";

export default function Home({
  onExploreProducts,
  onGetQuote,
  onNavigateCategory,
  onNavigateContact,
}: {
  onExploreProducts: () => void;
  onGetQuote: () => void;
  onNavigateCategory: (category: ProductCategory) => void;
  onNavigateContact: (prefill?: FormPrefill) => void;
}) {
  useSEO({
    title: "T'sys Industrial Controls Inc.",
    description: HOME_DESCRIPTION,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: "T'sys Industrial Controls Inc.",
      url: window.location.origin + '/',
    },
  });

  return (
    <>
      <Hero onExploreProducts={onExploreProducts} onGetQuote={onGetQuote} />

      <CategoryGrid onNavigateCategory={onNavigateCategory} onViewAll={onExploreProducts} />

      <TrustSection />
      <TechSpecs
        onLearnMore={() =>
          onNavigateContact({ subject: 'System Integration', message: 'I would like to learn more about your services.' })
        }
      />

      {/* Trusted Brands */}
      <section className="py-14 border-t border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="text-center mb-10">
            <h3 className="label-caps text-secondary tracking-widest">Brands We Distribute & Work With</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {ACTUAL_BRANDS.map(brand => (
              <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                title={brand.name}
                className={`${brand.heightClass} w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-deep-blue py-20 text-white">
        <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-start gap-6">
            <Headphones size={40} className="text-primary flex-shrink-0 mt-1 hidden md:block" />
            <div>
              <h2 className="text-3xl md:text-4xl font-headline mb-3">NEED HELP FINDING THE RIGHT SOLUTION?</h2>
              <p className="text-white/70 max-w-xl">Our team is ready to assist you. Get in touch with us today.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateContact()}
            className="bg-primary text-white px-12 py-5 label-caps tracking-[0.15em] hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
          >
            CONTACT US →
          </button>
        </div>
      </section>
    </>
  );
}

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import products, { CATEGORY_LABELS, type ProductCategory } from '../data/products';
import ProductImage from './ProductImage';
import { useSEO } from '../lib/seo';

const CATEGORY_SEO_DESCRIPTIONS: Record<ProductCategory, string> = {
  'vfd': "Fuji Electric FRENIC-series variable frequency drives (ACE, HVAC, AQUA, MEGA) for industrial motor speed control, supplied by T'sys Industrial Controls Inc.",
  'induction-motors': "Industrial induction motors for commercial and industrial applications, supplied by T'sys Industrial Controls Inc.",
  'instrumentation': "Fuji Electric pressure transmitters and ultrasonic flowmeters for industrial process instrumentation, supplied by T'sys Industrial Controls Inc.",
  'switchgear': "Custom-fabricated Low, Medium, and High Voltage Switchgear, busway/busduct systems, and oil-immersed transformers, engineered and fabricated by T'sys Industrial Controls Inc.",
  'transfer-switch': "Automatic and manual transfer switches for power continuity, supplied by T'sys Industrial Controls Inc.",
  'panelboards-meter-centers': "NEMA 1 panelboards, meter centers, and cable tray systems, fabricated and supplied by T'sys Industrial Controls Inc.",
  'synchronizing-switchgear': "Automatic synchronizing switchgear for generator paralleling, supplied by T'sys Industrial Controls Inc.",
  'circuit-breaker': "HIMEL Miniature and Molded Case Circuit Breakers, Air Circuit Breakers, manual motor starters, and contactors, distributed by T'sys Industrial Controls Inc.",
};

const CATEGORY_ORDER: ProductCategory[] = [
  'vfd',
  'induction-motors',
  'instrumentation',
  'switchgear',
  'transfer-switch',
  'panelboards-meter-centers',
  'synchronizing-switchgear',
  'circuit-breaker',
];

export default function ProductList({
  initialCategory,
  onSelectProduct,
  onRequestQuote,
  onCategoryChange,
}: {
  initialCategory?: ProductCategory;
  onSelectProduct: (id: string) => void;
  onRequestQuote: (prefill?: { subject?: string; message?: string }) => void;
  onCategoryChange?: (category: ProductCategory | 'all') => void;
}) {
  const [active, setActive] = useState<ProductCategory | 'all'>(initialCategory ?? 'all');

  // Keeps the filter in sync when navigated here via a link that already carries
  // a category (e.g. a breadcrumb or footer link) while this page stays mounted.
  useEffect(() => {
    setActive(initialCategory ?? 'all');
  }, [initialCategory]);

  const handleSetActive = (category: ProductCategory | 'all') => {
    setActive(category);
    onCategoryChange?.(category);
  };

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  useSEO({
    title: active === 'all' ? 'Products' : CATEGORY_LABELS[active],
    description:
      active === 'all'
        ? "Browse T'sys Industrial Controls Inc.'s full catalog: HIMEL circuit breakers, Fuji Electric VFDs and instrumentation, and custom-fabricated switchgear, panelboards, and busway systems."
        : CATEGORY_SEO_DESCRIPTIONS[active],
    path: active === 'all' ? '/products' : `/products/${active}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${window.location.origin}/products` },
        ...(active !== 'all'
          ? [{ '@type': 'ListItem', position: 3, name: CATEGORY_LABELS[active], item: `${window.location.origin}/products/${active}` }]
          : []),
      ],
    },
  });

  return (
    <div className="pt-[100px] pb-20">
      {/* Page Hero */}
      <div className="bg-deep-blue text-white py-14">
        <div className="max-w-[1440px] mx-auto px-margin">
          <span className="label-caps text-white/50 block mb-3 tracking-widest">T'sys Industrial Controls Inc.</span>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-3">OUR PRODUCTS</h1>
          <div className="h-1 w-12 bg-primary"></div>
          <p className="mt-5 text-white/70 max-w-xl text-sm leading-relaxed">
            Authorized distributor of HIMEL low-voltage electrical products, Fuji Electric variable frequency drives, and
            Fuji Electric instrumentation. Custom-fabricated panel, switchgear, and busway systems available.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-surface-container bg-white sticky top-[100px] z-30">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            <button
              onClick={() => handleSetActive('all')}
              className={`px-4 py-2 label-caps text-[11px] whitespace-nowrap transition-colors ${
                active === 'all'
                  ? 'bg-deep-blue text-white'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              All Products ({products.length})
            </button>
            {CATEGORY_ORDER.map(cat => {
              const count = products.filter(p => p.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => handleSetActive(cat)}
                  className={`px-4 py-2 label-caps text-[11px] whitespace-nowrap transition-colors ${
                    active === cat
                      ? 'bg-deep-blue text-white'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-margin py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-surface-container hover:border-deep-blue hover:shadow-md transition-all cursor-pointer group flex flex-col"
              onClick={() => onSelectProduct(product.id)}
            >
              {/* Image */}
              <div className="h-48 bg-surface-container-low border-b border-surface-container flex items-center justify-center p-6 overflow-hidden">
                <ProductImage
                  src={product.mainImage}
                  alt={product.name}
                  size="md"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow gap-3">
                <div>
                  <span className="label-caps text-[10px] text-primary block mb-1">{product.brand}</span>
                  <h3 className="font-headline font-bold text-on-surface text-sm leading-snug">{product.name}</h3>
                  <p className="text-xs text-secondary mt-1">{product.tagline}</p>
                </div>
                <p className="text-xs text-secondary leading-relaxed line-clamp-3 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-surface-container">
                  <span className="label-caps text-[10px] text-secondary/60">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  <span className="label-caps text-[11px] text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-secondary">
            <p className="font-headline font-bold text-lg mb-2">No products in this category yet</p>
            <p className="text-sm">Contact our team for inquiries.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="bg-surface-container p-10 text-center">
          <p className="font-headline font-bold text-on-surface text-lg mb-2">Can't find what you need?</p>
          <p className="text-secondary text-sm mb-6">Contact our technical team for custom configurations and sourcing assistance.</p>
          <button
            onClick={() => onRequestQuote({ subject: 'Request for Quotation' })}
            className="bg-primary text-white px-10 py-3 label-caps hover:bg-primary-container transition-all active:scale-95"
          >
            GET A QUOTE
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ChevronRight, Download, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getProductById, getProductsByCategory, CATEGORY_LABELS } from '../data/products';
import ProductImage from './ProductImage';

export default function ProductDetail({
  productId,
  onBack,
  onSelectProduct,
  onRequestQuote,
}: {
  productId: string;
  onBack: () => void;
  onSelectProduct: (id: string) => void;
  onRequestQuote: (prefill?: { subject?: string; message?: string }) => void;
}) {
  const product = getProductById(productId);
  const [activeVariant, setActiveVariant] = useState(0);

  if (!product) {
    return (
      <div className="pt-[100px] flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="font-headline font-bold text-xl mb-3">Product not found</p>
          <button onClick={onBack} className="text-primary label-caps text-sm hover:underline">← Back to Products</button>
        </div>
      </div>
    );
  }

  const related = (product.relatedIds ?? [])
    .map(id => getProductById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  const variant = product.variants[activeVariant];

  const handleGetQuote = () => {
    onRequestQuote({
      subject: 'Request for Quotation',
      message: `I'm interested in a quote for the ${product.name}${variant ? ` — ${variant.name}` : ''} (${product.brand}, ${product.tagline}).\n\nPlease send me pricing, lead time, and stock availability.`,
    });
  };

  const handleTalkToExpert = () => {
    onRequestQuote({
      subject: 'System Integration',
      message: `I'd like to speak with a specialist engineer about the ${product.name}${variant ? ` — ${variant.name}` : ''} (${product.brand}, ${product.tagline}) for system integration support / bulk procurement.\n\nPlease have someone reach out to discuss our requirements.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-[100px] pb-20"
    >
      {/* Breadcrumb */}
      <div className="border-b border-surface-container bg-white">
        <div className="max-w-[1440px] mx-auto px-margin py-3 flex items-center gap-2 label-caps text-[11px] text-secondary">
          <button onClick={onBack} className="hover:text-primary transition-colors">Products</button>
          <ChevronRight size={12} />
          <span className="hover:text-primary transition-colors cursor-pointer">
            {CATEGORY_LABELS[product.category]}
          </span>
          <ChevronRight size={12} />
          <span className="text-on-surface font-bold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin pt-12 pb-10">
        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
          {/* Image Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-surface-container p-10 flex items-center justify-center relative overflow-hidden group h-[340px] md:h-[420px]">
              <ProductImage
                src={product.mainImage}
                alt={product.name}
                size="lg"
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 label-caps text-[10px]">
                {product.brand}
              </div>
            </div>

            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(i)}
                    className={`border p-2 transition-colors ${
                      activeVariant === i
                        ? 'border-deep-blue bg-surface-container-low'
                        : 'border-surface-container hover:border-secondary'
                    }`}
                  >
                    <ProductImage
                      src={v.image}
                      alt={v.name}
                      size="sm"
                      className="w-12 h-12 object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Summary */}
          <div className="lg:col-span-7">
            <span className="label-caps text-primary block mb-2 tracking-widest">{product.brand}</span>
            <h1 className="text-3xl md:text-5xl text-on-surface font-headline font-black tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-secondary font-headline font-semibold text-lg mb-6">{product.tagline}</p>

            {product.standard && (
              <div className="inline-block border border-surface-container bg-surface-container-low px-4 py-2 mb-6">
                <span className="label-caps text-[10px] text-secondary">Standard: </span>
                <span className="label-caps text-[10px] text-on-surface">{product.standard}</span>
              </div>
            )}

            <p className="text-secondary leading-relaxed mb-8">{product.description}</p>

            {/* Active Variant Specs */}
            {variant?.specs && variant.specs.length > 0 && (
              <div className="mb-8">
                <h4 className="label-caps text-[11px] text-deep-blue mb-3 border-b border-surface-container pb-2">
                  {variant.name} — Specifications
                </h4>
                <div className="grid grid-cols-1 divide-y divide-surface-container">
                  {variant.specs.map(s => (
                    <div key={s.label} className="flex justify-between py-3">
                      <dt className="label-caps text-[10px] text-secondary">{s.label}</dt>
                      <dd className="text-sm font-semibold text-on-surface">{s.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGetQuote}
                className="bg-primary text-white px-10 py-4 label-caps hover:bg-primary-container transition-all active:scale-95"
              >
                CONFIGURE / GET A QUOTE
              </button>
              {product.brochureLabel && product.brochureUrl && (
                <a
                  href={product.brochureUrl}
                  download
                  className="border border-on-surface text-on-surface px-8 py-4 label-caps hover:bg-on-surface hover:text-white transition-all active:scale-95 flex items-center gap-2"
                >
                  <Download size={16} />
                  {product.brochureLabel}
                </a>
              )}
              {product.brochureLabel && !product.brochureUrl && (
                <button className="border border-on-surface text-on-surface px-8 py-4 label-caps hover:bg-on-surface hover:text-white transition-all active:scale-95 flex items-center gap-2">
                  <Download size={16} />
                  {product.brochureLabel}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 border-b-2 border-on-surface pb-2">
            <h2 className="text-xl font-headline font-black uppercase tracking-tight">Key Features & Advantages</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 bg-surface-container-low border border-surface-container p-5">
                <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                <p className="text-sm text-on-surface leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All Variants / Models in Stock */}
        {product.variants.length > 1 && (
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-6 border-b-2 border-on-surface pb-2">
              <h2 className="text-xl font-headline font-black uppercase tracking-tight">Available Models</h2>
              <span className="label-caps text-[10px] text-secondary">{product.variants.length} configurations</span>
            </div>
            <div className="overflow-x-auto border border-surface-container">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-deep-blue text-white label-caps text-[10px]">
                    <th className="px-5 py-4 border-r border-white/10">Model / Configuration</th>
                    {product.variants[0]?.specs?.map(s => (
                      <th key={s.label} className="px-5 py-4 border-r border-white/10">{s.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v, i) => (
                    <tr
                      key={i}
                      onClick={() => setActiveVariant(i)}
                      className={`border-b border-surface-container cursor-pointer transition-colors ${
                        activeVariant === i ? 'bg-surface-container-low' : 'hover:bg-surface-container-low'
                      }`}
                    >
                      <td className="px-5 py-4 font-bold font-headline text-on-surface text-sm border-r border-surface-container">
                        {v.name}
                      </td>
                      {v.specs?.map(s => (
                        <td key={s.label} className="px-5 py-4 text-sm text-secondary border-r border-surface-container">
                          {s.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Stock Items */}
        {product.stockItems && product.stockItems.length > 0 && (
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-6 border-b-2 border-on-surface pb-2">
              <h2 className="text-xl font-headline font-black uppercase tracking-tight">Items in Stock</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.stockItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border border-surface-container p-4 bg-white">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-white label-caps text-[9px] flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-on-surface">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quote Block */}
        <section className="bg-surface-container p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-2 text-on-surface">Need a custom configuration?</h3>
            <p className="text-secondary text-sm max-w-md">Speak with our specialist engineers for system integration support and bulk procurement schedules.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleTalkToExpert}
              className="bg-primary text-white px-8 py-4 label-caps hover:bg-primary-container transition-all active:scale-95"
            >
              Talk to an Expert
            </button>
            {product.brochureUrl && (
              <a
                href={product.brochureUrl}
                download
                className="border border-surface-container-high text-on-surface px-8 py-4 label-caps hover:bg-surface-container transition-all active:scale-95"
              >
                Download Brochure
              </a>
            )}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b-2 border-on-surface pb-2">
              <h2 className="text-xl font-headline font-black uppercase tracking-tight">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel.id)}
                  className="bg-white border border-surface-container hover:border-deep-blue hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="h-40 bg-surface-container-low border-b border-surface-container flex items-center justify-center p-6">
                    <img
                      src={rel.mainImage}
                      alt={rel.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="label-caps text-[10px] text-primary block mb-1">{rel.brand}</span>
                    <h4 className="font-headline font-bold text-on-surface text-sm">{rel.name}</h4>
                    <p className="text-xs text-secondary mt-1 mb-3">{rel.tagline}</p>
                    <span className="label-caps text-[11px] text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}

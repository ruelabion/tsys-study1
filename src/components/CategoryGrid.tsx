import type { ElementType } from 'react';
import { ArrowRight, Cpu, Zap, RotateCw, Gauge, Boxes, ToggleLeft, LayoutGrid, GitMerge, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getProductCountByCategory, type ProductCategory } from '../data/products';

type CategoryDef = {
  icon: ElementType;
  name: string;
  desc: string;
  category: ProductCategory;
  image?: string;
};

const categories: CategoryDef[] = [
  {
    icon: Cpu,
    name: 'Variable Frequency Drives',
    desc: 'Fuji Electric FRENIC series inverters for motor speed control',
    category: 'vfd',
    image: '/images/products/pl_hdb9.png',
  },
  {
    icon: RotateCw,
    name: 'Induction Motors',
    desc: 'Industrial induction motors for commercial and industrial applications',
    category: 'induction-motors',
  },
  {
    icon: Gauge,
    name: 'Instrumentation Products',
    desc: 'Measurement and monitoring instrumentation for power systems',
    category: 'instrumentation',
  },
  {
    icon: Boxes,
    name: 'Low/Medium Voltage Switchgear',
    desc: 'Custom-fabricated switchgear and busway feeder systems',
    category: 'switchgear',
    image: '/images/products/switchgear/lvsg.png',
  },
  {
    icon: ToggleLeft,
    name: 'Transfer Switch',
    desc: 'Automatic and manual transfer switches for power continuity',
    category: 'transfer-switch',
  },
  {
    icon: LayoutGrid,
    name: 'Panelboards / Meter Centers',
    desc: 'NEMA 1 panelboards, meter centers, and cable tray systems',
    category: 'panelboards-meter-centers',
    image: '/images/products/powerbox_prod_tline.png',
  },
  {
    icon: GitMerge,
    name: 'Synchronizing Switchgear',
    desc: 'Automatic synchronizing switchgear for generator paralleling',
    category: 'synchronizing-switchgear',
  },
  {
    icon: Zap,
    name: 'Circuit Breaker',
    desc: 'HIMEL MCB, MCCB/ACB, Manual Starters and Contactors',
    category: 'circuit-breaker',
    image: '/images/products/hdb9_mcb.png',
  },
];

export default function CategoryGrid({
  onNavigateCategory,
  onViewAll,
}: {
  onNavigateCategory: (category: ProductCategory) => void;
  onViewAll: () => void;
}) {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-margin">
      <div className="mb-12 text-center">
        <span className="label-caps text-deep-blue block mb-3 tracking-widest">What We Supply</span>
        <h2 className="text-3xl md:text-4xl text-on-surface mb-3">OUR PRODUCT CATEGORIES</h2>
        <div className="h-1 w-12 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-container border border-surface-container mb-10">
        {categories.map(({ icon: Icon, name, desc, category, image }) => {
          const count = getProductCountByCategory(category);
          const hasProducts = count > 0;

          return (
            <motion.div
              key={name}
              whileHover={hasProducts ? { y: -3 } : {}}
              onClick={hasProducts ? () => onNavigateCategory(category) : undefined}
              className={`bg-white p-8 flex flex-col gap-5 transition-all ${
                hasProducts
                  ? 'hover:shadow-md cursor-pointer group'
                  : 'opacity-60 cursor-default'
              }`}
            >
              {/* Thumbnail when available */}
              {image ? (
                <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 border border-surface-container flex items-center justify-center bg-surface-container-low group-hover:border-deep-blue transition-colors">
                  <Icon className="text-secondary group-hover:text-deep-blue transition-colors" size={40} strokeWidth={1.5} />
                </div>
              )}

              <div>
                <h3 className="text-sm font-headline font-bold text-on-surface mb-2 leading-snug">{name}</h3>
                <p className="text-sm text-secondary leading-relaxed">{desc}</p>
              </div>

              <div className="mt-auto">
                {hasProducts ? (
                  <button className="label-caps text-[11px] text-primary flex items-center gap-1">
                    {count} Product{count !== 1 ? 's' : ''} <ArrowRight size={12} />
                  </button>
                ) : (
                  <span className="label-caps text-[11px] text-secondary/50">Coming Soon</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onViewAll}
          className="border border-primary text-primary px-10 py-3 label-caps hover:bg-primary hover:text-white transition-all active:scale-95 inline-flex items-center gap-2"
        >
          VIEW ALL PRODUCTS <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

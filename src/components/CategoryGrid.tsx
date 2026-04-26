import { ArrowRight, Cpu, Zap, Network, LayoutGrid, Wrench, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  {
    icon: Cpu,
    name: 'Industrial Automation',
    desc: 'PLCs, HMIs, Sensors and Instrumentation',
  },
  {
    icon: Zap,
    name: 'Electrical Control',
    desc: 'Circuit Breakers, Contactors, Relays and Power Supplies',
  },
  {
    icon: Network,
    name: 'Industrial Communication',
    desc: 'Networking, Interfaces, and Fieldbus Systems',
  },
  {
    icon: LayoutGrid,
    name: 'Panel & System Components',
    desc: 'Enclosures, Wiring, Accessories and more',
  },
  {
    icon: Wrench,
    name: 'Accessories',
    desc: 'Wiring Accessories, Tools and more',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-margin">
      <div className="mb-12 text-center">
        <span className="label-caps text-deep-blue block mb-3 tracking-widest">What We Supply</span>
        <h2 className="text-3xl md:text-4xl text-on-surface mb-3">OUR PRODUCT CATEGORIES</h2>
        <div className="h-1 w-12 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-surface-container border border-surface-container mb-10">
        {categories.map(({ icon: Icon, name, desc }) => (
          <motion.div
            key={name}
            whileHover={{ y: -3 }}
            className="bg-white p-8 flex flex-col gap-5 hover:shadow-md transition-all cursor-pointer group relative"
          >
            <div className="w-12 h-12 border border-surface-container flex items-center justify-center bg-surface-container-low group-hover:border-deep-blue group-hover:bg-white transition-colors">
              <Icon className="text-secondary group-hover:text-deep-blue transition-colors" size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-headline font-bold text-on-surface mb-2 leading-snug">{name}</h3>
              <p className="text-sm text-secondary leading-relaxed">{desc}</p>
            </div>
            <button className="label-caps text-[11px] text-primary flex items-center gap-1 mt-auto">
              View Category <ArrowRight size={12} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button className="border border-primary text-primary px-10 py-3 label-caps hover:bg-primary hover:text-white transition-all active:scale-95 inline-flex items-center gap-2">
          VIEW ALL PRODUCTS <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

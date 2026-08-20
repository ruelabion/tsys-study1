import { Network, Search, Phone, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: Network,
    title: 'System Integration Support',
    desc: 'We help you integrate the right solutions for your automation needs.',
  },
  {
    icon: Search,
    title: 'Technical Consultation',
    desc: 'We provide expert advice to help you choose the right components.',
  },
  {
    icon: Phone,
    title: 'After-Sales Support',
    desc: 'We are here to support you beyond the purchase.',
  },
  {
    icon: Settings,
    title: 'Custom Solutions',
    desc: 'We design and deliver solutions tailored to your requirements.',
  },
];

export default function TechSpecs({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section id="services" className="py-20 border-t border-surface-container">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="overflow-hidden shadow-xl"
          >
            <img
              src="/images/tsys/trade-show-booth.jpg"
              alt="T'sys Industrial Controls Inc. booth (S13) at an industrial trade show, displaying Fuji Electric VFDs, switchgear, and panelboard products"
              className="w-full h-[500px] object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </motion.div>

          <div>
            <div className="mb-10">
              <span className="label-caps text-deep-blue block mb-3 tracking-widest">What We Do</span>
              <h2 className="text-3xl md:text-4xl text-on-surface mb-3">OUR SERVICES</h2>
              <div className="h-1 w-12 bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {services.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-surface-container flex items-center justify-center bg-surface-container-low">
                    <Icon className="text-secondary" size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface text-sm mb-1">{title}</h4>
                    <p className="text-sm text-secondary leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onLearnMore}
              className="border border-primary text-primary px-8 py-3 label-caps hover:bg-primary hover:text-white transition-all active:scale-95 inline-flex items-center gap-2"
            >
              LEARN MORE ABOUT OUR SERVICES <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

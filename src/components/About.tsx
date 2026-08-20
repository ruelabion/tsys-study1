import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const capabilities = [
  'High Voltage Switchgear (HVSG)',
  'Medium Voltage Switchgear (MVSG)',
  'Low Voltage Switchgear (LVSG)',
  'Panelboards and Distribution Boards',
  'Busduct / Busway Feeder Systems',
  'Fully automated design, production, and retrofit',
];

const values = [
  { title: 'Reliability', desc: 'Every product and system we deliver is built to perform consistently under real industrial conditions.' },
  { title: 'Precision', desc: 'Our certified engineers use advanced 3D CAD/CAM systems comparable to global electrical design standards.' },
  { title: 'Partnership', desc: 'We go beyond the sale — providing after-sales support, consultation, and long-term technical assistance.' },
];

export default function About({ onNavigateContact }: { onNavigateContact: () => void }) {
  return (
    <div className="pt-[100px] pb-20">
      {/* Page Hero */}
      <div className="bg-deep-blue text-white py-14">
        <div className="max-w-[1440px] mx-auto px-margin">
          <span className="label-caps text-white/50 block mb-3 tracking-widest">Who We Are</span>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-3">ABOUT US</h1>
          <div className="h-1 w-12 bg-primary"></div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-20 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="label-caps text-deep-blue block mb-3 tracking-widest">Established 2002</span>
              <h2 className="text-3xl md:text-4xl text-on-surface mb-3">
                T'sys Industrial Controls Inc.
              </h2>
              <div className="h-1 w-12 bg-primary mb-8"></div>

              <div className="space-y-5 text-secondary leading-relaxed">
                <p>
                  T'sys Industrial Controls Inc., established in 2002, is a corporate affiliate of Total Power Box Solution Inc.
                  and one of the country's leading fabrication and manufacturing companies of electrical equipment.
                </p>
                <p>
                  Our combined core competency is in the fully automated design, production, retrofit, and installation
                  of electrical and power control systems — from Low Voltage Switchgear to High Voltage Switchgear,
                  Panelboards, and Busduct Feeder Systems.
                </p>
                <p>
                  Our team of duly certified electrical engineers have the skills and full capability to customize and
                  prefabricate any type of electrical design requirement for commercial and industrial applications,
                  using the most advanced three-dimensional (3D) CAD/CAM mechatronics system in the Philippines —
                  comparable to foreign and global electrical design systems.
                </p>
                <p>
                  T'sys has always made every effort to cooperate with our clients for reinforced enterprise strength,
                  prompt delivery, and better after-sales service.
                </p>
              </div>
            </motion.div>

            {/* Team Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-48 h-48 border-4 border-surface-container z-0"></div>
              <img
                src="/images/tsys/tsysteam_img.png"
                alt="T'sys Engineering Team"
                className="relative z-10 w-full object-cover shadow-xl border border-surface-container"
              />
              <div className="absolute bottom-4 right-4 bg-deep-blue text-white px-5 py-3 z-20">
                <p className="label-caps text-[10px] text-white/60 mb-1">Our Team</p>
                <p className="font-headline font-bold text-sm">Certified Electrical Engineers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-surface-container-low border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="mb-10">
            <span className="label-caps text-deep-blue block mb-3 tracking-widest">What We Build</span>
            <h2 className="text-3xl text-on-surface mb-3">Core Capabilities</h2>
            <div className="h-1 w-12 bg-primary"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map(cap => (
              <div key={cap} className="flex items-start gap-4 bg-white border border-surface-container p-5">
                <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
                <span className="text-sm font-semibold text-on-surface">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="mb-10">
            <span className="label-caps text-deep-blue block mb-3 tracking-widest">What We Stand For</span>
            <h2 className="text-3xl text-on-surface mb-3">Mission & Values</h2>
            <div className="h-1 w-12 bg-primary"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ title, desc }) => (
              <div key={title} className="border-l-4 border-primary pl-6 py-2">
                <h3 className="font-headline font-bold text-on-surface text-xl mb-3">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-deep-blue text-white py-16">
        <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-headline font-bold text-2xl mb-2">Ready to work with us?</h3>
            <p className="text-white/70 text-sm">Talk to our engineering team about your requirements.</p>
          </div>
          <button
            onClick={onNavigateContact}
            className="bg-primary text-white px-10 py-4 label-caps hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
          >
            CONTACT US →
          </button>
        </div>
      </div>
    </div>
  );
}

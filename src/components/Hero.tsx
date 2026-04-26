import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden mt-[100px]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBHsEXWxng3wVcGX4T_PBhAmLzW4toO6KSfNvQqNEnOcuu9Z_nWNmcjpCHB3dCoJAmLS4hmGiiTP-6wIy1FaLLBuSFRUxvrkawZ7y_KTBPAqGavwoao9AJiVYAdlRxXo7ka5T8ZnypDqaTsPrDYiT5bIkHROlfK_KrdVHHS18mz2eePoXMltgi3GrL6NDqDyLVqLaSTYabtFNqEzerpppXSdNPIDFCmBThm16pGfLaq3stP7fqpIgMIQX5Zb9bRDhYO8xGjwW6AYY"
          alt="Industrial Control Room"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(31,58,95,0.93) 35%, rgba(31,58,95,0.65) 65%, rgba(31,58,95,0.15) 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-margin w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="label-caps text-white/60 mb-6 tracking-widest">T'sys Industrial Controls Inc.</p>
          <h1 className="text-4xl md:text-6xl text-white mb-2 leading-tight tracking-tight">
            INDUSTRIAL SOLUTIONS.
          </h1>
          <h1 className="text-4xl md:text-6xl text-primary mb-8 leading-tight tracking-tight">
            BUILT FOR RELIABILITY.
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-10 max-w-lg leading-relaxed font-normal">
            We provide high-quality industrial automation and electrical control components with expert support you can rely on.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-8 py-4 label-caps flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95">
              EXPLORE PRODUCTS
              <ArrowRight size={18} />
            </button>
            <button className="border border-white/50 text-white px-8 py-4 label-caps hover:bg-white/10 transition-all active:scale-95">
              DOWNLOAD CATALOG
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { Settings, Download, ChevronRight, Filter, Cpu, ShieldCheck, Info, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail({ onBack }: { onBack: () => void }) {
  const specs = [
    { model: 'FRN0002E2S-4E', capacity: '0.4', current: '1.5', dimensions: '110 x 180 x 139' },
    { model: 'FRN0004E2S-4E', capacity: '0.75', current: '2.5', dimensions: '110 x 180 x 139' },
    { model: 'FRN0006E2S-4E', capacity: '1.5', current: '4.0', dimensions: '110 x 180 x 149' },
    { model: 'FRN0012E2S-4E', capacity: '4.0', current: '9.0', dimensions: '140 x 260 x 145' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1440px] mx-auto px-margin pt-28 pb-20"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 label-caps text-secondary mb-8">
        <button onClick={onBack} className="hover:text-primary transition-colors cursor-pointer uppercase">Products</button>
        <ChevronRight size={14} />
        <span className="hover:text-primary transition-colors cursor-pointer uppercase">Inverters</span>
        <ChevronRight size={14} />
        <span className="text-zinc-900 font-bold uppercase">FRENIC-ACE</span>
      </nav>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 items-start">
        {/* Product Image */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 p-8 md:p-20 flex items-center justify-center relative overflow-hidden group rounded-sm shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiuE0ki9gWbnZR2U8HCFYEAlifAOT59gn_Gaez6bV0HwsGa6VHoSBTWyAp4oevhlIuWeThp4Nio0eKwgo9nSAsYLo5_AT7Ef7OhnwnNk2MvUwVMI8HCvQgB_9zYUCdeOcXuwuTcBRoiJHp4SpsF9X1ADssv5HmCtCT-AD0HzmAKeaF29omO7IRJH-mD6a1ZfdlhPU1E-CaipL9zrUB6nx2nkaVhOYPpZvxC7vBwBU1LPaegzQMb1Jwp9J46f4FORKJcukl_DTyaYI" 
            alt="Fuji Electric FRENIC-Ace Inverter" 
            className="max-w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-1 label-caps text-[10px]">
            Premium Industrial Grade
          </div>
        </div>

        {/* Product Summary */}
        <div className="lg:col-span-7">
          <span className="text-primary label-caps mb-2 block tracking-widest uppercase">Fuji Electric</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6 font-headline">FRENIC-Ace Inverter</h1>
          <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
            The next generation of high-performance variable frequency drives. The ACE series delivers unparalleled flexibility, energy efficiency, and durability for modern industrial motor control systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border-l-4 border-primary pl-4 py-2 bg-zinc-50">
              <span className="block label-caps text-secondary text-[10px] mb-1">Series</span>
              <span className="block text-xl font-headline font-bold text-zinc-900 uppercase">FRENIC-Ace</span>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2 bg-zinc-50">
              <span className="block label-caps text-secondary text-[10px] mb-1">Capacity</span>
              <span className="block text-xl font-headline font-bold text-zinc-900 uppercase">0.1 - 630kW</span>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2 bg-zinc-50">
              <span className="block label-caps text-secondary text-[10px] mb-1">Phase</span>
              <span className="block text-xl font-headline font-bold text-zinc-900 uppercase">1 / 3 Phase</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-primary text-white px-10 py-5 label-caps tracking-widest hover:bg-primary-container transition-all flex items-center gap-3 shadow-lg shadow-primary/20 active:scale-95">
              <span>Configure Part Number</span>
              <Settings size={18} />
            </button>
            <button className="border border-zinc-900 text-zinc-900 px-10 py-5 label-caps tracking-widest hover:bg-zinc-900 hover:text-white transition-all flex items-center gap-3 active:scale-95">
              <span>Download Brochure</span>
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8 border-b-2 border-zinc-900 pb-2">
          <h2 className="text-2xl font-headline font-black uppercase tracking-tight">Technical Specifications</h2>
          <span className="label-caps text-secondary text-[10px]">Units in Metric (SI)</span>
        </div>

        <div className="space-y-16">
          {/* Table */}
          <div>
            <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-primary inline-block"></span>
              Standard 3-Phase Model (400V Class)
            </h3>
            <div className="overflow-x-auto border border-zinc-200 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-white label-caps text-[10px]">
                    <th className="px-6 py-4 border-r border-zinc-800">Model Number</th>
                    <th className="px-6 py-4 border-r border-zinc-800">Output Capacity (kW)</th>
                    <th className="px-6 py-4 border-r border-zinc-800">Rated Current (A)</th>
                    <th className="px-6 py-4">Dimensions (W x H x D mm)</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {specs.map((item, i) => (
                    <tr key={i} className={`border-b border-zinc-100 transition-colors hover:bg-zinc-50 ${i % 2 === 1 ? 'bg-zinc-50/50' : ''}`}>
                      <td className="px-6 py-4 border-r border-zinc-100 font-bold font-headline text-zinc-900">{item.model}</td>
                      <td className="px-6 py-4 border-r border-zinc-100 text-secondary">{item.capacity}</td>
                      <td className="px-6 py-4 border-r border-zinc-100 text-secondary">{item.current}</td>
                      <td className="px-6 py-4 text-xs font-mono text-zinc-400 tracking-tight">{item.dimensions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bento Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-zinc-200 bg-white rounded-sm hover:border-primary transition-colors group">
              <Filter className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-xl font-headline font-bold mb-3">EMC Filter Built-in</h4>
              <p className="text-zinc-500 leading-relaxed">Reduces peripheral equipment noise interference. Complies with EN61800-3 Category C2/C3.</p>
            </div>
            <div className="p-8 border border-zinc-200 bg-white rounded-sm hover:border-primary transition-colors group">
              <Cpu className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-xl font-headline font-bold mb-3">Logic Customization</h4>
              <p className="text-zinc-500 leading-relaxed">Built-in PLC functions allow for complex sequence control without external controllers.</p>
            </div>
            <div className="p-8 border border-zinc-200 bg-zinc-950 text-white rounded-sm group">
              <ShieldCheck className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-xl font-headline font-bold mb-3">Safety Performance</h4>
              <p className="text-zinc-400 leading-relaxed">STO (Safe Torque Off) function compliant with EN ISO 13849-1, SIL3, PLe.</p>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-headline font-bold border-l-4 border-primary pl-4 py-1">Environmental Specifications</h3>
              <div className="grid grid-cols-1 divide-y divide-zinc-100">
                {[
                  { label: 'Ambient Temperature', value: '-10°C to +50°C (Max 60°C with derating)' },
                  { label: 'Ambient Humidity', value: '5 to 95% RH (Non-condensing)' },
                  { label: 'Altitude', value: 'Max 3000m (Derating above 1000m)' },
                  { label: 'Protection Degree', value: 'IP20 / UL Type 1 Enclosure' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-4 group">
                    <dt className="label-caps text-[10px] text-secondary group-hover:text-primary transition-colors">{spec.label}</dt>
                    <dd className="text-sm font-medium text-zinc-900">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xl font-headline font-bold border-l-4 border-primary pl-4 py-1">Network Communications</h3>
              <div className="grid grid-cols-1 divide-y divide-zinc-100">
                {[
                  { label: 'Standard Port', value: 'RS-485 (Modbus RTU)' },
                  { label: 'Optional Cards', value: 'CC-Link, DeviceNet, PROFIBUS-DP' },
                  { label: 'Ethernet Options', value: 'PROFINET, EtherNet/IP, EtherCAT' },
                  { label: 'USB Connectivity', value: 'Mini-B Port for PC Loader Tool' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-4 group">
                    <dt className="label-caps text-[10px] text-secondary group-hover:text-primary transition-colors">{spec.label}</dt>
                    <dd className="text-sm font-medium text-zinc-900">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section className="bg-zinc-100 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between rounded-sm">
        <div className="mb-8 md:mb-0">
          <h3 className="text-3xl font-headline font-bold mb-3 text-zinc-900">Need a custom configuration?</h3>
          <p className="text-zinc-600 max-w-md">Speak with our specialist engineers for system integration support and bulk procurement schedules.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-8 py-4 label-caps tracking-widest hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">Talk to an Expert</button>
          <button className="bg-white border border-zinc-300 text-zinc-900 px-8 py-4 label-caps tracking-widest hover:bg-zinc-50 transition-all active:scale-95">View Case Studies</button>
        </div>
      </section>
    </motion.div>
  );
}

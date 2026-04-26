import { motion } from 'motion/react';
import { Send, FileCheck, Package, Info, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function DataEntry() {
  return (
    <div className="pt-28 pb-20 max-w-[1440px] mx-auto px-margin">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-l-8 border-primary pl-8">
          <h1 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tight text-zinc-900 mb-2">Technical Component Request</h1>
          <p className="text-secondary text-lg">Initialize a formal procurement inquiry for mission-critical industrial hardware.</p>
        </div>

        <form className="space-y-12">
          {/* Section 1: Requester Details */}
          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden">
            <div className="px-8 py-4 bg-zinc-900 text-white label-caps text-[10px] flex items-center justify-between">
              <span>Primary Identifiers</span>
              <span className="flex items-center gap-2"><FileCheck size={14} /> Mandatory Field Set</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="label-caps text-[11px] text-zinc-500">Project Code Reference</label>
                <input 
                  type="text" 
                  placeholder="e.g., PH-TSYS-2024-001" 
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-zinc-900 font-bold focus:outline-none focus:border-primary transition-colors uppercase font-headline"
                />
              </div>
              <div className="space-y-2">
                <label className="label-caps text-[11px] text-zinc-500">Industry Sector</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-zinc-900 font-bold focus:outline-none focus:border-primary transition-colors appearance-none font-headline">
                  <option>Power Distribution</option>
                  <option>Food & Beverage</option>
                  <option>Automotive Assembly</option>
                  <option>Water Treatment</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Component Specifications */}
          <div className="bg-white border border-zinc-200 rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-4 bg-zinc-100 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-headline font-black uppercase tracking-tight text-zinc-900">Line Item Matrix</h3>
              <button type="button" className="text-primary label-caps text-[10px] flex items-center gap-2 hover:underline">
                <Plus size={14} /> Add Line Item
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 label-caps text-[9px] text-zinc-400 border-b border-zinc-200">
                    <th className="px-8 py-4">Item #</th>
                    <th className="px-8 py-4">Component Model</th>
                    <th className="px-8 py-4">Quantity</th>
                    <th className="px-8 py-4">Specs Override</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 group">
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-8 py-6 font-mono text-xs text-zinc-400">001</td>
                    <td className="px-8 py-6">
                      <input 
                        type="text" 
                        defaultValue="FRENIC-ACE 400V" 
                        className="bg-transparent border-b border-zinc-200 focus:border-primary focus:outline-none font-bold text-zinc-900 w-full"
                      />
                    </td>
                    <td className="px-8 py-6">
                      <input 
                        type="number" 
                        defaultValue="12" 
                        className="bg-transparent border-b border-zinc-200 focus:border-primary focus:outline-none font-bold text-zinc-900 w-16"
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-zinc-400 hover:text-primary cursor-pointer transition-colors">
                        <Info size={14} />
                        <span className="text-[10px] label-caps">Edit Parameters</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button type="button" className="text-zinc-300 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-zinc-200 p-8 space-y-4">
                <label className="label-caps text-[11px] text-zinc-500 block">Operational Environment Details</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe operating temperatures, humidity, and any specific environmental hazards..."
                  className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-1 space-y-6">
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-sm">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <ShieldAlert size={20} />
                  <h4 className="label-caps text-[11px] font-bold">Safety Compliance</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
                  All component requests must adhere to <span className="text-zinc-900 font-bold underline cursor-pointer">ISO 13849-1</span> safety standards for industrial control systems.
                </p>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="comply" className="w-4 h-4 accent-primary" />
                  <label htmlFor="comply" className="text-[10px] font-bold text-zinc-900 uppercase">I verify compliance</label>
                </div>
              </div>
            </div>
          </div>

          {/* Submission */}
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between pt-8 border-t border-zinc-200">
            <div className="flex items-center gap-4 text-zinc-400">
              <Package size={32} />
              <p className="text-xs max-w-[240px]">This request will be prioritized and assigned to a specialist engineer for review within 24 hours.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                type="button" 
                className="flex-1 md:flex-none px-10 py-5 border border-zinc-900 text-zinc-900 label-caps text-[11px] hover:bg-zinc-50 active:scale-95 transition-all"
              >
                Save Draft
              </button>
              <button 
                type="submit" 
                className="flex-1 md:flex-none px-10 py-5 bg-primary text-white label-caps text-[11px] hover:bg-primary-container shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Initialize Submission
                <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

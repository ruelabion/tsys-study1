import { motion } from 'motion/react';
import { Bell, Lock, Globe, Monitor, Database, Terminal, Shield, Save } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function Settings() {
  useSEO({
    title: 'System Configuration',
    description: 'Internal demo settings page — not part of the public T\'sys Industrial Controls Inc. site.',
    path: '/settings',
    noindex: true,
  });

  const sections = [
    { 
      id: 'notifications', 
      title: 'Alert Notifications', 
      icon: Bell,
      description: 'Configure how you receive critical system alerts and quote updates.',
      settings: [
        { label: 'Critical System Alerts', type: 'toggle', default: true },
        { label: 'Inventory Restock Updates', type: 'toggle', default: true },
        { label: 'Order Status Emails', type: 'toggle', default: false },
      ]
    },
    { 
      id: 'security', 
      title: 'Access & Security', 
      icon: Lock,
      description: 'Manage authentication protocols and administrative permissions.',
      settings: [
        { label: 'Two-Factor Authentication', type: 'button', text: 'Enable 2FA' },
        { label: 'Active Session Timeout', type: 'select', options: ['15m', '30m', '1h', 'Never'], default: '30m' },
        { label: 'Connected Terminals', type: 'link', text: 'Manage 3 Terminals' },
      ]
    },
    { 
      id: 'system', 
      title: 'Regional & Display', 
      icon: Monitor,
      description: 'Set your preferred units of measurement and timezone parameters.',
      settings: [
        { label: 'Measurement Units', type: 'select', options: ['Metric (SI)', 'Imperial'], default: 'Metric (SI)' },
        { label: 'Timezone', type: 'select', options: ['UTC+8 (Manila)', 'UTC+0', 'UTC-5'], default: 'UTC+8 (Manila)' },
        { label: 'Dark Mode Gateway', type: 'toggle', default: false },
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-[1440px] mx-auto px-margin">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b-2 border-zinc-900 pb-6">
        <div>
          <h1 className="text-4xl font-headline font-black uppercase tracking-tight text-zinc-900 mb-2">System Configuration</h1>
          <p className="text-secondary label-caps text-[11px]">Industrial Control Panel v4.2.0-stable</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 label-caps flex items-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 mt-6 md:mt-0">
          <Save size={18} />
          Apply Global Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation */}
        <nav className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button 
              key={section.id}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm text-sm font-bold transition-all border-l-4 ${
                section.id === 'notifications' ? 'bg-zinc-100 border-primary text-zinc-900' : 'border-transparent text-secondary hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              <section.icon size={20} />
              <span className="font-headline uppercase tracking-tight">{section.title}</span>
            </button>
          ))}
          <div className="pt-8 space-y-2">
            <h4 className="label-caps text-[10px] text-zinc-400 px-4 mb-4">Internal Systems</h4>
            <button className="w-full flex items-center gap-4 px-4 py-3 text-sm text-secondary hover:text-zinc-900 transition-colors">
              <Database size={18} />
              <span className="font-headline uppercase tracking-tight">Data Logs</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 text-sm text-secondary hover:text-zinc-900 transition-colors">
              <Terminal size={18} />
              <span className="font-headline uppercase tracking-tight">API Keys</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 text-sm text-red-700 hover:text-red-900 transition-colors font-bold">
              <Shield size={18} />
              <span className="font-headline uppercase tracking-tight">Emergency Reset</span>
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="lg:col-span-3 space-y-10">
          {sections.map((section) => (
            <section key={section.id} className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
                <h3 className="text-2xl font-headline font-bold text-zinc-900 mb-2">{section.title}</h3>
                <p className="text-secondary text-sm">{section.description}</p>
              </div>
              <div className="p-8 divide-y divide-zinc-100">
                {section.settings.map((setting, i) => (
                  <div key={i} className="py-6 flex items-center justify-between group">
                    <div>
                      <p className="text-md font-bold text-zinc-900 group-hover:text-primary transition-colors">{setting.label}</p>
                    </div>
                    
                    {setting.type === 'toggle' && (
                      <button className={`w-12 h-6 rounded-full relative transition-colors ${setting.default ? 'bg-primary' : 'bg-zinc-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${setting.default ? 'right-1' : 'left-1'}`}></div>
                      </button>
                    )}
                    
                    {setting.type === 'select' && (
                      <div className="relative">
                        <select className="bg-zinc-50 border border-zinc-200 rounded-sm px-4 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-primary appearance-none cursor-pointer pr-10 uppercase font-headline">
                          {setting.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">▼</div>
                      </div>
                    )}

                    {setting.type === 'button' && (
                      <button className="border border-zinc-900 px-6 py-2 label-caps text-[10px] hover:bg-zinc-950 hover:text-white transition-all active:scale-95">
                        {setting.text}
                      </button>
                    )}

                    {setting.type === 'link' && (
                      <button className="text-primary label-caps text-[10px] hover:underline">
                        {setting.text} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

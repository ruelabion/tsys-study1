import { motion } from 'motion/react';
import { User, Shield, Briefcase, Award, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export default function UserProfile() {
  const activities = [
    { id: 1, action: 'Quote Requested', target: 'FRENIC-Ace Inverter Series', date: '2h ago', status: 'Pending' },
    { id: 2, action: 'Catalog Download', target: 'Low Voltage Switchgear', date: '5h ago', status: 'Completed' },
    { id: 3, action: 'Technical Support', target: 'PLC Logic Troubleshooting', date: 'Yesterday', status: 'Resolved' },
  ];

  return (
    <div className="pt-28 pb-20 max-w-[1440px] mx-auto px-margin">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm">
            <div className="h-32 bg-zinc-900 relative">
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
            </div>
            <div className="px-8 pb-8 -mt-16 relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-zinc-100 overflow-hidden mb-4 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-headline font-bold text-zinc-900">Engr. Alex Rivera</h2>
              <p className="label-caps text-[10px] text-primary mb-4">Senior Automation Specialist</p>
              
              <div className="w-full space-y-3 pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <MapPin size={16} className="text-zinc-400" />
                  <span>Quezon City, Philippines</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <Mail size={16} className="text-zinc-400" />
                  <span>a.rivera@tsys.com.ph</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <Phone size={16} className="text-zinc-400" />
                  <span>+63 917 563 1925</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-zinc-900 text-white py-3 label-caps text-[11px] hover:bg-zinc-800 transition-colors">
                Edit Professional Profile
              </button>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-sm p-6 space-y-6">
            <h3 className="label-caps text-xs text-zinc-900 border-b border-zinc-100 pb-3">Technical Certifications</h3>
            <div className="space-y-4">
              {[
                { title: 'Certified Industrial Specialist', issuer: 'IEC Global', year: '2024' },
                { title: 'Advanced PLC Programming', issuer: 'Fuji Electric', year: '2023' },
              ].map((cert, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Award size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{cert.title}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Quotes', value: '04', icon: FileText },
              { label: 'Projects', value: '12', icon: Briefcase },
              { label: 'Security Level', value: 'Admin', icon: Shield },
              { label: 'Member Since', value: '2021', icon: Calendar },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-zinc-200 p-6 rounded-sm">
                <stat.icon className="text-primary mb-3" size={24} />
                <p className="label-caps text-[10px] text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-headline font-bold text-zinc-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Activity Logs */}
          <div className="bg-white border border-zinc-200 rounded-sm">
            <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="text-xl font-headline font-bold text-zinc-900">Recent Technical Activity</h3>
              <button className="text-primary label-caps text-[10px] hover:underline">Download Logs</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {activities.map((log) => (
                <div key={log.id} className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-zinc-50 transition-colors">
                  <div className="flex gap-6 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{log.action}</p>
                      <p className="text-xs text-zinc-500">{log.target}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-6">
                    <span className="text-xs font-mono text-zinc-400">{log.date}</span>
                    <span className={`px-2 py-1 label-caps text-[9px] rounded-sm ${
                      log.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      log.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-zinc-50 text-center">
              <button className="label-caps text-[10px] text-zinc-400 hover:text-zinc-900 transition-colors">Load Full History</button>
            </div>
          </div>

          {/* System Access */}
          <div className="bg-zinc-950 text-white p-8 rounded-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-headline font-bold mb-2">Technical Terminal Access</h3>
                <p className="text-zinc-400 max-w-md">Your account has been granted level 3 administrative access to the central configuration gateway.</p>
              </div>
              <button className="bg-white text-zinc-900 px-8 py-3 label-caps text-[11px] hover:bg-primary hover:text-white transition-all active:scale-95 whitespace-nowrap">
                Initialize Gateway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FileText } from 'lucide-react';

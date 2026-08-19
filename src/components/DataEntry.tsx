import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const contactInfo = [
  { icon: Phone, label: 'Telephone', value: '(02) 8687 3006' },
  { icon: Phone, label: 'Mobile', value: '0917 563 1925' },
  { icon: Mail, label: 'Email', value: 'sales@tsys.com.ph' },
  { icon: MapPin, label: 'Address', value: "Unit 4, 2F LRC Bldg., 179 Mayon St., Brgy. Silangan, Quezon City, Philippines" },
  { icon: Clock, label: 'Office Hours', value: 'Monday – Friday, 8:00 AM – 5:00 PM' },
];

const subjects = [
  'Product Inquiry',
  'Request for Quotation',
  'Technical Consultation',
  'After-Sales Support',
  'System Integration',
  'Other',
];

export default function DataEntry() {
  return (
    <div className="pt-[100px] pb-20">
      {/* Page Hero */}
      <div className="bg-deep-blue text-white py-14">
        <div className="max-w-[1440px] mx-auto px-margin">
          <span className="label-caps text-white/50 block mb-3 tracking-widest">Get in Touch</span>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-3">CONTACT US</h1>
          <div className="h-1 w-12 bg-primary"></div>
          <p className="mt-5 text-white/70 max-w-xl text-sm leading-relaxed">
            Our technical team is ready to assist you with product inquiries, quotations, and engineering consultation.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Send Us a Message</h2>
            <div className="h-1 w-10 bg-primary mb-8"></div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Juan dela Cruz"
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your Company Inc."
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label-caps text-[11px] text-secondary">Subject *</label>
                <select className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors appearance-none text-sm">
                  <option value="">Select a subject…</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="label-caps text-[11px] text-secondary">Message *</label>
                <textarea
                  rows={6}
                  placeholder="Describe your requirements, product model, quantity, or any technical questions…"
                  className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-12 py-4 label-caps hover:bg-primary-container transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-primary/20"
              >
                SEND MESSAGE
                <Send size={16} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Contact Information</h2>
            <div className="h-1 w-10 bg-primary mb-8"></div>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-surface-container bg-surface-container-low flex items-center justify-center mt-0.5">
                    <Icon className="text-secondary" size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="label-caps text-[10px] text-secondary mb-1">{label}</p>
                    <p className="text-sm text-on-surface font-medium leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Person */}
            <div className="mt-10 border border-surface-container bg-white p-6">
              <div className="flex items-start gap-4">
                <img
                  src="/images/tsys/contactperson.png"
                  alt="Sales Manager"
                  className="w-16 h-16 object-cover border border-surface-container"
                />
                <div>
                  <p className="font-headline font-bold text-on-surface text-sm">Sales Manager</p>
                  <p className="label-caps text-[10px] text-primary mt-1">T'sys Industrial Controls Inc.</p>
                  <p className="text-xs text-secondary mt-2 leading-relaxed">
                    For product inquiries and custom quotes, please reach out directly to our sales team.
                  </p>
                </div>
              </div>
            </div>

            {/* Deep Blue strip */}
            <div className="mt-8 bg-deep-blue text-white p-6">
              <p className="label-caps text-[10px] text-white/60 mb-2">Prefer to talk?</p>
              <p className="font-headline font-bold text-xl">(02) 8687 3006</p>
              <p className="text-white/60 text-xs mt-1">Mon – Fri, 8:00 AM – 5:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

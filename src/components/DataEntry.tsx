import { useState, type FormEvent } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const landlines = [
  { display: '8351-3225', tel: '+63283513225' },
  { display: '8351-3495', tel: '+63283513495' },
  { display: '8351-7189', tel: '+63283517189' },
  { display: '8352-3314', tel: '+63283523314' },
];

const linkClass = 'hover:text-primary transition-colors hover:underline underline-offset-2';

const contactInfo = [
  {
    icon: Phone,
    label: 'Telephone',
    value: (
      <>
        (02){' '}
        {landlines.map((l, i) => (
          <span key={l.tel}>
            <a href={`tel:${l.tel}`} className={linkClass}>{l.display}</a>
            {i < landlines.length - 1 && ' / '}
          </span>
        ))}
      </>
    ),
  },
  { icon: Phone, label: 'Mobile', value: <a href="tel:+639175395654" className={linkClass}>0917 539 5654</a> },
  { icon: Mail, label: 'Email', value: <a href="mailto:manager@tsys.com.ph" className={linkClass}>manager@tsys.com.ph</a> },
  { icon: MapPin, label: 'Address', value: "1F Torre Venezia Bldg., Timog Avenue cor. Sct. Santiago St., Brgy. Laging Handa, Quezon City, Philippines 1103" },
  { icon: Clock, label: 'Office Hours', value: 'Monday – Friday, 9:00 AM – 5:00 PM' },
];

const subjects = [
  'Product Inquiry',
  'Request for Quotation',
  'Technical Consultation',
  'After-Sales Support',
  'System Integration',
  'Other',
];

// Same live contact endpoint used by the old T'sys site (assets/contact-form.js).
const CONTACT_ENDPOINT = 'https://2rxjjzbgeh.execute-api.ap-northeast-1.amazonaws.com/prod/contact';

export default function DataEntry({
  prefill,
}: {
  prefill?: { subject?: string; message?: string };
} = {}) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState(prefill?.subject ?? '');
  const [message, setMessage] = useState(prefill?.message ?? '');
  const [website, setWebsite] = useState(''); // honeypot — real users leave this blank
  const [loadedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !subject || !trimmedMessage) {
      setStatus('error');
      setStatusMessage('Please fill in your name, email, subject, and message.');
      return;
    }

    const extraLines = [
      companyName.trim() && `Company: ${companyName.trim()}`,
      phoneNumber.trim() && `Phone: ${phoneNumber.trim()}`,
    ].filter(Boolean) as string[];
    const fullMessage = extraLines.length ? `${extraLines.join('\n')}\n\n${trimmedMessage}` : trimmedMessage;

    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject,
          message: fullMessage,
          page_url: window.location.href,
          form_loaded_at: loadedAt,
          website_url: website,
        }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent. We will get back to you soon.');
        setFullName('');
        setCompanyName('');
        setEmail('');
        setPhoneNumber('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(data?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Unable to send your message right now. Please try again later or email us directly.');
    }
  };

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

            {status === 'success' ? (
              <div className="border border-surface-container bg-surface-container-low p-10 text-center">
                <CheckCircle className="text-primary mx-auto mb-4" size={40} strokeWidth={1.5} />
                <p className="font-headline font-bold text-on-surface text-lg mb-2">Message Sent</p>
                <p className="text-secondary text-sm max-w-sm mx-auto">{statusMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label-caps text-[11px] text-secondary">Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Juan dela Cruz"
                      className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-caps text-[11px] text-secondary">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
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
                      required
                      maxLength={150}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-caps text-[11px] text-secondary">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="+63 9XX XXX XXXX"
                      className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Subject *</label>
                  <select
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors appearance-none text-sm"
                  >
                    <option value="">Select a subject…</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-[11px] text-secondary">Message *</label>
                  <textarea
                    required
                    maxLength={4000}
                    rows={6}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your requirements, product model, quantity, or any technical questions…"
                    className="w-full bg-surface-container-low border border-surface-container px-4 py-3 text-on-surface focus:outline-none focus:border-deep-blue transition-colors resize-none text-sm"
                  />
                </div>

                {/* Honeypot — hidden from real users off-screen, left for bots to fill in */}
                <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website_url">Website</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-primary text-white px-12 py-4 label-caps hover:bg-primary-container transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
                    <Send size={16} />
                  </button>
                </div>

                {status === 'error' && (
                  <p role="status" aria-live="polite" className="text-sm text-primary">
                    {statusMessage}
                  </p>
                )}
              </form>
            )}
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
              <a href="tel:+63283513225" className="font-headline font-bold text-xl hover:text-white/80 transition-colors">(02) 8351-3225</a>
              <p className="text-white/60 text-xs mt-1">Mon – Fri, 9:00 AM – 5:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

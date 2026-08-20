import { Facebook, Linkedin } from 'lucide-react';
import type { ProductCategory } from '../data/products';

type FooterPage = 'home' | 'products' | 'services' | 'about' | 'form';

const quickLinks: { label: string; page: FooterPage }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Products', page: 'products' },
  { label: 'Services', page: 'services' },
  { label: 'About Us', page: 'about' },
  { label: 'Downloads', page: 'products' },
  { label: 'Contact Us', page: 'form' },
];

const productCategories: { label: string; category: ProductCategory }[] = [
  { label: 'Variable Frequency Drives', category: 'vfd' },
  { label: 'Induction Motors', category: 'induction-motors' },
  { label: 'Instrumentation Products', category: 'instrumentation' },
  { label: 'Low/Medium Voltage Switchgear', category: 'switchgear' },
  { label: 'Transfer Switch', category: 'transfer-switch' },
  { label: 'Panelboards / Meter Centers', category: 'panelboards-meter-centers' },
  { label: 'Synchronizing Switchgear', category: 'synchronizing-switchgear' },
  { label: 'Circuit Breaker', category: 'circuit-breaker' },
];

export default function Footer({
  onNavigate,
  onNavigateCategory,
  onNavigatePrivacy,
  onNavigateTerms,
}: {
  onNavigate: (page: FooterPage) => void;
  onNavigateCategory: (category: ProductCategory) => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
}) {
  return (
    <footer>
      <div className="bg-deep-blue text-white py-16">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/images/tsys/logo.jpg"
                  alt="T'sys Industrial Controls Inc. logo"
                  className="h-11 w-11 rounded-full object-cover flex-shrink-0"
                />
                <div className="text-base font-black font-headline leading-snug">T'sys Industrial Controls Inc.</div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">Commercial &amp; Industrial Equipment Supplier</p>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.facebook.com/tsysindustrial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="T'sys Industrial Controls on Facebook"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm underline underline-offset-2"
                >
                  <Facebook size={16} strokeWidth={1.5} />
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/in/tsys-industrial-controls-inc-central-luzon-2b7302371/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="T'sys Industrial Controls on LinkedIn"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm underline underline-offset-2"
                >
                  <Linkedin size={16} strokeWidth={1.5} />
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(({ label, page }) => (
                  <li key={label}>
                    <button onClick={() => onNavigate(page)} className="text-white/60 hover:text-white transition-colors text-sm">{label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Product Categories</h4>
              <ul className="space-y-3">
                {productCategories.map(({ label, category }) => (
                  <li key={category}>
                    <button onClick={() => onNavigateCategory(category)} className="text-white/60 hover:text-white transition-colors text-sm">{label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Contact Us</h4>
              <div className="space-y-3 text-white/60 text-sm">
                <p>(02) 8351-3225 / 8351-3495 / 8351-7189 / 8352-3314</p>
                <p>0917 539 5654</p>
                <p>manager@tsys.com.ph</p>
                <p className="leading-relaxed">
                  1F Torre Venezia Bldg., Timog Avenue<br />
                  cor. Sct. Santiago St., Brgy. Laging Handa,<br />
                  Quezon City, Philippines 1103
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-deep-blue-dark border-t border-white/10 py-4">
        <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <span>© {new Date().getFullYear()} T'sys Industrial Controls Inc. All Rights Reserved.</span>
          <div className="flex gap-6">
            <button onClick={onNavigatePrivacy} className="hover:text-white/70 transition-colors">Privacy Policy</button>
            <button onClick={onNavigateTerms} className="hover:text-white/70 transition-colors">Terms &amp; Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

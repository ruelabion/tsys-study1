import { Menu } from 'lucide-react';

type NavMeta = { category?: string; productId?: string };

const navLinks: { label: string; page: string }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Products', page: 'products' },
  { label: 'About Us', page: 'about' },
  { label: 'Contact Us', page: 'form' },
];

export default function Header({
  onNavigate,
  currentPage,
}: {
  onNavigate: (page: string, meta?: NavMeta) => void;
  currentPage: string;
}) {
  const isActive = (label: string, page: string) =>
    (label === 'Home' && currentPage === 'home') ||
    (page !== 'home' && currentPage === page);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-deep-blue text-white">
        <div className="max-w-[1440px] mx-auto px-margin py-2 flex justify-between items-center">
          <span className="text-xs">The Best Alternative to Your Current Needs</span>
          <div className="hidden md:flex items-center gap-6 text-xs">
            <a href="tel:+639175395654" className="hover:text-white/70 transition-colors">0917 539 5654</a>
            <a href="mailto:manager@tsys.com.ph" className="hover:text-white/70 transition-colors">manager@tsys.com.ph</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin h-16 flex justify-between items-center">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/images/tsys/logo.jpg"
              alt="T'sys Industrial Controls Inc. logo"
              className="h-11 w-11 rounded-full object-cover flex-shrink-0"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-tight text-deep-blue font-headline">
                T'sys Industrial Controls Inc.
              </span>
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wide text-secondary">
                Commercial &amp; Industrial Equipment Supplier
              </span>
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, page }) => (
              <button
                key={label}
                onClick={() => onNavigate(page)}
                className={`text-sm font-semibold font-headline tracking-wide pb-1 transition-colors ${
                  isActive(label, page)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface md:hidden"><Menu size={22} /></button>
            <button
              className="hidden md:block bg-primary text-white px-5 py-2 label-caps hover:bg-primary-container transition-all active:scale-95"
              onClick={() => onNavigate('form')}
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

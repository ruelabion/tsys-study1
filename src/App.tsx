/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import TechSpecs from './components/TechSpecs';
import TrustSection from './components/TrustSection';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import About from './components/About';
import Settings from './components/Settings';
import DataEntry from './components/DataEntry';
import Footer from './components/Footer';
import { Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProductCategory } from './data/products';

type FormPrefill = { subject?: string; message?: string };

type PageState =
  | { page: 'home' }
  | { page: 'products'; category?: ProductCategory }
  | { page: 'product'; productId: string }
  | { page: 'about' }
  | { page: 'form'; prefill?: FormPrefill }
  | { page: 'settings' };

const ACTUAL_BRANDS = ['HIMEL', 'Fuji Electric', 'Mitsubishi Electric', 'Schneider Electric', 'Siemens', 'Omron'];

export default function App() {
  const [state, setState] = useState<PageState>({ page: 'home' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.page]);

  const navigate = (next: PageState) => setState(next);

  // Simple page name for Header active state
  const currentPageKey = state.page;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header
        onNavigate={(page, meta) => {
          if (page === 'products') navigate({ page: 'products', category: meta?.category as ProductCategory | undefined });
          else if (page === 'product') navigate({ page: 'product', productId: meta?.productId ?? '' });
          else if (page === 'about') navigate({ page: 'about' });
          else if (page === 'form') navigate({ page: 'form' });
          else if (page === 'settings') navigate({ page: 'settings' });
          else navigate({ page: 'home' });
        }}
        currentPage={currentPageKey}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">

          {/* ── HOME ─────────────────────────────────────────────── */}
          {state.page === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Hero
                onExploreProducts={() => navigate({ page: 'products' })}
                onGetQuote={() => navigate({ page: 'form' })}
              />

              <CategoryGrid
                onNavigateCategory={category => navigate({ page: 'products', category })}
                onViewAll={() => navigate({ page: 'products' })}
              />

              <TrustSection />
              <TechSpecs />

              {/* Trusted Brands */}
              <section className="py-14 border-t border-surface-container">
                <div className="max-w-[1440px] mx-auto px-margin">
                  <div className="text-center mb-10">
                    <h3 className="label-caps text-secondary tracking-widest">Brands We Distribute & Work With</h3>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                    {ACTUAL_BRANDS.map(brand => (
                      <span key={brand} className="font-headline font-bold text-xs uppercase tracking-widest text-secondary/50 hover:text-secondary transition-colors">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Banner */}
              <section className="bg-deep-blue py-20 text-white">
                <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="flex items-start gap-6">
                    <Headphones size={40} className="text-primary flex-shrink-0 mt-1 hidden md:block" />
                    <div>
                      <h2 className="text-3xl md:text-4xl font-headline mb-3">NEED HELP FINDING THE RIGHT SOLUTION?</h2>
                      <p className="text-white/70 max-w-xl">Our team is ready to assist you. Get in touch with us today.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate({ page: 'form' })}
                    className="bg-primary text-white px-12 py-5 label-caps tracking-[0.15em] hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
                  >
                    CONTACT US →
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {/* ── PRODUCTS LIST ────────────────────────────────────── */}
          {state.page === 'products' && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <ProductList
                initialCategory={state.page === 'products' ? state.category : undefined}
                onSelectProduct={id => navigate({ page: 'product', productId: id })}
                onRequestQuote={prefill => navigate({ page: 'form', prefill })}
              />
            </motion.div>
          )}

          {/* ── PRODUCT DETAIL ───────────────────────────────────── */}
          {state.page === 'product' && (
            <ProductDetail
              productId={state.productId}
              onBack={() => navigate({ page: 'products' })}
              onSelectProduct={id => navigate({ page: 'product', productId: id })}
              onRequestQuote={prefill => navigate({ page: 'form', prefill })}
            />
          )}

          {/* ── ABOUT ────────────────────────────────────────────── */}
          {state.page === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <About />
            </motion.div>
          )}

          {/* ── CONTACT ──────────────────────────────────────────── */}
          {state.page === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DataEntry prefill={state.page === 'form' ? state.prefill : undefined} />
            </motion.div>
          )}

          {/* ── SETTINGS (kept as demo) ───────────────────────────── */}
          {state.page === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              <Settings />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate({ page: 'form' })}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 border-2 border-white/20 active:scale-95 transition-transform"
        aria-label="Contact Us"
      >
        <Headphones size={28} />
      </motion.button>
    </div>
  );
}

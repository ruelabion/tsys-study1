/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import About from './components/About';
import Settings from './components/Settings';
import DataEntry from './components/DataEntry';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProductCategory } from './data/products';
import { pathForState, parsePathToState, type PageState } from './lib/routes';

export default function App() {
  const [state, setState] = useState<PageState>(() => parsePathToState(window.location.pathname));
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (scrollTarget) {
      const t = setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
        setScrollTarget(null);
      }, 350);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [state.page]);

  // Real URL routing (History API) — the address bar always reflects the current
  // page, so links are shareable/bookmarkable and crawlers can index individual
  // product/category pages instead of only ever seeing the homepage.
  useEffect(() => {
    const onPopState = () => setState(parsePathToState(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: PageState, opts?: { replace?: boolean }) => {
    const path = pathForState(next);
    if (opts?.replace) {
      window.history.replaceState(null, '', path);
    } else if (path !== window.location.pathname) {
      window.history.pushState(null, '', path);
    }
    setState(next);
  };

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
              <Home
                onExploreProducts={() => navigate({ page: 'products' })}
                onGetQuote={() => navigate({ page: 'form' })}
                onNavigateCategory={category => navigate({ page: 'products', category })}
                onNavigateContact={prefill => navigate({ page: 'form', prefill })}
              />
            </motion.div>
          )}

          {/* ── PRODUCTS LIST ────────────────────────────────────── */}
          {state.page === 'products' && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <ProductList
                initialCategory={state.page === 'products' ? state.category : undefined}
                onSelectProduct={id => navigate({ page: 'product', productId: id })}
                onRequestQuote={prefill => navigate({ page: 'form', prefill })}
                onCategoryChange={category => navigate({ page: 'products', category: category === 'all' ? undefined : category }, { replace: true })}
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
              onNavigateCategory={category => navigate({ page: 'products', category })}
            />
          )}

          {/* ── ABOUT ────────────────────────────────────────────── */}
          {state.page === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <About onNavigateContact={() => navigate({ page: 'form' })} />
            </motion.div>
          )}

          {/* ── CONTACT ──────────────────────────────────────────── */}
          {state.page === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DataEntry prefill={state.page === 'form' ? state.prefill : undefined} />
            </motion.div>
          )}

          {/* ── PRIVACY POLICY ───────────────────────────────────── */}
          {state.page === 'privacy' && (
            <motion.div key="privacy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <PrivacyPolicy onBack={() => navigate({ page: 'home' })} />
            </motion.div>
          )}

          {/* ── TERMS & CONDITIONS ───────────────────────────────── */}
          {state.page === 'terms' && (
            <motion.div key="terms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <TermsConditions onBack={() => navigate({ page: 'home' })} />
            </motion.div>
          )}

          {/* ── SETTINGS (kept as demo) ───────────────────────────── */}
          {state.page === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              <Settings />
            </motion.div>
          )}

          {/* ── NOT FOUND ────────────────────────────────────────── */}
          {state.page === 'notfound' && (
            <motion.div key="notfound" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NotFound onNavigateHome={() => navigate({ page: 'home' }, { replace: true })} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer
        onNavigate={page => {
          if (page === 'services') {
            setScrollTarget('services');
            navigate({ page: 'home' });
          } else if (page === 'products') navigate({ page: 'products' });
          else if (page === 'about') navigate({ page: 'about' });
          else if (page === 'form') navigate({ page: 'form' });
          else navigate({ page: 'home' });
        }}
        onNavigateCategory={category => navigate({ page: 'products', category })}
        onNavigatePrivacy={() => navigate({ page: 'privacy' })}
        onNavigateTerms={() => navigate({ page: 'terms' })}
      />

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

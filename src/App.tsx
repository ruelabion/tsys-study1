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
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import DataEntry from './components/DataEntry';
import Footer from './components/Footer';
import { Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              
              <div 
                className="cursor-pointer" 
                onClick={() => handleNavigate('product')}
              >
                <CategoryGrid />
              </div>
              
              <TrustSection />
              <TechSpecs />

              {/* Trusted Brands */}
              <section className="py-14 border-t border-surface-container">
                <div className="max-w-[1440px] mx-auto px-margin">
                  <div className="text-center mb-10">
                    <h3 className="label-caps text-secondary tracking-widest">Trusted Brands We Work With</h3>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
                    {['Mitsubishi Electric', 'Omron', 'Schneider Electric', 'Siemens', 'Autonics', 'Delta', 'SMC'].map(brand => (
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
                    onClick={() => handleNavigate('form')}
                    className="bg-primary text-white px-12 py-5 label-caps tracking-[0.15em] hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
                  >
                    CONTACT US →
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {currentPage === 'product' && (
            <ProductDetail onBack={() => handleNavigate('home')} />
          )}

          {currentPage === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <UserProfile />
            </motion.div>
          )}

          {currentPage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <Settings />
            </motion.div>
          )}

          {currentPage === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DataEntry />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Support Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 border-2 border-white/20 active:scale-95 transition-transform"
      >
        <Headphones size={28} />
      </motion.button>
    </div>
  );
}


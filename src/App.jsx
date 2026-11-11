import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';
import { buildWhatsAppUrl } from './config';
import { useContent } from './content/pt';
import { InteractiveLogo } from './components/InteractiveLogo';
import { Hero } from './components/Hero';
import { ProblemAuthority } from './components/ProblemAuthority';
import { AnatomySection } from './components/AnatomySection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { FastTrackProcess } from './components/FastTrackProcess';
import { FAQSection } from './components/FAQSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export function App() {
  const { brand, nav } = useContent();
  const [activeView, setActiveView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleNavigateView = useCallback((viewId) => {
    setMobileMenuOpen(false);
    setActiveView(viewId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Motion.dev View Transitions with Blur-Reveal & Spring Physics
  const viewMotionVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      filter: prefersReducedMotion ? 'none' : 'blur(8px)'
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 170,
        damping: 22,
        mass: 0.7
      }
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -14,
      filter: prefersReducedMotion ? 'none' : 'blur(6px)',
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-obsidian text-fg overflow-x-hidden">
      {/* Skip to Main Content for Keyboard Accessibility */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:bg-indigo-deep focus:text-fg focus:outline-none focus:ring-2 focus:ring-emerald-glow"
      >
        {nav.skipToContent}
      </a>

      {/* Fixed Architectural Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-architectural-grid"
      />

      {/* Multi-Page / View Studio Navigation Header */}
      <header className="fixed top-2 sm:top-3 left-0 right-0 z-30 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Navegação Principal do Estúdio"
            className="flex items-center justify-between gap-2 rounded-full px-3 sm:px-6 py-2 sm:py-2.5 backdrop-blur-xl bg-surface/90 border border-hairline/15 shadow-inner-glint"
          >
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => handleNavigateView('home')}
              className="inline-flex items-center gap-2 sm:gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow rounded-full cursor-pointer shrink-0"
            >
              <InteractiveLogo size={30} interactive={true} />
              <div>
                <span className="block font-display font-bold text-sm sm:text-base text-fg tracking-tight leading-none">
                  {brand.name}
                </span>
                <span className="hidden xl:block font-mono text-[10px] text-fg-subtle mt-0.5">
                  {brand.tagline}
                </span>
              </div>
            </button>

            {/* Desktop Switcher Tabs */}
            <div
              role="tablist"
              aria-label="Áreas do Estúdio"
              className="hidden md:flex items-center justify-center gap-1 p-1 rounded-full bg-obsidian/80 border border-hairline/10"
            >
              {nav.views.map((view) => {
                const isCurrent = activeView === view.id;
                return (
                  <button
                    key={view.id}
                    role="tab"
                    type="button"
                    aria-selected={isCurrent}
                    onClick={() => handleNavigateView(view.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow ${
                      isCurrent
                        ? 'bg-indigo-deep text-fg shadow-indigo-aura border border-indigo-glow/50'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop WhatsApp CTA */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 bg-surface-elevated hover:bg-emerald-deep text-fg text-xs font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-glow" />
              <span>{nav.ctaLabel}</span>
            </a>

            {/* Mobile Right Controls (Compact CTA + Menu Toggle - Zero Scrollbar) */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-emerald-deep text-fg text-xs font-semibold border border-emerald-glow/40 shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Diagnóstico</span>
              </a>

              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-obsidian/90 border border-hairline/15 flex items-center justify-center text-fg hover:border-indigo-glow/50 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-2 p-2 rounded-2xl backdrop-blur-xl bg-surface/95 border border-hairline/15 shadow-elevated-card flex flex-col gap-1"
              >
                {nav.views.map((view) => {
                  const isCurrent = activeView === view.id;
                  return (
                    <button
                      key={view.id}
                      type="button"
                      onClick={() => handleNavigateView(view.id)}
                      className={`w-full text-left rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-deep text-fg border border-indigo-glow/50'
                          : 'text-fg-muted hover:text-fg hover:bg-surface-elevated/60'
                      }`}
                    >
                      {view.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Multi-View Main Content Area with Blur-Reveal Spring Transitions */}
      <main id="conteudo-principal" className="relative z-10">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="view-home"
              variants={viewMotionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero
                onNavigatePortfolio={() => handleNavigateView('portfolio')}
              />
              <ProblemAuthority />
              <AnatomySection />
              <PortfolioShowcase
                onNavigateFullPortfolio={() => handleNavigateView('portfolio')}
                isFullPage={false}
              />
              <FastTrackProcess />
              <FAQSection />
            </motion.div>
          )}

          {activeView === 'portfolio' && (
            <motion.div
              key="view-portfolio"
              variants={viewMotionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PortfolioShowcase
                isFullPage={true}
              />
              <AnatomySection />
              <FastTrackProcess />
            </motion.div>
          )}

          {activeView === 'process' && (
            <motion.div
              key="view-process"
              variants={viewMotionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-16 md:pt-12"
            >
              <FastTrackProcess />
              <AnatomySection />
              
              <FAQSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer & Floating WhatsApp Concierge */}
      <Footer
        onNavigateView={handleNavigateView}
      />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

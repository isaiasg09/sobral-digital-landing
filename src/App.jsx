import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from './config';
import { useContent } from './content/pt';
import { InteractiveLogo } from './components/InteractiveLogo';
import { Hero } from './components/Hero';
import { ProblemAuthority } from './components/ProblemAuthority';
import { AnatomySection } from './components/AnatomySection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { FastTrackProcess } from './components/FastTrackProcess';
import { FAQSection } from './components/FAQSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export function App() {
  const { brand, nav } = useContent();
  const [activeView, setActiveView] = useState('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleNavigateView = useCallback((viewId) => {
    setSelectedCaseStudy(null);
    setActiveView(viewId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenCaseStudy = useCallback((project) => {
    setSelectedCaseStudy(project);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setSelectedCaseStudy(null);
  }, []);

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
      <header className="fixed top-3 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Navegação Principal do Estúdio"
            className="flex flex-col md:flex-row items-center justify-between gap-2.5 rounded-3xl md:rounded-full px-4 sm:px-6 py-2.5 backdrop-blur-xl bg-surface/85 border border-hairline/15 shadow-inner-glint"
          >
            <div className="w-full md:w-auto flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleNavigateView('home')}
                className="inline-flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow rounded-full cursor-pointer"
              >
                <InteractiveLogo size={34} interactive={true} />
                <div>
                  <span className="block font-display font-bold text-sm sm:text-base text-fg tracking-tight leading-none">
                    {brand.name}
                  </span>
                  <span className="hidden xl:block font-mono text-[10px] text-fg-subtle mt-0.5">
                    {brand.tagline}
                  </span>
                </div>
              </button>

              {/* Mobile Direct WhatsApp CTA */}
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-emerald-deep text-fg text-xs font-semibold border border-emerald-glow/40 shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Diagnóstico</span>
              </a>
            </div>

            {/* 3 Dedicated Studio Views Switcher */}
            <div
              role="tablist"
              aria-label="Áreas do Estúdio"
              className="w-full md:w-auto flex items-center justify-center gap-1 p-1 rounded-full bg-obsidian/80 border border-hairline/10 overflow-x-auto"
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
                    className={`rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow ${
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
          </nav>
        </div>
      </header>

      {/* Multi-View Main Content Area */}
      <main id="conteudo-principal" className="relative z-10">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Hero
                onNavigatePortfolio={() => handleNavigateView('portfolio')}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
              <ProblemAuthority />
              <AnatomySection />
              <PortfolioShowcase
                onOpenCaseStudy={handleOpenCaseStudy}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PortfolioShowcase
                onOpenCaseStudy={handleOpenCaseStudy}
                isFullPage={true}
              />
              <AnatomySection />
              <FastTrackProcess />
            </motion.div>
          )}

          {activeView === 'process' && (
            <motion.div
              key="view-process"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-12"
            >
              <FastTrackProcess />
              <AnatomySection />
              <ProblemAuthority />
              <FAQSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Full-Scale Interactive Case Study Modal (Desktop / Mobile Live Iframe + Business Breakdown) */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={handleCloseCaseStudy}
        onSelectProject={handleOpenCaseStudy}
      />

      {/* Footer & Floating WhatsApp Concierge */}
      <Footer
        onNavigateView={handleNavigateView}
        onOpenCaseStudy={handleOpenCaseStudy}
      />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

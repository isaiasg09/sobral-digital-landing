import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  Monitor,
  Smartphone,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

export function CaseStudyModal({ project, onClose, onSelectProject }) {
  const { portfolio } = useContent();
  const [viewportMode, setViewportMode] = useState('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIframeLoaded(false);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const customWhatsAppMessage = `Olá! Vi o projeto "${project.name}" (${project.niche}) no portfólio da Sobral Digital e quero uma estrutura desse nível para o meu negócio.`;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
        className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-2xl overflow-y-auto"
      >
        <div className="min-h-[100dvh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-between">
          {/* Top Navigation Bar inside Case Study */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-hairline/15">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-surface-elevated hover:bg-indigo-deep/40 text-fg text-xs sm:text-sm font-semibold border border-hairline/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{portfolio.caseStudyModal.backLabel}</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5">
                {portfolio.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProject(item)}
                    className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                      item.id === project.id
                        ? 'bg-indigo-deep text-fg border border-indigo-glow/50'
                        : 'bg-surface text-fg-muted hover:text-fg border border-hairline/10'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 bg-surface-elevated hover:bg-indigo-deep/40 text-fg text-xs sm:text-sm font-semibold border border-indigo-glow/40 transition-colors"
              >
                <span>{portfolio.openExternalLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-glow" />
              </a>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar Estudo de Caso"
                className="w-10 h-10 rounded-full bg-surface-elevated hover:bg-danger-muted/20 text-fg flex items-center justify-center border border-hairline/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Project Title & Viewport Toggle Header */}
          <div className="py-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-emerald-deep/25 border border-emerald-glow/40 font-mono text-xs text-emerald-glow">
                  <span className="w-2 h-2 rounded-full bg-emerald-glow animate-ping" />
                  {portfolio.liveBadge}
                </span>
                <span className="font-mono text-xs text-fg-muted px-3 py-0.5 rounded-full bg-surface-elevated border border-hairline/15">
                  {project.niche}
                </span>
                {project.metric && (
                  <span className="font-mono text-xs text-indigo-glow px-3 py-0.5 rounded-full bg-indigo-deep/20 border border-indigo-glow/35">
                    {project.metric}
                  </span>
                )}
              </div>

              <h2
                id="case-study-title"
                className="font-display font-extrabold text-2xl sm:text-4xl text-fg tracking-tight"
              >
                {project.name}
              </h2>
              <p className="text-sm sm:text-base text-fg-muted mt-1 max-w-2xl">
                {project.headline}
              </p>
            </div>

            {/* Interactive Desktop / Mobile Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-surface-elevated border border-hairline/15 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-indigo-deep text-fg shadow-indigo-aura'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>{portfolio.caseStudyModal.desktopView}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-emerald-deep text-fg shadow-emerald-aura'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>{portfolio.caseStudyModal.mobileView}</span>
              </button>
            </div>
          </div>

          {/* Full-Scale Interactive Live Preview Frame */}
          <div className="p-1.5 rounded-[2rem] bg-fg/[0.04] border border-hairline/15 shadow-elevated-card mb-10">
            <div className="rounded-[calc(2rem-0.375rem)] bg-surface border border-hairline/10 p-3 sm:p-5 flex flex-col items-center">
              {/* Browser URL Bar */}
              <div className="w-full flex items-center justify-between gap-2 px-4 py-2.5 mb-3 rounded-xl bg-obsidian border border-hairline/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger-muted/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-glow/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-glow/70" />
                </div>
                <span className="font-mono text-xs text-fg-muted truncate">
                  {project.url}
                </span>
                <span className="font-mono text-[10px] text-emerald-glow uppercase">
                  {viewportMode === 'desktop' ? '1440px Desktop' : '390px Mobile'}
                </span>
              </div>

              {/* Responsive Live Iframe Container */}
              <div
                className={`relative transition-all duration-300 rounded-2xl overflow-hidden border border-indigo-glow/30 bg-obsidian ${
                  viewportMode === 'mobile'
                    ? 'w-full max-w-[390px] h-[660px] shadow-emerald-aura'
                    : 'w-full h-[540px] sm:h-[640px]'
                }`}
              >
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-obsidian/90 p-6 text-center">
                    <span className="w-8 h-8 rounded-full border-2 border-indigo-glow border-t-transparent animate-spin mb-3" />
                    <span className="font-mono text-xs text-fg-muted">
                      Carregando site interativo ao vivo ({project.name})...
                    </span>
                  </div>
                )}
                <iframe
                  src={project.url}
                  title={`Site ao vivo: ${project.name}`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full border-0 bg-obsidian"
                />
              </div>
            </div>
          </div>

          {/* Case Study Breakdown: Challenge vs. Sobral Digital Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            {/* Business Challenge */}
            <div className="lg:col-span-5 p-1.5 rounded-[2rem] bg-fg/[0.02] border border-hairline/10 flex">
              <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface/90 border border-hairline/10 p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 bg-danger-muted/15 border border-danger-muted/30 font-mono text-xs text-danger-muted">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Diagnóstico Inicial</span>
                </div>
                <h3 className="font-display font-bold text-xl text-fg mb-3">
                  {portfolio.caseStudyModal.challengeHeading}
                </h3>
                <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            </div>

            {/* Sobral Digital Solution & Highlights */}
            <div className="lg:col-span-7 p-1.5 rounded-[2rem] bg-emerald-deep/10 border border-emerald-glow/35 shadow-emerald-aura flex">
              <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface-elevated/95 border border-emerald-glow/25 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 bg-emerald-deep/25 border border-emerald-glow/40 font-mono text-xs text-emerald-glow">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Arquitetura de Conversão</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-fg mb-3">
                    {portfolio.caseStudyModal.solutionHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-fg-muted leading-relaxed mb-5">
                    {project.solution}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-hairline/10">
                    {project.highlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-obsidian/70 p-3 border border-emerald-glow/20 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                        <span className="text-xs text-fg leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Conversion CTA Banner inside Case Study */}
          <div className="p-1.5 rounded-[2rem] bg-indigo-deep/20 border border-indigo-glow/40 shadow-indigo-aura">
            <div className="rounded-[calc(2rem-0.375rem)] bg-surface-elevated p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-glow block mb-1">
                  PRÓXIMO PASSO PARA SUA EMPRESA
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-fg">
                  Gostou da estrutura do projeto {project.name}?
                </h3>
                <p className="text-sm text-fg-muted mt-1">
                  Desenvolvemos um projeto exclusivo sob medida para o seu nicho e sua cidade em até 48h.
                </p>
              </div>

              <a
                href={buildWhatsAppUrl(customWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full pl-6 pr-3 py-3 bg-emerald-deep hover:bg-emerald-glow text-fg font-semibold text-sm sm:text-base border border-emerald-glow/50 shadow-emerald-aura transition-colors shrink-0"
              >
                <span>{portfolio.caseStudyModal.ctaButton}</span>
                <span className="w-9 h-9 rounded-full bg-fg/15 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-fg" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  Coffee,
  Scissors,
  Utensils,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

function PortfolioItemCard({ item, index, isFullPage }) {
  const prefersReducedMotion = useReducedMotion();

  const iconMap = {
    'cafe-e-prosa': Coffee,
    'gauchos-hair': Scissors,
    'estacao-da-comida': Utensils,
    'dluxo-hair': Sparkles
  };
  const NicheIcon = iconMap[item.id] || Sparkles;
  const isEmerald = item.accentColor === 'emerald';

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`p-1 sm:p-1.5 rounded-[1.75rem] border transition-colors ${
        isEmerald
          ? 'bg-emerald-deep/[0.06] border-emerald-glow/25 hover:border-emerald-glow/50'
          : 'bg-indigo-deep/[0.06] border-indigo-glow/25 hover:border-indigo-glow/50'
      }`}
    >
      <div className="h-full rounded-[calc(1.75rem-0.25rem)] sm:rounded-[calc(1.75rem-0.375rem)] bg-surface/95 border border-hairline/10 p-4 sm:p-6 flex flex-col justify-between shadow-inner-glint">
        <div>
          {/* Compact Top Row: Logo Icon + Name + Niche + Live Status */}
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${
                  isEmerald
                    ? 'bg-emerald-deep/25 border-emerald-glow/40 text-emerald-glow'
                    : 'bg-indigo-deep/25 border-indigo-glow/40 text-indigo-glow'
                }`}
              >
                <NicheIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-fg leading-tight">
                    {item.name}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-fg-muted block mt-0.5">
                  {item.niche}
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 bg-emerald-deep/20 border border-emerald-glow/35 font-mono text-[10px] text-emerald-glow shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
              No Ar
            </span>
          </div>

          {/* Concise Explanation */}
          <p className="text-xs sm:text-sm font-medium text-fg mb-1.5 leading-snug">
            {item.headline}
          </p>
          <p className="text-xs text-fg-muted leading-relaxed mb-4">
            {item.summary}
          </p>

          {/* Compact Highlights List */}
          <ul className="space-y-1.5 mb-5">
            {item.highlights.slice(0, isFullPage ? 3 : 2).map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-xs text-fg-muted"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-glow shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clean Action Buttons: Open in New Tab + WhatsApp */}
        <div className="pt-3.5 border-t border-hairline/10 flex flex-wrap items-center gap-2.5">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 bg-indigo-deep hover:bg-indigo-glow text-fg text-xs font-semibold border border-indigo-glow/50 shadow-indigo-aura transition-colors"
          >
            <span>Abrir em Nova Guia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={buildWhatsAppUrl(
              `Olá! Vi o projeto ${item.name} (${item.niche}) no portfólio e quero um site desse nível para o meu negócio.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 bg-surface-elevated hover:bg-emerald-deep/25 text-emerald-glow hover:text-fg text-xs font-semibold border border-emerald-glow/35 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Quero Igual</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioShowcase({
  onNavigateFullPortfolio,
  isFullPage = false
}) {
  const { portfolio } = useContent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={`relative ${
        isFullPage
          ? 'pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-32'
          : 'py-16 sm:py-24 md:py-32'
      } border-b border-hairline/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-8 sm:mb-12 md:mb-14"
        >
          <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-emerald-glow mb-2.5 sm:mb-3">
            {portfolio.eyebrow}
          </span>
          <h2
            id="portfolio-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-fg leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4"
          >
            {portfolio.h2}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed">
            {portfolio.subtitle}
          </p>
        </motion.div>

        {/* Clean Responsive Grid / List: 1 col compact on Mobile, 2 cols on Tablet/Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portfolio.items.map((item, index) => (
            <PortfolioItemCard
              key={item.id}
              item={item}
              index={index}
              isFullPage={isFullPage}
            />
          ))}
        </div>

        {/* Bottom CTA to Dedicated Portfolio View when on Home */}
        {!isFullPage && onNavigateFullPortfolio && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={onNavigateFullPortfolio}
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 bg-surface-elevated hover:bg-indigo-deep text-fg font-semibold text-xs sm:text-sm border border-indigo-glow/40 shadow-indigo-aura transition-colors cursor-pointer"
            >
              <span>{portfolio.viewAllPortfolioCta}</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-glow" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

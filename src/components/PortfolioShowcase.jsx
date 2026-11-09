import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  Play,
  RotateCcw,
  Coffee,
  Scissors,
  Utensils,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ArrowUpRight
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

function CinemaPoster({ item, onLoadInline, onOpenCaseStudy }) {
  const iconMap = {
    'cafe-e-prosa': Coffee,
    'gauchos-hair': Scissors,
    'estacao-da-comida': Utensils,
    'dluxo-hair': Sparkles
  };
  const NicheIcon = iconMap[item.id] || Sparkles;
  const isEmerald = item.accentColor === 'emerald';

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-obsidian border border-hairline/15 overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none">
      {/* Architectural SVG Cinema Backdrop */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 450"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-45"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient
            id={`cinema-grad-${item.id}`}
            cx="50%"
            cy="30%"
            r="70%"
          >
            <stop
              offset="0%"
              stopColor={
                isEmerald
                  ? 'rgb(var(--color-emerald-glow))'
                  : 'rgb(var(--color-indigo-glow))'
              }
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--color-obsidian))"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>
        <rect width="800" height="450" fill={`url(#cinema-grad-${item.id})`} />
        {/* Desktop Browser Mockup inside SVG */}
        <rect
          x="60"
          y="40"
          width="680"
          height="370"
          rx="18"
          fill="rgb(var(--color-surface) / 0.82)"
          stroke="rgb(var(--color-fg) / 0.14)"
          strokeWidth="1.5"
        />
        <line
          x1="60"
          y1="78"
          x2="740"
          y2="78"
          stroke="rgb(var(--color-fg) / 0.1)"
          strokeWidth="1"
        />
        <circle cx="86" cy="59" r="5" fill="rgb(var(--color-danger-muted) / 0.6)" />
        <circle cx="104" cy="59" r="5" fill="rgb(var(--color-emerald-glow) / 0.6)" />
        <circle cx="122" cy="59" r="5" fill="rgb(var(--color-indigo-glow) / 0.6)" />
        {/* Mock Hero Inside Frame */}
        <rect
          x="100"
          y="115"
          width="280"
          height="24"
          rx="6"
          fill="rgb(var(--color-fg) / 0.22)"
        />
        <rect
          x="100"
          y="152"
          width="360"
          height="14"
          rx="4"
          fill="rgb(var(--color-fg) / 0.12)"
        />
        <rect
          x="100"
          y="176"
          width="310"
          height="14"
          rx="4"
          fill="rgb(var(--color-fg) / 0.08)"
        />
        <rect
          x="100"
          y="218"
          width="160"
          height="42"
          rx="21"
          fill={
            isEmerald
              ? 'rgb(var(--color-emerald-glow) / 0.35)'
              : 'rgb(var(--color-indigo-glow) / 0.35)'
          }
        />
        <rect
          x="500"
          y="108"
          width="195"
          height="265"
          rx="16"
          fill="rgb(var(--color-surface-elevated) / 0.9)"
          stroke={
            isEmerald
              ? 'rgb(var(--color-emerald-glow) / 0.4)'
              : 'rgb(var(--color-indigo-glow) / 0.4)'
          }
          strokeWidth="1.5"
        />
      </svg>

      {/* Top Chrome Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-surface-elevated/95 border border-hairline/15">
          <NicheIcon
            className={`w-4 h-4 ${
              isEmerald ? 'text-emerald-glow' : 'text-indigo-glow'
            }`}
          />
          <span className="font-mono text-xs text-fg">{item.niche}</span>
        </div>

        <span className="font-mono text-xs text-fg-muted px-3 py-1 rounded-full bg-obsidian/80 border border-hairline/10">
          {item.url}
        </span>
      </div>

      {/* Center Interactive Actions */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-lg mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-glow mb-2">
          VITRINE INTERATIVA EM TAMANHO REAL
        </span>
        <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-fg mb-3">
          {item.name}
        </h4>
        <p className="text-xs sm:text-sm text-fg-muted mb-6 leading-relaxed">
          {item.headline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(item)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-indigo-deep hover:bg-indigo-glow text-fg text-xs sm:text-sm font-semibold border border-indigo-glow/50 shadow-indigo-aura transition-all cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Abrir Estudo de Caso + Desktop/Mobile</span>
          </button>

          <button
            type="button"
            onClick={onLoadInline}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 bg-surface-elevated/95 hover:bg-emerald-deep/30 text-fg text-xs sm:text-sm font-semibold border border-emerald-glow/40 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-emerald-glow" />
            <span>Carregar Site Aqui Mesmo</span>
          </button>
        </div>
      </div>

      {/* Bottom Highlights Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-hairline/10 text-xs text-fg-muted">
        <span>Clique para navegar no site real sem sair da página</span>
        <span className="font-mono text-emerald-glow">● Produção Verificada</span>
      </div>
    </div>
  );
}

function CinemaShowcaseCard({ item, index, labels, onOpenCaseStudy }) {
  const [inlineIframeActive, setInlineIframeActive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isEmerald = item.accentColor === 'emerald';

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`w-full p-2 rounded-[2.25rem] border shadow-elevated-card ${
        isEmerald
          ? 'bg-emerald-deep/[0.06] border-emerald-glow/30'
          : 'bg-indigo-deep/[0.06] border-indigo-glow/30'
      }`}
    >
      <div className="rounded-[calc(2.25rem-0.5rem)] bg-surface/95 border border-hairline/10 p-6 sm:p-8 lg:p-10 shadow-inner-glint">
        {/* Top Cinema Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-hairline/10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="font-mono text-xs text-fg-subtle">
                PROJETO 0{index + 1}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 bg-emerald-deep/20 border border-emerald-glow/40 font-mono text-xs text-emerald-glow">
                <span className="w-2 h-2 rounded-full bg-emerald-glow animate-ping" />
                {labels.liveBadge}
              </span>
              <span className="font-mono text-xs text-fg-muted px-3 py-0.5 rounded-full bg-surface-elevated border border-hairline/15">
                {item.niche}
              </span>
              {item.metric && (
                <span className="font-mono text-xs text-indigo-glow px-3 py-0.5 rounded-full bg-indigo-deep/20 border border-indigo-glow/35">
                  {item.metric}
                </span>
              )}
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-fg tracking-tight">
              {item.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenCaseStudy(item)}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-indigo-deep hover:bg-indigo-glow text-fg text-xs sm:text-sm font-semibold border border-indigo-glow/50 shadow-indigo-aura transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{labels.openCaseStudyLabel}</span>
            </button>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 bg-surface-elevated hover:bg-surface text-fg text-xs sm:text-sm font-semibold border border-hairline/15 transition-colors"
            >
              <span>{labels.openExternalLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-glow" />
            </a>
          </div>
        </div>

        {/* Full-Width Cinema Body: 7 Columns Interactive Viewport + 5 Columns Executive Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Giant Interactive Live Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            {!inlineIframeActive ? (
              <CinemaPoster
                item={item}
                onLoadInline={() => setInlineIframeActive(true)}
                onOpenCaseStudy={onOpenCaseStudy}
              />
            ) : (
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl bg-obsidian border border-indigo-glow/40 overflow-hidden flex flex-col">
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-obsidian/90 p-4 text-center">
                    <span className="font-mono text-xs text-fg-muted animate-pulse">
                      Carregando prévia interativa de {item.name}...
                    </span>
                  </div>
                )}
                <iframe
                  src={item.url}
                  title={`Prévia ao vivo: ${item.name}`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full border-0 bg-obsidian"
                />
                <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-surface-elevated border-t border-hairline/10">
                  <span className="text-xs text-fg-muted truncate">
                    Interagindo ao vivo com {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(item)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-indigo-deep text-fg text-xs font-mono cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Tela Cheia / Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInlineIframeActive(false);
                        setIframeLoaded(false);
                      }}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-surface text-fg-muted hover:text-fg text-xs font-mono border border-hairline/15 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Pôster</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Business Challenge, Sobral Digital Solution & Direct Conversion */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-obsidian/70 border border-hairline/10 p-6">
            <div className="space-y-5">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-danger-muted block mb-1">
                  O Desafio Comercial
                </span>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {item.challenge}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-glow block mb-1">
                  A Solução Sobral Digital
                </span>
                <p className="text-xs sm:text-sm text-fg leading-relaxed">
                  {item.solution}
                </p>
              </div>

              <ul className="space-y-2 pt-3 border-t border-hairline/10">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs text-fg-muted"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onOpenCaseStudy(item)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 bg-surface-elevated hover:bg-indigo-deep/40 text-fg text-xs font-semibold border border-indigo-glow/35 transition-colors cursor-pointer"
              >
                <span>Inspecionar Caso Completo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-glow" />
              </button>

              <a
                href={buildWhatsAppUrl(
                  `Olá! Vi o projeto ${item.name} e quero um site desse nível para o meu negócio.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 bg-emerald-deep/25 hover:bg-emerald-deep text-emerald-glow hover:text-fg text-xs font-semibold border border-emerald-glow/40 transition-colors"
              >
                <span>Quero Igual para Mim</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioShowcase({
  onOpenCaseStudy,
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
        isFullPage ? 'pt-32 pb-24 md:pt-36 md:pb-32' : 'py-24 md:py-32'
      } border-b border-hairline/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 md:mb-18"
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-emerald-glow mb-3">
            {portfolio.eyebrow}
          </span>
          <h2
            id="portfolio-heading"
            className="font-display font-bold text-2xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-fg leading-[1.12] mb-4"
          >
            {portfolio.h2}
          </h2>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
            {portfolio.subtitle}
          </p>
        </motion.div>

        {/* Full-Width Cinema Showcase Stack */}
        <div className="flex flex-col gap-10 lg:gap-12">
          {portfolio.items.map((item, index) => (
            <CinemaShowcaseCard
              key={item.id}
              item={item}
              index={index}
              labels={portfolio}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>

        {/* Bottom CTA to Dedicated Portfolio View when on Home */}
        {!isFullPage && onNavigateFullPortfolio && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={onNavigateFullPortfolio}
              className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 bg-surface-elevated hover:bg-indigo-deep text-fg font-semibold text-sm sm:text-base border border-indigo-glow/40 shadow-indigo-aura transition-colors cursor-pointer"
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

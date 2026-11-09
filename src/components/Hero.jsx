import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  MessageCircle,
  TrendingUp,
  MapPin,
  Zap,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';
import { useMagnetic } from '../hooks/useMagnetic';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { InteractiveLogo } from './InteractiveLogo';

export function Hero({ onNavigatePortfolio, onOpenCaseStudy }) {
  const { hero, portfolio } = useContent();
  const prefersReducedMotion = useReducedMotion();
  const primaryMagnetic = useMagnetic({ strength: 0.28, maxOffset: 12 });
  const secondaryMagnetic = useMagnetic({ strength: 0.28, maxOffset: 12 });
  const { motionDisabled, layer1, layer2, layer3, rotateX, rotateY } =
    useMouseParallax();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeProject = portfolio.items[activeSlideIndex] || portfolio.items[0];

  const badgeIcons = [TrendingUp, MapPin, Zap];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] pt-28 pb-20 md:pt-32 md:pb-28 flex flex-col justify-between overflow-hidden border-b border-hairline/10"
    >
      {/* Ambient Radial Illumination Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[34rem] h-[34rem] rounded-full bg-radial-indigo opacity-85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-10 w-[30rem] h-[30rem] rounded-full bg-radial-emerald opacity-75"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Featured Interactive Logo, Shimmer Headline, Revenue Copy & Magnetic CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Brand Identity Pill with Interactive SVG Logo */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 rounded-2xl p-2 pr-4 mb-7 bg-surface-elevated/90 border border-hairline/15 shadow-inner-glint"
            >
              <InteractiveLogo size={38} interactive={true} />
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-glow">
                  {hero.eyebrow}
                </span>
                <span className="block text-xs text-fg-muted font-medium">
                  Design de Elite & Funil Direto no WhatsApp
                </span>
              </div>
            </motion.div>

            {/* Impact Headline with Continuous Shimmer Flow (#FAFAFA -> #6366F1 -> #10B981) */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.35rem] tracking-tight leading-[1.08] mb-6"
            >
              <span className="block text-fg mb-1.5">{hero.h1Part1}</span>
              <span className="block text-shimmer-flow pb-1">
                {hero.h1Shimmer}
              </span>
            </motion.h1>

            {/* Persuasive Subtitle Focused on Revenue & Authority */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-fg-muted leading-relaxed max-w-[58ch] mb-8"
            >
              {hero.subtitle}
            </motion.p>

            {/* Dual Magnetic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8"
            >
              <motion.button
                ref={primaryMagnetic.ref}
                type="button"
                onClick={onNavigatePortfolio}
                onMouseMove={primaryMagnetic.handleMouseMove}
                onMouseLeave={primaryMagnetic.handleMouseLeave}
                style={{ x: primaryMagnetic.x, y: primaryMagnetic.y }}
                className="group relative inline-flex items-center justify-between sm:justify-center gap-3 rounded-full pl-6 pr-2.5 py-2.5 bg-indigo-deep hover:bg-indigo-glow text-fg font-semibold text-sm sm:text-base border border-indigo-glow/50 shadow-indigo-aura transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow cursor-pointer"
              >
                <span>{hero.primaryCta}</span>
                <span className="w-9 h-9 rounded-full bg-fg/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-fg" />
                </span>
              </motion.button>

              <motion.a
                ref={secondaryMagnetic.ref}
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={secondaryMagnetic.handleMouseMove}
                onMouseLeave={secondaryMagnetic.handleMouseLeave}
                style={{ x: secondaryMagnetic.x, y: secondaryMagnetic.y }}
                className="group relative inline-flex items-center justify-between sm:justify-center gap-3 rounded-full pl-6 pr-3 py-2.5 bg-surface-elevated/95 hover:bg-emerald-deep/25 text-fg font-semibold text-sm sm:text-base border border-emerald-glow/40 shadow-emerald-aura transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow cursor-pointer"
              >
                <span>{hero.secondaryCta}</span>
                <span className="w-9 h-9 rounded-full bg-emerald-deep/30 border border-emerald-glow/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <MessageCircle className="w-4 h-4 text-emerald-glow" />
                </span>
              </motion.a>
            </motion.div>

            {/* Quick Trust Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-glow" />
                Entrega Rápida em 48h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-glow" />
                Foco 100% em Celular & WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-glow" />
                Sem Mensalidades Ocultas
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showreel — Floating MacBook Pro & iPhone 16 Pro + Commercial Result Badges */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              style={{
                rotateX: motionDisabled ? 0 : rotateX,
                rotateY: motionDisabled ? 0 : rotateY,
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full max-w-2xl mx-auto pt-4 pb-8"
            >
              {/* Floating Commercial Result Badges around 3D Devices */}
              {hero.floatingBadges.map((badge, idx) => {
                const BadgeIcon = badgeIcons[idx % badgeIcons.length];
                const positionClasses = [
                  '-top-2 left-2 sm:left-4 z-30',
                  'top-1/2 -right-1 sm:-right-3 -translate-y-1/2 z-30',
                  '-bottom-2 left-4 sm:left-10 z-30'
                ][idx];
                const depth = idx === 0 ? layer3 : idx === 1 ? layer2 : layer1;
                const isEmerald = badge.accent === 'emerald';

                return (
                  <motion.div
                    key={badge.id}
                    style={{
                      x: motionDisabled ? 0 : depth.x,
                      y: motionDisabled ? 0 : depth.y
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    className={`hidden sm:flex absolute ${positionClasses} items-center gap-2.5 rounded-2xl px-3.5 py-2.5 backdrop-blur-xl bg-obsidian/90 border shadow-elevated-card ${
                      isEmerald
                        ? 'border-emerald-glow/45 shadow-emerald-aura'
                        : 'border-indigo-glow/45 shadow-indigo-aura'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isEmerald
                          ? 'bg-emerald-deep/30 text-emerald-glow'
                          : 'bg-indigo-deep/30 text-indigo-glow'
                      }`}
                    >
                      <BadgeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs text-fg leading-tight">
                        {badge.label}
                      </p>
                      <p className="text-[10px] text-fg-muted leading-tight mt-0.5">
                        {badge.sub}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* 3D MacBook Pro Frame */}
              <motion.div
                style={{
                  x: motionDisabled ? 0 : layer1.x,
                  y: motionDisabled ? 0 : layer1.y
                }}
                className="relative z-10 p-1.5 rounded-[1.75rem] bg-gradient-to-b from-fg/15 to-fg/[0.03] border border-hairline/15 shadow-elevated-card"
              >
                <div className="rounded-[1.35rem] bg-obsidian border border-hairline/10 overflow-hidden">
                  {/* MacBook Top Camera Notch & Traffic Lights */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface-elevated border-b border-hairline/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-danger-muted/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-glow/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-glow/70" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-obsidian border border-hairline/10 font-mono text-[11px] text-fg-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
                      <span>{activeProject.url.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(activeProject)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-indigo-glow hover:text-emerald-glow transition-colors cursor-pointer"
                    >
                      <span>Expandir</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Vibrant Interactive Showreel Screen inside MacBook */}
                  <div className="relative p-5 sm:p-7 bg-gradient-to-br from-obsidian via-surface to-surface-elevated min-h-[290px] sm:min-h-[330px] flex flex-col justify-between">
                    {/* Decorative Glow Mesh */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -top-12 right-10 w-52 h-52 rounded-full blur-2xl opacity-40 ${
                        activeProject.accentColor === 'emerald'
                          ? 'bg-emerald-glow'
                          : 'bg-indigo-glow'
                      }`}
                    />

                    {/* Showreel Project Switcher Pills */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {portfolio.items.map((proj, index) => {
                          const isCurrent = index === activeSlideIndex;
                          return (
                            <button
                              key={proj.id}
                              type="button"
                              onClick={() => setActiveSlideIndex(index)}
                              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-indigo-deep text-fg border border-indigo-glow/50 shadow-sm'
                                  : 'bg-surface/90 text-fg-muted hover:text-fg border border-hairline/10'
                              }`}
                            >
                              {proj.name}
                            </button>
                          );
                        })}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-emerald-deep/25 border border-emerald-glow/40 font-mono text-[10px] text-emerald-glow">
                        <Sparkles className="w-3 h-3" />
                        Vitrine Ao Vivo
                      </span>
                    </div>

                    {/* Active Project Simulated High-Conversion Hero Preview */}
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 my-5 max-w-md"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-glow block mb-1.5">
                        {activeProject.niche}
                      </span>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-fg leading-snug mb-2">
                        {activeProject.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-4">
                        {activeProject.headline}
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onOpenCaseStudy(activeProject)}
                          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 bg-emerald-deep hover:bg-emerald-glow text-fg text-xs font-semibold border border-emerald-glow/40 transition-colors cursor-pointer"
                        >
                          <span>Testar Site Interativo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 bg-surface-elevated hover:bg-surface text-fg-muted hover:text-fg text-xs font-mono border border-hairline/15 transition-colors"
                        >
                          <span>Abrir URL Real</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>

                    {/* Bottom Conversion Bar inside MacBook */}
                    <div className="relative z-10 flex items-center justify-between gap-2 pt-3 border-t border-hairline/10 text-[11px] font-mono text-fg-subtle">
                      <span>Funil: Busca no Google → Desejo → WhatsApp</span>
                      <span className="text-emerald-glow">● Online 24/7</span>
                    </div>
                  </div>
                </div>
                {/* MacBook Base Lip */}
                <div className="mx-auto mt-1 h-1.5 w-28 rounded-full bg-fg/15" />
              </motion.div>

              {/* Floating iPhone 16 Pro Mockup (Foreground Z-Layer) */}
              <motion.div
                style={{
                  x: motionDisabled ? 0 : layer3.x,
                  y: motionDisabled ? 0 : layer3.y
                }}
                className="relative sm:absolute mt-5 sm:mt-0 sm:-bottom-6 sm:right-4 z-20 w-full sm:w-56 p-1.5 rounded-[2rem] bg-gradient-to-b from-indigo-glow/40 via-surface-elevated to-emerald-glow/40 border border-hairline/20 shadow-elevated-card"
              >
                <div className="rounded-[1.65rem] bg-obsidian p-3.5 border border-hairline/10">
                  {/* Dynamic Island */}
                  <div className="mx-auto mb-3 w-16 h-3.5 rounded-full bg-surface-elevated border border-hairline/15 flex items-center justify-end px-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
                  </div>

                  {/* Mobile WhatsApp Conversion Simulation */}
                  <div className="rounded-xl bg-surface-elevated/90 border border-emerald-glow/30 p-3 mb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-emerald-glow font-semibold">
                        Novo Lead via Site
                      </span>
                      <span className="font-mono text-[9px] text-fg-subtle">
                        Agora
                      </span>
                    </div>
                    <p className="text-[11px] text-fg leading-snug">
                      &ldquo;Olá! Vi o site da{' '}
                      <strong className="text-emerald-glow">
                        {activeProject.name}
                      </strong>{' '}
                      no Google e quero agendar um horário hoje.&rdquo;
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(activeProject)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2 bg-emerald-deep/30 hover:bg-emerald-deep/50 text-emerald-glow font-mono text-[11px] font-medium border border-emerald-glow/35 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Ver no Celular Ao Vivo</span>
                  </button>
                </div>
              </motion.div>

              {/* Mobile-visible Result Badges */}
              <div className="grid grid-cols-1 gap-2.5 mt-4 sm:hidden">
                {hero.floatingBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 bg-surface-elevated/90 border border-hairline/15"
                  >
                    <span className="font-display font-bold text-xs text-fg">
                      {badge.label}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-glow" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Studio Authority Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 lg:mt-20 p-1.5 rounded-[2rem] bg-fg/[0.03] border border-hairline/10"
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-surface/90 border border-hairline/10 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-inner-glint">
            {hero.studioMetrics.map((metric) => (
              <div
                key={metric.value}
                className="flex flex-col justify-between border-l-2 border-indigo-glow/50 pl-4"
              >
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-fg tracking-tight mb-1">
                  {metric.value}
                </span>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

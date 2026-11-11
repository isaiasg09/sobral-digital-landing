import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animate } from 'animejs';
import {
  ArrowUpRight,
  MessageCircle,
  TrendingUp,
  MapPin,
  Zap,
  CheckCircle2,
  Lock,
  Star,
  Sparkles
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';
import { useMagnetic } from '../hooks/useMagnetic';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { ThreeHeroBackground } from './ThreeHeroBackground';

/**
 * Animated Studio Metric Counter powered by Anime.js v4.
 * Smoothly interpolates numeric values on view.
 */
function AnimatedStudioMetric({ value, index }) {
  const numberRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = numberRef.current;
    if (!el || prefersReducedMotion) return;

    // Detect numeric start (e.g. "3 Segundos", "48 Horas", "100% Direto")
    const match = value.match(/^(\d+)(.*)$/);
    if (match) {
      const targetNum = parseInt(match[1], 10);
      const suffix = match[2];
      const counter = { val: 0 };

      const anim = animate(counter, {
        val: targetNum,
        duration: 1600 + index * 200,
        ease: 'outExpo',
        delay: 250 + index * 120,
        onUpdate: () => {
          if (el) {
            el.textContent = `${Math.round(counter.val)}${suffix}`;
          }
        }
      });

      return () => {
        if (anim && anim.revert) anim.revert();
      };
    } else {
      // For string values (e.g. "24h / 7 Dias")
      const anim = animate(el, {
        opacity: [0.3, 1],
        scale: [0.94, 1],
        duration: 1100,
        delay: 250 + index * 120,
        ease: 'outCubic'
      });
      return () => {
        if (anim && anim.revert) anim.revert();
      };
    }
  }, [value, index, prefersReducedMotion]);

  return (
    <span
      ref={numberRef}
      className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-fg tracking-tight mb-1"
    >
      {value}
    </span>
  );
}

export function Hero({ onNavigatePortfolio }) {
  const { hero } = useContent();
  const prefersReducedMotion = useReducedMotion();
  const primaryMagnetic = useMagnetic({ strength: 0.28, maxOffset: 12 });
  const secondaryMagnetic = useMagnetic({ strength: 0.28, maxOffset: 12 });
  const { motionDisabled, layer1, layer2, layer3, rotateX, rotateY } =
    useMouseParallax();

  const badgeIcons = [TrendingUp, MapPin, Zap];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 md:pb-24 flex flex-col justify-between overflow-hidden border-b border-hairline/10"
    >
      {/* Three.js Dynamic WebGL 3D Background */}
      <ThreeHeroBackground />

      {/* Ambient Radial Illumination Orbs behind Canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[22rem] sm:w-[34rem] h-[22rem] sm:h-[34rem] rounded-full bg-radial-indigo opacity-60 sm:opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-2 sm:right-10 w-[18rem] sm:w-[30rem] h-[18rem] sm:h-[30rem] rounded-full bg-radial-emerald opacity-50 sm:opacity-65"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Direct Impact Headline, Revenue Copy & Magnetic CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Impact Headline with Continuous Shimmer Flow */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.14] sm:leading-[1.08] mb-4 sm:mb-6"
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
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed max-w-[54ch] mb-6 sm:mb-8"
            >
              {hero.subtitle}
            </motion.p>

            {/* Dual Magnetic CTAs - Ergonomic on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8"
            >
              <motion.button
                ref={primaryMagnetic.ref}
                type="button"
                onClick={onNavigatePortfolio}
                onMouseMove={primaryMagnetic.handleMouseMove}
                onMouseLeave={primaryMagnetic.handleMouseLeave}
                style={{ x: primaryMagnetic.x, y: primaryMagnetic.y }}
                className="group relative inline-flex items-center justify-between sm:justify-center gap-3 rounded-full pl-5 pr-2.5 py-2.5 bg-indigo-deep hover:bg-indigo-glow text-fg font-semibold text-sm sm:text-base border border-indigo-glow/50 shadow-indigo-aura transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow cursor-pointer"
              >
                <span>{hero.primaryCta}</span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-fg/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
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
                className="group relative inline-flex items-center justify-between sm:justify-center gap-3 rounded-full pl-5 pr-2.5 py-2.5 bg-surface-elevated/95 hover:bg-emerald-deep/25 text-fg font-semibold text-sm sm:text-base border border-emerald-glow/40 shadow-emerald-aura transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow cursor-pointer"
              >
                <span>{hero.secondaryCta}</span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-deep/30 border border-emerald-glow/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-glow" />
                </span>
              </motion.a>
            </motion.div>

            {/* Quick Trust Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0" />
                Entrega em 48h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0" />
                Foco 100% Celular & WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-glow shrink-0" />
                Sem Mensalidades Ocultas
              </span>
            </div>
          </div>

          {/* Right Column: Adaptive Preview ("Sua Empresa") */}
          <div className="lg:col-span-6 w-full">
            {/* ==============================================================
                MOBILE STRUCTURE (< md): Unified Compact Smartphone Mockup
                Clean, zero overlapping, zero excessive padding
               ============================================================== */}
            <div className="md:hidden w-full max-w-sm mx-auto">
              <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-indigo-glow/30 via-surface-elevated to-emerald-glow/30 border border-hairline/20 shadow-elevated-card">
                <div className="rounded-[1.65rem] bg-obsidian border border-hairline/10 overflow-hidden">
                  {/* Smartphone Top Notch & URL Bar */}
                  <div className="px-4 pt-3 pb-2.5 bg-surface-elevated/90 border-b border-hairline/10 flex flex-col gap-2">
                    <div className="mx-auto w-16 h-3.5 rounded-full bg-obsidian border border-hairline/15 flex items-center justify-end px-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-fg-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-emerald-glow" />
                        <span>suaempresa.com.br</span>
                      </span>
                      <span className="text-emerald-glow">● No Ar</span>
                    </div>
                  </div>

                  {/* Smartphone Inner Screen: "Sua Empresa" Compact Showcase */}
                  <div className="p-4 bg-gradient-to-br from-obsidian via-surface to-surface-elevated space-y-3.5">
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-hairline/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-deep/40 border border-emerald-glow/40 flex items-center justify-center font-display font-black text-xs text-emerald-glow">
                          SE
                        </div>
                        <span className="font-display font-bold text-sm text-fg">
                          Sua Empresa
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-emerald-deep/20 border border-emerald-glow/30 font-mono text-[9px] text-emerald-glow">
                        <Sparkles className="w-2.5 h-2.5" />
                        Alta Conversão
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-extrabold text-lg text-fg leading-snug mb-1">
                        A Escolha Nº 1 da Sua Cidade
                      </h3>
                      <p className="text-xs text-fg-muted leading-relaxed">
                        Mostre seus diferenciais com autoridade e leve clientes decididos direto ao seu WhatsApp.
                      </p>
                    </div>

                    {/* Compact 3 Trust Indicators */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="rounded-lg p-2 bg-surface-elevated/80 border border-hairline/10 text-center">
                        <div className="flex items-center justify-center gap-0.5 text-[11px] font-bold text-fg">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>5.0</span>
                        </div>
                        <span className="font-mono text-[9px] text-fg-subtle block">Google</span>
                      </div>
                      <div className="rounded-lg p-2 bg-surface-elevated/80 border border-hairline/10 text-center">
                        <span className="text-[11px] font-bold text-emerald-glow block">&lt; 1s</span>
                        <span className="font-mono text-[9px] text-fg-subtle block">Rápido</span>
                      </div>
                      <div className="rounded-lg p-2 bg-surface-elevated/80 border border-hairline/10 text-center">
                        <span className="text-[11px] font-bold text-indigo-glow block">100%</span>
                        <span className="font-mono text-[9px] text-fg-subtle block">WhatsApp</span>
                      </div>
                    </div>

                    {/* Clean Integrated Lead Notification Bar (No overlap, tight spacing) */}
                    <div className="rounded-xl bg-emerald-deep/15 border border-emerald-glow/35 p-2.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-mono text-[10px] text-emerald-glow font-semibold flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          Lead via Google • Agora
                        </span>
                      </div>
                      <p className="text-[11px] text-fg leading-snug">
                        &ldquo;Olá! Encontrei a <strong className="text-emerald-glow">Sua Empresa</strong> no Google e quero agendar hoje.&rdquo;
                      </p>
                    </div>

                    <a
                      href={buildWhatsAppUrl('Olá! Vi a demonstração da landing page no celular e quero criar um site para a minha empresa.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 bg-emerald-deep hover:bg-emerald-glow text-fg text-xs font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-colors"
                    >
                      <span>Testar Contato no WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Tight Compact Badges Strip right below mobile mockup */}
              <div className="mt-3 grid grid-cols-1 gap-2">
                {hero.floatingBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2 bg-surface/90 border border-hairline/15"
                  >
                    <span className="font-display font-semibold text-xs text-fg">
                      {badge.label}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-glow shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* ==============================================================
                DESKTOP STRUCTURE (md+): Full 3D MacBook + Floating iPhone + Badges
               ============================================================== */}
            <motion.div
              style={{
                rotateX: motionDisabled ? 0 : rotateX,
                rotateY: motionDisabled ? 0 : rotateY,
                transformStyle: 'preserve-3d'
              }}
              className="hidden md:block relative w-full max-w-2xl mx-auto pt-2 pb-8"
            >
              {/* Floating Result Badges around 3D Devices */}
              {hero.floatingBadges.map((badge, idx) => {
                const BadgeIcon = badgeIcons[idx % badgeIcons.length];
                const positionClasses = [
                  '-top-3 left-2 z-30',
                  'top-1/2 -right-2 -translate-y-1/2 z-30',
                  '-bottom-3 left-4 z-30'
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
                    transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                    className={`flex absolute ${positionClasses} items-center gap-2.5 rounded-2xl px-3.5 py-2.5 backdrop-blur-xl bg-obsidian/90 border shadow-elevated-card pointer-events-none ${
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

              {/* 3D MacBook Pro Frame (Showcasing "Sua Empresa") */}
              <motion.div
                style={{
                  x: motionDisabled ? 0 : layer1.x,
                  y: motionDisabled ? 0 : layer1.y
                }}
                className="relative z-10 p-1.5 rounded-[1.75rem] bg-gradient-to-b from-fg/15 to-fg/[0.03] border border-hairline/15 shadow-elevated-card"
              >
                <div className="rounded-[1.35rem] bg-obsidian border border-hairline/10 overflow-hidden">
                  {/* Clean Browser Chrome */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface-elevated border-b border-hairline/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-danger-muted/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-glow/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-glow/70" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-obsidian border border-hairline/10 font-mono text-[11px] text-fg-muted">
                      <Lock className="w-3 h-3 text-emerald-glow shrink-0" />
                      <span>suaempresa.com.br</span>
                    </div>
                    <div className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-glow">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
                      <span>Online 24/7</span>
                    </div>
                  </div>

                  {/* Clean "Sua Empresa" Live Concept Showcase */}
                  <div className="relative p-7 bg-gradient-to-br from-obsidian via-surface to-surface-elevated min-h-[320px] flex flex-col justify-between">
                    {/* Decorative Ambient Light */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-10 right-8 w-44 h-44 rounded-full blur-2xl opacity-35 bg-emerald-glow"
                    />

                    {/* Top Identity of "Sua Empresa" */}
                    <div className="relative z-10 flex items-center justify-between gap-2 border-b border-hairline/10 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-deep/40 border border-emerald-glow/40 flex items-center justify-center font-display font-black text-xs text-emerald-glow">
                          SE
                        </div>
                        <span className="font-display font-bold text-sm text-fg tracking-tight">
                          Sua Empresa
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-emerald-deep/20 border border-emerald-glow/30 font-mono text-[10px] text-emerald-glow">
                        <Sparkles className="w-3 h-3" />
                        Padrão de Alta Conversão
                      </span>
                    </div>

                    {/* Main Showcase Hero for the Client's Business */}
                    <div className="relative z-10 my-4 max-w-md">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-glow block mb-1">
                        Posicionamento Líder na Sua Cidade
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-fg leading-snug mb-2">
                        A Escolha Nº 1 de Quem Busca Seu Serviço
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed mb-4">
                        Apresente seu espaço, autoridade e diferenciais de forma impecável, convertendo visitantes em clientes que chamam direto no WhatsApp.
                      </p>

                      {/* 3 Pillars of Immediate Trust */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="rounded-xl p-2 bg-surface-elevated/70 border border-hairline/10 text-center">
                          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-fg mb-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>5.0</span>
                          </div>
                          <span className="font-mono text-[9px] text-fg-subtle block">No Google</span>
                        </div>
                        <div className="rounded-xl p-2 bg-surface-elevated/70 border border-hairline/10 text-center">
                          <span className="text-[11px] font-bold text-emerald-glow block mb-0.5">&lt; 1s</span>
                          <span className="font-mono text-[9px] text-fg-subtle block">Instantâneo</span>
                        </div>
                        <div className="rounded-xl p-2 bg-surface-elevated/70 border border-hairline/10 text-center">
                          <span className="text-[11px] font-bold text-indigo-glow block mb-0.5">100%</span>
                          <span className="font-mono text-[9px] text-fg-subtle block">WhatsApp</span>
                        </div>
                      </div>

                      {/* Interactive Conversion Button */}
                      <a
                        href={buildWhatsAppUrl('Olá! Vi a demonstração da landing page e quero criar uma máquina de vendas para a minha empresa.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-emerald-deep hover:bg-emerald-glow text-fg text-sm font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-glow" />
                        <span>Falar no WhatsApp (Exemplo)</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    </div>

                    {/* Bottom Funnel Explainer */}
                    <div className="relative z-10 flex items-center justify-between gap-2 pt-3 border-t border-hairline/10 text-[11px] font-mono text-fg-subtle">
                      <span>Funil: Google Local → Desejo → WhatsApp</span>
                      <span className="text-emerald-glow font-medium">● 24h por Dia</span>
                    </div>
                  </div>
                </div>
                {/* MacBook Base Lip */}
                <div className="mx-auto mt-1 h-1.5 w-28 rounded-full bg-fg/15" />
              </motion.div>

              {/* Floating iPhone 16 Pro Mockup (WhatsApp Lead Simulator) */}
              <motion.div
                style={{
                  x: motionDisabled ? 0 : layer3.x,
                  y: motionDisabled ? 0 : layer3.y
                }}
                className="absolute -bottom-5 right-0 z-20 w-56 p-1.5 rounded-[2rem] bg-gradient-to-b from-indigo-glow/40 via-surface-elevated to-emerald-glow/40 border border-hairline/20 shadow-elevated-card"
              >
                <div className="rounded-[1.65rem] bg-obsidian p-3.5 border border-hairline/10">
                  {/* Dynamic Island */}
                  <div className="mx-auto mb-2.5 w-16 h-3.5 rounded-full bg-surface-elevated border border-hairline/15 flex items-center justify-end px-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
                  </div>

                  {/* Mobile WhatsApp Conversion Simulation */}
                  <div className="rounded-xl bg-surface-elevated/90 border border-emerald-glow/30 p-3 mb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-emerald-glow font-semibold">
                        Lead via Google
                      </span>
                      <span className="font-mono text-[9px] text-fg-subtle">
                        Agora
                      </span>
                    </div>
                    <p className="text-[11px] text-fg leading-snug">
                      &ldquo;Olá! Encontrei a <strong className="text-emerald-glow">Sua Empresa</strong> no Google e quero agendar hoje mesmo.&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-2 text-[10px] font-mono text-emerald-glow">
                    <span>● Pronto para fechar</span>
                    <span className="text-fg-subtle">Sem intermediários</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Studio Authority Metrics Bar with Anime.js Powered Counters */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-16 lg:mt-20 p-1.5 rounded-[1.75rem] sm:rounded-[2rem] bg-fg/[0.03] border border-hairline/10"
        >
          <div className="rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2rem-0.375rem)] bg-surface/90 border border-hairline/10 p-4 sm:p-7 lg:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shadow-inner-glint">
            {hero.studioMetrics.map((metric, idx) => (
              <div
                key={metric.value}
                className="flex flex-col justify-between border-l-2 border-indigo-glow/50 pl-3 sm:pl-4"
              >
                <AnimatedStudioMetric value={metric.value} index={idx} />
                <p className="text-[11px] sm:text-sm text-fg-muted leading-snug sm:leading-relaxed">
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

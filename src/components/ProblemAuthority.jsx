import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

export function ProblemAuthority() {
  const { problemAuthority } = useContent();
  const [hoveredRow, setHoveredRow] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="autoridade"
      aria-labelledby="problem-authority-heading"
      className="relative py-16 sm:py-24 md:py-32 border-b border-hairline/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10 sm:mb-14 md:mb-18"
        >
          <h2
            id="problem-authority-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-fg leading-[1.15] sm:leading-[1.12] mb-4"
          >
            {problemAuthority.h2}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed">
            {problemAuthority.subtitle}
          </p>
        </motion.div>

        {/* ================================================================
            MOBILE & TABLET (< lg): Consolidated 2-Block Comparison
            Eliminates confusing alternating cards on small screens
           ================================================================ */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Block 1: Cenário Comum (Consolidated) */}
          <div className="p-1.5 rounded-[1.75rem] bg-fg/[0.02] border border-danger-muted/20">
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-surface/85 border border-hairline/10 p-5">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-danger-muted/10 border border-danger-muted/25">
                <AlertTriangle className="w-3.5 h-3.5 text-danger-muted" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-danger-muted">
                  {problemAuthority.withoutHeader.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-fg-muted mb-1">
                {problemAuthority.withoutHeader.title}
              </h3>
              <p className="text-xs text-fg-subtle leading-relaxed mb-5">
                {problemAuthority.withoutHeader.caption}
              </p>

              <div className="divide-y divide-hairline/10">
                {problemAuthority.pairs.map((pair) => (
                  <div key={`mob-without-${pair.id}`} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-danger-muted/85 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle block mb-0.5">
                          {pair.dimension}
                        </span>
                        <h4 className="font-display font-semibold text-sm text-fg-muted mb-1">
                          {pair.withoutTitle}
                        </h4>
                        <p className="text-xs text-fg-subtle leading-relaxed">
                          {pair.withoutDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Block 2: Padrão Sobral Digital (Consolidated) */}
          <div className="p-1.5 rounded-[1.75rem] bg-emerald-deep/15 border border-emerald-glow/40 shadow-emerald-aura">
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-surface-elevated/95 border border-emerald-glow/25 p-5 shadow-inner-glint">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-emerald-deep/25 border border-emerald-glow/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-glow">
                  {problemAuthority.withHeader.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-fg mb-1">
                {problemAuthority.withHeader.title}
              </h3>
              <p className="text-xs text-fg-muted leading-relaxed mb-5">
                {problemAuthority.withHeader.caption}
              </p>

              <div className="divide-y divide-hairline/10 mb-5">
                {problemAuthority.pairs.map((pair) => (
                  <div key={`mob-with-${pair.id}`} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-glow block mb-0.5">
                          {pair.dimension}
                        </span>
                        <h4 className="font-display font-semibold text-sm text-fg mb-1">
                          {pair.withTitle}
                        </h4>
                        <p className="text-xs text-fg-muted leading-relaxed">
                          {pair.withDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={buildWhatsAppUrl(
                  'Olá! Vi a comparação e quero aplicar o Padrão Sobral Digital no meu negócio.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 bg-emerald-deep hover:bg-emerald-glow text-fg text-xs font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Aplicar Padrão Sobral no Meu Negócio</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================
            DESKTOP (lg+): Side-by-Side Bento Grid Comparison
           ================================================================ */}
        <div className="hidden lg:block">
          {/* Bento Header Columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="p-1.5 rounded-[2rem] bg-fg/[0.02] border border-hairline/10"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface/75 border border-hairline/10 p-7">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-danger-muted/10 border border-danger-muted/25">
                  <AlertTriangle className="w-3.5 h-3.5 text-danger-muted" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-danger-muted">
                    {problemAuthority.withoutHeader.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-fg-muted mb-1.5">
                  {problemAuthority.withoutHeader.title}
                </h3>
                <p className="text-sm text-fg-subtle leading-relaxed">
                  {problemAuthority.withoutHeader.caption}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="p-1.5 rounded-[2rem] bg-emerald-deep/10 border border-emerald-glow/30 shadow-emerald-aura"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-elevated/95 border border-emerald-glow/25 p-7 shadow-inner-glint">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-emerald-deep/25 border border-emerald-glow/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-glow" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-glow">
                    {problemAuthority.withHeader.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-fg mb-1.5">
                  {problemAuthority.withHeader.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {problemAuthority.withHeader.caption}
                </p>
              </div>
            </motion.div>
          </div>

          {/* 4 Interactive Comparison Bento Rows */}
          <div className="flex flex-col gap-6">
            {problemAuthority.pairs.map((pair, index) => {
              const isHovered = hoveredRow === pair.id;

              return (
                <motion.div
                  key={pair.id}
                  onMouseEnter={() => setHoveredRow(pair.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="grid grid-cols-2 gap-6 items-stretch"
                >
                  {/* Muted "Without" Cell */}
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 0.99 }
                    }
                    className={`p-1.5 rounded-[2rem] border transition-colors duration-300 flex ${
                      isHovered
                        ? 'bg-danger-muted/[0.04] border-danger-muted/30'
                        : 'bg-fg/[0.02] border-hairline/10'
                    }`}
                  >
                    <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface/70 border border-hairline/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs text-fg-subtle uppercase tracking-wider">
                            {pair.dimension}
                          </span>
                          <XCircle className="w-4 h-4 text-danger-muted/85 shrink-0" />
                        </div>
                        <h4 className="font-display font-semibold text-lg text-fg-muted mb-2">
                          {pair.withoutTitle}
                        </h4>
                        <p className="text-sm text-fg-subtle leading-relaxed">
                          {pair.withoutDesc}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Emerald-Glow "With Authority" Cell */}
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -3, scale: 1.005 }
                    }
                    className={`p-1.5 rounded-[2rem] border transition-all duration-300 flex ${
                      isHovered
                        ? 'bg-emerald-deep/15 border-emerald-glow/60 shadow-emerald-aura'
                        : 'bg-emerald-deep/[0.08] border-emerald-glow/30 shadow-emerald-aura'
                    }`}
                  >
                    <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface-elevated/95 border border-emerald-glow/25 p-6 flex flex-col justify-between shadow-inner-glint">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs text-emerald-glow uppercase tracking-wider">
                            {pair.dimension}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0" />
                        </div>
                        <h4 className="font-display font-semibold text-lg text-fg mb-2">
                          {pair.withTitle}
                        </h4>
                        <p className="text-sm text-fg-muted leading-relaxed mb-4">
                          {pair.withDesc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-hairline/10 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-emerald-glow">
                          Padrão Sobral Digital
                        </span>
                        <a
                          href={buildWhatsAppUrl(
                            `Olá! Quero resolver "${pair.dimension}" no meu negócio com uma página de alta conversão.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-fg hover:text-emerald-glow transition-colors"
                        >
                          <span>Aplicar no meu negócio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

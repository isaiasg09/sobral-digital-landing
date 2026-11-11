import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

export function AnatomySection() {
  const { anatomy } = useContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeStep = anatomy.steps[activeIndex] || anatomy.steps[0];
  const stepIcons = [Search, Sparkles, ShieldCheck, MessageCircle];

  return (
    <section
      id="anatomia"
      aria-labelledby="anatomy-heading"
      className="relative py-16 sm:py-24 md:py-32 border-b border-hairline/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-indigo-glow mb-2.5 sm:mb-3">
            {anatomy.eyebrow}
          </span>
          <h2
            id="anatomy-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-fg leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4"
          >
            {anatomy.h2}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed">
            {anatomy.subtitle}
          </p>
        </motion.div>

        {/* ================================================================
            MOBILE & TABLET (< lg): Inline Accordion (No scrolling up/down)
           ================================================================ */}
        <div className="lg:hidden flex flex-col gap-3">
          {anatomy.steps.map((step, index) => {
            const IconComp = stepIcons[index % stepIcons.length];
            const isOpen = index === activeIndex;

            return (
              <div
                key={`mob-anat-${step.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-surface-elevated/95 border-emerald-glow/50 shadow-emerald-aura'
                    : 'bg-surface/80 border-hairline/10'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                        isOpen
                          ? 'bg-emerald-deep/30 border-emerald-glow/40 text-emerald-glow'
                          : 'bg-indigo-deep/20 border-indigo-glow/30 text-indigo-glow'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle block">
                        Etapa {step.stepNumber} • {step.timeTag}
                      </span>
                      <p className="font-display font-bold text-sm text-fg">
                        {step.shortLabel}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-fg-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-glow' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-hairline/10 space-y-3">
                        <p className="text-xs font-semibold text-emerald-glow leading-snug pt-2">
                          {step.headline}
                        </p>
                        <p className="text-xs text-fg-muted leading-relaxed">
                          {step.description}
                        </p>

                        <ul className="space-y-1.5">
                          {step.bulletPoints.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-xs text-fg"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-glow shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Compact Result Pill instead of huge wireframe */}
                        <div className="rounded-xl bg-obsidian/90 border border-hairline/15 px-3 py-2 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-fg-muted">
                            {step.visualStats.detail}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-deep/30 text-emerald-glow font-bold shrink-0">
                            {step.visualStats.metric}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="mt-3">
            <a
              href={buildWhatsAppUrl(
                'Olá! Vi a Anatomia de um Site que Vende Sozinho e quero aplicar isso no meu negócio.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 bg-emerald-deep hover:bg-emerald-glow text-fg text-xs font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Quero Essa Máquina no Meu Negócio</span>
            </a>
          </div>
        </div>

        {/* ================================================================
            DESKTOP (lg+): Horizontal Tabs + 2-Column Interactive Stage
           ================================================================ */}
        <div className="hidden lg:block">
          {/* Interactive Clickable Hotspot Selector Pills */}
          <div
            role="tablist"
            aria-label="Etapas da anatomia de um site que vende sozinho"
            className="grid grid-cols-4 gap-3 mb-8"
          >
            {anatomy.steps.map((step, index) => {
              const IconComp = stepIcons[index % stepIcons.length];
              const isSelected = index === (activeIndex === -1 ? 0 : activeIndex);

              return (
                <button
                  key={step.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(index)}
                  className={`group text-left rounded-2xl p-4 border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow ${
                    isSelected
                      ? 'bg-surface-elevated border-emerald-glow/50 shadow-emerald-aura'
                      : 'bg-surface/75 hover:bg-surface-elevated/60 border-hairline/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                        isSelected
                          ? 'bg-emerald-deep/30 border-emerald-glow/40 text-emerald-glow'
                          : 'bg-indigo-deep/20 border-indigo-glow/30 text-indigo-glow'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </span>
                    <span className="font-mono text-[11px] text-fg-subtle">
                      {step.timeTag}
                    </span>
                  </div>
                  <p
                    className={`font-display font-bold text-sm ${
                      isSelected ? 'text-fg' : 'text-fg-muted group-hover:text-fg'
                    }`}
                  >
                    {step.shortLabel}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Main Interactive Anatomy Stage */}
          <div className="p-1.5 rounded-[2rem] bg-fg/[0.03] border border-hairline/10 shadow-elevated-card">
            <div className="rounded-[calc(2rem-0.375rem)] bg-surface/95 border border-hairline/10 p-10 shadow-inner-glint">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-12 gap-10 items-center"
                >
                  {/* Left Column: Psychological Mechanism & Owner-Focused Copy */}
                  <div className="col-span-6">
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 bg-indigo-deep/25 border border-indigo-glow/40 font-mono text-xs text-indigo-glow">
                      <span>ETAPA {activeStep.stepNumber}</span>
                      <span>•</span>
                      <span>{activeStep.timeTag}</span>
                    </div>

                    <h3 className="font-display font-bold text-3xl text-fg mb-3 leading-snug">
                      {activeStep.title}
                    </h3>

                    <p className="text-base font-medium text-emerald-glow mb-4 leading-relaxed">
                      {activeStep.headline}
                    </p>

                    <p className="text-base text-fg-muted leading-relaxed mb-6">
                      {activeStep.description}
                    </p>

                    <ul className="space-y-3 mb-7">
                      {activeStep.bulletPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-fg"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-3">
                      {(activeIndex === -1 ? 0 : activeIndex) < anatomy.steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIndex((prev) => (prev === -1 ? 1 : prev + 1))
                          }
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface-elevated hover:bg-indigo-deep text-fg text-sm font-semibold border border-indigo-glow/40 transition-colors cursor-pointer"
                        >
                          <span>
                            Ver Próxima Etapa ({(activeIndex === -1 ? 0 : activeIndex) + 2}/4)
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <a
                          href={buildWhatsAppUrl(
                            'Olá! Vi a Anatomia de um Site que Vende Sozinho e quero aplicar isso no meu negócio.'
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-emerald-deep hover:bg-emerald-glow text-fg text-sm font-semibold border border-emerald-glow/40 shadow-emerald-aura transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Quero Essa Máquina no Meu Negócio</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Interactive Anatomy Wireframe */}
                  <div className="col-span-6">
                    <div className="rounded-2xl bg-obsidian border border-hairline/15 p-6 relative overflow-hidden">
                      <div className="flex items-center justify-between pb-3 mb-5 border-b border-hairline/10">
                        <span className="font-mono text-xs text-fg-muted">
                          Simulação da Jornada do Seu Cliente
                        </span>
                        <span className="font-mono text-xs text-emerald-glow font-semibold">
                          {activeStep.visualStats.metric}
                        </span>
                      </div>

                      {(activeIndex <= 0) && (
                        <div className="space-y-3">
                          <div className="rounded-xl bg-surface-elevated p-3.5 border border-indigo-glow/40 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Search className="w-4 h-4 text-indigo-glow" />
                              <span className="text-sm text-fg">
                                &ldquo;melhor serviço perto de mim&rdquo;
                              </span>
                            </div>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-deep/30 text-indigo-glow">
                              Busca no Google
                            </span>
                          </div>

                          <div className="rounded-xl bg-surface-elevated/95 p-4 border-2 border-emerald-glow/50 shadow-emerald-aura">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-emerald-glow">
                                <MapPin className="w-4 h-4" />
                                Sua Empresa • Destaque Oficial
                              </span>
                              <span className="font-mono text-[10px] text-emerald-glow">
                                ★★★★★
                              </span>
                            </div>
                            <p className="text-xs text-fg-muted mb-3">
                              Atendimento imediato, estrutura de alto padrão e agendamento direto pelo WhatsApp.
                            </p>
                            <div className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 bg-emerald-deep/30 text-emerald-glow font-mono text-[11px]">
                              <span>Clique Capturado com Sucesso</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeIndex === 1 && (
                        <div className="space-y-3">
                          <div className="rounded-xl bg-gradient-to-br from-indigo-deep/30 via-surface-elevated to-emerald-deep/20 p-5 border border-indigo-glow/40">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-glow block mb-1">
                              IMPACTO NOS PRIMEIROS 3 SEGUNDOS
                            </span>
                            <p className="font-display font-bold text-lg text-fg mb-2">
                              Visual de Marca Líder que Encanta o Olhar
                            </p>
                            <p className="text-xs text-fg-muted mb-4">
                              O visitante percebe instantaneamente que sua empresa entrega qualidade superior à concorrência.
                            </p>
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="rounded-lg bg-obsidian/80 p-2.5 border border-hairline/10">
                                <span className="block font-mono text-[10px] text-fg-subtle">
                                  Percepção de Preço
                                </span>
                                <span className="font-display font-bold text-xs text-emerald-glow">
                                  Justifica Seu Valor
                                </span>
                              </div>
                              <div className="rounded-lg bg-obsidian/80 p-2.5 border border-hairline/10">
                                <span className="block font-mono text-[10px] text-fg-subtle">
                                  Retenção na Tela
                                </span>
                                <span className="font-display font-bold text-xs text-indigo-glow">
                                  Leitura Fluida
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeIndex === 2 && (
                        <div className="space-y-3">
                          <div className="rounded-xl bg-surface-elevated p-4 border border-hairline/15">
                            <div className="flex items-center gap-1 text-emerald-glow mb-2">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <span className="ml-2 font-mono text-xs text-fg">
                                Confiança Comprovada
                              </span>
                            </div>
                            <p className="text-xs text-fg-muted leading-relaxed mb-3">
                              Apresentamos seus melhores serviços, fotos reais ou estrutura de atendimento para que o cliente não tenha nenhuma dúvida antes de chamar.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full px-2.5 py-1 bg-obsidian text-[11px] font-mono text-emerald-glow border border-emerald-glow/30">
                                ✓ Diferenciais Claros
                              </span>
                              <span className="rounded-full px-2.5 py-1 bg-obsidian text-[11px] font-mono text-indigo-glow border border-indigo-glow/30">
                                ✓ Horários & Endereço
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeIndex === 3 && (
                        <div className="space-y-3">
                          <div className="rounded-xl bg-emerald-deep/20 p-5 border-2 border-emerald-glow/50 shadow-emerald-aura">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs text-emerald-glow font-semibold">
                                WhatsApp do Seu Negócio
                              </span>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-glow text-obsidian font-bold">
                                Cliente Pronto
                              </span>
                            </div>
                            <div className="rounded-lg bg-obsidian/90 p-3 border border-emerald-glow/30 mb-3">
                              <p className="text-xs text-fg leading-relaxed">
                                &ldquo;Olá! Acessei o site, vi os detalhes do serviço e gostaria de confirmar disponibilidade para esta semana.&rdquo;
                              </p>
                            </div>
                            <p className="text-[11px] text-fg-muted">
                              Você recebe o cliente já convencido, sem perder tempo explicando tudo do zero.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Interactive Step Dots at bottom of diagram */}
                      <div className="mt-5 pt-4 border-t border-hairline/10 flex items-center justify-between">
                        <span className="text-xs text-fg-subtle">
                          {activeStep.visualStats.detail}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {anatomy.steps.map((s, idx) => (
                            <button
                              key={s.id}
                              type="button"
                              aria-label={`Ir para etapa ${idx + 1}`}
                              onClick={() => setActiveIndex(idx)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                idx === (activeIndex === -1 ? 0 : activeIndex)
                                  ? 'w-6 bg-emerald-glow'
                                  : 'w-2 bg-fg/20 hover:bg-fg/40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

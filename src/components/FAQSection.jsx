import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

export function FAQSection() {
  const { faq } = useContent();
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 md:py-32 border-b border-hairline/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-left sm:text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-glow mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{faq.eyebrow}</span>
          </span>
          <h2
            id="faq-heading"
            className="font-display font-bold text-2xl sm:text-4xl lg:text-[2.65rem] tracking-tight text-fg leading-[1.12] mb-4"
          >
            {faq.h2}
          </h2>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            {faq.subtitle}
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.05
                }}
                className={`p-1.5 rounded-[1.75rem] border transition-colors ${
                  isOpen
                    ? 'bg-indigo-deep/15 border-indigo-glow/40 shadow-indigo-aura'
                    : 'bg-fg/[0.02] border-hairline/10'
                }`}
              >
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-surface/95 border border-hairline/10 overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-fg">
                      {item.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-indigo-deep text-fg border-indigo-glow/50'
                          : 'bg-surface-elevated text-fg-muted border-hairline/15'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 sm:px-6 pb-6 pt-1 border-t border-hairline/10"
                      >
                        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Prompt */}
        <div className="mt-10 text-center">
          <a
            href={buildWhatsAppUrl(
              'Olá! Tenho uma dúvida sobre a criação do site para o meu negócio.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-surface-elevated hover:bg-emerald-deep/30 text-fg text-xs sm:text-sm font-semibold border border-emerald-glow/40 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-glow" />
            <span>Prefere tirar sua dúvida direto no WhatsApp? Fale conosco</span>
          </a>
        </div>
      </div>
    </section>
  );
}

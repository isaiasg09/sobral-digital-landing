import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion
} from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';

export function FloatingWhatsApp() {
  const { floatingWhatsApp } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (typeof window === 'undefined') return;
    const threshold = Math.min(window.innerHeight * 0.65, 520);
    setIsVisible(latest > threshold);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.85,
            y: prefersReducedMotion ? 0 : 24
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.85,
            y: prefersReducedMotion ? 0 : 20
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { type: 'spring', stiffness: 260, damping: 22 }
          }
          style={{
            bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
            right: 'calc(1.25rem + env(safe-area-inset-right, 0px))'
          }}
          className="fixed z-40"
        >
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={floatingWhatsApp.ariaLabel}
            className="group inline-flex items-center gap-2.5 rounded-full pl-4 pr-2.5 py-2.5 backdrop-blur-xl bg-surface-elevated/90 hover:bg-emerald-deep text-fg font-semibold text-xs sm:text-sm border border-emerald-glow/45 shadow-emerald-aura transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-glow" />
            </span>
            <span>{floatingWhatsApp.label}</span>
            <span className="w-8 h-8 rounded-full bg-emerald-deep/35 group-hover:bg-fg/20 border border-emerald-glow/40 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <MessageCircle className="w-4 h-4 text-emerald-glow group-hover:text-fg" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

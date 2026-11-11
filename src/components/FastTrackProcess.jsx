import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion
} from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Compass, Sliders, Rocket, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent } from '../content/pt';
import { useMagnetic } from '../hooks/useMagnetic';

export function FastTrackProcess() {
  const { process } = useContent();
  const sectionRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const ctaMagnetic = useMagnetic({ strength: 0.25, maxOffset: 10 });

  // Motion.dev scroll-driven connection line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 65%']
  });

  const smoothPathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3
  });

  // Anime.js Step Nodes Energy Flow Choreography
  useEffect(() => {
    const el = stepsContainerRef.current;
    if (!el || prefersReducedMotion) return;

    const badges = el.querySelectorAll('.process-step-badge');
    const icons = el.querySelectorAll('.process-icon-wrap');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Sequential pulse wave across step icons and badges using Anime.js
          animate(icons, {
            scale: [0.9, 1.08, 1],
            borderColor: [
              'rgba(255, 255, 255, 0.1)',
              'rgba(16, 185, 129, 0.6)',
              'rgba(99, 102, 241, 0.4)'
            ],
            delay: stagger(220, { start: 150 }),
            duration: 900,
            ease: 'outBack'
          });

          animate(badges, {
            opacity: [0.4, 1],
            translateY: [6, 0],
            delay: stagger(220, { start: 250 }),
            duration: 700,
            ease: 'outExpo'
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const stepIcons = [Compass, Sliders, Rocket];

  return (
    <section
      id="processo"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative py-24 md:py-32 border-b border-hairline/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-emerald-glow mb-3">
            {process.eyebrow}
          </span>
          <h2
            id="process-heading"
            className="font-display font-bold text-2xl sm:text-4xl lg:text-[2.65rem] tracking-tight text-fg leading-[1.12] mb-4"
          >
            {process.h2}
          </h2>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
            {process.subtitle}
          </p>
        </motion.div>

        {/* Timeline Stage with Scroll-Driven SVG Connecting Line */}
        <div ref={stepsContainerRef} className="relative">
          {/* Desktop Horizontal SVG Connecting Line (animates pathLength with scroll) */}
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute top-14 left-[12%] right-[12%] h-6 z-0"
          >
            <svg
              viewBox="0 0 1000 24"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="processLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {/* Static Background Track */}
              <path
                d="M 0 12 L 1000 12"
                stroke="rgb(var(--color-fg) / 0.1)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Animated Scroll Path */}
              <motion.path
                d="M 0 12 L 1000 12"
                stroke="url(#processLineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  pathLength: prefersReducedMotion ? 1 : smoothPathLength
                }}
              />
            </svg>
          </div>

          {/* Mobile Vertical SVG Connecting Line */}
          <div
            aria-hidden="true"
            className="lg:hidden pointer-events-none absolute top-10 bottom-10 left-7 w-4 z-0"
          >
            <svg
              viewBox="0 0 16 600"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M 8 0 L 8 600"
                stroke="rgb(var(--color-fg) / 0.1)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <motion.path
                d="M 8 0 L 8 600"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  pathLength: prefersReducedMotion ? 1 : smoothPathLength
                }}
              />
            </svg>
          </div>

          {/* 3 Process Step Cards */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {process.steps.map((step, index) => {
              const StepIcon = stepIcons[index % stepIcons.length];
              const isFinalStep = index === process.steps.length - 1;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`p-1.5 rounded-[2rem] border flex ${
                    isFinalStep
                      ? 'bg-emerald-deep/10 border-emerald-glow/35 shadow-emerald-aura'
                      : 'bg-fg/[0.03] border-hairline/10 shadow-elevated-card'
                  }`}
                >
                  <div className="w-full rounded-[calc(2rem-0.375rem)] bg-surface/95 border border-hairline/10 p-6 sm:p-7 flex flex-col justify-between shadow-inner-glint">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div
                          className={`process-icon-wrap w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                            isFinalStep
                              ? 'bg-emerald-deep/25 border-emerald-glow/40 text-emerald-glow'
                              : 'bg-indigo-deep/25 border-indigo-glow/40 text-indigo-glow'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span
                          className={`process-step-badge font-mono text-xs px-3 py-1 rounded-full border ${
                            isFinalStep
                              ? 'bg-emerald-deep/20 border-emerald-glow/35 text-emerald-glow'
                              : 'bg-surface-elevated border-hairline/15 text-fg-muted'
                          }`}
                        >
                          ETAPA {step.number}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-fg mb-3 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Conversion Banner inside Process Section */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.6,
            delay: prefersReducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-14 md:mt-20 p-1.5 rounded-[2rem] bg-indigo-deep/15 border border-indigo-glow/30 shadow-indigo-aura"
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-surface-elevated/95 border border-hairline/15 p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-inner-glint">
            <div className="max-w-2xl">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-fg mb-2">
                {process.finalCta.title}
              </h3>
              <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                {process.finalCta.subtitle}
              </p>
            </div>

            <motion.a
              ref={ctaMagnetic.ref}
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={ctaMagnetic.handleMouseMove}
              onMouseLeave={ctaMagnetic.handleMouseLeave}
              style={{ x: ctaMagnetic.x, y: ctaMagnetic.y }}
              className="group inline-flex items-center gap-3 rounded-full pl-6 pr-3 py-3 bg-emerald-deep text-fg font-semibold text-sm sm:text-base border border-emerald-glow/40 shadow-emerald-aura transition-transform duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian shrink-0 cursor-pointer"
            >
              <span>{process.finalCta.buttonText}</span>
              <span className="w-9 h-9 rounded-full bg-fg/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="w-4 h-4 text-fg" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

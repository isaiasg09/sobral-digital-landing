import { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Provides magnetic hover micro-physics for interactive CTAs and cards.
 * Automatically disables on touch devices (`(hover: none)` or `(pointer: coarse)`)
 * and when the user prefers reduced motion (`prefers-reduced-motion: reduce`).
 *
 * Uses Framer Motion's `useMotionValue` and `useSpring` exclusively to avoid
 * React re-renders during pointer movement.
 */
export function useMagnetic({ strength = 0.28, maxOffset = 12 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isInteractive, setIsInteractive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateInteractivity = () => {
      const enabled =
        hoverMedia.matches && !motionMedia.matches && !prefersReducedMotion;
      setIsInteractive(enabled);
      if (!enabled) {
        rawX.set(0);
        rawY.set(0);
      }
    };

    updateInteractivity();

    hoverMedia.addEventListener('change', updateInteractivity);
    motionMedia.addEventListener('change', updateInteractivity);

    return () => {
      hoverMedia.removeEventListener('change', updateInteractivity);
      motionMedia.removeEventListener('change', updateInteractivity);
    };
  }, [prefersReducedMotion, rawX, rawY]);

  const handleMouseMove = useCallback(
    (event) => {
      if (!isInteractive || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
      const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

      rawX.set(clampedX);
      rawY.set(clampedY);
    },
    [isInteractive, maxOffset, rawX, rawY, strength]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref,
    x,
    y,
    isInteractive,
    handleMouseMove,
    handleMouseLeave
  };
}

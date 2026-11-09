import { useEffect, useState } from 'react';
import {
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion
} from 'framer-motion';

/**
 * Provides multi-layer 2.5D spatial motion values combining pointer position
 * (desktop only) and scroll progress (all devices unless reduced motion is active).
 *
 * Under `prefers-reduced-motion: reduce`, all motion values remain locked at 0.
 * On touch/coarse devices, pointer parallax is disabled so cards never drift unexpectedly.
 */
export function useMouseParallax() {
  const prefersReducedMotion = useReducedMotion();
  const [canTrackMouse, setCanTrackMouse] = useState(false);
  const [motionDisabled, setMotionDisabled] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncCapabilities = () => {
      const isReduced = Boolean(prefersReducedMotion || reducedMedia.matches);
      setMotionDisabled(isReduced);
      const allowMouse = hoverMedia.matches && !isReduced;
      setCanTrackMouse(allowMouse);

      if (!allowMouse) {
        pointerX.set(0);
        pointerY.set(0);
      }
    };

    syncCapabilities();

    hoverMedia.addEventListener('change', syncCapabilities);
    reducedMedia.addEventListener('change', syncCapabilities);

    return () => {
      hoverMedia.removeEventListener('change', syncCapabilities);
      reducedMedia.removeEventListener('change', syncCapabilities);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined' || !canTrackMouse) return undefined;

    const handlePointerMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;
      pointerX.set(normalizedX);
      pointerY.set(normalizedY);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [canTrackMouse, pointerX, pointerY]);

  // Depth Layer 1 (Background / subtle)
  const layer1X = useTransform(smoothX, [-1, 1], motionDisabled ? [0, 0] : [-10, 10]);
  const layer1Y = useTransform(
    [smoothY, scrollY],
    ([py, sy]) => (motionDisabled ? 0 : py * 10 - Math.min(sy * 0.06, 40))
  );

  // Depth Layer 2 (Midground)
  const layer2X = useTransform(smoothX, [-1, 1], motionDisabled ? [0, 0] : [-20, 20]);
  const layer2Y = useTransform(
    [smoothY, scrollY],
    ([py, sy]) => (motionDisabled ? 0 : py * 18 - Math.min(sy * 0.12, 75))
  );

  // Depth Layer 3 (Foreground / responsive)
  const layer3X = useTransform(smoothX, [-1, 1], motionDisabled ? [0, 0] : [-30, 30]);
  const layer3Y = useTransform(
    [smoothY, scrollY],
    ([py, sy]) => (motionDisabled ? 0 : py * 26 - Math.min(sy * 0.18, 110))
  );

  // Subtle 3D stage rotation on desktop
  const rotateX = useTransform(smoothY, [-1, 1], motionDisabled ? [0, 0] : [5, -5]);
  const rotateY = useTransform(smoothX, [-1, 1], motionDisabled ? [0, 0] : [-7, 7]);

  return {
    motionDisabled,
    canTrackMouse,
    layer1: { x: layer1X, y: layer1Y },
    layer2: { x: layer2X, y: layer2Y },
    layer3: { x: layer3X, y: layer3Y },
    rotateX,
    rotateY
  };
}

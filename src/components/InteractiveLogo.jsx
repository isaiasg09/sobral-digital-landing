import React, { useId, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from 'framer-motion';
import { animate, createTimeline, stagger } from 'animejs';

/**
 * Multi-Engine Interactive SVG Brand Mark for "Sobral Digital".
 * Combines:
 * - Anime.js v4 for vector choreography, sequential path reveals & vertex pulsing
 * - Motion.dev for continuous 3D tilt physics & magnetic mouse tracking
 */
export function InteractiveLogo({
  size = 44,
  interactive = true,
  className = ''
}) {
  const uid = useId().replace(/:/g, '');
  const svgRef = useRef(null);
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Motion.dev 3D Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 16, mass: 0.25 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 16, mass: 0.25 });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    interactive && !prefersReducedMotion ? [14, -14] : [0, 0]
  );
  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    interactive && !prefersReducedMotion ? [-14, 14] : [0, 0]
  );
  const translateX = useTransform(
    smoothX,
    [-0.5, 0.5],
    interactive && !prefersReducedMotion ? [-5, 5] : [0, 0]
  );
  const translateY = useTransform(
    smoothY,
    [-0.5, 0.5],
    interactive && !prefersReducedMotion ? [-5, 5] : [0, 0]
  );

  const handleMouseMove = (event) => {
    if (!interactive || prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Anime.js v4 Vector Choreography
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl || prefersReducedMotion) return;

    const prismOuter = svgEl.querySelector('.logo-prism-outer');
    const prismInner = svgEl.querySelector('.logo-prism-inner');
    const monogramGlow = svgEl.querySelector('.logo-monogram-glow');
    const monogramCore = svgEl.querySelector('.logo-monogram-core');
    const cursorArrow = svgEl.querySelector('.logo-cursor');
    const vertices = svgEl.querySelectorAll('.logo-vertex');

    // Initialize strokeDashoffset for paths
    const paths = [prismOuter, prismInner, monogramGlow, monogramCore].filter(Boolean);
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 800;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    if (cursorArrow) {
      cursorArrow.style.opacity = '0';
      cursorArrow.style.transform = 'translate(-6px, -4px) scale(0.6)';
    }

    // Anime.js Timeline Orchestration
    const tl = createTimeline({
      defaults: { ease: 'outCubic' }
    });

    tl.add(prismOuter, {
      strokeDashoffset: [prismOuter.getTotalLength(), 0],
      duration: 1100
    })
      .add(
        prismInner,
        {
          strokeDashoffset: [prismInner.getTotalLength(), 0],
          duration: 900
        },
        '-=600'
      )
      .add(
        monogramGlow,
        {
          strokeDashoffset: [monogramGlow.getTotalLength(), 0],
          duration: 1300,
          ease: 'outExpo'
        },
        '-=500'
      )
      .add(
        monogramCore,
        {
          strokeDashoffset: [monogramCore.getTotalLength(), 0],
          duration: 1400,
          ease: 'outExpo'
        },
        '-=1100'
      )
      .add(
        cursorArrow,
        {
          opacity: [0, 1],
          transform: [
            'translate(-6px, -4px) scale(0.6)',
            'translate(-6px, -4px) scale(1)'
          ],
          duration: 650,
          ease: 'outBack'
        },
        '-=500'
      )
      .add(
        vertices,
        {
          opacity: [0.3, 1],
          scale: [0.6, 1],
          delay: stagger(100),
          duration: 600
        },
        '-=400'
      );

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current && timelineRef.current.revert) {
        timelineRef.current.revert();
      }
    };
  }, [prefersReducedMotion]);

  const gradId = `grad-${uid}`;
  const bgGlowId = `bgGlow-${uid}`;
  const glowFilterId = `glow-${uid}`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: size,
        height: size,
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: 'preserve-3d'
      }}
      whileHover={
        interactive && !prefersReducedMotion ? { scale: 1.06 } : undefined
      }
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
    >
      {/* Ambient Pulsing Aura Behind Logo */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? { opacity: 0.35 }
            : {
                opacity: [0.3, 0.65, 0.3],
                scale: [0.94, 1.06, 0.94]
              }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute -inset-1.5 rounded-[26%] bg-gradient-to-tr from-indigo-glow/35 to-emerald-glow/35 blur-md"
      />

      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        role="img"
        aria-label="Sobral Digital"
        className="relative z-10 w-full h-full drop-shadow-sm"
      >
        <title>Sobral Digital</title>
        <defs>
          <linearGradient
            id={gradId}
            x1="130"
            y1="110"
            x2="382"
            y2="402"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <radialGradient
            id={bgGlowId}
            cx="256"
            cy="256"
            r="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
          </radialGradient>
          <filter
            id={glowFilterId}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.75 0"
              result="soft"
            />
            <feMerge>
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fundo */}
        <rect width="512" height="512" rx="112" fill="#09090B" />
        <rect width="512" height="512" rx="112" fill={`url(#${bgGlowId})`} />
        <rect
          x="1"
          y="1"
          width="510"
          height="510"
          rx="111"
          stroke="#FAFAFA"
          strokeOpacity="0.1"
          strokeWidth="2"
        />

        {/* Prisma hexagonal (estrutura 3D) com classes controladas por Anime.js */}
        <g strokeLinejoin="round" strokeLinecap="round">
          <path
            className="logo-prism-outer"
            d="M256 106 L386 181 L386 331 L256 406 L126 331 L126 181 Z"
            stroke={`url(#${gradId})`}
            strokeOpacity="0.65"
            strokeWidth="2.5"
          />
          <path
            className="logo-prism-inner"
            d="M256 256 L126 181 M256 256 L386 181 M256 256 L256 406"
            stroke="#FAFAFA"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        </g>

        {/* Monograma "S" com simetria rotacional */}
        <g
          filter={`url(#${glowFilterId})`}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path
            className="logo-monogram-glow"
            d="M332 190 L256 146 L180 190 L180 234 L332 278 L332 322 L256 366 L180 322"
            stroke={`url(#${gradId})`}
            strokeWidth="16"
          />
          <path
            className="logo-monogram-core"
            d="M332 190 L256 146 L180 190 L180 234 L332 278 L332 322 L256 366 L180 322"
            stroke="#FAFAFA"
            strokeWidth="2"
            strokeOpacity="0.92"
          />
        </g>

        {/* Cursor digital na ponta final */}
        <path
          className="logo-cursor"
          d="M168 308 L168 346 L180 335 L190 354 L198 350 L188 331 L204 329 Z"
          fill="#FAFAFA"
          stroke="#09090B"
          strokeWidth="2"
          strokeLinejoin="round"
          transform="translate(-6 -4)"
        />

        {/* Nós de vértice */}
        <g fill="#FAFAFA">
          <circle className="logo-vertex" cx="332" cy="190" r="5" />
          <circle className="logo-vertex" cx="256" cy="256" r="4" fillOpacity="0.9" />
          <circle className="logo-vertex" cx="256" cy="146" r="3" fillOpacity="0.6" />
          <circle className="logo-vertex" cx="256" cy="366" r="3" fillOpacity="0.6" />
        </g>
      </svg>
    </motion.div>
  );
}

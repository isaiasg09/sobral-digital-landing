import React, { useId } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from 'framer-motion';

/**
 * Interactive SVG Brand Mark for "Sobral Digital".
 * Features:
 * - Real SVG path drawing (`pathLength` / `stroke-dashoffset`)
 * - Subtle pulsing indigo/emerald ambient glow
 * - Physical 3D tilt & magnetic reaction to mouse movement
 */
export function InteractiveLogo({
  size = 44,
  interactive = true,
  className = ''
}) {
  const uid = useId().replace(/:/g, '');
  const prefersReducedMotion = useReducedMotion();

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
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <radialGradient
            id={bgGlowId}
            cx="256"
            cy="256"
            r="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#6366F1" stopOpacity="0.14" />
            <stop offset="1" stopColor="#09090B" stopOpacity="0" />
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

        {/* Prisma hexagonal (estrutura 3D) com desenho progressivo */}
        <g strokeLinejoin="round" strokeLinecap="round">
          <motion.path
            d="M256 106 L386 181 L386 331 L256 406 L126 331 L126 181 Z"
            stroke={`url(#${gradId})`}
            strokeOpacity="0.65"
            strokeWidth="2.5"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
          <motion.path
            d="M256 256 L126 181 M256 256 L386 181 M256 256 L256 406"
            stroke="#FAFAFA"
            strokeOpacity="0.12"
            strokeWidth="2"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        </g>

        {/* Monograma "S" com simetria rotacional e stroke-dashoffset / pathLength real */}
        <g
          filter={`url(#${glowFilterId})`}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <motion.path
            d="M332 190 L256 146 L180 190 L180 234 L332 278 L332 322 L256 366 L180 322"
            stroke={`url(#${gradId})`}
            strokeWidth="16"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
          <motion.path
            d="M332 190 L256 146 L180 190 L180 234 L332 278 L332 322 L256 366 L180 322"
            stroke="#FAFAFA"
            strokeWidth="2"
            strokeOpacity="0.92"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.75,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        </g>

        {/* Cursor digital na ponta final */}
        <motion.path
          d="M168 308 L168 346 L180 335 L190 354 L198 350 L188 331 L204 329 Z"
          fill="#FAFAFA"
          stroke="#09090B"
          strokeWidth="2"
          strokeLinejoin="round"
          transform="translate(-6 -4)"
          initial={{ scale: prefersReducedMotion ? 1 : 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.1,
            type: 'spring',
            stiffness: 240,
            damping: 16
          }}
        />

        {/* Nós de vértice pulsantes */}
        <g fill="#FAFAFA">
          <motion.circle
            cx="332"
            cy="190"
            r="5"
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.65, 1, 0.65], r: [4.5, 6, 4.5] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="256" cy="256" r="4" fillOpacity="0.9" />
          <circle cx="256" cy="146" r="3" fillOpacity="0.6" />
          <circle cx="256" cy="366" r="3" fillOpacity="0.6" />
        </g>
      </svg>
    </motion.div>
  );
}

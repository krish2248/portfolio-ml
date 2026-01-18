/**
 * Framer Motion animation variants
 * Retro-terminal themed animations with typing, glow, and boot effects
 */

import { Variants, Transition } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════
// TRANSITION PRESETS
// ═══════════════════════════════════════════════════════════════════════════

export const springTransition: Transition = {
  type: 'spring',
  damping: 25,
  stiffness: 300,
}

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1], // Custom easing curve
}

export const fastTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTAINER VARIANTS (for staggered children)
// ═══════════════════════════════════════════════════════════════════════════

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// FADE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// SCALE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
}

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 300,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// BOOT SEQUENCE VARIANTS (for terminal boot animation)
// ═══════════════════════════════════════════════════════════════════════════

export const bootLine: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.1,
      ease: 'easeOut',
    },
  }),
}

export const bootContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export const bootText: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPEWRITER VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const typewriterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

export const typewriterLetter: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.05,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD/PROJECT VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 rgba(0, 255, 65, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(0, 255, 65, 0.15)',
    transition: fastTransition,
  },
  tap: {
    scale: 0.98,
  },
}

export const projectCard: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL/DIALOG VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const navbarSlide: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      ...smoothTransition,
    },
  },
}

export const mobileMenuSlide: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: springTransition,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS BAR VARIANTS (for skills)
// ═══════════════════════════════════════════════════════════════════════════

export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const skillItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
    },
  }),
}

// ═══════════════════════════════════════════════════════════════════════════
// GLITCH EFFECT VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const glitchText: Variants = {
  rest: { x: 0, y: 0 },
  glitch: {
    x: [0, -2, 2, -1, 1, 0],
    y: [0, 1, -1, 2, -2, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL-TRIGGERED SECTION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CRT SCREEN EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

export const screenOn: Variants = {
  hidden: {
    scaleY: 0.01,
    scaleX: 0.5,
    filter: 'brightness(10)',
  },
  visible: {
    scaleY: 1,
    scaleX: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.5,
      ease: [0.2, 0, 0.2, 1],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR BLINK EFFECT
// ═══════════════════════════════════════════════════════════════════════════

export const cursorBlink: Variants = {
  visible: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

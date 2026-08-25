/**
 * Framer Motion Animation Variants
 *
 * All animation presets for the Porter Performance marketing site.
 * Durations are constrained to 200-800ms with ease-out or spring easing.
 * Reduced-motion variants provide instant transitions for accessibility.
 */

import type { Variants, Transition } from 'framer-motion';

// --- Shared Transitions ---

const easeOutTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
};

const sectionTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
};

const hoverTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
};

const cardHoverTransition: Transition = {
  duration: 0.25,
  ease: 'easeOut',
};


// --- Animation Variants ---

/**
 * Fade-in: opacity 0→1, duration 500ms, ease-out
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: easeOutTransition,
  },
};

/**
 * Section reveal: opacity 0→1 + translateY 20px→0, duration 600ms, ease-out
 */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionTransition,
  },
};

/**
 * Hover scale: scale 1→1.02, duration 200ms, ease-out
 */
export const hoverScale: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: hoverTransition,
  },
};

/**
 * Stagger container: staggerChildren 0.1-0.15s
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Parallax: translateY based on scroll, max 50px offset.
 * Use with useTransform for scroll-linked motion.
 * These variants define the range boundaries.
 */
export const parallax: Variants = {
  initial: { y: 0 },
  scrolled: {
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 30,
      duration: 0.8,
    },
  },
};

/**
 * Card hover: scale 1→1.03, shadow elevation increase, duration 250ms
 */
export const cardHover: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
    transition: cardHoverTransition,
  },
};

// --- Mobile-Optimized Variants ---
// Reduced complexity for mobile: no parallax, simpler transforms

/**
 * Mobile fade-in: same as fadeIn but shorter duration
 */
export const mobileFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Mobile section reveal: reduced translateY for simpler animation
 */
export const mobileSectionReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Mobile stagger container: reduced stagger delay
 */
export const mobileStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// --- Reduced Motion Variants ---
// Instant transitions for prefers-reduced-motion users

/**
 * Reduced motion variants: all content appears immediately with no motion.
 * Used when prefers-reduced-motion: reduce is active.
 */
export const reducedMotionVariants = {
  fadeIn: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  } satisfies Variants,

  sectionReveal: {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0 } },
  } satisfies Variants,

  hoverScale: {
    idle: { scale: 1 },
    hover: { scale: 1, transition: { duration: 0 } },
  } satisfies Variants,

  staggerContainer: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  } satisfies Variants,

  parallax: {
    initial: { y: 0 },
    scrolled: { y: 0, transition: { duration: 0 } },
  } satisfies Variants,

  cardHover: {
    idle: { scale: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' },
    hover: {
      scale: 1,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0 },
    },
  } satisfies Variants,
} as const;

// --- Utility: Get variants based on motion preference and viewport ---

export interface AnimationConfig {
  reducedMotion: boolean;
  isMobile: boolean;
}

/**
 * Returns the appropriate variant set based on user preferences and viewport.
 * - If reducedMotion is true, returns instant (no-motion) variants.
 * - If isMobile is true, returns simplified mobile variants.
 * - Otherwise, returns full desktop variants.
 */
export function getVariants(config: AnimationConfig) {
  if (config.reducedMotion) {
    return {
      fadeIn: reducedMotionVariants.fadeIn,
      sectionReveal: reducedMotionVariants.sectionReveal,
      hoverScale: reducedMotionVariants.hoverScale,
      staggerContainer: reducedMotionVariants.staggerContainer,
      parallax: reducedMotionVariants.parallax,
      cardHover: reducedMotionVariants.cardHover,
    };
  }

  if (config.isMobile) {
    return {
      fadeIn: mobileFadeIn,
      sectionReveal: mobileSectionReveal,
      hoverScale: hoverScale,
      staggerContainer: mobileStaggerContainer,
      parallax: reducedMotionVariants.parallax, // No parallax on mobile
      cardHover: cardHover,
    };
  }

  return {
    fadeIn,
    sectionReveal,
    hoverScale,
    staggerContainer,
    parallax,
    cardHover,
  };
}

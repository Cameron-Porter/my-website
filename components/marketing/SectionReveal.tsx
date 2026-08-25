'use client';

/**
 * SectionReveal — Scroll-triggered animation wrapper
 *
 * Uses Intersection Observer to time Framer Motion section reveal animations,
 * but keeps content visible on first paint so static screenshots, crawlers, and
 * slow observer startup never produce blank sections.
 *
 * Validates: Requirements 13.1, 13.3, 13.6
 */

import { motion } from 'framer-motion';
import { useReducedMotion, useScrollReveal } from '@/lib/animations/hooks';
import { sectionReveal } from '@/lib/animations/variants';
import type { SectionRevealProps } from '@/lib/types/components';

export default function SectionReveal({
  children,
  delay = 0,
  className,
  threshold = 0.1,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold });

  // If reduced motion is preferred, render content immediately in final state
  if (prefersReducedMotion) {
    return (
      <div
        className={className}
        style={{ opacity: 1 }}
      >
        {children}
      </div>
    );
  }

  // Select the appropriate variant
  const variants = sectionReveal;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial='visible'
      animate={isInView ? 'visible' : 'visible'}
      transition={
        delay > 0
          ? { duration: 0.6, ease: 'easeOut', delay: delay / 1000 }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

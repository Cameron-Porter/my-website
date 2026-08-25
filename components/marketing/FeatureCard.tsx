'use client';

/**
 * FeatureCard — Displays a platform capability with icon, title, and description
 *
 * Renders a Lucide icon, title, and description inside a glassmorphism card.
 * Hover animation uses Framer Motion (scale + elevation + border glow).
 * Respects prefers-reduced-motion by disabling animations.
 *
 * Validates: Requirements 3.3, 3.4, 3.6, 7.3
 */

import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Brain,
  Circle,
  RefreshCw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useReducedMotion } from '@/lib/animations/hooks';
import { cardHover, reducedMotionVariants } from '@/lib/animations/variants';
import type { FeatureCardProps } from '@/lib/types/components';

/**
 * Resolves a Lucide icon component by name string.
 * Falls back to a generic circle icon if the name is not found.
 */
function FeatureIcon({ name }: { name: string }) {
  const iconProps = {
    className: 'h-6 w-6 text-accent-gold',
    'aria-hidden': 'true' as const,
  };

  switch (name) {
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'BookOpen':
      return <BookOpen {...iconProps} />;
    case 'Brain':
      return <Brain {...iconProps} />;
    case 'RefreshCw':
      return <RefreshCw {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'Zap':
      return <Zap {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
}

export default function FeatureCard({ data, index }: FeatureCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? reducedMotionVariants.cardHover
    : cardHover;

  // When reduced motion is preferred, render a static card
  if (prefersReducedMotion) {
    return (
      <div
        className='rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm shadow-sm'
        data-index={index}
      >
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5'>
<FeatureIcon name={data.icon} />
        </div>
        <h3 className='mb-2 text-lg font-semibold text-primary-text'>
          {data.title}
        </h3>
        <p className='text-base leading-relaxed text-muted-text'>
          {data.description}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className='rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-250 ease-out hover:border-accent-gold/30'
      variants={variants}
      initial='idle'
      whileHover='hover'
      data-index={index}
    >
      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5'>
<FeatureIcon name={data.icon} />
      </div>
      <h3 className='mb-2 text-lg font-semibold text-primary-text'>
        {data.title}
      </h3>
      <p className='text-base leading-relaxed text-muted-text'>
        {data.description}
      </p>
    </motion.div>
  );
}

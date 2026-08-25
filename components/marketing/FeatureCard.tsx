'use client';

/**
 * FeatureCard — Displays a platform capability with icon, title, and description
 *
 * Renders a Lucide icon, title, and description inside a glassmorphism card.
 * Uses asymmetric borders and layered shadows for tactile rebellion.
 * Hover animation uses Framer Motion (scale + elevation + border glow).
 * Respects prefers-reduced-motion by disabling animations.
 *
 * Hallmark: Tactile Rebellion - layers of depth and uneven edges
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
        className='relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/5 p-6 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.15),0_6px_20px_rgba(0,0,0,0.25)]'
        data-index={index}
      >
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-[0.875rem] border border-white/8 bg-white/5'>
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
      className='relative overflow-hidden rounded-[1.75rem_1.75rem_2.5rem_2.5rem] border border-white/8 bg-gradient-to-br from-white/5 to-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-250 ease-out hover:border-accent-gold/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
      variants={variants}
      initial='idle'
      whileHover='hover'
      data-index={index}
    >
      {/* Decorative gradient accent */}
      <div
        className='absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent-gold/5 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/5'>
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

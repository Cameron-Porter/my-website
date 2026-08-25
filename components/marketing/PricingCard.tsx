'use client';

/**
 * PricingCard — Pricing tier card with hover animation
 *
 * Renders plan name, price with currency, feature list, and CTA button.
 * Highlights recommended tier with a "Recommended" badge and accent styling.
 * Uses Framer Motion for hover scale/elevation animation (200-300ms).
 * Respects prefers-reduced-motion via useReducedMotion hook.
 *
 * Validates: Requirements 5.2, 5.3, 5.4, 5.5, 7.3
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useReducedMotion } from '@/lib/animations/hooks';
import { cardHover, reducedMotionVariants } from '@/lib/animations/variants';
import { cn } from '@/lib/utils';
import type { PricingCardProps } from '@/lib/types/components';

export default function PricingCard({ data }: PricingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const {
    name,
    price,
    currency,
    period,
    features,
    isRecommended,
    badgeLabel,
    ctaText,
    ctaHref,
  } = data;

  const variants = prefersReducedMotion
    ? reducedMotionVariants.cardHover
    : cardHover;

  const cardContent = (
    <>
      {/* Badge */}
      {isRecommended && (
        <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
          <Badge className='bg-accent-jade text-primary-bg px-3 py-1 text-xs font-semibold'>
            {badgeLabel ?? 'Recommended'}
          </Badge>
        </div>
      )}

      {/* Plan name */}
      <h3 className='text-xl font-semibold text-primary-text'>{name}</h3>

      {/* Price */}
      <div className='mt-4 flex items-baseline gap-1'>
        <span className='text-4xl font-bold text-primary-text'>
          {currency}
          {price}
        </span>
        <span className='text-muted-text text-sm'>/{period}</span>
      </div>

      {/* Feature list */}
      <ul
        className='mt-6 flex flex-col gap-3'
        role='list'
      >
        {features.map((feature) => (
          <li
            key={feature}
            className='flex items-start gap-2'
          >
            <Check
              className={cn(
                'mt-0.5 h-4 w-4 shrink-0',
                isRecommended ? 'text-accent-jade' : 'text-muted-text',
              )}
              aria-hidden='true'
            />
            <span className='text-base text-primary-text/80 md:text-sm'>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <Link
        href={ctaHref}
        className={cn(
          'mt-8 block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors duration-200',
          isRecommended
            ? 'bg-accent-jade text-primary-bg hover:bg-accent-jade/90'
            : 'border border-white/10 text-primary-text hover:border-white/20 hover:bg-white/5',
        )}
      >
        {ctaText}
      </Link>
    </>
  );

  // If reduced motion is preferred, render without Framer Motion wrapper
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'relative flex flex-col rounded-2xl p-6',
          'border bg-white/5 backdrop-blur-md',
          'shadow-[0_4px_12px_rgba(0,0,0,0.2)]',
          isRecommended
            ? 'border-accent-gold/40 shadow-[0_8px_24px_rgba(20,184,166,0.15)]'
            : 'border-white/5',
        )}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'relative flex flex-col rounded-2xl p-6',
        'border bg-white/5 backdrop-blur-md',
        isRecommended
          ? 'border-accent-gold/40 shadow-[0_8px_24px_rgba(20,184,166,0.15)]'
          : 'border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]',
      )}
      variants={variants}
      initial='idle'
      whileHover='hover'
    >
      {cardContent}
    </motion.div>
  );
}

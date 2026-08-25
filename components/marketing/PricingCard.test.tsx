/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import PricingCard from './PricingCard';
import type { PricingTier } from '@/lib/types';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    [key: string]: unknown;
  }) => React.createElement('a', { href, className, ...props }, children),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(function MotionDiv(
      {
        children,
        initial,
        whileHover,
        className,
        ...props
      }: Record<string, unknown>,
      ref: React.Ref<HTMLDivElement>,
    ) {
      return React.createElement(
        'div',
        {
          ref,
          className,
          'data-initial': initial,
          'data-while-hover': whileHover,
          'data-testid': 'motion-div',
          ...props,
        },
        children as React.ReactNode,
      );
    }),
  },
}));

// Mock animation hooks
const mockUseReducedMotion = vi.fn(() => false);

vi.mock('@/lib/animations/hooks', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

vi.mock('@/lib/animations/variants', () => ({
  cardHover: {
    idle: { scale: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' },
    hover: { scale: 1.03, boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)' },
  },
  reducedMotionVariants: {
    cardHover: {
      idle: { scale: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' },
      hover: {
        scale: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0 },
      },
    },
  },
}));

const baseTier: PricingTier = {
  name: 'Pro',
  price: 59,
  currency: '$',
  period: 'month',
  features: ['AI-powered coaching', 'Advanced analytics', 'Fatigue management'],
  isRecommended: true,
  ctaText: 'Get Started',
  ctaHref: 'https://app.cameron-porter.com',
};

const starterTier: PricingTier = {
  name: 'Starter',
  price: 29,
  currency: '$',
  period: 'month',
  features: ['Basic coaching', 'Workout tracking', 'Recovery monitoring'],
  isRecommended: false,
  ctaText: 'Open App',
  ctaHref: 'https://app.cameron-porter.com',
};

describe('PricingCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it('renders plan name', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders price with currency and period', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.getByText('$59')).toBeInTheDocument();
    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  it('renders all feature list items', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.getByText('AI-powered coaching')).toBeInTheDocument();
    expect(screen.getByText('Advanced analytics')).toBeInTheDocument();
    expect(screen.getByText('Fatigue management')).toBeInTheDocument();
  });

  it('renders CTA button with correct text and href', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    const cta = screen.getByRole('link', { name: 'Get Started' });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', 'https://app.cameron-porter.com');
  });

  it('shows Recommended badge when isRecommended is true', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('does not show Recommended badge when isRecommended is false', () => {
    render(
      <PricingCard
        data={starterTier}
        index={0}
      />,
    );
    expect(screen.queryByText('Recommended')).not.toBeInTheDocument();
  });

  it('uses motion.div when reduced motion is not preferred', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('renders a plain div when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });

  it('applies accent-gold border for recommended tier', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    const card = screen.getByTestId('motion-div');
    expect(card.className).toContain('border-accent-gold');
  });

  it('applies subtle border for non-recommended tier', () => {
    render(
      <PricingCard
        data={starterTier}
        index={0}
      />,
    );
    const card = screen.getByTestId('motion-div');
    expect(card.className).toContain('border-white/5');
    expect(card.className).not.toContain('border-accent-gold');
  });

  it('renders check icons for each feature', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    const list = screen.getByRole('list');
    const items = list.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });

  it('uses hover animation variant with idle initial state', () => {
    render(
      <PricingCard
        data={baseTier}
        index={0}
      />,
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.getAttribute('data-initial')).toBe('idle');
    expect(motionDiv.getAttribute('data-while-hover')).toBe('hover');
  });
});

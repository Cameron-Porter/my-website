/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import FeatureCard from './FeatureCard';
import type { FeatureCardData } from '@/lib/types';

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

const mockFeature: FeatureCardData = {
  icon: 'Brain',
  title: 'Adaptive AI Coaching',
  description:
    'Personalized training adjustments driven by your performance data.',
};

describe('FeatureCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it('renders the title text', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    expect(screen.getByText('Adaptive AI Coaching')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    expect(
      screen.getByText(
        'Personalized training adjustments driven by your performance data.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the icon with aria-hidden', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    // Lucide icons render as SVG elements
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses motion.div when reduced motion is not preferred', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('renders a static div when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });

  it('sets data-index attribute for stagger coordination', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={3}
      />,
    );
    const card = screen.getByTestId('motion-div');
    expect(card.getAttribute('data-index')).toBe('3');
  });

  it('sets data-index on static card when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <FeatureCard
        data={mockFeature}
        index={2}
      />,
    );
    const card = screen
      .getByText('Adaptive AI Coaching')
      .closest('[data-index]');
    expect(card).toHaveAttribute('data-index', '2');
  });

  it('applies glassmorphism styling classes', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    const card = screen.getByTestId('motion-div');
    expect(card).toHaveClass('rounded-2xl');
    expect(card).toHaveClass('backdrop-blur-sm');
  });

  it('uses idle/hover variants for animation', () => {
    render(
      <FeatureCard
        data={mockFeature}
        index={0}
      />,
    );
    const card = screen.getByTestId('motion-div');
    expect(card.getAttribute('data-initial')).toBe('idle');
    expect(card.getAttribute('data-while-hover')).toBe('hover');
  });

  it('renders with a fallback icon when icon name is invalid', () => {
    const invalidIconFeature: FeatureCardData = {
      icon: 'NonExistentIcon',
      title: 'Test Feature',
      description: 'Test description.',
    };
    render(
      <FeatureCard
        data={invalidIconFeature}
        index={0}
      />,
    );
    // Should still render without crashing
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

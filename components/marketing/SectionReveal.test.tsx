/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SectionReveal from './SectionReveal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(function MotionDiv(
      {
        children,
        animate,
        initial,
        transition,
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
          'data-animate': animate,
          'data-initial': initial,
          'data-testid': 'motion-div',
          'data-transition-delay': transition
            ? (transition as Record<string, unknown>).delay
            : undefined,
          ...props,
        },
        children as React.ReactNode,
      );
    }),
  },
}));

// Mock animation hooks
const mockUseReducedMotion = vi.fn(() => false);
const mockUseScrollReveal = vi.fn<
  (options?: { threshold?: number }) => {
    ref: { current: null };
    isInView: boolean;
  }
>(() => ({
  ref: { current: null },
  isInView: false,
}));

vi.mock('@/lib/animations/hooks', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
  useScrollReveal: (options?: { threshold?: number }) =>
    mockUseScrollReveal(options),
}));

vi.mock('@/lib/animations/variants', () => ({
  sectionReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  reducedMotionVariants: {
    sectionReveal: {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    },
  },
}));

describe('SectionReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: false,
    });
  });

  it('renders children', () => {
    render(
      <SectionReveal>
        <p>Hello World</p>
      </SectionReveal>,
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('uses motion.div when reduced motion is not preferred', () => {
    render(
      <SectionReveal>
        <p>Animated content</p>
      </SectionReveal>,
    );

    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('renders a plain div when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(
      <SectionReveal>
        <p>Static content</p>
      </SectionReveal>,
    );

    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    const content = screen.getByText('Static content');
    expect(content.parentElement).toHaveStyle({ opacity: '1' });
  });

  it('passes threshold to useScrollReveal', () => {
    render(
      <SectionReveal threshold={0.3}>
        <p>Content</p>
      </SectionReveal>,
    );

    expect(mockUseScrollReveal).toHaveBeenCalledWith({ threshold: 0.3 });
  });

  it('uses default threshold of 0.1', () => {
    render(
      <SectionReveal>
        <p>Content</p>
      </SectionReveal>,
    );

    expect(mockUseScrollReveal).toHaveBeenCalledWith({ threshold: 0.1 });
  });

  it('animates to visible when isInView is true', () => {
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });

    render(
      <SectionReveal>
        <p>Visible content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.getAttribute('data-animate')).toBe('visible');
  });

  it('stays visible on first paint when isInView is false', () => {
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: false,
    });

    render(
      <SectionReveal>
        <p>Hidden content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.getAttribute('data-initial')).toBe('visible');
    expect(motionDiv.getAttribute('data-animate')).toBe('visible');
  });

  it('applies delay to transition when delay prop is provided', () => {
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });

    render(
      <SectionReveal delay={150}>
        <p>Delayed content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    // delay is converted from ms to seconds: 150 / 1000 = 0.15
    expect(motionDiv.getAttribute('data-transition-delay')).toBe('0.15');
  });

  it('does not apply transition override when delay is 0', () => {
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });

    render(
      <SectionReveal delay={0}>
        <p>No delay content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.getAttribute('data-transition-delay')).toBeNull();
  });

  it('applies className to the wrapper', () => {
    render(
      <SectionReveal className='custom-class'>
        <p>Styled content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('applies className when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(
      <SectionReveal className='custom-class'>
        <p>Static content</p>
      </SectionReveal>,
    );

    const content = screen.getByText('Static content');
    expect(content.parentElement).toHaveClass('custom-class');
  });

  it('renders content immediately when IntersectionObserver is unsupported (isInView: true)', () => {
    // When IO is unsupported, useScrollReveal returns isInView: true
    mockUseScrollReveal.mockReturnValue({
      ref: { current: null },
      isInView: true,
    });

    render(
      <SectionReveal>
        <p>Immediate content</p>
      </SectionReveal>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.getAttribute('data-animate')).toBe('visible');
  });
});

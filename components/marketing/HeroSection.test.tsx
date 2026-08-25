/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HeroSection from './HeroSection';

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
        style,
        ...props
      }: Record<string, unknown>,
      ref: React.Ref<HTMLDivElement>,
    ) {
      return React.createElement(
        'div',
        {
          ref,
          className,
          style: style as React.CSSProperties,
          'data-animate': JSON.stringify(animate),
          'data-initial': JSON.stringify(initial),
          'data-transition': JSON.stringify(transition),
          'data-testid': props['aria-hidden'] ? 'motion-bg' : 'motion-content',
          ...props,
        },
        children as React.ReactNode,
      );
    }),
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock animation hooks
const mockUseReducedMotion = vi.fn(() => false);

vi.mock('@/lib/animations/hooks', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders the headline text', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Build muscle with a plan that adapts\./i);
  });

  it('renders the headline as an h1 element', () => {
    render(<HeroSection />);
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveTextContent(/Build muscle with a plan that adapts\./i);
  });

  it('renders the subheadline text', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(
        /G\.R\.I\.T\. turns hypertrophy science into a clean mobile workflow/,
      ),
    ).toBeInTheDocument();
  });

  it('renders the primary CTA linking to the app home', () => {
    render(<HeroSection />);
    const startBtn = screen.getByRole('link', { name: /Open G\.R\.I\.T\./ });
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveAttribute('href', 'https://app.cameron-porter.com');
  });

  it('renders "SEE HOW IT WORKS" CTA linking to #methodology', () => {
    render(<HeroSection />);
    const demoBtn = screen.getByRole('link', { name: /SEE HOW IT WORKS/ });
    expect(demoBtn).toBeInTheDocument();
    expect(demoBtn).toHaveAttribute('href', '#methodology');
  });

  it('uses a <section> element as the root', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<HeroSection className='custom-hero' />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-hero');
  });

  it('sets aria-label on the section', () => {
    render(<HeroSection />);
    expect(screen.getByLabelText('Hero')).toBeInTheDocument();
  });

  it('renders readable content on first paint while preserving animation timing', () => {
    render(<HeroSection />);
    const contentDiv = screen.getByTestId('motion-content');
    const initial = JSON.parse(contentDiv.getAttribute('data-initial') || '{}');
    const transition = JSON.parse(
      contentDiv.getAttribute('data-transition') || '{}',
    );
    expect(initial.opacity).toBe(1);
    expect(transition.duration).toBe(0.8);
    expect(transition.ease).toBe('easeOut');
  });

  it('disables animation when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<HeroSection />);
    const contentDiv = screen.getByTestId('motion-content');
    const initial = JSON.parse(contentDiv.getAttribute('data-initial') || '{}');
    const transition = JSON.parse(
      contentDiv.getAttribute('data-transition') || '{}',
    );
    expect(initial.opacity).toBe(1);
    expect(transition.duration).toBe(0);
  });

  it('has decorative background elements marked aria-hidden', () => {
    const { container } = render(<HeroSection />);
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThanOrEqual(2);
  });
});

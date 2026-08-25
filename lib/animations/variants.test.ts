/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import {
  fadeIn,
  sectionReveal,
  hoverScale,
  staggerContainer,
  parallax,
  cardHover,
  mobileFadeIn,
  mobileSectionReveal,
  mobileStaggerContainer,
  reducedMotionVariants,
  getVariants,
} from './variants';

describe('Animation Variants', () => {
  describe('fadeIn', () => {
    it('should animate opacity from 0 to 1 with 500ms duration', () => {
      expect(fadeIn.hidden).toEqual({ opacity: 0 });
      expect(fadeIn.visible).toMatchObject({ opacity: 1 });
      const transition = (fadeIn.visible as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.duration).toBe(0.5);
      expect(transition.ease).toBe('easeOut');
    });
  });

  describe('sectionReveal', () => {
    it('should animate opacity and translateY with 600ms duration', () => {
      expect(sectionReveal.hidden).toEqual({ opacity: 0, y: 20 });
      expect(sectionReveal.visible).toMatchObject({ opacity: 1, y: 0 });
      const transition = (sectionReveal.visible as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.duration).toBe(0.6);
      expect(transition.ease).toBe('easeOut');
    });
  });

  describe('hoverScale', () => {
    it('should scale from 1 to 1.02 with 200ms duration', () => {
      expect(hoverScale.idle).toEqual({ scale: 1 });
      expect(hoverScale.hover).toMatchObject({ scale: 1.02 });
      const transition = (hoverScale.hover as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.duration).toBe(0.2);
      expect(transition.ease).toBe('easeOut');
    });
  });

  describe('staggerContainer', () => {
    it('should have staggerChildren between 0.1 and 0.15', () => {
      const transition = (staggerContainer.visible as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.staggerChildren).toBeGreaterThanOrEqual(0.1);
      expect(transition.staggerChildren).toBeLessThanOrEqual(0.15);
    });
  });

  describe('parallax', () => {
    it('should have max 50px vertical offset with spring easing', () => {
      expect(parallax.initial).toEqual({ y: 0 });
      expect(parallax.scrolled).toMatchObject({ y: -50 });
      const transition = (parallax.scrolled as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.type).toBe('spring');
    });
  });

  describe('cardHover', () => {
    it('should scale from 1 to 1.03 with shadow elevation increase at 250ms', () => {
      expect(cardHover.idle).toMatchObject({ scale: 1 });
      expect(cardHover.hover).toMatchObject({ scale: 1.03 });
      const transition = (cardHover.hover as Record<string, unknown>)
        .transition as Record<string, unknown>;
      expect(transition.duration).toBe(0.25);
      expect(transition.ease).toBe('easeOut');
    });

    it('should increase box-shadow on hover', () => {
      const idle = cardHover.idle as Record<string, unknown>;
      const hover = cardHover.hover as Record<string, unknown>;
      expect(idle.boxShadow).toBe('0 4px 12px rgba(0, 0, 0, 0.2)');
      expect(hover.boxShadow).toBe('0 16px 48px rgba(0, 0, 0, 0.4)');
    });
  });

  describe('duration bounds (200-800ms)', () => {
    it('all variants should have durations between 200ms and 800ms', () => {
      const durations = [
        (
          (fadeIn.visible as Record<string, unknown>).transition as Record<
            string,
            number
          >
        ).duration,
        (
          (sectionReveal.visible as Record<string, unknown>)
            .transition as Record<string, number>
        ).duration,
        (
          (hoverScale.hover as Record<string, unknown>).transition as Record<
            string,
            number
          >
        ).duration,
        (
          (cardHover.hover as Record<string, unknown>).transition as Record<
            string,
            number
          >
        ).duration,
      ];

      for (const duration of durations) {
        const ms = duration! * 1000;
        expect(ms).toBeGreaterThanOrEqual(200);
        expect(ms).toBeLessThanOrEqual(800);
      }
    });

    it('parallax spring duration should be within bounds', () => {
      const transition = (parallax.scrolled as Record<string, unknown>)
        .transition as Record<string, number>;
      const ms = transition.duration! * 1000;
      expect(ms).toBeGreaterThanOrEqual(200);
      expect(ms).toBeLessThanOrEqual(800);
    });
  });

  describe('reducedMotionVariants', () => {
    it('should have zero duration for all transitions', () => {
      const variants = [
        reducedMotionVariants.fadeIn,
        reducedMotionVariants.sectionReveal,
        reducedMotionVariants.hoverScale,
        reducedMotionVariants.staggerContainer,
        reducedMotionVariants.parallax,
        reducedMotionVariants.cardHover,
      ];

      for (const variant of variants) {
        const visibleKey = Object.keys(variant).find(
          (k) => k === 'visible' || k === 'hover' || k === 'scrolled',
        );
        if (visibleKey) {
          const state = (variant as Record<string, Record<string, unknown>>)[visibleKey] as Record<string, unknown>;
          const transition = state.transition as Record<string, number>;
          expect(transition.duration).toBe(0);
        }
      }
    });

    it('should show content in final state (no motion)', () => {
      expect(reducedMotionVariants.fadeIn.hidden).toMatchObject({ opacity: 1 });
      expect(reducedMotionVariants.sectionReveal.hidden).toMatchObject({
        opacity: 1,
        y: 0,
      });
      expect(reducedMotionVariants.parallax.scrolled).toMatchObject({ y: 0 });
    });
  });

  describe('mobile variants', () => {
    it('mobileFadeIn should have shorter duration than desktop', () => {
      const mobileTransition = (mobileFadeIn.visible as Record<string, unknown>)
        .transition as Record<string, number>;
      const desktopTransition = (fadeIn.visible as Record<string, unknown>)
        .transition as Record<string, number>;
      expect(mobileTransition.duration!).toBeLessThan(
        desktopTransition.duration!,
      );
    });

    it('mobileSectionReveal should have reduced translateY', () => {
      expect(mobileSectionReveal.hidden).toMatchObject({ y: 10 });
      expect((sectionReveal.hidden as Record<string, number>).y).toBe(20);
    });

    it('mobileStaggerContainer should have reduced stagger delay', () => {
      const mobileTransition = (
        mobileStaggerContainer.visible as Record<string, unknown>
      ).transition as Record<string, number>;
      const desktopTransition = (
        staggerContainer.visible as Record<string, unknown>
      ).transition as Record<string, number>;
      expect(mobileTransition.staggerChildren!).toBeLessThan(
        desktopTransition.staggerChildren!,
      );
    });
  });

  describe('getVariants', () => {
    it('should return reduced motion variants when reducedMotion is true', () => {
      const result = getVariants({ reducedMotion: true, isMobile: false });
      expect(result.fadeIn).toBe(reducedMotionVariants.fadeIn);
      expect(result.sectionReveal).toBe(reducedMotionVariants.sectionReveal);
      expect(result.parallax).toBe(reducedMotionVariants.parallax);
    });

    it('should return mobile variants when isMobile is true', () => {
      const result = getVariants({ reducedMotion: false, isMobile: true });
      expect(result.fadeIn).toBe(mobileFadeIn);
      expect(result.sectionReveal).toBe(mobileSectionReveal);
      expect(result.staggerContainer).toBe(mobileStaggerContainer);
      // No parallax on mobile
      expect(result.parallax).toBe(reducedMotionVariants.parallax);
    });

    it('should return full desktop variants by default', () => {
      const result = getVariants({ reducedMotion: false, isMobile: false });
      expect(result.fadeIn).toBe(fadeIn);
      expect(result.sectionReveal).toBe(sectionReveal);
      expect(result.parallax).toBe(parallax);
    });

    it('should prioritize reducedMotion over isMobile', () => {
      const result = getVariants({ reducedMotion: true, isMobile: true });
      expect(result.fadeIn).toBe(reducedMotionVariants.fadeIn);
    });
  });
});

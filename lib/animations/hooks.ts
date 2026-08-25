'use client';

/**
 * Custom Animation Hooks
 *
 * Provides hooks for reduced-motion detection and scroll-triggered reveals.
 * Both hooks are client-side only and compatible with "use client" components.
 */

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

/**
 * Detects whether the user prefers reduced motion.
 * Returns true if prefers-reduced-motion: reduce is active.
 *
 * - Listens for changes to the media query (e.g., user toggles setting).
 * - Returns false during SSR / initial render (safe default).
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', onStoreChange);

    return () => {
      mediaQuery.removeEventListener('change', onStoreChange);
    };
  }, []);

  const getSnapshot = useCallback(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Options for the useScrollReveal hook.
 */
export interface ScrollRevealOptions {
  /** Intersection Observer threshold (0-1). Default: 0.1 */
  threshold?: number;
  /** Whether the reveal should only trigger once. Default: true */
  triggerOnce?: boolean;
}

/**
 * Scroll-triggered reveal using Intersection Observer.
 *
 * Returns a ref to attach to the target element and a boolean indicating
 * whether the element is in view.
 *
 * - Default threshold: 0.1
 * - Triggers once by default (does not re-trigger on scroll back)
 * - If Intersection Observer is unsupported, returns isInView: true immediately
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
): { ref: React.RefObject<T | null>; isInView: boolean } {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          hasTriggered.current = true;
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce],
  );

  useEffect(() => {
    // If Intersection Observer is unsupported, initial state already reveals content.
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // If already triggered once and triggerOnce is true, don't re-observe
    if (triggerOnce && hasTriggered.current) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, handleIntersection]);

  return { ref, isInView };
}

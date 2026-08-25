/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useReducedMotion, useScrollReveal } from './hooks';

describe('useReducedMotion', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    matchMediaMock = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  it('should return false when prefers-reduced-motion is not set', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-reduced-motion: reduce is active', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should update when media query changes', () => {
    let matches = false;
    let changeHandler: (() => void) | null = null;

    matchMediaMock.mockImplementation(() => ({
      get matches() {
        return matches;
      },
      addEventListener: (
        _event: string,
        handler: () => void,
      ) => {
        changeHandler = handler;
      },
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      matches = true;
      changeHandler?.();
    });

    expect(result.current).toBe(true);
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListener = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    });

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});

describe('useScrollReveal', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let intersectionCallback: IntersectionObserverCallback | null = null;
  let observedOptions: IntersectionObserverInit | undefined;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    intersectionCallback = null;
    observedOptions = undefined;

    const MockIntersectionObserver = vi.fn(
      (
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) => {
        intersectionCallback = callback;
        observedOptions = options;
        return {
          observe: observeMock,
          disconnect: disconnectMock,
          unobserve: vi.fn(),
          root: null,
          rootMargin: '',
          thresholds: [],
          takeRecords: () => [],
        };
      },
    );

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  it('should return isInView: false initially', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.isInView).toBe(false);
  });

  it('should return a ref object', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.ref).toBeDefined();
  });

  it('should create observer with default threshold of 0.1 when element is present', () => {
    // Use a component that attaches the ref to a real DOM element
    function TestComponent() {
      const { ref, isInView } = useScrollReveal();
      return React.createElement('div', {
        ref,
        'data-testid': 'target',
        'data-inview': String(isInView),
      });
    }

    render(React.createElement(TestComponent));

    expect(observeMock).toHaveBeenCalled();
    expect(observedOptions?.threshold).toBe(0.1);
  });

  it('should create observer with custom threshold', () => {
    function TestComponent() {
      const { ref } = useScrollReveal({ threshold: 0.5 });
      return React.createElement('div', { ref });
    }

    render(React.createElement(TestComponent));

    expect(observeMock).toHaveBeenCalled();
    expect(observedOptions?.threshold).toBe(0.5);
  });

  it('should set isInView to true when element intersects', () => {
    let hookResult: { isInView: boolean } = { isInView: false };

    function TestComponent() {
      const { ref, isInView } = useScrollReveal();
      useEffect(() => {
        hookResult = { isInView };
      });
      return React.createElement('div', {
        ref,
        'data-inview': String(isInView),
      });
    }

    const { container } = render(
      React.createElement(TestComponent),
    );

    expect(hookResult.isInView).toBe(false);

    // Simulate intersection
    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    // After re-render, the component should reflect isInView: true
    const el = container.firstElementChild;
    expect(el?.getAttribute('data-inview')).toBe('true');
  });

  it('should trigger only once by default (not re-trigger on scroll back)', () => {
    function TestComponent() {
      const { ref, isInView } = useScrollReveal();
      return React.createElement('div', {
        ref,
        'data-inview': String(isInView),
      });
    }

    const { container } = render(React.createElement(TestComponent));

    // Simulate entering viewport
    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.firstElementChild?.getAttribute('data-inview')).toBe(
      'true',
    );

    // Simulate leaving viewport - should stay true (triggerOnce default)
    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.firstElementChild?.getAttribute('data-inview')).toBe(
      'true',
    );
  });

  it('should re-trigger when triggerOnce is false', () => {
    function TestComponent() {
      const { ref, isInView } = useScrollReveal({ triggerOnce: false });
      return React.createElement('div', {
        ref,
        'data-inview': String(isInView),
      });
    }

    const { container } = render(React.createElement(TestComponent));

    // Simulate entering viewport
    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.firstElementChild?.getAttribute('data-inview')).toBe(
      'true',
    );

    // Simulate leaving viewport - should go back to false
    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.firstElementChild?.getAttribute('data-inview')).toBe(
      'false',
    );
  });

  it('should return isInView: true if IntersectionObserver is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    function TestComponent() {
      const { ref, isInView } = useScrollReveal();
      return React.createElement('div', {
        ref,
        'data-inview': String(isInView),
      });
    }

    const { container } = render(React.createElement(TestComponent));
    expect(container.firstElementChild?.getAttribute('data-inview')).toBe(
      'true',
    );
  });

  it('should disconnect observer on unmount', () => {
    function TestComponent() {
      const { ref } = useScrollReveal();
      return React.createElement('div', { ref });
    }

    const { unmount } = render(React.createElement(TestComponent));

    // Observer should have been created
    expect(observeMock).toHaveBeenCalled();

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});

// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRateLimiter } from './rate-limiter';

describe('createRateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow attempts when under the limit', () => {
    const limiter = createRateLimiter();
    expect(limiter.canAttempt()).toBe(true);
  });

  it('should use default config (maxAttempts=5, windowMs=60000)', () => {
    const limiter = createRateLimiter();

    for (let i = 0; i < 5; i++) {
      expect(limiter.canAttempt()).toBe(true);
      limiter.recordAttempt();
    }

    expect(limiter.canAttempt()).toBe(false);
  });

  it('should block after maxAttempts within the window', () => {
    const limiter = createRateLimiter({ maxAttempts: 3, windowMs: 10000 });

    limiter.recordAttempt();
    limiter.recordAttempt();
    limiter.recordAttempt();

    expect(limiter.canAttempt()).toBe(false);
  });

  it('should allow attempts again after the window expires', () => {
    const limiter = createRateLimiter({ maxAttempts: 2, windowMs: 5000 });

    limiter.recordAttempt();
    limiter.recordAttempt();
    expect(limiter.canAttempt()).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(5001);

    expect(limiter.canAttempt()).toBe(true);
  });

  it('should prune expired timestamps on canAttempt', () => {
    const limiter = createRateLimiter({ maxAttempts: 2, windowMs: 5000 });

    limiter.recordAttempt();
    vi.advanceTimersByTime(3000);
    limiter.recordAttempt();

    expect(limiter.canAttempt()).toBe(false);

    // Advance past the first attempt's expiry but not the second
    vi.advanceTimersByTime(2001);

    expect(limiter.canAttempt()).toBe(true);
  });

  it('should reset all attempts', () => {
    const limiter = createRateLimiter({ maxAttempts: 2, windowMs: 60000 });

    limiter.recordAttempt();
    limiter.recordAttempt();
    expect(limiter.canAttempt()).toBe(false);

    limiter.reset();
    expect(limiter.canAttempt()).toBe(true);
  });

  it('should return correct state via getState', () => {
    const limiter = createRateLimiter({ maxAttempts: 3, windowMs: 60000 });

    const initialState = limiter.getState();
    expect(initialState.attempts).toEqual([]);
    expect(initialState.isBlocked).toBe(false);

    limiter.recordAttempt();
    limiter.recordAttempt();
    limiter.recordAttempt();

    const blockedState = limiter.getState();
    expect(blockedState.attempts).toHaveLength(3);
    expect(blockedState.isBlocked).toBe(true);
  });

  it('should return a copy of attempts in getState (not a reference)', () => {
    const limiter = createRateLimiter();
    limiter.recordAttempt();

    const state = limiter.getState();
    state.attempts.push(999999);

    expect(limiter.getState().attempts).toHaveLength(1);
  });

  it('should accept partial config overrides', () => {
    const limiter = createRateLimiter({ maxAttempts: 2 });

    limiter.recordAttempt();
    limiter.recordAttempt();
    expect(limiter.canAttempt()).toBe(false);

    // windowMs should still be default 60000
    vi.advanceTimersByTime(60001);
    expect(limiter.canAttempt()).toBe(true);
  });

  it('should work with no config (all defaults)', () => {
    const limiter = createRateLimiter();

    for (let i = 0; i < 5; i++) {
      limiter.recordAttempt();
    }

    expect(limiter.canAttempt()).toBe(false);

    vi.advanceTimersByTime(60001);
    expect(limiter.canAttempt()).toBe(true);
  });

  it('should handle sliding window correctly with staggered attempts', () => {
    const limiter = createRateLimiter({ maxAttempts: 3, windowMs: 10000 });

    // Attempt at t=0
    limiter.recordAttempt();
    vi.advanceTimersByTime(4000);

    // Attempt at t=4000
    limiter.recordAttempt();
    vi.advanceTimersByTime(4000);

    // Attempt at t=8000
    limiter.recordAttempt();
    expect(limiter.canAttempt()).toBe(false);

    // At t=10001, first attempt expires
    vi.advanceTimersByTime(2001);
    expect(limiter.canAttempt()).toBe(true);
  });
});

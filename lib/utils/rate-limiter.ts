import type { RateLimiterConfig, RateLimiterState } from '@/lib/types';

const DEFAULT_CONFIG: RateLimiterConfig = {
  maxAttempts: 5,
  windowMs: 60000,
};

/**
 * Creates a client-side rate limiter using a sliding window of timestamps.
 * Tracks submission attempts in memory (resets on page reload).
 *
 * @param config - Optional partial configuration (defaults: maxAttempts=5, windowMs=60000)
 * @returns Rate limiter interface with canAttempt, recordAttempt, reset, and getState methods
 */
export function createRateLimiter(config?: Partial<RateLimiterConfig>): {
  canAttempt: () => boolean;
  recordAttempt: () => void;
  reset: () => void;
  getState: () => RateLimiterState;
} {
  const resolvedConfig: RateLimiterConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  let attempts: number[] = [];

  /**
   * Removes timestamps that are older than the sliding window.
   */
  function pruneExpired(): void {
    const now = Date.now();
    const windowStart = now - resolvedConfig.windowMs;
    attempts = attempts.filter((timestamp) => timestamp > windowStart);
  }

  /**
   * Checks whether a new attempt is allowed within the current sliding window.
   * Prunes expired timestamps before checking.
   */
  function canAttempt(): boolean {
    pruneExpired();
    return attempts.length < resolvedConfig.maxAttempts;
  }

  /**
   * Records a new attempt timestamp.
   */
  function recordAttempt(): void {
    attempts.push(Date.now());
  }

  /**
   * Resets all recorded attempts.
   */
  function reset(): void {
    attempts = [];
  }

  /**
   * Returns the current state of the rate limiter.
   */
  function getState(): RateLimiterState {
    pruneExpired();
    return {
      attempts: [...attempts],
      isBlocked: attempts.length >= resolvedConfig.maxAttempts,
    };
  }

  return {
    canAttempt,
    recordAttempt,
    reset,
    getState,
  };
}

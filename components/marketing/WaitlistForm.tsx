'use client';

/**
 * WaitlistForm — Email capture form for the pre-launch waitlist.
 *
 * Features:
 * - Client-side email validation (format, length) before submission
 * - Input sanitization to strip HTML/script content
 * - Client-side rate limiting (5 attempts per 60s sliding window)
 * - API call with AbortController (10s timeout)
 * - Handles all states: idle, loading, success, error, rate-limited, duplicate
 * - Inline feedback within form area
 * - Never exposes internal details (URLs, status codes, stack traces)
 *
 * Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 15.3, 15.5, 15.6
 */

import { useState, useRef, type FormEvent } from 'react';
import { validateEmail, sanitizeInput } from '@/lib/utils/validation';
import { createRateLimiter } from '@/lib/utils/rate-limiter';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { WaitlistFormProps } from '@/lib/types/components';
import type { WaitlistFormState } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL || '/api/waitlist';

export default function WaitlistForm({ className }: WaitlistFormProps) {
  const [formState, setFormState] = useState<WaitlistFormState>({
    email: '',
    status: 'idle',
    errorMessage: null,
  });

  // Persist rate limiter across renders (resets on page reload)
  const rateLimiterRef = useRef(
    createRateLimiter({ maxAttempts: 5, windowMs: 60000 }),
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // 1. Sanitize input
    const sanitizedEmail = sanitizeInput(formState.email);

    // 2. Validate email
    const validation = validateEmail(sanitizedEmail);
    if (!validation.isValid) {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: validation.error,
      }));
      return;
    }

    // 3. Check rate limiter
    const rateLimiter = rateLimiterRef.current;
    if (!rateLimiter.canAttempt()) {
      setFormState((prev) => ({
        ...prev,
        status: 'rate-limited',
        errorMessage: 'Too many attempts. Please try again later.',
      }));
      return;
    }

    // 4. Record attempt
    rateLimiter.recordAttempt();

    // 5. Set loading state
    setFormState((prev) => ({
      ...prev,
      status: 'loading',
      errorMessage: null,
    }));

    // 6. Call API with AbortController (10s timeout)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sanitizedEmail }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 7. Handle responses
      if (response.status === 200 || response.status === 201) {
        setFormState({
          email: '',
          status: 'success',
          errorMessage: null,
        });
      } else if (response.status === 409) {
        setFormState((prev) => ({
          ...prev,
          status: 'duplicate',
          errorMessage: 'This email is already on the waitlist!',
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: 'Something went wrong. Please try again.',
        }));
      }
    } catch {
      clearTimeout(timeoutId);
      // Timeout or network error — generic message, no internals exposed
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Something went wrong. Please try again.',
      }));
    }
  }

  const isLoading = formState.status === 'loading';
  const showSuccess = formState.status === 'success';
  const showError =
    formState.status === 'error' ||
    formState.status === 'rate-limited' ||
    formState.status === 'duplicate';

  return (
    <section
      id='waitlist'
      className={cn(
        'relative rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-md',
        className,
      )}
      aria-label='Join the waitlist'
    >
      <h2 className='font-heading text-2xl font-extrabold uppercase tracking-tight text-primary-text sm:text-3xl'>
        THE FUTURE OF TRAINING IS HERE
      </h2>
      <p className='mt-2 text-muted-text'>
        Join the waitlist and be the first to experience AI-powered training
        that adapts to you.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-start'
        noValidate
      >
        <div className='flex-1'>
          <label
            htmlFor='waitlist-email'
            className='sr-only'
          >
            Email address
          </label>
          <Input
            id='waitlist-email'
            type='email'
            placeholder='you@example.com'
            maxLength={254}
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                email: e.target.value,
                status:
                  prev.status === 'success'
                    ? 'idle'
                    : prev.status === 'error' ||
                        prev.status === 'rate-limited' ||
                        prev.status === 'duplicate'
                      ? 'idle'
                      : prev.status,
                errorMessage:
                  prev.status === 'error' ||
                  prev.status === 'rate-limited' ||
                  prev.status === 'duplicate'
                    ? null
                    : prev.errorMessage,
              }))
            }
            disabled={isLoading}
            aria-invalid={showError ? true : undefined}
            aria-describedby='waitlist-feedback'
            className='h-12 rounded-lg border-white/10 bg-white/5 px-4 text-primary-text placeholder:text-muted-text focus-visible:border-accent-gold focus-visible:ring-accent-gold/30'
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='inline-flex h-12 min-w-[160px] items-center justify-center rounded-lg bg-accent-jade px-6 text-base font-semibold text-primary-bg transition-all duration-300 ease-out hover:bg-accent-jade/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg disabled:pointer-events-none disabled:opacity-50'
        >
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <svg
                className='h-4 w-4 animate-spin'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                />
              </svg>
              Submitting…
            </span>
          ) : (
            'JOIN WAITLIST →'
          )}
        </button>
      </form>

      {/* Inline feedback */}
      <div
        id='waitlist-feedback'
        className='mt-4 min-h-6'
        aria-live='polite'
      >
        {showSuccess && (
          <p className='text-sm font-medium text-green-400'>
            You&apos;re on the list! We&apos;ll notify you when we launch.
          </p>
        )}
        {showError && formState.errorMessage && (
          <p className='text-sm font-medium text-red-400'>
            {formState.errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}

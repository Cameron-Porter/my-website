import type { ValidationResult } from '@/lib/types';

/**
 * Standard email regex pattern.
 * Matches local@domain format with reasonable constraints.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validates email format and length.
 * Returns ValidationResult with isValid flag and optional error message.
 *
 * Rules:
 * - Trims input before validation
 * - Must not be empty
 * - Must not exceed 254 characters
 * - Must match standard email regex pattern
 *
 * Error messages are user-friendly and never expose internal details.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Please enter your email address' };
  }

  if (trimmed.length > 254) {
    return { isValid: false, error: 'Email address is too long' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
}

/**
 * Sanitizes user input by stripping HTML tags and script content.
 * Returns the sanitized string.
 *
 * Rules:
 * - Removes script tags and their content first (including nested)
 * - Strips all remaining HTML tags (<...> sequences)
 * - Trims whitespace
 * - Preserves plain text content
 * - Idempotent: sanitizeInput(sanitizeInput(x)) === sanitizeInput(x)
 */
export function sanitizeInput(input: string): string {
  let result = input;

  // Remove script tags and their content (including nested, case-insensitive)
  // Use a loop to handle nested script tags
  let previous = '';
  while (previous !== result) {
    previous = result;
    result = result.replace(/<script[\s>][\s\S]*?<\/script>/gi, '');
  }

  // Remove self-closing or unclosed script tags
  result = result.replace(/<script[^>]*\/?>/gi, '');

  // Strip all remaining HTML tags
  result = result.replace(/<[^>]*>/g, '');

  // Trim whitespace
  result = result.trim();

  return result;
}

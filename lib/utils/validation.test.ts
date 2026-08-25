/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { validateEmail, sanitizeInput } from './validation';

describe('validateEmail', () => {
  it('returns valid for a standard email', () => {
    const result = validateEmail('user@example.com');
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('trims whitespace before validation', () => {
    const result = validateEmail('  user@example.com  ');
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('returns error for empty string', () => {
    const result = validateEmail('');
    expect(result).toEqual({
      isValid: false,
      error: 'Please enter your email address',
    });
  });

  it('returns error for whitespace-only string', () => {
    const result = validateEmail('   ');
    expect(result).toEqual({
      isValid: false,
      error: 'Please enter your email address',
    });
  });

  it('returns error for email exceeding 254 characters', () => {
    const longEmail = 'a'.repeat(243) + '@example.com'; // 255 chars
    const result = validateEmail(longEmail);
    expect(result).toEqual({
      isValid: false,
      error: 'Email address is too long',
    });
  });

  it('returns valid for email at exactly 254 characters', () => {
    const email = 'a'.repeat(242) + '@example.com'; // 254 chars
    const result = validateEmail(email);
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('returns error for email without @ symbol', () => {
    const result = validateEmail('userexample.com');
    expect(result).toEqual({
      isValid: false,
      error: 'Please enter a valid email address',
    });
  });

  it('returns error for email without domain', () => {
    const result = validateEmail('user@');
    expect(result).toEqual({
      isValid: false,
      error: 'Please enter a valid email address',
    });
  });

  it('returns error for email without local part', () => {
    const result = validateEmail('@example.com');
    expect(result).toEqual({
      isValid: false,
      error: 'Please enter a valid email address',
    });
  });

  it('returns valid for email with subdomains', () => {
    const result = validateEmail('user@mail.example.com');
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('returns valid for email with plus addressing', () => {
    const result = validateEmail('user+tag@example.com');
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('returns valid for email with dots in local part', () => {
    const result = validateEmail('first.last@example.com');
    expect(result).toEqual({ isValid: true, error: null });
  });

  it('never exposes internal details in error messages', () => {
    const results = [
      validateEmail(''),
      validateEmail('invalid'),
      validateEmail('a'.repeat(255) + '@x.com'),
    ];
    for (const result of results) {
      expect(result.error).not.toContain('regex');
      expect(result.error).not.toContain('Error');
      expect(result.error).not.toContain('stack');
      expect(result.error).not.toContain('undefined');
    }
  });
});

describe('sanitizeInput', () => {
  it('returns plain text unchanged', () => {
    expect(sanitizeInput('Hello world')).toBe('Hello world');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('strips simple HTML tags', () => {
    expect(sanitizeInput('<b>bold</b>')).toBe('bold');
  });

  it('strips nested HTML tags', () => {
    expect(sanitizeInput('<div><p>text</p></div>')).toBe('text');
  });

  it('removes script tags and their content', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('');
  });

  it('removes script tags with attributes', () => {
    expect(
      sanitizeInput('<script type="text/javascript">code()</script>'),
    ).toBe('');
  });

  it('removes script tags case-insensitively', () => {
    expect(sanitizeInput('<SCRIPT>alert("xss")</SCRIPT>')).toBe('');
  });

  it('removes nested script tags', () => {
    expect(sanitizeInput('<script><script>inner</script></script>')).toBe('');
  });

  it('preserves text around script tags', () => {
    expect(sanitizeInput('before<script>evil()</script>after')).toBe(
      'beforeafter',
    );
  });

  it('strips self-closing tags', () => {
    expect(sanitizeInput('text<br/>more')).toBe('textmore');
  });

  it('strips img tags with attributes', () => {
    expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('is idempotent', () => {
    const inputs = [
      '<script>alert(1)</script>hello',
      '<div><b>text</b></div>',
      'plain text',
      '  spaces  ',
      '<p>paragraph</p><script>x</script>',
    ];
    for (const input of inputs) {
      const once = sanitizeInput(input);
      const twice = sanitizeInput(once);
      expect(twice).toBe(once);
    }
  });

  it('handles empty string', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('preserves special characters that are not HTML', () => {
    expect(sanitizeInput('a & b < c')).toBe('a & b < c');
  });

  it('handles incomplete tags gracefully', () => {
    // An incomplete tag like "a < b" where < is not part of a tag pair
    // should be preserved since it doesn't match <...> pattern
    const result = sanitizeInput('5 < 10');
    expect(result).toBe('5 < 10');
  });
});

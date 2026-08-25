/**
 * Design System Tokens
 *
 * Central source of truth for all visual design constants.
 * These tokens drive Tailwind configuration and component styling.
 */

export const colors = {
  /** Primary background — deep dark */
  primaryBg: '#0B0D10',
  /** Secondary surface — elevated dark panels */
  secondarySurface: '#1F2531',
  /** Accent teal — CTAs, highlights, brand accent */
  accentGold: '#14B8A6',
  /** Primary text — high-contrast light */
  primaryText: '#F5F7FA',
  /** Muted text — secondary/supporting copy */
  mutedText: '#9CA3AF',
} as const;

export const typography = {
  fonts: {
    heading: 'Sora',
    headingFallback: 'Geist',
    body: 'Inter',
  },
  headingSizes: {
    h1: '3.75rem', // 60px
    h2: '3rem', // 48px
    h3: '2.25rem', // 36px
    h4: '1.75rem', // 28px
    h5: '1.5rem', // 24px
    h6: '1.25rem', // 20px
  },
  bodySizes: {
    base: '1rem', // 16px
    sm: '0.875rem', // 14px
    lg: '1.125rem', // 18px
  },
  fontWeights: {
    heading: 700,
    headingLight: 600,
    body: 400,
  },
  lineHeights: {
    heading: 1.2,
    body: 1.6,
  },
} as const;

export const spacing = {
  section: {
    paddingY: '5rem', // 80px
    paddingX: '1.5rem', // 24px
  },
  card: {
    padding: '1.5rem', // 24px
    gap: '1.5rem', // 24px
  },
  grid: {
    gap: '2rem', // 32px
  },
  container: {
    maxWidth: '1280px',
  },
} as const;

export const glassmorphism = {
  /** Backdrop blur range: 8-16px */
  backdropBlur: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  /** Background opacity range: 5-15% */
  bgOpacity: {
    light: 0.05,
    medium: 0.1,
    heavy: 0.15,
  },
  /** Border: 1px rgba white at 5-10% opacity */
  border: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    heavy: 'rgba(255, 255, 255, 0.1)',
  },
} as const;

export const shadows = {
  /** Vertical offset 4-16px, blur 12-48px, rgba black 20-40% */
  sm: '0 4px 12px rgba(0, 0, 0, 0.2)',
  md: '0 8px 24px rgba(0, 0, 0, 0.3)',
  lg: '0 16px 48px rgba(0, 0, 0, 0.4)',
} as const;

export const gradients = {
  /** Two-color transitions at 5-15% opacity */
  surfaceOverlay: `linear-gradient(135deg, rgba(31, 37, 49, 0.1), rgba(11, 13, 16, 0.05))`,
  accentGlow: `linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))`,
  heroBackground: `linear-gradient(180deg, ${colors.primaryBg} 0%, ${colors.secondarySurface} 100%)`,
} as const;

export const transitions = {
  /** Duration range: 200-400ms with ease-out */
  fast: '200ms ease-out',
  medium: '300ms ease-out',
  slow: '400ms ease-out',
  durations: {
    fast: 200,
    medium: 300,
    slow: 400,
  },
  easing: 'ease-out',
} as const;

export const borderRadius = {
  card: '1rem', // rounded-2xl equivalent (16px)
  button: '0.5rem',
  input: '0.5rem',
  full: '9999px',
} as const;

export const breakpoints = {
  mobile: 768,
  tablet: 1280,
  desktop: 1920,
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  glassmorphism,
  shadows,
  gradients,
  transitions,
  borderRadius,
  breakpoints,
} as const;

export default designTokens;

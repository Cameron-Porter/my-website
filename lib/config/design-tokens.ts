/**
 * Design System Tokens
 * 
 * Central source of truth for all visual design constants.
 * These tokens drive Tailwind configuration and component styling.
 * 
 * ─── HALLMARK: Trailhead ───
 * Night at camp: a forest-dark base, a pine accent for structure and CTAs,
 * and a campfire ember for warmth. Physical depth through layered shadows
 * and organic texture, so the site reads rugged rather than templated.
 */

// Mirrors the CSS custom properties in app/globals.css, which are the
// single source of truth. Values below are the .dark theme.

export const colors = {
  /** Primary background — forest night */
  primaryBg: '#0C100E', // var(--primary-bg) from .dark
  /** Secondary surface — elevated spruce panels */
  secondarySurface: '#161C19', // var(--secondary-surface) from .dark
  /** Pine accent — CTAs, highlights, brand accent */
  accentPine: '#5FC48F', // var(--accent-jade) from .dark
  /** Ember accent — campfire warmth, secondary emphasis */
  accentEmber: '#F0A85A', // var(--accent-gold) from .dark
  /** Primary text — warm off-white */
  primaryText: '#F2F5F1', // var(--primary-text) from .dark
  /** Muted text — sage grey */
  mutedText: '#A7B3A9', // var(--muted-text) from .dark
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
  /** Micro-adjustments for character */
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.04em',
  },
} as const;

export const spacing = {
  section: {
    paddingY: '6rem', // increased vertical presence
    paddingX: '2rem', // more breathing room
  },
  card: {
    padding: '2rem', // expanded for depth
    gap: '2rem',
  },
  grid: {
    gap: '2.5rem',
  },
  container: {
    maxWidth: '1400px', // more generous canvas
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
  /** Noise texture for organic feel */
  noise: 'url("/noise.svg")',
} as const;

export const shadows = {
  /** Vertical offset 4-16px, blur 12-48px, rgba black 20-40% */
  sm: '0 4px 12px rgba(0, 0, 0, 0.2)',
  md: '0 8px 24px rgba(0, 0, 0, 0.3)',
  lg: '0 16px 48px rgba(0, 0, 0, 0.4)',
  /** Layered shadows for physical depth */
  layer1: '0 2px 4px rgba(0, 0, 0, 0.15)',
  layer2: '0 6px 20px rgba(0, 0, 0, 0.25)',
  layer3: '0 12px 40px rgba(0, 0, 0, 0.35)',
  /** Multi-directional shadow for dramatic lift */
  dramatic: '0 20px 60px rgba(0, 0, 0, 0.4), 0 -8px 24px rgba(95, 196, 143, 0.08)',
} as const;

export const gradients = {
  /** Two-color transitions at 5-15% opacity */
  surfaceOverlay: `linear-gradient(135deg, rgba(22, 28, 25, 0.1), rgba(12, 16, 14, 0.05))`,
  accentGlow: `linear-gradient(135deg, rgba(95, 196, 143, 0.1), rgba(95, 196, 143, 0.05))`,
  heroBackground: `linear-gradient(180deg, #0C100E 0%, #161C19 100%)`,
  /** Complex gradient with noise overlay */
  noiseOverlay: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02) 100%)',
  /** Campfire warmth washing up from the base */
  emberUndertone: `linear-gradient(180deg, rgba(240, 168, 90, 0.04) 0%, transparent 100%)`,
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
  /** Micro-interaction timing */
  micro: '150ms ease-out',
} as const;

export const borderRadius = {
  card: '1rem', // rounded-2xl equivalent (16px)
  button: '0.5rem',
  input: '0.5rem',
  full: '9999px',
  /** Asymmetric radius for character */
  asymmetric: '0.75rem 0.75rem 1.5rem 1.5rem',
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

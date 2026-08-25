/**
 /** Design System Tokens
  *
  * Central source of truth for all visual design constants.
  * These tokens drive Tailwind configuration and component styling.
  * 
  * ─── HALLMARK: Tactile Rebellion ───
  * Adding physical depth through layered shadows, uneven edges, and organic textures
  * to break the "template" feel of standard SaaS aesthetics.
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
   /** NEW: Subtle warmth to break digital sterility */
   warmAccent: '#D4A574',
   /** NEW: Cool contrast for depth layers */
   coolDepth: '#0D3D3F',
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
   /** NEW: Micro-adjustments for character */
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
   /** NEW: Noise texture for organic feel */
   noise: 'url("/noise.svg")',
 } as const;

 export const shadows = {
   /** Vertical offset 4-16px, blur 12-48px, rgba black 20-40% */
   sm: '0 4px 12px rgba(0, 0, 0, 0.2)',
   md: '0 8px 24px rgba(0, 0, 0, 0.3)',
   lg: '0 16px 48px rgba(0, 0, 0, 0.4)',
   /** NEW: Layered shadows for physical depth */
   layer1: '0 2px 4px rgba(0, 0, 0, 0.15)',
   layer2: '0 6px 20px rgba(0, 0, 0, 0.25)',
   layer3: '0 12px 40px rgba(0, 0, 0, 0.35)',
   /** NEW: Multi-directional shadow for dramatic lift */
   dramatic: '0 20px 60px rgba(0, 0, 0, 0.4), 0 -8px 24px rgba(20, 184, 166, 0.08)',
 } as const;

 export const gradients = {
   /** Two-color transitions at 5-15% opacity */
   surfaceOverlay: `linear-gradient(135deg, rgba(31, 37, 49, 0.1), rgba(11, 13, 16, 0.05))`,
   accentGlow: `linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))`,
   heroBackground: `linear-gradient(180deg, ${colors.primaryBg} 0%, ${colors.secondarySurface} 100%)`,
   /** NEW: Complex gradient with noise overlay */
   noiseOverlay: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02) 100%)',
   /** NEW: Subtle warm undertone */
   warmUndertone: `linear-gradient(180deg, rgba(212, 165, 116, 0.03) 0%, transparent 100%)`,
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
   /** NEW: Micro-interaction timing */
   micro: '150ms ease-out',
 } as const;

 export const borderRadius = {
   card: '1rem', // rounded-2xl equivalent (16px)
   button: '0.5rem',
   input: '0.5rem',
   full: '9999px',
   /** NEW: Asymmetric radius for character */
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

/** Navigation link used in header, footer, and mobile nav */
export interface NavLink {
  label: string;
  href: string;
}

/** Data for a single feature capability card */
export interface FeatureCardData {
  /** Lucide icon name */
  icon: string;
  title: string;
  /** 1-3 sentences summarizing the capability */
  description: string;
}

/** A single pricing tier */
export interface PricingTier {
  name: string;
  price: number;
  currency: string;
  period: string;
  /** 3-10 feature items */
  features: string[];
  isRecommended: boolean;
  /** Custom badge label; defaults to "Recommended" when isRecommended is true */
  badgeLabel?: string;
  ctaText: string;
  ctaHref: string;
}

/** A methodology topic section */
export interface MethodologyTopic {
  heading: string;
  /** At least 2 sentences */
  description: string;
  /** Lucide icon name */
  icon: string;
}

/** A research source category section */
export interface ResearchCategory {
  heading: string;
  /** At least 1 paragraph */
  description: string;
  /** Lucide icon name */
  icon: string;
  visualType: 'icon' | 'widget' | 'illustration';
}

/** State for the waitlist email capture form */
export interface WaitlistFormState {
  email: string;
  status:
    | 'idle'
    | 'loading'
    | 'success'
    | 'error'
    | 'rate-limited'
    | 'duplicate';
  errorMessage: string | null;
}

/** Result of a validation check */
export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

/** Configuration for the client-side rate limiter */
export interface RateLimiterConfig {
  maxAttempts: number;
  windowMs: number;
}

/** Current state of the rate limiter */
export interface RateLimiterState {
  attempts: number[];
  isBlocked: boolean;
}

/** Page-level SEO metadata */
export interface SiteMetadata {
  /** Max 60 characters */
  title: string;
  /** Max 160 characters */
  description: string;
  /** Max 10 keywords */
  keywords: string[];
  ogImage: string;
  url: string;
}

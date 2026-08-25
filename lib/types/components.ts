/**
 * Component Prop Types
 *
 * TypeScript interfaces for all marketing and UI component props.
 */

import type {
  FeatureCardData,
  PricingTier,
  MethodologyTopic,
  ResearchCategory,
} from './index';

/** Props for the WaitlistForm component */
export interface WaitlistFormProps {
  className?: string;
}

/** Props for the SectionReveal animation wrapper */
export interface SectionRevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms (100-200) */
  delay?: number;
  className?: string;
  /** Intersection Observer threshold (default 0.1) */
  threshold?: number;
}

/** Props for the FeatureCard component */
export interface FeatureCardProps {
  data: FeatureCardData;
  /** Index for stagger delay calculation */
  index: number;
}

/** Props for the PricingCard component */
export interface PricingCardProps {
  data: PricingTier;
  /** Index for stagger delay calculation */
  index: number;
}

/** Props for the MethodologySection component */
export interface MethodologySectionProps {
  data: MethodologyTopic;
  /** Index for stagger delay calculation */
  index: number;
}

/** Props for the ResearchSection component */
export interface ResearchSectionProps {
  data: ResearchCategory;
  /** Index for stagger delay calculation */
  index: number;
}

/** Props for the HeroSection component */
export interface HeroSectionProps {
  className?: string;
}

/** Props for the Header component */
export interface HeaderProps {
  className?: string;
}

/** Props for the Footer component */
export interface FooterProps {
  className?: string;
}

/** Props for the MobileNav component */
export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

import { APP_URL } from '@/lib/config/site';
import type { PricingTier } from '@/lib/types';

const proFeatures: string[] = [
  'Unlimited workout logging',
  'Auto-generated multi-week programs',
  'Muscle Priority System (Emphasize / Grow / Maintain)',
  'Week-over-week progression tracking',
  'In-workout pump & soreness feedback',
  'Personal record detection & history',
  'Quick workouts (no program needed)',
  'Full exercise library',
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'G.R.I.T. Pro — Monthly',
    price: 9.99,
    currency: '$',
    period: 'month',
    features: proFeatures,
    isRecommended: false,
    ctaText: 'Start Free Trial',
    ctaHref: APP_URL,
  },
  {
    name: 'G.R.I.T. Pro — Annual',
    price: 99.99,
    currency: '$',
    period: 'year',
    features: [
      ...proFeatures,
      'Best value — under $10/month',
    ],
    isRecommended: true,
    badgeLabel: 'Best Value',
    ctaText: 'Start Free Trial',
    ctaHref: APP_URL,
  },
];

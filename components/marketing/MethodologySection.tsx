import {
  Dumbbell,
  TrendingUp,
  Activity,
  SlidersHorizontal,
  Moon,
  GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MethodologySectionProps } from '@/lib/types/components';
import { cn } from '@/lib/utils';

/**
 * Icon mapping for methodology topics.
 * Maps Lucide icon name strings to their component references.
 */
const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  TrendingUp,
  Activity,
  SlidersHorizontal,
  Moon,
  GraduationCap,
};

/**
 * MethodologySection — Renders a single methodology topic with heading,
 * description (≥2 sentences), and an icon/visual element.
 *
 * Server component — no client interactivity required.
 *
 * Validates: Requirements 4.2, 4.3, 4.4
 */
export default function MethodologySection({
  data,
  index,
}: MethodologySectionProps) {
  const Icon = iconMap[data.icon];
  const isEven = index % 2 === 0;

  return (
    <section
      className={cn(
        'rounded-2xl border border-white/5 p-6 md:p-8',
        'bg-secondary-surface/50 backdrop-blur-md',
        'shadow-sm transition-colors duration-300 ease-out',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-5 md:flex-row md:items-start md:gap-8',
          !isEven && 'md:flex-row-reverse',
        )}
      >
        {/* Icon / Visual */}
        <div className='flex shrink-0 items-center justify-center rounded-xl border border-white/5 bg-primary-bg/60 p-4'>
          {Icon ? (
            <Icon
              className='h-8 w-8 text-accent-gold'
              aria-hidden='true'
            />
          ) : (
            <div
              className='h-8 w-8 rounded-full bg-accent-gold/20'
              aria-hidden='true'
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 space-y-3'>
          <h3 className='font-heading text-xl font-bold text-primary-text md:text-2xl'>
            {data.heading}
          </h3>
          <p className='text-base leading-relaxed text-muted-text'>
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}

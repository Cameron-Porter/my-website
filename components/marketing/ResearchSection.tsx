import { FileText, File, Video, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ResearchSectionProps } from '@/lib/types/components';
import { cn } from '@/lib/utils';

/**
 * Icon mapping for research categories.
 * Maps Lucide icon name strings to their component references.
 */
const iconMap: Record<string, LucideIcon> = {
  FileText,
  File,
  Video,
  Users,
};

/**
 * ResearchSection — Renders a single research category with heading,
 * descriptive text (≥1 paragraph), and a visual element.
 *
 * The visual element is rendered based on the `visualType` field.
 * For Phase 1, all visual types use the icon representation.
 *
 * Server component — no client interactivity required.
 *
 * Validates: Requirements 6.1, 6.3
 */
export default function ResearchSection({ data }: ResearchSectionProps) {
  const Icon = iconMap[data.icon];

  return (
    <section
      className={cn(
        'rounded-2xl border border-white/5 p-6 md:p-8',
        'bg-secondary-surface/50 backdrop-blur-md',
        'shadow-sm transition-colors duration-300 ease-out',
      )}
    >
      <div className='flex flex-col gap-5 md:flex-row md:items-start md:gap-8'>
        {/* Visual element — uses icon for all visualType values in Phase 1 */}
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

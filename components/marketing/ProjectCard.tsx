import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PersonalProject } from '@/lib/config/personal-site';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project, headingLevel = 2 }: { project: PersonalProject; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className={cn('cut edge flex flex-col border bg-secondary-surface/70 p-6 pl-7', project.featured ? 'border-accent-blaze/60' : 'border-[var(--hairline)]')}>
      <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-accent-blaze'>{project.featured ? 'Featured case study' : project.status}</p>
      <Heading className='mt-5 font-heading text-2xl font-extrabold uppercase text-primary-text'>{project.title}</Heading>
      <p className='mt-3 text-sm leading-6 text-muted-text'>{project.summary}</p>
      <p className='mt-4 text-sm font-semibold text-primary-text'>{project.signal}</p>
      <ul className='mt-5 flex flex-wrap gap-2' aria-label={`${project.title} stack`}>
        {project.stack.map((item) => <li key={item} className='border border-[var(--hairline)] px-2.5 py-1 text-xs text-muted-text'>{item}</li>)}
      </ul>
      <div className='mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6'>
        <Link href={project.href} className='inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent-blaze underline-offset-4 hover:underline'>
          {project.actionLabel} <ArrowRight size={16} aria-hidden='true' />
        </Link>
        {project.appHref && <a href={project.appHref} className='inline-flex min-h-11 items-center text-sm font-bold text-accent-alpine underline-offset-4 hover:underline'>Open GRIT app</a>}
      </div>
    </article>
  );
}

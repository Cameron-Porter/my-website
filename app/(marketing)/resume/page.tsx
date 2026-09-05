import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Milestone } from 'lucide-react';
import { personalSite, resumeSections } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume for Cameron Porter — backend developer, Coast Guard veteran, and TypeScript/Go builder.',
};

type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};

export default function ResumePage() {
  return (
    <section className='mx-auto max-w-[980px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='rounded-[2rem] border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-7 md:p-10'>
        <div className='flex items-center gap-2'>
          <Milestone className='text-accent-ember' size={16} aria-hidden='true' />
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-pine'>Resume</p>
        </div>
        <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text sm:text-5xl'>Cameron Porter</h1>
        <p className='mt-4 max-w-3xl text-lg leading-8 text-muted-text'>
          Backend Software Developer II working primarily in TypeScript and Go. Coast Guard veteran. Christian. Builder of practical systems, clear APIs, training software, and AI-assisted engineering workflows.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a className='inline-flex h-11 items-center gap-2 rounded-full bg-accent-pine px-5 text-sm font-bold text-on-accent transition hover:bg-accent-pine/90' href={personalSite.links.linkedin}>
            LinkedIn <ExternalLink size={15} />
          </a>
          <a className='inline-flex h-11 items-center gap-2 rounded-full border border-accent-pine/40 px-5 text-sm font-semibold text-primary-text transition hover:bg-accent-pine/10' href={personalSite.links.resumeDownload} download>
            Download resume <ExternalLink size={15} />
          </a>
          <Link className='inline-flex h-11 items-center rounded-full border border-black/10 dark:border-white/10 px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href='/projects'>
            Projects
          </Link>
          <Link className='inline-flex h-11 items-center rounded-full border border-black/10 dark:border-white/10 px-5 text-sm font-semibold text-muted-text transition hover:text-primary-text' href='/contact'>
            Contact
          </Link>
        </div>
      </div>

      <div className='mt-8 grid gap-5'>
        {resumeSections.map((section) => (
          <section key={section.id} className='rounded-[1.75rem] border border-black/10 dark:border-white/10 bg-secondary-surface/60 p-6' aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className='font-heading text-2xl font-bold text-primary-text'>{section.title}</h2>
            <ul className='mt-5 space-y-3'>
              {section.items.map((item, idx) => {
                // Check if item is an ExperienceItem object or a string
                if (item && typeof item === 'object' && 'role' in item && 'company' in item) {
                  return (
                    <li key={idx} className='mb-5 ml-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] p-4'>
                      <div className='mb-2 flex flex-col gap-1'>
                        <h3 className='font-heading text-lg font-bold text-primary-text'>{item.role}</h3>
                        <p className='text-sm text-muted-text'>{item.company} · {item.dates}</p>
                      </div>
                      <ul className='ml-5 space-y-2'>
                        {(item as ExperienceItem).bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className='flex gap-3 text-sm leading-6 text-muted-text'>
                            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-pine shadow-[var(--glow-pine-sm)]' />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                // String item (non-experience sections)
                return (
                  <li key={idx} className='flex gap-3 text-sm leading-6 text-muted-text'>
                    <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-pine shadow-[var(--glow-pine-sm)]' />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

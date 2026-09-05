import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
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
      <div className='cut border border-[var(--hairline)] bg-secondary-surface/70 p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Resume</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-primary-text sm:text-5xl'>Cameron Porter</h1>
        <p className='mt-4 max-w-3xl text-lg leading-8 text-muted-text'>
          Backend Software Developer II working primarily in TypeScript and Go. Coast Guard veteran. Christian. Builder of practical systems, clear APIs, training software, and AI-assisted engineering workflows.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a className='inline-flex h-11 items-center gap-2 cut-sm bg-accent-blaze px-5 text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent transition hover:bg-accent-blaze/90' href={personalSite.links.linkedin}>
            LinkedIn <ExternalLink size={15} />
          </a>
          <a className='inline-flex h-11 items-center gap-2 cut-sm border border-accent-blaze/50 px-5 text-sm font-bold uppercase tracking-[0.14em] text-primary-text transition hover:bg-accent-blaze/10' href={personalSite.links.resumeDownload} download>
            Download resume <ExternalLink size={15} />
          </a>
          <Link className='inline-flex h-11 items-center cut-sm border border-[var(--hairline)] px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href='/projects'>
            Projects
          </Link>
          <Link className='inline-flex h-11 items-center cut-sm border border-[var(--hairline)] px-5 text-sm font-semibold text-muted-text transition hover:text-primary-text' href='/contact'>
            Contact
          </Link>
        </div>
      </div>

      <div className='mt-8 grid gap-5'>
        {resumeSections.map((section) => (
          <section key={section.id} className='cut-sm border border-[var(--hairline)] bg-secondary-surface/70 p-6' aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className='font-heading text-2xl font-extrabold uppercase tracking-[-0.01em] text-primary-text'>{section.title}</h2>
            <ul className='mt-5 space-y-3'>
              {section.items.map((item, idx) => {
                // Check if item is an ExperienceItem object or a string
                if (item && typeof item === 'object' && 'role' in item && 'company' in item) {
                  return (
                    <li key={idx} className='mb-5 ml-3 cut-sm edge bg-primary-text/[0.03] pl-5 p-4'>
                      <div className='mb-2 flex flex-col gap-1'>
                        <h3 className='font-heading text-lg font-bold text-primary-text'>{item.role}</h3>
                        <p className='text-sm text-muted-text'>{item.company} · {item.dates}</p>
                      </div>
                      <ul className='ml-5 space-y-2'>
                        {(item as ExperienceItem).bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className='flex gap-3 text-sm leading-6 text-muted-text'>
                            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 cut-sm bg-accent-blaze shadow-[var(--glow-blaze-sm)]' />
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
                    <span className='mt-2 h-2 w-2 shrink-0 cut-sm bg-accent-blaze shadow-[var(--glow-blaze-sm)]' />
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

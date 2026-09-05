import type { Metadata } from 'next';
import { ExternalLink, Mail } from 'lucide-react';
import { personalSite } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Cameron Porter for software, backend, portfolio, and project conversations.',
};

export default function ContactPage() {
  return (
    <section className='mx-auto max-w-[840px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='cut border border-[var(--hairline)] bg-secondary-surface/70 p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Contact</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-primary-text sm:text-5xl'>Let’s build something useful.</h1>
        <p className='mt-5 text-lg leading-8 text-muted-text'>
          The fastest way to reach me is email or LinkedIn. I’m interested in backend systems, product engineering, AI-assisted workflows, and practical tools that help people.
        </p>
        <div className='mt-8 grid gap-3 sm:grid-cols-2'>
          <a className='inline-flex h-12 items-center justify-center gap-2 cut-sm bg-accent-blaze px-5 text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent transition hover:bg-accent-blaze/90' href={personalSite.links.email}>
            <Mail size={16} /> Email Cameron
          </a>
          <a className='inline-flex h-12 items-center justify-center gap-2 cut-sm border border-[var(--hairline)] px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href={personalSite.links.linkedin}>
            LinkedIn <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

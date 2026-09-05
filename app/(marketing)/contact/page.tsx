import type { Metadata } from 'next';
import { ExternalLink, Mail, Milestone } from 'lucide-react';
import { personalSite } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Cameron Porter for software, backend, portfolio, and project conversations.',
};

export default function ContactPage() {
  return (
    <section className='mx-auto max-w-[840px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='rounded-[2rem] border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.045] p-7 md:p-10'>
        <div className='flex items-center gap-2'>
          <Milestone className='text-accent-ember' size={16} aria-hidden='true' />
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-pine'>Contact</p>
        </div>
        <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text sm:text-5xl'>Let’s build something useful.</h1>
        <p className='mt-5 text-lg leading-8 text-muted-text'>
          The fastest way to reach me is email or LinkedIn. I’m interested in backend systems, product engineering, AI-assisted workflows, and practical tools that help people.
        </p>
        <div className='mt-8 grid gap-3 sm:grid-cols-2'>
          <a className='inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-pine px-5 text-sm font-bold text-on-accent transition hover:bg-accent-pine/90' href={personalSite.links.email}>
            <Mail size={16} /> Email Cameron
          </a>
          <a className='inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href={personalSite.links.linkedin}>
            LinkedIn <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Hammer, ScrollText, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Cameron Porter’s lab for AI workflows, software experiments, and small tools from the workbench.',
};

const labCards = [
  { title: 'AI workflow notes', body: 'Patterns for keeping agent work grounded, verified, and useful instead of merely impressive.', icon: Bot },
  { title: 'Builder tools', body: 'Small utilities, automations, and scripts that make daily software work smoother.', icon: Hammer },
  { title: 'Field notes', body: 'Short writeups on backend systems, product decisions, training software, and learning loops.', icon: ScrollText },
];

export default function LabPage() {
  return (
    <section className='mx-auto max-w-[1080px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_32%),rgba(255,255,255,0.045)] p-7 md:p-10'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>The lab</p>
        <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text sm:text-5xl'>A jade-lit corner for experiments.</h1>
        <p className='mt-5 max-w-3xl text-lg leading-8 text-muted-text'>
          This is the fun side of the site: AI workflows, tiny tools, notes from the software dojo, and experiments that are useful enough to keep around.
        </p>
      </div>

      <div className='mt-10 grid gap-5 md:grid-cols-3'>
        {labCards.map(({ title, body, icon: Icon }) => (
          <article key={title} className='rounded-[1.75rem] border border-white/10 bg-secondary-surface/60 p-6'>
            <Icon className='text-accent-jade' size={24} aria-hidden='true' />
            <h2 className='mt-5 text-xl font-bold text-primary-text'>{title}</h2>
            <p className='mt-3 text-sm leading-6 text-muted-text'>{body}</p>
          </article>
        ))}
      </div>

      <div className='mt-10 rounded-[1.75rem] border border-accent-gold/20 bg-accent-jade/[0.06] p-6'>
        <Sparkles className='text-accent-jade' aria-hidden='true' />
        <h2 className='mt-4 text-2xl font-bold text-primary-text'>Coming next</h2>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-muted-text'>
          A small interactive command-palette style playground would fit here: a resume explorer, project map, or “ask the workshop” static demo without needing a production AI backend yet.
        </p>
        <Link className='mt-5 inline-flex h-11 items-center rounded-full border border-white/10 px-5 text-sm font-semibold text-primary-text transition hover:bg-white/10' href='/contact'>
          Send an idea
        </Link>
      </div>
    </section>
  );
}

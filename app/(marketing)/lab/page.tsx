import type { Metadata } from 'next';
import Link from 'next/link';
import { AlarmClock, Bot, Code2, ScrollText, Sparkles, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Cameron Porter’s lab for Hermes, his personal AI workflow system, plus software experiments and notes from the workbench.',
};

const hermesRoles = [
  {
    title: 'Personal assistant',
    body: 'Triages email and turns loose intentions into tracked, dated goals instead of open tabs.',
    icon: AlarmClock,
  },
  {
    title: 'Pair programmer',
    body: 'Reviews diffs before they ship, flags risk, and helps write and tighten tests.',
    icon: Code2,
  },
  {
    title: 'Ops loop',
    body: 'Reads through logs, spots recurring issues, and drafts action tasks so problems don’t sit unnoticed.',
    icon: ScrollText,
  },
];

export default function LabPage() {
  return (
    <section className='mx-auto max-w-[1080px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='rounded-[2rem] border border-black/10 dark:border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_32%),rgba(0,0,0,0.02)] dark:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_32%),rgba(255,255,255,0.045)] p-7 md:p-10'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>The lab</p>
        <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text sm:text-5xl'>A jade-lit corner for experiments.</h1>
        <p className='mt-5 max-w-3xl text-lg leading-8 text-muted-text'>
          This is where I keep active practice with AI-assisted engineering — most of it running through Hermes, a personal workflow system I built and use daily rather than a demo I built once.
        </p>
      </div>

      <div className='mt-10 rounded-[1.75rem] border border-accent-gold/20 bg-accent-jade/[0.06] p-6 md:p-8'>
        <Workflow className='text-accent-jade' aria-hidden='true' />
        <h2 className='mt-4 text-2xl font-bold text-primary-text'>Hermes, in daily use</h2>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-muted-text'>
          Hermes is my human-in-the-loop AI setup: durable skills, verification steps, and agent orchestration patterns, applied to real work instead of toy problems. Three ways it earns a place in my day:
        </p>
        <div className='mt-6 grid gap-5 sm:grid-cols-3'>
          {hermesRoles.map(({ title, body, icon: Icon }) => (
            <div key={title}>
              <Icon className='text-accent-gold' size={22} aria-hidden='true' />
              <h3 className='mt-3 text-base font-bold text-primary-text'>{title}</h3>
              <p className='mt-2 text-sm leading-6 text-muted-text'>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 rounded-[1.75rem] border border-black/10 dark:border-white/10 bg-secondary-surface/60 p-6'>
        <Bot className='text-accent-jade' size={24} aria-hidden='true' />
        <h2 className='mt-5 text-xl font-bold text-primary-text'>What I’m learning</h2>
        <p className='mt-3 text-sm leading-6 text-muted-text'>
          The interesting part isn’t the automation, it’s the guardrails: when to trust an agent’s output, when to require verification before it acts, and how to keep a system that touches email, code, and logs from becoming a black box.
        </p>
      </div>

    </section>
  );
}

import type { Metadata } from 'next';
import { AlarmClock, Bot, Code2, ScrollText, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garage',
  description: 'Cameron Porter’s garage for Hermes, his personal AI workflow system, plus software experiments and notes from the bench.',
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
      <div className='cut border border-[var(--hairline)] bg-[image:var(--wash-alpine-corner)] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>The garage</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-primary-text sm:text-5xl'>A bench for AI-assisted engineering.</h1>
        <p className='mt-5 max-w-3xl text-lg leading-8 text-muted-text'>
          This is where I keep active practice with AI-assisted engineering; most of it running through Hermes, a personal workflow system I leverage and use daily.
        </p>
      </div>

      <div className='mt-10 cut-sm edge border border-[var(--hairline)] bg-accent-blaze/[0.06] p-6 md:p-8'>
        <Workflow className='text-accent-blaze' aria-hidden='true' />
        <h2 className='mt-4 text-2xl font-bold text-primary-text'>Hermes, in daily use</h2>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-muted-text'>
          Hermes is my human-in-the-loop AI setup: durable skills, verification steps, and agent orchestration patterns, applied to real work instead of toy problems. Three ways it earns a place in my day:
        </p>
        <div className='mt-6 grid gap-5 sm:grid-cols-3'>
          {hermesRoles.map(({ title, body, icon: Icon }) => (
            <div key={title}>
              <Icon className='text-accent-alpine' size={22} aria-hidden='true' />
              <h3 className='mt-3 text-base font-bold text-primary-text'>{title}</h3>
              <p className='mt-2 text-sm leading-6 text-muted-text'>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 cut-sm border border-[var(--hairline)] bg-secondary-surface/70 p-6'>
        <Bot className='text-accent-blaze' size={24} aria-hidden='true' />
        <h2 className='mt-5 text-xl font-bold text-primary-text'>What I’m learning</h2>
        <p className='mt-3 text-sm leading-6 text-muted-text'>
          The interesting part isn’t the automation, it’s the guardrails: when to trust an agent’s output, when to require verification before it acts, and how to keep a system that touches email, code, and logs from becoming a black box.
        </p>
      </div>

    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Dumbbell, ShieldCheck, Smartphone } from 'lucide-react';
import { personalSite } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'G.R.I.T. Project',
  description: 'A rewritten project case study for G.R.I.T., Cameron Porter’s hypertrophy training app and PWA.',
};

const decisions = [
  {
    title: 'Rules first, AI second',
    body: 'Training science decisions live in deterministic code and tests. AI can suggest exercise choices and explanations, but it does not own sets, reps, progression, or safety boundaries.',
    icon: ShieldCheck,
  },
  {
    title: 'Native parity matters',
    body: 'The PWA is being shaped to feel like the native app, not a generic web dashboard. Useful web advantages are welcome, visual drift is not.',
    icon: Smartphone,
  },
  {
    title: 'Training data should teach',
    body: 'Workout logs, PRs, soreness, and volume are most valuable when they turn into understandable feedback instead of raw numbers alone.',
    icon: Dumbbell,
  },
  {
    title: 'Future trainer, trusted boundary',
    body: 'A future AI trainer should explain, coach, and propose, then wait for confirmation before changing anything important.',
    icon: BrainCircuit,
  },
];

export default function GritProjectPage() {
  return (
    <article className='mx-auto max-w-[1100px] px-5 py-16 sm:px-6 md:py-24'>
      <header className='cut border border-[var(--hairline)] bg-[image:var(--wash-drop)] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Featured project</p>
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-primary-text sm:text-6xl'>G.R.I.T.</h1>
        <p className='mt-5 max-w-3xl text-lg leading-8 text-muted-text'>
          A hypertrophy training product built around practical lifting, deterministic programming rules, workout logging, and careful AI boundaries. It is where fitness, product craft, and backend discipline meet.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a className='inline-flex h-11 items-center gap-2 cut-sm bg-accent-blaze px-5 text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent transition hover:bg-accent-blaze/90' href={personalSite.links.grit}>
            Open app <ArrowRight size={16} />
          </a>
          <Link className='inline-flex h-11 items-center cut-sm border border-[var(--hairline)] px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href='/projects'>
            Back to projects
          </Link>
        </div>
      </header>

      <section className='grid gap-6 py-12 md:grid-cols-3'>
        <Metric label='Product type' value='Training PWA + native app' />
        <Metric label='Core stack' value='Next.js · TypeScript · Supabase' />
        <Metric label='Engineering theme' value='Rules engine + trusted AI boundary' />
      </section>

      <section className='cut border border-[var(--hairline)] bg-black/[0.02] dark:bg-white/[0.04] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>The problem</p>
        <h2 className='mt-3 font-heading text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-primary-text'>Most workout apps either log too little or decide too much.</h2>
        <p className='mt-5 text-base leading-8 text-muted-text'>
          G.R.I.T. is built for the middle path: a focused hypertrophy workflow that helps lifters plan, log, and progress without burying them under clutter. The important training decisions stay explicit, tested, and reviewable.
        </p>
      </section>

      <section className='mt-8 grid gap-5 md:grid-cols-2'>
        {decisions.map(({ title, body, icon: Icon }) => (
          <article key={title} className='cut-sm border border-[var(--hairline)] bg-secondary-surface/60 p-6'>
            <Icon className='text-accent-blaze' size={24} aria-hidden='true' />
            <h3 className='mt-5 text-xl font-bold text-primary-text'>{title}</h3>
            <p className='mt-3 text-sm leading-6 text-muted-text'>{body}</p>
          </article>
        ))}
      </section>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className='cut-sm border border-[var(--hairline)] bg-black/[0.02] dark:bg-white/[0.04] p-5'>
      <p className='text-xs font-extrabold uppercase tracking-[0.24em] text-accent-blaze'>{label}</p>
      <p className='mt-3 text-lg font-semibold text-primary-text'>{value}</p>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ContactLink from '@/components/analytics/ContactLink';
import { personalSite } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'G.R.I.T. Project',
  description: 'Inside GRIT: deterministic training rules, validated AI exercise selection, and atomic program persistence in a Next.js PWA.',
};

const generationFlow = [
  { title: 'Authenticated request', detail: 'A Next.js route checks the session and builds the prompt server-side. The model key stays on the server.' },
  { title: 'Deterministic prescription', detail: 'Pure TypeScript rules build the program and fix the slots, sets, rep ranges, and target effort.' },
  { title: 'Constrained selection', detail: 'Gemini receives locked slots and an exercise catalog, and proposes exercise choices with short rationales.' },
  { title: 'Review and validate', detail: 'At save time, the server rebuilds prescriptions and validates choices against the current catalog before writing.' },
  { title: 'Atomic persistence', detail: 'One database RPC saves the program, days, template exercises, and targets as a transaction.' },
];

const tradeoffs = [
  { title: 'Rules over free-form prescriptions', body: 'An explicit rules engine takes more work to maintain than a single prompt. In return, its prescriptions can be inspected and tested independently of a model response.' },
  { title: 'A smaller job for the model', body: 'Exercise selection benefits from context; numeric training prescriptions need stable boundaries. The model proposes choices, while application code owns validation and saving.' },
  { title: 'A transaction over cleanup code', body: 'Related program rows belong together. A database transaction avoids depending on a series of best-effort deletes after a partial save, at the cost of maintaining the RPC alongside the application.' },
];

export default function GritProjectPage() {
  return (
    <article className='mx-auto max-w-[1100px] px-5 py-16 sm:px-6 md:py-24'>
      <header className='cut border border-[var(--hairline)] bg-[image:var(--wash-drop)] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Featured project</p>
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-primary-text sm:text-6xl'>G.R.I.T.</h1>
        <p className='mt-5 max-w-3xl text-lg leading-8 text-muted-text'>
          Training software that keeps prescriptions in code, not in a prompt. GRIT is a Next.js PWA for planning, logging, and progressing resistance training, with AI constrained to exercise selection.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a className='inline-flex h-11 items-center gap-2 cut-sm bg-accent-blaze px-5 text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent transition hover:bg-accent-blaze/90' href={personalSite.links.grit}>
            Open GRIT app <ArrowRight size={16} aria-hidden='true' />
          </a>
          <Link className='inline-flex h-11 items-center cut-sm border border-[var(--hairline)] px-5 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href='/projects'>
            Back to projects
          </Link>
        </div>
      </header>

      <section className='grid gap-6 py-12 md:grid-cols-3'>
        <Metric label='Product type' value='Installable training PWA' />
        <Metric label='Core stack' value='Next.js · TypeScript · Supabase' />
        <Metric label='Engineering theme' value='Deterministic core + validated AI' />
      </section>

      <section className='cut border border-[var(--hairline)] bg-black/[0.02] dark:bg-white/[0.04] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>The problem</p>
        <h2 className='mt-3 font-heading text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-primary-text'>Useful guidance without an opaque prescription.</h2>
        <p className='mt-5 text-base leading-8 text-muted-text'>
          A workout log records what happened; a training plan also needs to explain what happens next. I wanted a product where the rules behind sets, reps, and progression remain explicit and reviewable, while exercise choices can use the lifter’s context.
        </p>
      </section>

      <section className='mt-12' aria-labelledby='success-heading'>
        <h2 id='success-heading' className='font-heading text-2xl font-bold uppercase text-primary-text'>Success criteria — goals, not results</h2>
        <ul className='mt-5 list-disc space-y-3 pl-5 leading-7 text-muted-text'>
          <li>Make numeric prescriptions reproducible from typed program settings.</li>
          <li>Reject incomplete or mismatched AI exercise selections before saving.</li>
          <li>Keep program persistence all-or-nothing and failures visible to the lifter.</li>
        </ul>
      </section>

      <section className='mt-12' aria-labelledby='boundary-heading'>
        <h2 id='boundary-heading' className='font-heading text-2xl font-bold uppercase text-primary-text'>Deterministic core, bounded AI</h2>
        <p className='mt-5 leading-8 text-muted-text'>The rules engine is pure TypeScript. The AI adapter calls it to build the base program before asking the model to fill exercise slots. Prompt data is explicitly marked as untrusted context, rather than allowed to override the slot instructions.</p>
        <div className='mt-6 grid gap-5 md:grid-cols-2'>
          <div className='cut-sm edge border border-[var(--hairline)] bg-secondary-surface/70 p-6'>
            <h3 className='text-xl font-bold text-primary-text'>Validate the choice, not the confidence</h3>
            <p className='mt-4 text-sm leading-7 text-muted-text'><code className='break-all text-accent-alpine'>validateAiSelection</code> checks catalog membership, muscle-slot matches, missing or duplicate selections, and rationale length. A fluent explanation does not make an invalid selection acceptable.</p>
          </div>
          <div className='cut-sm edge border border-[var(--hairline)] bg-secondary-surface/70 p-6'>
            <h3 className='text-xl font-bold text-primary-text'>Save the whole program</h3>
            <p className='mt-4 text-sm leading-7 text-muted-text'>The save adapter calls <code className='break-all text-accent-alpine'>save_ai_program</code> and rejects database errors or a mismatched returned program ID. The server builds saved prescriptions from the rules engine, not model-provided training numbers.</p>
          </div>
        </div>
      </section>

      <section className='mt-12' aria-labelledby='architecture-heading'>
        <h2 id='architecture-heading' className='font-heading text-2xl font-bold uppercase text-primary-text'>Architecture — design view</h2>
        <figure className='mt-6 border border-[var(--hairline)] bg-secondary-surface/60 p-6 md:p-8' aria-label='GRIT program generation flow'>
          <ol className='grid gap-4'>
            {generationFlow.map((step, index) => (
              <li key={step.title} className='grid gap-3 border-l-2 border-accent-blaze pl-4 sm:grid-cols-[2rem_1fr]'>
                <span aria-hidden='true' className='font-mono font-bold text-accent-alpine'>0{index + 1}</span>
                <div><h3 className='font-bold text-primary-text'>{step.title}</h3><p className='mt-2 text-sm leading-7 text-muted-text'>{step.detail}</p></div>
              </li>
            ))}
          </ol>
          <figcaption className='mt-6 border-t border-[var(--hairline)] pt-4 text-sm leading-6 text-muted-text'>A conceptual generation-to-save flow, not a production topology. Review separates the model request from the later save action.</figcaption>
        </figure>
      </section>

      <section className='mt-12' aria-labelledby='tradeoffs-heading'>
        <h2 id='tradeoffs-heading' className='font-heading text-2xl font-bold uppercase text-primary-text'>Tradeoffs</h2>
        <div className='mt-6 grid gap-5 md:grid-cols-3'>
          {tradeoffs.map(({ title, body }) => <section key={title} className='cut-sm border border-[var(--hairline)] p-6'><h3 className='text-lg font-bold text-primary-text'>{title}</h3><p className='mt-4 text-sm leading-7 text-muted-text'>{body}</p></section>)}
        </div>
      </section>

      <section className='mt-12 grid gap-8 md:grid-cols-2'>
        <div><h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Current scope and limits</h2><p className='mt-4 leading-7 text-muted-text'>The implemented boundaries and their tests are engineering evidence, not evidence of improved training outcomes. This case study is based on the implementation, not live deployment verification. No adoption, model-quality, latency, or cost benchmark is claimed here.</p></div>
        <div><h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Next iteration</h2><p className='mt-4 leading-7 text-muted-text'>I would make the boundary easier to evaluate: publish a repeatable selection-evaluation set, capture cost and latency under a defined workload, and document failure and fallback behavior with a recorded walkthrough.</p></div>
      </section>

      <section className='mt-12 border-t border-[var(--hairline)] pt-8'>
        <h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Ownership and collaboration</h2>
        <p className='mt-4 max-w-3xl leading-8 text-muted-text'>I own the product direction, engineering decisions, and acceptance criteria. AI assists with implementation and review; it does not replace my responsibility to understand the changes and verify them.</p>
        <Link href='/how-i-build' className='mt-4 inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>How I build with AI</Link>
      </section>

      <aside className='mt-12 cut border border-accent-blaze/40 bg-secondary-surface/70 p-7 md:p-10' aria-label='Discuss this work'>
        <h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Looking for this kind of engineering?</h2>
        <p className='mt-4 leading-7 text-muted-text'>I’m happy to walk through the boundaries, tradeoffs, and what I would improve next.</p>
        <div className='mt-5 flex flex-wrap gap-6'>
          <Link href='/recruiters' className='inline-flex min-h-11 items-center font-bold text-accent-blaze underline-offset-4 hover:underline'>For recruiters</Link>
          <ContactLink method='email' location='grit_case_study' href={personalSite.links.email} className='inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>Email Cameron</ContactLink>
        </div>
      </aside>
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

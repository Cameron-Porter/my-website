import Link from 'next/link';
import { ArrowRight, Code2, Gauge, Handshake, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { personalSite, projects, resumeSections } from '@/lib/config/personal-site';

const ridingCode = [
  { title: 'Service before software', body: 'The best systems help real people do meaningful work with less friction.', icon: Handshake },
  { title: 'Clarity compounds', body: 'Readable code, obvious boundaries, and honest docs are force multipliers.', icon: Sparkles },
  { title: 'Commit to the line', body: 'A focused tool that does the right thing beats a flashy tool that does too much.', icon: ShieldCheck },
  { title: 'The garage stays open', body: 'AI, product craft, training data, and better developer workflows are all on the bench.', icon: Terminal },
];

/** Figures pulled from the experience section — the numbers do the talking. */
const runStats = [
  { figure: '$5M', label: 'New income unlocked', detail: 'Third-party vendor payment integration, projected to also save $3M over four years' },
  { figure: '3,400%', label: 'Faster processing', detail: 'Commitment and payment upsert redesign, Compassion International' },
  { figure: '6M+', label: 'Records, idempotent', detail: 'Event-driven AWS Lambda / SNS / SQS payment pipeline' },
];

export default function HomePage() {
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[image:var(--wash-ridge)]' />

      <section className='mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end'>
        <div>
          <p className='text-[clamp(0.6rem,2.4vw,0.8rem)] font-bold uppercase tracking-[0.32em] text-accent-blaze'>
            {personalSite.hero.kicker}
          </p>
          <div className='rule-speed mt-4 w-28' aria-hidden='true' />
          <h1 className='mt-6 max-w-4xl font-heading text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-primary-text'>
            {personalSite.hero.headline}
          </h1>
          <p className='mt-7 max-w-2xl text-lg leading-8 text-muted-text'>
            {personalSite.hero.body}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <Link
              className='cut-sm inline-flex h-12 items-center justify-center gap-2 bg-accent-blaze px-7 text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent shadow-[var(--glow-blaze)] transition hover:brightness-110'
              href='/projects'
            >
              Drop in <ArrowRight size={16} />
            </Link>
            <Link
              className='cut-sm inline-flex h-12 items-center justify-center border border-[var(--hairline)] bg-primary-text/[0.04] px-7 text-sm font-bold uppercase tracking-[0.14em] text-primary-text transition hover:border-accent-blaze/50'
              href='/resume'
            >
              Read the resume
            </Link>
            <a
              className='inline-flex h-12 items-center justify-center px-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-text underline-offset-8 transition hover:text-accent-alpine hover:underline'
              href={personalSite.links.linkedin}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <aside className='cut edge border border-[var(--hairline)] bg-secondary-surface p-6 pl-7'>
          <div className='flex items-center justify-between gap-4'>
            <p className='text-xs font-extrabold uppercase tracking-[0.28em] text-accent-blaze'>Ride log</p>
            <Gauge className='text-accent-alpine' size={20} aria-hidden='true' />
          </div>
          <ul className='mt-5 space-y-4 text-sm leading-6 text-muted-text'>
            <li><strong className='text-primary-text'>Compassion International:</strong> backend software with TypeScript and Go.</li>
            <li><strong className='text-primary-text'>G.R.I.T.:</strong> a serious training app with deterministic rules and careful AI boundaries.</li>
            <li><strong className='text-primary-text'>Next chapter:</strong> M.S. Software Engineering, AI concentration.</li>
          </ul>
        </aside>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 sm:px-6' aria-labelledby='numbers-heading'>
        <h2 id='numbers-heading' className='sr-only'>Results by the numbers</h2>
        <div className='grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-3'>
          {runStats.map(({ figure, label, detail }) => (
            <div key={label} className='bg-primary-bg p-7'>
              <p className='stat font-heading text-[clamp(2.75rem,6vw,4rem)] font-extrabold text-accent-blaze'>{figure}</p>
              <p className='mt-3 text-sm font-extrabold uppercase tracking-[0.2em] text-primary-text'>{label}</p>
              <p className='mt-2 text-sm leading-6 text-muted-text'>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6 md:py-20' aria-labelledby='riding-code-heading'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Rules of the line</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h2 id='riding-code-heading' className='mt-6 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-primary-text sm:text-4xl'>
          How I pick a line.
        </h2>
        <div className='mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4'>
          {ridingCode.map(({ title, body, icon: Icon }) => (
            <article
              key={title}
              className='cut-sm edge border border-[var(--hairline)] bg-secondary-surface/70 p-6 pl-7 transition hover:bg-secondary-surface'
            >
              <Icon className='text-accent-alpine' size={22} aria-hidden='true' />
              <h3 className='mt-5 text-base font-extrabold uppercase tracking-[0.06em] text-primary-text'>{title}</h3>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6' aria-labelledby='projects-heading'>
        <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Selected work</p>
            <div className='rule-speed mt-4 w-20' aria-hidden='true' />
            <h2 id='projects-heading' className='mt-6 font-heading text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-primary-text sm:text-4xl'>
              Projects with a point of view.
            </h2>
          </div>
          <Link className='inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-accent-alpine underline-offset-8 hover:underline' href='/projects'>
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className='mt-10 grid gap-5 lg:grid-cols-3'>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.href}
              className='cut edge group border border-[var(--hairline)] bg-secondary-surface/70 p-6 pl-7 transition hover:-translate-y-1 hover:bg-secondary-surface'
            >
              <span className='inline-block border border-accent-blaze/40 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-accent-blaze'>
                {project.status}
              </span>
              <h3 className='mt-5 font-heading text-2xl font-extrabold uppercase tracking-[-0.01em] text-primary-text'>{project.title}</h3>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{project.summary}</p>
              <div className='mt-5 flex flex-wrap gap-2'>
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className='border border-[var(--hairline)] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-text'>
                    {item}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6'>
        <div className='cut grid gap-6 border border-[var(--hairline)] bg-[image:var(--wash-drop)] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10'>
          <div>
            <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Resume signal</p>
            <div className='rule-speed mt-4 w-20' aria-hidden='true' />
            <h2 className='mt-6 font-heading text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-primary-text'>
              Backend, service, product craft.
            </h2>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            {resumeSections.slice(1, 5).map((section) => {
              const firstItem = section.items[0];
              let previewText = '';
              if (typeof firstItem === 'string') {
                previewText = firstItem;
              } else if (
                firstItem &&
                'bullets' in firstItem &&
                Array.isArray(firstItem.bullets) &&
                firstItem.bullets.length > 0
              ) {
                previewText = firstItem.bullets[0] ?? '';
              }

              return (
                <Link key={section.id} href='/resume' className='cut-sm border border-[var(--hairline)] bg-primary-bg/70 p-4 transition hover:border-accent-blaze/50'>
                  <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-primary-text'>{section.title}</p>
                  {previewText ? (
                    <p className='mt-2 text-xs leading-5 text-muted-text'>{previewText}</p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 pb-20 sm:px-6'>
        <div className='cut-bl border border-[var(--hairline)] bg-secondary-surface/70 p-10 text-center'>
          <Code2 className='mx-auto text-accent-blaze' aria-hidden='true' />
          <h2 className='mt-5 font-heading text-3xl font-extrabold uppercase tracking-[-0.02em] text-primary-text'>The garage is open.</h2>
          <p className='mx-auto mt-4 max-w-2xl text-muted-text'>
            Experiments, tool notes, AI workflows, and small interactive ideas live in the garage; the bench where things get taken apart.
          </p>
          <Link
            className='cut-sm mt-7 inline-flex h-12 items-center justify-center border border-accent-blaze/50 px-7 text-sm font-extrabold uppercase tracking-[0.14em] text-accent-blaze transition hover:bg-accent-blaze hover:text-on-accent'
            href='/lab'
          >
            Into the garage
          </Link>
        </div>
      </section>
    </div>
  );
}

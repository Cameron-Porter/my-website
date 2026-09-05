import Link from 'next/link';
import { ArrowRight, Code2, FlameKindling, Handshake, Milestone, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { personalSite, projects, resumeSections } from '@/lib/config/personal-site';


const trailCode = [
  { title: 'Service before software', body: 'The best systems help real people do meaningful work with less friction.', icon: Handshake },
  { title: 'Clarity compounds', body: 'Readable code, obvious boundaries, and honest docs are force multipliers.', icon: Sparkles },
  { title: 'Build with restraint', body: 'A focused tool that does the right thing beats a flashy tool that does too much.', icon: ShieldCheck },
  { title: 'The workshop stays open', body: 'AI, product craft, training data, and better developer workflows are all on the workbench.', icon: Terminal },
];

export default function HomePage() {
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[image:var(--wash-trailhead)]' />
      <div className='pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-accent-gold/10 bg-accent-jade/[0.03] blur-3xl' />

      <section className='mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-end'>
        <div>
          <p className='whitespace-nowrap text-[clamp(0.5rem,2.75vw,1rem)] font-semibold uppercase tracking-[0.12em] text-accent-jade'>
            {personalSite.hero.kicker}
          </p>
          <h1 className='mt-5 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-primary-text sm:text-5xl lg:text-5xl xl:text-6xl'>
            {personalSite.hero.headline}
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-text'>
            {personalSite.hero.body}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <Link className='inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-jade px-6 text-sm font-bold text-on-accent shadow-[var(--glow-pine)] transition hover:bg-accent-jade/90' href='/projects'>
              Hit the trail <ArrowRight size={16} />
            </Link>
            <Link className='inline-flex h-12 items-center justify-center rounded-full border border-black/12 dark:border-white/12 bg-black/5 dark:bg-white/5 px-6 text-sm font-semibold text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href='/resume'>
              Read the resume
            </Link>
            <a className='inline-flex h-12 items-center justify-center rounded-full border border-black/12 dark:border-white/12 px-6 text-sm font-semibold text-muted-text transition hover:text-primary-text' href={personalSite.links.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>

        <aside className='rounded-[2rem] border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] p-6 shadow-[var(--glow-ember)] backdrop-blur-md'>
          <div className='rounded-[1.5rem] border border-accent-gold/20 bg-primary-bg/80 p-5'>
            <div className='flex items-center justify-between gap-4'>
              <p className='text-xs font-bold uppercase tracking-[0.28em] text-accent-jade'>Trail log</p>
              <FlameKindling className='text-accent-gold' size={20} aria-hidden='true' />
            </div>
            <ul className='mt-5 space-y-4 text-sm leading-6 text-muted-text'>
              <li><strong className='text-primary-text'>Compassion International:</strong> backend software with TypeScript and Go.</li>
              <li><strong className='text-primary-text'>G.R.I.T.:</strong> a serious training app with deterministic rules and careful AI boundaries.</li>
              <li><strong className='text-primary-text'>Next chapter:</strong> M.S. Software Development with an AI specialization.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-12 sm:px-6' aria-labelledby='trail-code-heading'>
        <div className='flex items-center gap-2'>
          <Milestone className='text-accent-gold' size={18} aria-hidden='true' />
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>Trail code</p>
        </div>
        <h2 id='trail-code-heading' className='mt-3 font-heading text-3xl font-extrabold text-primary-text sm:text-4xl'>
          How I move through the woods.
        </h2>
        <div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {trailCode.map(({ title, body, icon: Icon }) => (
            <article key={title} className='rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-6 transition hover:border-accent-gold/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'>
              <Icon className='text-accent-jade' size={22} aria-hidden='true' />
              <h3 className='mt-5 text-lg font-bold text-primary-text'>{title}</h3>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6' aria-labelledby='projects-heading'>
        <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <Milestone className='text-accent-gold' size={16} aria-hidden='true' />
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>Selected work</p>
            </div>
            <h2 id='projects-heading' className='mt-3 font-heading text-3xl font-extrabold text-primary-text sm:text-4xl'>
              Projects with a point of view.
            </h2>
          </div>
          <Link className='inline-flex items-center gap-2 text-sm font-semibold text-accent-jade hover:text-primary-text' href='/projects'>
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className='mt-10 grid gap-5 lg:grid-cols-3'>
          {projects.map((project) => (
            <Link key={project.slug} href={project.href} className='group rounded-[1.75rem] border border-black/10 dark:border-white/10 bg-secondary-surface/60 p-6 transition hover:-translate-y-1 hover:border-accent-gold/30 hover:bg-secondary-surface'>
              <span className='patch inline-block rounded-full border border-accent-jade/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.26em] text-accent-jade'>{project.status}</span>
              <h3 className='mt-4 text-2xl font-bold text-primary-text'>{project.title}</h3>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{project.summary}</p>
              <div className='mt-5 flex flex-wrap gap-2'>
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className='patch rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-muted-text'>{item}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6'>
        <div className='grid gap-6 rounded-[2rem] border border-black/10 dark:border-white/10 bg-[image:var(--wash-camp)] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10'>
          <div>
            <div className='flex items-center gap-2'>
              <Milestone className='text-accent-gold' size={16} aria-hidden='true' />
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>Resume signal</p>
            </div>
            <h2 className='mt-3 font-heading text-3xl font-extrabold text-primary-text'>Backend, service, product craft.</h2>
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
                <Link key={section.id} href='/resume' className='rounded-2xl border border-black/10 dark:border-white/10 bg-primary-bg/50 p-4 transition hover:bg-primary-bg/70'>
                  <p className='text-sm font-bold text-primary-text'>{section.title}</p>
                  {previewText ? (
                    <p className='mt-2 text-xs leading-5 text-muted-text'>{previewText}</p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6'>
        <div className='rounded-[2rem] border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-8 text-center'>
          <Code2 className='mx-auto text-accent-jade' aria-hidden='true' />
          <h2 className='mt-4 font-heading text-3xl font-extrabold text-primary-text'>The workshop is open.</h2>
          <p className='mx-auto mt-3 max-w-2xl text-muted-text'>
            Experiments, tool notes, AI workflows, and small interactive ideas live in the workshop; the workbench corner of camp.
          </p>
          <Link className='mt-6 inline-flex h-12 items-center justify-center rounded-full border border-accent-jade/30 px-6 text-sm font-semibold text-accent-jade transition hover:bg-accent-jade/10' href='/lab'>
            Visit the workshop
          </Link>
        </div>
      </section>
    </div>
  );
}

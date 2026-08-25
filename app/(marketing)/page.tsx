import Link from 'next/link';
import { ArrowRight, Code2, FlameKindling, Handshake, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { personalSite, projects, resumeSections } from '@/lib/config/personal-site';


const principles = [
  { title: 'Service before software', body: 'The best systems help real people do meaningful work with less friction.', icon: Handshake },
  { title: 'Clarity compounds', body: 'Readable code, obvious boundaries, and honest docs are force multipliers.', icon: Sparkles },
  { title: 'Build with restraint', body: 'A focused tool that does the right thing beats a flashy tool that does too much.', icon: ShieldCheck },
  { title: 'The lab stays open', body: 'AI, product craft, training data, and better developer workflows are all on the workbench.', icon: Terminal },
];

export default function HomePage() {
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.24),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.16),transparent_28%),linear-gradient(180deg,#0B0D10_0%,#0F141B_55%,#0B0D10_100%)]' />
      <div className='pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-accent-gold/10 bg-accent-jade/[0.03] blur-3xl' />

      <section className='mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.32em] text-accent-jade'>
            {personalSite.hero.kicker}
          </p>
          <h1 className='mt-5 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-primary-text sm:text-5xl lg:text-7xl'>
            {personalSite.hero.headline}
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-text'>
            {personalSite.hero.body}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <Link className='inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-jade px-6 text-sm font-bold text-primary-bg shadow-[0_0_36px_rgba(20,184,166,0.28)] transition hover:bg-accent-jade/90' href='/projects'>
              Enter the project dojo <ArrowRight size={16} />
            </Link>
            <Link className='inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 text-sm font-semibold text-primary-text transition hover:bg-white/10' href='/resume'>
              Read the resume
            </Link>
            <a className='inline-flex h-12 items-center justify-center rounded-full border border-white/12 px-6 text-sm font-semibold text-muted-text transition hover:text-primary-text' href={personalSite.links.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>

        <aside className='rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_0_80px_rgba(245,158,11,0.08)] backdrop-blur-md'>
          <div className='rounded-[1.5rem] border border-accent-gold/20 bg-primary-bg/80 p-5'>
            <div className='flex items-center justify-between gap-4'>
              <p className='text-xs font-bold uppercase tracking-[0.28em] text-accent-jade'>Now building</p>
              <FlameKindling className='text-amber-300' size={20} aria-hidden='true' />
            </div>
            <ul className='mt-5 space-y-4 text-sm leading-6 text-muted-text'>
              <li><strong className='text-primary-text'>Compassion International:</strong> backend software with TypeScript and Go.</li>
              <li><strong className='text-primary-text'>G.R.I.T.:</strong> a serious training app with deterministic rules and careful AI boundaries.</li>
              <li><strong className='text-primary-text'>Next chapter:</strong> M.S. Software Development with an AI specialization.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-12 sm:px-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {principles.map(({ title, body, icon: Icon }) => (
            <article key={title} className='rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-accent-gold/25 hover:bg-white/[0.06]'>
              <Icon className='text-accent-jade' size={22} aria-hidden='true' />
              <h2 className='mt-5 text-lg font-bold text-primary-text'>{title}</h2>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6' aria-labelledby='projects-heading'>
        <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>Selected work</p>
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
            <Link key={project.slug} href={project.href} className='group rounded-[1.75rem] border border-white/10 bg-secondary-surface/60 p-6 transition hover:-translate-y-1 hover:border-accent-gold/30 hover:bg-secondary-surface'>
              <p className='text-xs font-bold uppercase tracking-[0.26em] text-accent-jade'>{project.status}</p>
              <h3 className='mt-4 text-2xl font-bold text-primary-text'>{project.title}</h3>
              <p className='mt-3 text-sm leading-6 text-muted-text'>{project.summary}</p>
              <div className='mt-5 flex flex-wrap gap-2'>
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className='rounded-full border border-white/10 px-3 py-1 text-xs text-muted-text'>{item}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6'>
        <div className='grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(20,184,166,0.12),rgba(245,158,11,0.08))] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-jade'>Resume signal</p>
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
                <Link key={section.id} href='/resume' className='rounded-2xl border border-white/10 bg-primary-bg/50 p-4 transition hover:bg-primary-bg/70'>
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
        <div className='rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center'>
          <Code2 className='mx-auto text-accent-jade' aria-hidden='true' />
          <h2 className='mt-4 font-heading text-3xl font-extrabold text-primary-text'>The lab is open.</h2>
          <p className='mx-auto mt-3 max-w-2xl text-muted-text'>
            Experiments, tool notes, AI workflows, and small interactive ideas will live in the lab — the fun corner of the workshop.
          </p>
          <Link className='mt-6 inline-flex h-12 items-center justify-center rounded-full border border-accent-jade/30 px-6 text-sm font-semibold text-accent-jade transition hover:bg-accent-jade/10' href='/lab'>
            Visit the lab
          </Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects from Cameron Porter: GRIT, AI-assisted engineering workflows, and personal software craft.',
};

export default function ProjectsPage() {
  return (
    <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-gold'>Project dojo</p>
        <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text sm:text-5xl'>Practical software, clear tradeoffs, real users.</h1>
        <p className='mt-5 text-lg leading-8 text-muted-text'>
          A portfolio should show more than stack names. These projects focus on the problem, the engineering boundary, and what made the build interesting.
        </p>
      </div>

      <div className='mt-12 grid gap-6 lg:grid-cols-3'>
        {projects.map((project) => (
          <Link key={project.slug} href={project.href} className='group flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 transition hover:-translate-y-1 hover:border-accent-gold/30 hover:bg-white/[0.065]'>
            <p className='text-xs font-bold uppercase tracking-[0.26em] text-accent-gold'>{project.status}</p>
            <h2 className='mt-5 text-3xl font-bold text-primary-text'>{project.title}</h2>
            <p className='mt-4 text-sm leading-6 text-muted-text'>{project.summary}</p>
            <p className='mt-5 text-sm font-semibold text-primary-text'>{project.signal}</p>
            <div className='mt-auto pt-8'>
              <div className='mb-5 flex flex-wrap gap-2'>
                {project.stack.map((item) => (
                  <span key={item} className='rounded-full border border-white/10 px-3 py-1 text-xs text-muted-text'>{item}</span>
                ))}
              </div>
              <span className='inline-flex items-center gap-2 text-sm font-semibold text-accent-gold'>Open case study <ArrowRight size={15} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

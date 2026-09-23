import type { Metadata } from 'next';
import ProjectCard from '@/components/marketing/ProjectCard';
import { projects } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects from Cameron Porter: GRIT, AI-assisted engineering workflows, and personal software craft.',
};

export default function ProjectsPage() {
  return (
    <section className='mx-auto max-w-[1180px] px-5 py-16 sm:px-6 md:py-24'>
      <div className='max-w-3xl'>
        <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Field notes</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h1 className='mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-primary-text sm:text-5xl'>Practical software, clear tradeoffs, real users.</h1>
        <p className='mt-5 text-lg leading-8 text-muted-text'>
          A portfolio should show more than stack names. These projects focus on the problem, the engineering boundary, and what made the build interesting.
        </p>
      </div>

      <div className='mt-12 grid gap-6 lg:grid-cols-3'>
        {projects.map((project) => <ProjectCard key={project.slug} project={project} headingLevel={2} />)}
      </div>
    </section>
  );
}

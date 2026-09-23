import type { Metadata } from 'next';
import Link from 'next/link';
import ContactLink from '@/components/analytics/ContactLink';
import { personalSite, resumeSections } from '@/lib/config/personal-site';

export const metadata: Metadata = {
  title: 'For Recruiters',
  description: 'Cameron Porter: backend and product engineering, TypeScript, Go, AWS, payment integrations, and event-driven systems.',
};

export default function RecruitersPage() {
  const experience = resumeSections.find(section => section.id === 'experience');
  return (
    <article className='mx-auto max-w-[1100px] px-5 py-16 sm:px-6 md:py-24'>
      <header className='cut border border-[var(--hairline)] bg-[image:var(--wash-drop)] p-7 md:p-10'>
        <p className='text-sm font-extrabold uppercase tracking-[0.24em] text-accent-blaze'>For recruiters · Cameron Porter</p>
        <h1 className='mt-5 font-heading text-4xl font-extrabold uppercase leading-tight tracking-tight text-primary-text sm:text-5xl'>Backend / product engineering</h1>
        <p className='mt-5 text-lg font-semibold text-accent-alpine'>TypeScript · Go · AWS · Event-driven systems</p>
        <p className='mt-4 max-w-3xl leading-8 text-muted-text'>I build payment integrations and cloud services, with a focus on reliability, explicit boundaries, and maintainable systems. My product work brings that same discipline to training software.</p>
        <p className='mt-4 text-sm text-muted-text'>Shepherd, MI · Christian · Coast Guard veteran · Family man</p>
        <div className='mt-7 flex flex-wrap gap-4'>
          <a href={personalSite.links.resumeDownload} download className='cut-sm inline-flex min-h-11 items-center bg-accent-blaze px-5 font-bold text-on-accent'>Download resume</a>
          <Link href='/resume' className='inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>Read full resume</Link>
          <ContactLink method='email' location='recruiters_hero' href={personalSite.links.email} className='inline-flex min-h-11 items-center font-bold text-accent-blaze underline-offset-4 hover:underline'>Email Cameron</ContactLink>
          <ContactLink method='linkedin' location='recruiters_hero' href={personalSite.links.linkedin} className='inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>LinkedIn</ContactLink>
        </div>
      </header>
      <section className='mt-12' aria-labelledby='experience-heading'>
        <h2 id='experience-heading' className='font-heading text-3xl font-extrabold uppercase text-primary-text'>Experience highlights</h2>
        <div className='mt-6 grid gap-5'>
          {experience?.items.map(item => typeof item === 'string' ? null : (
            <section key={`${item.company}-${item.role}`} className='cut-sm border border-[var(--hairline)] bg-secondary-surface/70 p-6'>
              <h3 className='text-xl font-bold text-primary-text'>{item.role} · {item.company}</h3>
              <p className='mt-2 text-sm text-accent-alpine'>{item.dates}</p>
              <ul className='mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-text'>
                {item.bullets.slice(0, 3).map(bullet => <li key={bullet}>{bullet}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <section className='mt-10 cut-sm border border-accent-blaze/40 p-7'>
        <h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Engineering beyond the resume</h2>
        <p className='mt-4 max-w-3xl leading-7 text-muted-text'>GRIT is a Next.js training PWA. The case study walks through deterministic program rules, a constrained AI selection boundary, design tradeoffs, and current limitations.</p>
        <Link href='/projects/grit' className='mt-4 inline-flex min-h-11 items-center font-bold text-accent-blaze underline-offset-4 hover:underline'>Read GRIT case study</Link>
      </section>
      <section className='mt-10' aria-labelledby='conversation-heading'>
        <h2 id='conversation-heading' className='font-heading text-2xl font-bold uppercase text-primary-text'>Start a conversation</h2>
        <p className='mt-4 leading-7 text-muted-text'>Let’s discuss role scope and work arrangement, the systems your team owns, and where my experience fits.</p>
        <div className='mt-4 flex flex-wrap gap-6'>
          <ContactLink method='email' location='recruiters' href={personalSite.links.email} className='inline-flex min-h-11 items-center font-bold text-accent-blaze underline-offset-4 hover:underline'>Email Cameron</ContactLink>
          <ContactLink method='linkedin' location='recruiters' href={personalSite.links.linkedin} className='inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>LinkedIn</ContactLink>
        </div>
      </section>
    </article>
  );
}

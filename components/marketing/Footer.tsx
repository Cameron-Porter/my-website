import Link from 'next/link';
import { personalSite, projects } from '@/lib/config/personal-site';
import { footerProductLinks, legalLinks, siteConfig } from '@/lib/config/site';
import type { FooterProps } from '@/lib/types/components';
import { cn } from '@/lib/utils';

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t-2 border-accent-blaze/60 bg-secondary-surface/70 px-6 py-12 md:py-16',
        className,
      )}
    >
      <div className='mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr] md:gap-8'>
        <div className='space-y-4'>
          <div>
            <p className='font-heading text-lg font-extrabold uppercase tracking-[0.16em] text-primary-text'>
              {siteConfig.name}
            </p>
            <p className='mt-2 text-sm text-muted-text'>{siteConfig.tagline}</p>
          </div>
          <p className='max-w-sm text-sm leading-6 text-muted-text'>
            To enjoy what you do is a daily blessing.
          </p>
          <div className='flex flex-wrap gap-3'>
            <a className='cut-sm border border-[var(--hairline)] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-primary-text transition hover:border-accent-blaze/50' href={personalSite.links.linkedin}>
              LinkedIn
            </a>
            <Link className='cut-sm bg-accent-blaze px-4 py-2 text-sm font-extrabold uppercase tracking-[0.12em] text-on-accent transition hover:brightness-110' href='/resume'>
              Resume
            </Link>
          </div>
        </div>

        <FooterColumn title='Site' links={footerProductLinks} />
        <FooterColumn title='Projects' links={projects.map((project) => ({ label: project.title, href: project.href }))} />
        <FooterColumn title='Legal' links={legalLinks} />
      </div>

      <div className='mx-auto mt-10 max-w-[1180px] border-t border-[var(--hairline)] pt-6'>
        <p className='text-center text-xs text-muted-text'>
          &copy; {currentYear} Cameron Porter. Built at speed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-extrabold uppercase tracking-[0.2em] text-accent-blaze'>{title}</h3>
      <nav aria-label={`${title} links`}>
        <ul className='space-y-1'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='inline-flex min-h-[44px] items-center text-sm text-muted-text underline-offset-4 transition-colors duration-200 ease-out hover:text-accent-blaze hover:underline md:min-h-0'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

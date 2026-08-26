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
        'border-t border-black/10 dark:border-white/10 bg-secondary-surface/70 px-6 py-12 md:py-16',
        className,
      )}
    >
      <div className='mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr] md:gap-8'>
        <div className='space-y-4'>
          <div>
            <p className='font-heading text-lg font-extrabold uppercase tracking-[0.18em] text-primary-text'>
              {siteConfig.name}
            </p>
            <p className='mt-2 text-sm text-muted-text'>{siteConfig.tagline}</p>
          </div>
          <p className='max-w-sm text-sm leading-6 text-muted-text'>
            To enjoy what you do is a daily blessing.
          </p>
          <div className='flex flex-wrap gap-3'>
            <a className='rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm text-primary-text transition hover:bg-black/10 dark:hover:bg-white/10' href={personalSite.links.linkedin}>
              LinkedIn
            </a>
            <Link className='rounded-full bg-accent-jade px-4 py-2 text-sm font-semibold text-primary-bg transition hover:bg-accent-jade/90' href='/resume'>
              Resume
            </Link>
          </div>
        </div>

        <FooterColumn title='Site' links={footerProductLinks} />
        <FooterColumn title='Projects' links={projects.map((project) => ({ label: project.title, href: project.href }))} />
        <FooterColumn title='Legal' links={legalLinks} />
      </div>

      <div className='mx-auto mt-10 max-w-[1180px] border-t border-black/5 dark:border-white/5 pt-6'>
        <p className='text-center text-xs text-muted-text'>
          &copy; {currentYear} Cameron Porter. Built from the workshop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-semibold uppercase tracking-wider text-primary-text'>{title}</h3>
      <nav aria-label={`${title} links`}>
        <ul className='space-y-1'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='inline-flex min-h-[44px] items-center text-sm text-muted-text transition-colors duration-200 ease-out hover:text-accent-jade md:min-h-0'
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

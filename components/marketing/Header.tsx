'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/config/site';
import { personalSite } from '@/lib/config/personal-site';
import { cn } from '@/lib/utils';
import MobileNav from '@/components/marketing/MobileNav';
import type { HeaderProps } from '@/lib/types/components';

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b border-[var(--hairline)] bg-primary-bg/90 backdrop-blur-xl supports-[backdrop-filter]:bg-primary-bg/75',
          className,
        )}
      >
        <nav
          className='mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-6'
          aria-label='Main navigation'
        >
          <Link href='/' className='group flex shrink-0 items-center gap-3 transition-opacity duration-200 hover:opacity-90'>
            <span className='cut-sm grid h-9 w-9 shrink-0 place-items-center overflow-hidden border border-accent-blaze/30 bg-secondary-surface shadow-[var(--glow-blaze-sm)]'>
              <Image src='/icon.png' alt='' width={36} height={36} className='h-full w-full object-cover' priority />
            </span>
            <span className='flex flex-col justify-center gap-1'>
              <span className='font-heading text-sm font-extrabold uppercase leading-none tracking-[0.12em] whitespace-nowrap text-primary-text lg:text-[0.95rem]'>
                {siteConfig.name}
              </span>
              <span className='hidden text-[10px] font-bold uppercase leading-none tracking-[0.16em] whitespace-nowrap text-accent-blaze sm:block'>
                Backend dev
              </span>
            </span>
          </Link>

          <ul className='hidden min-w-0 items-center md:flex'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'whitespace-nowrap px-2.5 py-2 text-[0.8rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 lg:px-4 lg:text-sm lg:tracking-[0.1em]',
                      isActive
                        ? 'text-accent-blaze [box-shadow:inset_0_-3px_0_0_var(--accent-blaze)]'
                        : 'text-muted-text hover:text-primary-text',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className='flex items-center gap-3'>
            <a
              href={personalSite.links.resume}
              className='cut-sm hidden shrink-0 items-center whitespace-nowrap bg-accent-blaze px-4 py-2.5 text-[0.8rem] font-extrabold uppercase tracking-[0.1em] text-on-accent shadow-[var(--glow-blaze)] transition-all duration-200 hover:brightness-110 md:inline-flex lg:px-5 lg:text-sm lg:tracking-[0.14em]'
            >
              Resume
            </a>

            <button
              type='button'
              onClick={openMobileNav}
              aria-label='Open navigation menu'
              className='flex h-11 w-11 items-center justify-center text-primary-text transition-colors hover:text-accent-blaze md:hidden'
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
      />
    </>
  );
}

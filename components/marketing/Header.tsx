'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles } from 'lucide-react';
import { ToriiGate } from '@/components/ui/ToriiGate';
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
          'sticky top-0 z-50 w-full border-b border-white/10 bg-primary-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-primary-bg/70',
          className,
        )}
      >
        <nav
          className='mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-6'
          aria-label='Main navigation'
        >
          <Link href='/' className='group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90'>
            <span className='grid h-9 w-9 place-items-center rounded-2xl border border-accent-gold/25 bg-accent-jade/10 text-accent-gold shadow-[0_0_32px_rgba(232,184,75,0.18)]'>
              <ToriiGate size={18} className='text-accent-gold' />
            </span>
            <span className='grid leading-tight'>
              <span className='font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-primary-text sm:text-base'>
                {siteConfig.name}
              </span>
              <span className='hidden text-[11px] uppercase tracking-[0.24em] text-muted-text sm:block'>
                software dojo
              </span>
            </span>
          </Link>

          <ul className='hidden items-center gap-1 md:flex'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-accent-jade/12 text-accent-jade ring-1 ring-accent-gold/25'
                        : 'text-muted-text hover:bg-white/5 hover:text-primary-text',
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
              className='hidden items-center rounded-full bg-accent-jade px-5 py-2 text-sm font-semibold text-primary-bg shadow-[0_0_28px_rgba(20,184,166,0.24)] transition-all duration-200 hover:bg-accent-jade/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 md:inline-flex'
            >
              Resume
            </a>

            <button
              type='button'
              onClick={openMobileNav}
              aria-label='Open navigation menu'
              className='flex h-11 w-11 items-center justify-center rounded-full text-primary-text transition-colors hover:bg-white/10 md:hidden'
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

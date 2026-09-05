'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/config/site';
import { personalSite } from '@/lib/config/personal-site';
import { cn } from '@/lib/utils';
import type { MobileNavProps } from '@/lib/types/components';

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
            aria-hidden='true'
          />

          <motion.nav
            role='dialog'
            aria-modal='true'
            aria-label='Mobile navigation'
            className='fixed top-0 right-0 z-50 flex h-full w-[300px] max-w-[82vw] flex-col border-l border-black/10 dark:border-white/10 bg-primary-bg md:hidden'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className='flex items-center justify-between p-4'>
              <span className='font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary-text'>
                Cameron Porter
              </span>
              <button
                onClick={onClose}
                aria-label='Close navigation menu'
                className='flex h-11 w-11 items-center justify-center rounded-full text-primary-text transition-colors hover:bg-black/10 dark:hover:bg-white/10'
              >
                <X size={24} />
              </button>
            </div>

            <ul className='flex flex-1 flex-col gap-1 px-4'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'flex h-12 min-h-[44px] min-w-[44px] items-center rounded-2xl px-4 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-accent-blaze/10 text-accent-blaze'
                          : 'text-primary-text',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='space-y-3 p-4'>
              <a
                href={personalSite.links.linkedin}
                onClick={onClose}
                className='flex h-11 w-full items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-sm font-semibold text-primary-text transition-colors hover:bg-black/10 dark:hover:bg-white/10'
              >
                LinkedIn
              </a>
              <Link
                href={personalSite.links.resume}
                onClick={onClose}
                className='cut-sm flex h-11 w-full items-center justify-center bg-accent-blaze text-sm font-extrabold uppercase tracking-[0.14em] text-on-accent transition-all duration-200 hover:brightness-110'
              >
                Resume
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

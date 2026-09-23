// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import Header from '@/components/marketing/Header';
import MobileNav from '@/components/marketing/MobileNav';
import HomePage from '@/app/(marketing)/page';
import RecruitersPage from '@/app/(marketing)/recruiters/page';
import Footer from '@/components/marketing/Footer';
import { primaryNavLinks } from '@/lib/config/personal-site';
import sitemap from '@/app/sitemap';

afterEach(cleanup);
vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

it('provides a recruiter fast lane in the header and mobile menu', () => {
  const header = render(<Header />);
  expect(screen.getByRole('link', { name: 'For recruiters' })).toHaveAttribute('href', '/recruiters');
  header.unmount();
  render(<MobileNav isOpen onClose={vi.fn()} />);
  expect(within(screen.getByRole('dialog')).getByRole('link', { name: 'For recruiters' })).toHaveAttribute('href', '/recruiters');
});

it('makes hiring pages discoverable through navigation, footer, and sitemap', () => {
  expect(primaryNavLinks).toEqual([
    { label: 'Work', href: '/projects' },
    { label: 'How I Build', href: '/how-i-build' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ]);
  render(<Footer />);
  expect(screen.getByRole('link', { name: 'For recruiters' })).toHaveAttribute('href', '/recruiters');
  expect(screen.getByRole('link', { name: 'How I Build' })).toHaveAttribute('href', '/how-i-build');
  const urls = sitemap().map(entry => entry.url);
  expect(urls).toEqual(expect.arrayContaining(['https://cameron-porter.com/recruiters', 'https://cameron-porter.com/how-i-build']));
  expect(new Set(urls).size).toBe(urls.length);
});

it('puts work before contact in the homepage action order', () => {
  render(<HomePage />);
  const work = screen.getByRole('link', { name: 'View engineering work' });
  const contact = screen.getByRole('link', { name: 'Contact Cameron' });
  expect(work.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

it('lets a recruiter email or visit LinkedIn from the page introduction', () => {
  render(<RecruitersPage />);
  const header = screen.getByRole('heading', { level: 1 }).closest('header')!;
  expect(within(header).getByRole('link', { name: 'Email Cameron' })).toHaveAttribute('href', 'mailto:info@cameron-porter.com');
  expect(within(header).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/cameron-r-porter/');
});

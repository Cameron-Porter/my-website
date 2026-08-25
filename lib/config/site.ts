import type { NavLink, SiteMetadata } from '@/lib/types';
import { personalSite, primaryNavLinks, siteMetadata } from './personal-site';

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.cameron-porter.com';

export const navLinks: NavLink[] = primaryNavLinks;

export const footerProductLinks: NavLink[] = [
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
];

export const footerCompanyLinks: NavLink[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'LinkedIn', href: personalSite.links.linkedin },
  { label: 'G.R.I.T.', href: '/projects/grit' },
];

export const footerLinks: NavLink[] = footerProductLinks;

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export const siteConfig = {
  name: personalSite.name,
  fullName: personalSite.title,
  tagline: personalSite.tagline,
  secondaryTagline: personalSite.description,
  url: siteMetadata.url,
  navLinks,
  footerLinks,
  footerProductLinks,
  footerCompanyLinks,
  legalLinks,
} as const;

export const metadata: SiteMetadata = siteMetadata;

export default siteConfig;

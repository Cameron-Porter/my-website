import type { NavLink, SiteMetadata } from '@/lib/types';

export type PersonalProject = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  stack: string[];
  status: string;
  signal: string;
};

export type ResumeSection = {
  id: 'summary' | 'experience' | 'service' | 'education' | 'skills' | 'projects';
  title: string;
  items: string[];
};

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Contact', href: '/contact' },
];

export const personalSite = {
  name: 'Cameron Porter',
  title: 'Cameron Porter — Backend Developer, Veteran, Builder',
  tagline: 'Backend Developer · TypeScript / Go · Systems-minded builder',
  description:
    'Personal website for Cameron Porter: Christian, Coast Guard veteran, backend developer, and builder of practical software tools.',
  hero: {
    kicker: 'Christian · Coast Guard veteran · family man · backend developer',
    headline: 'I build practical software with discipline, clarity, and a little jade-lit workshop energy.',
    body:
      'I work primarily in TypeScript and Go, care about systems that serve people well, and like turning messy product ideas into dependable tools. This is my personal dojo: resume, projects, experiments, and notes from the workbench.',
  },
  links: {
    email: 'mailto:info@cameron-porter.com',
    linkedin: 'https://www.linkedin.com/in/cameron-porter',
    resume: '/resume',
    grit: 'https://app.cameron-porter.com',
  },
  palette: ['dark first', 'jade accent', 'warm lantern glow', 'minimal Apple-like structure'],
} as const;

export const projects: PersonalProject[] = [
  {
    slug: 'grit',
    title: 'G.R.I.T.',
    summary:
      'A hypertrophy training product that combines deterministic programming rules, workout logging, Supabase persistence, and carefully bounded AI-assisted program drafting.',
    href: '/projects/grit',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'React Native', 'Vitest'],
    status: 'Active product build',
    signal: 'Fitness tech, rule engines, PWA/native parity, AI boundaries',
  },
  {
    slug: 'hermes-workflow',
    title: 'Hermes Workflow Lab',
    summary:
      'A personal operating system for AI-assisted engineering: durable skills, repo backups, task verification, and agent orchestration patterns.',
    href: '/lab',
    stack: ['AI agents', 'Git', 'Obsidian', 'Automation'],
    status: 'Ongoing practice',
    signal: 'Human-in-the-loop AI, verification, knowledge management',
  },
  {
    slug: 'personal-site',
    title: 'This website',
    summary:
      'A personal resume and project dojo designed around dark minimalism, jade accents, warm lantern glow, and practical storytelling.',
    href: '/',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vitest'],
    status: 'Living portfolio',
    signal: 'Design systems, content strategy, frontend craft',
  },
];

export const resumeSections: ResumeSection[] = [
  {
    id: 'summary',
    title: 'Summary',
    items: [
      'Backend Software Developer II focused on dependable APIs, TypeScript/Go systems, product-minded implementation, and AI-assisted engineering workflows.',
      'Comfortable working from ambiguity, documenting decisions, and shipping practical software that serves real people.',
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    items: [
      'Backend Software Developer II at Compassion International, primarily using TypeScript and Go in production software systems.',
      'Builder of G.R.I.T., a hypertrophy app with deterministic training logic, Supabase-backed data, and PWA/native parity work.',
    ],
  },
  {
    id: 'service',
    title: 'Service',
    items: [
      'United States Coast Guard veteran with a service-shaped bias toward reliability, ownership, and calm execution under constraints.',
      'Faith and service are part of the foundation: build things that help people and steward the work well.',
    ],
  },
  {
    id: 'education',
    title: 'Education',
    items: [
      "Starting Grand Valley State University's online M.S. in Software Development with an AI specialization in 2026.",
      'Continuous learner focused on backend systems, AI tooling, product engineering, and maintainable software practices.',
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    items: [
      'TypeScript, Go, Next.js, React, Node.js, APIs, PostgreSQL/Supabase, testing, CI, and developer tooling.',
      'Architecture notes, system boundaries, code review, debugging, product thinking, and AI-assisted engineering workflows.',
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    items: [
      'G.R.I.T. — training app and PWA focused on hypertrophy programming, progression, workout logging, and personal records.',
      'Personal website — a living resume, portfolio, and lab for software craft, faith-informed service, and thoughtful technology.',
    ],
  },
];

export const siteMetadata: SiteMetadata = {
  title: personalSite.title,
  description: personalSite.description,
  keywords: [
    'Cameron Porter',
    'backend developer',
    'TypeScript developer',
    'Go developer',
    'Coast Guard veteran developer',
    'software portfolio',
    'AI engineering',
    'fitness technology',
  ],
  ogImage: '/og-image.png',
  url: 'https://cameron-porter.com',
};

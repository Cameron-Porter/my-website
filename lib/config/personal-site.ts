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
    headline: 'I build practical software with discipline and clarity.',
    body:
      'I work primarily in TypeScript and Go, care about systems that serve people well, and like turning messy product ideas into dependable tools. This is my personal dojo: resume, projects, experiments, and notes from the workbench.',
  },
  links: {
    email: 'mailto:info@cameron-porter.com',
    linkedin: 'https://www.linkedin.com/in/cameron-porter-b59387197/',
    resume: '/resume',
    resumeDownload: '/resume-2026.docx',
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
      'Technical software engineer with experience designing, automating, and optimizing enterprise-scale IT systems and data workflows across cloud and ERP environments.',
      'Proven ability to improve system performance, ensure data integrity, and implement scalable solutions aligned with business and compliance requirements.',
      'Experienced in process improvement, system lifecycle management, automation, data analysis, and integrating distributed systems to support operational efficiency and decision-making.',
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    items: [
      'Software Developer II, Compassion International (04/2023 – Present): lead development and optimization of enterprise payment processing systems integrating NetSuite ERP and AWS cloud infrastructure, supporting millions of financial transactions annually.',
      'Designed automated payment lifecycle workflows, event-driven AWS Lambda/SNS/SQS integrations, REST APIs, Snowflake/ERP reporting flows, and idempotent processing across 6M+ records.',
      'Improved system processing performance by 3400%, eliminated duplicate financial transactions across millions of records, and reduced manual workload through payment processing automation.',
      'Software Engineer, Merkle, Inc (03/2022 – 04/2023): developed backend systems and Node.js automation tools for large-scale client promotions and digital campaigns.',
      'Designed automation workflows that reduced operational costs by approximately $2 million annually, mitigated bot traffic vulnerabilities, and improved team documentation/processes.',
      'Software Engineering Mentor, VetsWhoCode (03/2021 – 03/2025): mentored transitioning veterans through pair programming, technical guidance, code review, architecture discussions, and React/Next.js web application support.',
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
      'Master of Science – Software Engineering (In Progress), Grand Valley State University.',
      'Bachelor of Science – Information Technology, American Military University (06/2021).',
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    items: [
      'Programming: TypeScript, JavaScript, Node.js, Go.',
      'Cloud & Infrastructure: AWS Lambda, SNS, SQS, and Terraform.',
      'Data & Databases: SQL, MySQL, and Snowflake.',
      'Systems: REST APIs, event-driven architecture, and system integration.',
      'Practices: automation, unit/integration testing, and CI/CD.',
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
  ogImage: '',
  url: 'https://cameron-porter.com',
};

import type { NavLink, SiteMetadata } from '@/lib/types';

export type PersonalProject = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  actionLabel: string;
  featured?: boolean;
  appHref?: string;
  stack: string[];
  status: string;
  signal: string;
};

export type ResumeSection = {
  id: 'summary' | 'experience' | 'service' | 'education' | 'skills' | 'projects';
  title: string;
  items: string[] | ExperienceItem[]; // Allow nested experience items
};

export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};

export const primaryNavLinks: NavLink[] = [
  { label: 'Work', href: '/projects' },
  { label: 'How I Build', href: '/how-i-build' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export const personalSite = {
  name: 'Cameron Porter',
  title: 'Cameron Porter · Developer',
  tagline: 'Backend Developer · TypeScript / Go · Builds fast, lands clean',
  description:
    'Personal website for Cameron Porter: Christian, Coast Guard veteran, backend developer, and builder of practical software tools.',
  hero: {
    kicker: 'Christian · Veteran · Family Man · Backend Dev',
    headline: 'Backend engineering for payments & event-driven systems.',
    body:
      'I build payment integrations and event-driven services in TypeScript, Go, and AWS. My work connects enterprise systems, makes retries and idempotency explicit, and turns complex product requirements into maintainable software.',
  },
  links: {
    email: 'mailto:info@cameron-porter.com',
    linkedin: 'https://www.linkedin.com/in/cameron-r-porter/',
    resume: '/resume',
    resumeDownload: '/resume.pdf',
    grit: 'https://app.cameron-porter.com',
  },
  palette: ['granite dark', 'blaze orange signal', 'alpine blue counterweight', 'cut edges, no soft corners'],
} as const;

export const projects: PersonalProject[] = [
  {
    slug: 'grit',
    title: 'G.R.I.T.',
    summary:
      'A training PWA that keeps prescriptions deterministic, validates AI exercise selections, and saves complete programs through a single database transaction.',
    href: '/projects/grit',
    actionLabel: 'Read GRIT case study',
    featured: true,
    appHref: personalSite.links.grit,
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Vitest'],
    status: 'Active product build',
    signal: 'Fitness tech, deterministic rules, PWA, AI boundaries',
  },
  {
    slug: 'hermes-workflow',
    title: 'Hermes Workflow Lab',
    summary:
      'A personal operating system for AI-assisted engineering: durable skills, repo backups, task verification, and agent orchestration patterns.',
    href: '/lab',
    actionLabel: 'Explore the workflow lab',
    stack: ['AI agents', 'Git', 'Obsidian', 'Automation'],
    status: 'Ongoing practice',
    signal: 'Human-in-the-loop AI, verification, knowledge management',
  },
  {
    slug: 'personal-site',
    title: 'This website',
    summary:
      'A personal resume and project record built on cut geometry, a high-vis blaze accent, and copy that gets to the point.',
    href: '/',
    actionLabel: 'View this website',
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
      'Software engineer with almost five years of experience building enterprise payment processing, event-driven integration, and cloud infrastructure systems that move millions of financial transactions annually.',
      'Owns complex cross-system initiatives end to end across NetSuite, Salesforce, Snowflake, and AWS — from architecture and integration design through production support and regulatory certification.',
      'Recognized subject matter expert in payment processing and event orchestration, delivering measurable cost reduction, throughput gains, and compliance outcomes while mentoring engineers and facilitating team delivery.',
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    items: [
      {
        role: 'Software Developer II',
        company: 'Compassion International',
        dates: '04/2023 – Present',
        bullets: [
          'Lead development of enterprise payment processing systems integrating NetSuite ERP with AWS infrastructure, supporting millions of financial transactions annually.',
          'Delivered a third-party vendor payment integration projected to save $3 million over four years while generating $5 million in additional income.',
          'Redesigned commitment and payment upsert logic, reducing request processing time by 3,400 percent and improving readability enough for new developers to contribute immediately.',
          'Delivered Mastercard Transaction Link Identifier (TLID) compliance end to end, including tokenization support, response processor support, bank file certification, and final certification delivery.',
          'Refactored the payment decline workflow onto an event-driven architecture, strengthening event reliability between NetSuite, Salesforce, and downstream consumers.',
          'Built the Vendor Gateway API and third-party pre-authorization intake, enabling future payment vendor integrations and expanding revenue-generating capability.',
          'Engineered SQS retry and reliability architecture, reducing production failure risk across mission-critical payment workloads.',
          'Implemented idempotent processing across 6 million records, eliminating duplicate financial transactions and preserving data integrity.',
          'Automated Snowflake secret rotation, supporter lookup file generation, and microservice restart on credential change, removing recurring manual operations work.',
          'Built monitoring, logging, and traceability improvements across event pipelines, shortening diagnosis time for production issues in distributed services.',
          'Serve as recognized subject matter expert for Vendor Gateway, pre-authorization processing, and Mastercard compliance; rated Top Contributor for two consecutive review cycles.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Merkle, Inc.',
        dates: '03/2022 – 04/2023',
        bullets: [
          'Built backend systems and automation tooling in Node.js supporting large-scale client promotions and digital campaigns.',
          'Designed automation workflows that reduced operational costs by approximately $2 million annually.',
          'Identified system vulnerabilities and implemented mitigations against robot traffic, preventing service disruption during high-volume campaigns.',
          'Translated business requirements into technical solutions in coordination with internal teams and third-party vendors.',
        ],
      },
      {
        role: 'Software Engineering Mentor',
        company: 'Vets Who Code',
        dates: '03/2021 – 03/2025',
        bullets: [
          'Mentored transitioning veterans into software engineering roles through one-on-one pair programming and technical guidance.',
          'Guided developers through system architecture, debugging, and scalable implementation approaches.',
          'Reviewed code and delivered feedback that improved performance, readability, and maintainability.',
          'Partnered with leadership to define feature roadmaps and supported development of web applications using React and Next.js.',
        ],
      },
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
      'Master of Science in Software Engineering, Concentration in Artificial Intelligence (In Progress), Grand Valley State University.',
      'Bachelor of Science in Information Technology, American Military University (06/2021).',
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    items: [
      'Languages: TypeScript, JavaScript, Go, Node.js, SQL.',
      'Cloud & Infrastructure: AWS, Lambda, SQS, SNS, Terraform, IaC, CI/CD.',
      'Data & Platforms: Snowflake, MySQL, NetSuite ERP, Salesforce, data warehousing.',
      'Architecture: event-driven architecture, distributed systems, microservices, REST APIs, idempotency.',
      'Frameworks: React and Next.js.',
      'Practices & Tools: test-driven development, unit and integration testing, Git, Datadog, Agile and Scrum.',
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    items: [
      'G.R.I.T.: training app and PWA focused on hypertrophy programming, progression, workout logging, and personal records.',
      'Personal website: a living resume, portfolio, and lab for software craft, faith-informed service, and thoughtful technology.',
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
  ogImage: '/og-card.png',
  url: 'https://cameron-porter.com',
};

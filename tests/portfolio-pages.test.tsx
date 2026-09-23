// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import type { ComponentType } from 'react';
import { resumeSections } from '@/lib/config/personal-site';

const pages = import.meta.glob('../app/**/page.tsx') as Record<string, () => Promise<{ default: ComponentType }>>;
afterEach(cleanup);

it('explains human-owned AI-assisted process without claiming measured evaluations', async () => {
  const load = pages['../app/(marketing)/how-i-build/page.tsx'];
  expect(load, 'process route must exist').toBeTypeOf('function');
  const Page = (await load!()).default;
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('How I build');
  for (const name of ['Human-owned decisions', 'AI as a collaborator', 'Validation before delivery', 'Privacy and limits']) {
    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  }
  expect(screen.getByText(/not measured AI product evaluations/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explore the Garage' })).toHaveAttribute('href', '/lab');
  expect(screen.getByRole('link', { name: 'Read GRIT case study' })).toHaveAttribute('href', '/projects/grit');
});

it('gives recruiters a real page with reused experience and contact paths', async () => {
  const load = pages['../app/(marketing)/recruiters/page.tsx'];
  expect(load, 'recruiter route must exist').toBeTypeOf('function');
  const Page = (await load!()).default;
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Backend / product engineering');
  expect(screen.getByText(/Shepherd, MI/)).toBeInTheDocument();
  expect(screen.getByText(/TypeScript · Go · AWS · Event-driven systems/)).toBeInTheDocument();
  const experience = resumeSections.find(s => s.id === 'experience')!;
  for (const item of experience.items) {
    if (typeof item !== 'string') expect(screen.getByText(item.bullets[0]!)).toBeInTheDocument();
  }
  expect(screen.getByRole('link', { name: 'Download resume' })).toHaveAttribute('href', '/resume.pdf');
  expect(screen.getByRole('link', { name: 'Download resume' })).toHaveAttribute('download');
  for (const link of screen.getAllByRole('link', { name: 'Email Cameron' })) expect(link).toHaveAttribute('href', 'mailto:info@cameron-porter.com');
  for (const link of screen.getAllByRole('link', { name: 'LinkedIn' })) expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/cameron-r-porter/');
  expect(screen.getByRole('link', { name: /Read GRIT case study/i })).toHaveAttribute('href', '/projects/grit');
  expect(screen.getByText(/discuss role scope and work arrangement/i)).toBeInTheDocument();
});

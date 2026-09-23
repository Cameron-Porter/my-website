// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Footer from '@/components/marketing/Footer';
import ProjectsPage from '@/app/(marketing)/projects/page';
import HomePage from '@/app/(marketing)/page';
import { projects, resumeSections } from '@/lib/config/personal-site';

afterEach(cleanup);

describe('portfolio hiring evidence', () => {
  it('leads with backend positioning and work before philosophy, preserving approved results', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Backend.*payments.*event-driven/i);
    expect(screen.getByRole('link', { name: 'View engineering work' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact Cameron' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Read the resume' })).toHaveAttribute('href', '/resume');
    expect(screen.getAllByRole('heading', { level: 2 }).slice(0, 3).map(h => h.textContent?.trim())).toEqual(['Results by the numbers', 'Projects with a point of view.', 'How I pick a line.']);
    expect(screen.getByText('3,400%')).toBeInTheDocument();
    expect(JSON.stringify(resumeSections)).toContain('Redesigned commitment and payment upsert logic, reducing request processing time by 3,400 percent and improving readability enough for new developers to contribute immediately.');
  });
  it.each([['home', HomePage], ['projects', ProjectsPage]] as const)('labels real project destinations on %s', (_, Page) => {
    render(<Page />);
    expect(projects).toHaveLength(3);
    expect(screen.getByRole('link', { name: /Read GRIT case study/i })).toHaveAttribute('href', '/projects/grit');
    expect(screen.getByRole('link', { name: /Explore the workflow lab/i })).toHaveAttribute('href', '/lab');
    expect(screen.getByRole('link', { name: /View this website/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Open GRIT app' })).toHaveAttribute('href', 'https://app.cameron-porter.com');
    expect(screen.queryByText('Open case study')).not.toBeInTheDocument();
    expect(screen.getByText('Featured case study')).toBeInTheDocument();
    expect(screen.queryByText(/native parity|React Native/i)).not.toBeInTheDocument();
  });
  it('offers the approved LinkedIn URL and direct email in the shared footer', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/cameron-r-porter/');
    expect(screen.getByRole('link', { name: 'Email Cameron' })).toHaveAttribute('href', 'mailto:info@cameron-porter.com');
  });
});

import { describe, expect, it } from 'vitest';
import { personalSite, primaryNavLinks, projects, resumeSections } from './personal-site';
import { siteConfig } from './site';

describe('personal site content contract', () => {
  it('brands the site as Cameron Porter instead of a GRIT-only marketing site', () => {
    expect(siteConfig.name).toBe('Cameron Porter');
    expect(siteConfig.fullName).toContain('Cameron Porter');
    expect(siteConfig.tagline).toContain('Backend Developer');
    expect(siteConfig.secondaryTagline).not.toMatch(/hypertrophy programming/i);
  });

  it('keeps the public identity professional and personal without family details', () => {
    expect(personalSite.hero.kicker).toContain('Christian');
    expect(personalSite.hero.kicker).toContain('Veteran');
    expect(personalSite.hero.kicker).toContain('Family Man');
    expect(JSON.stringify(personalSite)).not.toMatch(/\b(wife|children|kids|daughter|son)\b/i);
  });

  it('publishes LinkedIn and resume destinations', () => {
    expect(personalSite.links.linkedin).toBe('https://www.linkedin.com/in/cameron-porter-b59387197/');
    expect(personalSite.links.resume).toBe('/resume');
  });

  it('uses personal website navigation with projects and garage', () => {
    expect(primaryNavLinks.map((link) => [link.label, link.href])).toEqual([
      ['Home', '/'],
      ['Resume', '/resume'],
      ['Projects', '/projects'],
      ['Garage', '/lab'],
      ['Contact', '/contact'],
    ]);
  });

  it('features GRIT as a rewritten project case study, not the whole site', () => {
    const grit = projects.find((project) => project.slug === 'grit');
    expect(grit).toBeDefined();
    expect(grit?.href).toBe('/projects/grit');
    expect(grit?.summary).toMatch(/training/i);
    expect(grit?.stack).toEqual(expect.arrayContaining(['Next.js', 'TypeScript', 'Supabase']));
  });

  it('includes resume sections for experience, service, education, skills, and projects', () => {
    expect(resumeSections.map((section) => section.id)).toEqual([
      'summary',
      'experience',
      'service',
      'education',
      'skills',
      'projects',
    ]);
  });
});

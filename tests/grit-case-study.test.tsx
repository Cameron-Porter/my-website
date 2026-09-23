// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import GritProjectPage from '@/app/(marketing)/projects/grit/page';

it('presents a source-grounded PWA case study with a textual architecture and honest limits', () => {
  render(<GritProjectPage />);
  const headings = screen.getAllByRole('heading').map(h => h.textContent);
  expect(headings).toEqual(expect.arrayContaining(['Success criteria — goals, not results', 'Deterministic core, bounded AI', 'Architecture — design view', 'Tradeoffs', 'Current scope and limits', 'Next iteration', 'Ownership and collaboration']));
  expect(screen.getByRole('figure', { name: 'GRIT program generation flow' })).toHaveTextContent('Authenticated request');
  expect(screen.getByText(/not a production topology/i)).toBeInTheDocument();
  expect(screen.getByText(/not live deployment verification/i)).toBeInTheDocument();
  expect(screen.getByText(/validateAiSelection/)).toBeInTheDocument();
  expect(screen.getByText(/save_ai_program/)).toBeInTheDocument();
  expect(screen.queryByText(/Native parity matters|PWA \+ native app|Future trainer, trusted boundary/)).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Open GRIT app' })).toHaveAttribute('href', 'https://app.cameron-porter.com');
  expect(screen.getByRole('link', { name: 'For recruiters' })).toHaveAttribute('href', '/recruiters');
});

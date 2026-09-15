import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackContactClick, trackEvent } from './analytics';

describe('analytics dataLayer events', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does nothing when rendered on the server', () => {
    expect(() => trackEvent('contact_click')).not.toThrow();
  });

  it('creates the dataLayer if GTM has not loaded yet', () => {
    const win: { dataLayer?: unknown[] } = {};
    vi.stubGlobal('window', win);

    trackEvent('test_event', { value: 1 });

    expect(win.dataLayer).toEqual([{ event: 'test_event', value: 1 }]);
  });

  it('pushes contact clicks with method and location', () => {
    const win = { dataLayer: [{ event: 'gtm.js' }] as unknown[] };
    vi.stubGlobal('window', win);

    trackContactClick('linkedin', 'footer');

    expect(win.dataLayer).toEqual([
      { event: 'gtm.js' },
      { event: 'contact_click', contact_method: 'linkedin', link_location: 'footer' },
    ]);
  });
});

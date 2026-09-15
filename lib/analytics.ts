export type ContactMethod = 'email' | 'linkedin';

type DataLayerEvent = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Push a custom event to the Google Tag Manager dataLayer. No-op on the server. */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params } satisfies DataLayerEvent);
}

export function trackContactClick(method: ContactMethod, location: string) {
  trackEvent('contact_click', { contact_method: method, link_location: location });
}

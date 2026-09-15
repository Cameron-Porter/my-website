'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { trackContactClick, type ContactMethod } from '@/lib/analytics';

type ContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  method: ContactMethod;
  location: string;
};

/** An anchor that reports a `contact_click` event to GTM before following the link. */
export default function ContactLink({ method, location, onClick, ...props }: ContactLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackContactClick(method, location);
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}

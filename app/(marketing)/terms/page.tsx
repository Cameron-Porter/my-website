import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for Cameron Porter’s personal website.',
};

export default function TermsPage() {
  return (
    <section className='mx-auto max-w-3xl px-5 py-16 sm:px-6 md:py-24'>
      <p className='text-sm font-semibold uppercase tracking-[0.3em] text-accent-gold'>Terms</p>
      <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text'>Site terms</h1>
      <div className='mt-8 space-y-6 text-sm leading-7 text-muted-text'>
        <p>
          This is Cameron Porter’s personal website. The content is provided for portfolio, resume, project, and general informational purposes.
        </p>
        <p>
          Project descriptions, notes, and experiments are shared as-is and may change over time. They are not professional legal, financial, medical, or security advice.
        </p>
        <p>
          Unless otherwise stated, site content and code samples are Cameron’s work or commentary. Please ask before reusing substantial portions of the site design, writing, or project materials.
        </p>
        <p>
          External links, including LinkedIn and project links, are governed by the terms and privacy practices of those services.
        </p>
      </div>
    </section>
  );
}

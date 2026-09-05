import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy notice for Cameron Porter’s personal website.',
};

export default function PrivacyPage() {
  return (
    <section className='mx-auto max-w-3xl px-5 py-16 sm:px-6 md:py-24'>
      <p className='text-sm font-extrabold uppercase tracking-[0.32em] text-accent-blaze'>Privacy</p>
      <h1 className='mt-4 font-heading text-4xl font-extrabold text-primary-text'>Privacy notice</h1>
      <div className='mt-8 space-y-6 text-sm leading-7 text-muted-text'>
        <p>
          This personal website is designed as a portfolio, resume, and project home for Cameron Porter. It does not require an account and should not ask for sensitive personal information.
        </p>
        <p>
          If you contact Cameron by email or LinkedIn, the information you send is handled by those providers and used only to respond to your message. Do not send passwords, secrets, government identifiers, or confidential production data through this site.
        </p>
        <p>
          Basic hosting, analytics, or security logs may be collected by the deployment platform to keep the site available and secure. Those logs are not used to sell personal information.
        </p>
        <p>
          For privacy questions, use the contact route or email link on this site.
        </p>
      </div>
    </section>
  );
}

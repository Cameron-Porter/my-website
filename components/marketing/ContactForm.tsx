'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className='mt-12 text-center'>
        <div className='mx-auto mb-8 inline-flex items-center justify-center gap-3 rounded-full bg-accent-gold/10 py-4 pl-7 pr-8'>
          <span className='flex h-6 w-6 shrink-0 items-center justify-center'>
            <svg
              className='h-5 w-5 text-accent-gold'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2.5}
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          </span>
          <span className='font-heading text-base font-extrabold leading-none text-primary-text'>
            Message Sent
          </span>
        </div>
        <p className='text-sm text-muted-text'>
          Thanks for reaching out. We&apos;ll get back to you at{' '}
          <span className='text-primary-text font-medium'>{email}</span> as soon
          as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='mt-12 space-y-8'>
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type='text'
        name='website'
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete='off'
        aria-hidden='true'
        className='sr-only'
      />

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <Field label='Name' required>
          <TextInput
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your name'
            required
            minLength={2}
            autoComplete='name'
          />
        </Field>
        <Field label='Email' required>
          <TextInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            required
            autoComplete='email'
          />
        </Field>
      </div>

      <Field label='Subject' required>
        <TextInput
          type='text'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder='Bug report, feedback, question...'
          required
          minLength={3}
        />
      </Field>

      <Field label='Message' required>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Tell us what is on your mind...'
          required
          minLength={10}
          rows={5}
          className='w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-primary-text placeholder:text-muted-text/50 outline-none transition-colors focus:border-accent-gold/50 focus:bg-white/8'
        />
      </Field>

      {status === 'error' && (
        <p className='rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400'>
          {errorMsg}
        </p>
      )}

      <button
        type='submit'
        disabled={status === 'submitting'}
        className='w-full h-12 rounded-lg bg-accent-gold text-sm font-bold text-primary-bg transition-all duration-200 hover:bg-accent-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg disabled:cursor-not-allowed disabled:opacity-50'
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      <p className='text-center text-xs text-muted-text/60'>
        Or email us directly at{' '}
        <a
          href='mailto:info@cameron-porter.com'
          className='text-muted-text hover:text-accent-gold transition-colors'
        >
          info@cameron-porter.com
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className='mb-2.5 block text-xs font-semibold uppercase tracking-wider text-muted-text'>
        {label}
        {required && (
          <span className='ml-1 text-accent-gold' aria-hidden='true'>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className='w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-primary-text placeholder:text-muted-text/50 outline-none transition-colors focus:border-accent-gold/50 focus:bg-white/8'
    />
  );
}

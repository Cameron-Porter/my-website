'use client';

/**
 * ResearchPreview — Showcases the Porter Research Engine on the home page.
 *
 * Displays headline, description, four stat items, and a CTA link.
 */

import { BookOpen, Video, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/animations/hooks';

const stats = [
  { icon: BookOpen, value: '10,000+', label: 'Research Papers' },
  { icon: Video, value: '1,000+', label: 'Expert Videos' },
  { icon: Users, value: 'Elite', label: 'Coaching Methods' },
  { icon: Sparkles, value: 'AI', label: 'Synthesized Insights' },
];

export default function ResearchPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className='relative py-20 md:py-28'
      aria-labelledby='research-preview-heading'
    >
      <div className='mx-auto max-w-[1280px] px-6 text-center'>
        <h2
          id='research-preview-heading'
          className='font-heading text-2xl font-extrabold uppercase tracking-tight text-primary-text sm:text-3xl md:text-4xl'
        >
          POWERED BY THE PORTER RESEARCH ENGINE
        </h2>
        <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-text'>
          Our AI references thousands of peer-reviewed studies, coaching
          methodologies, and expert sources to ensure you&apos;re always
          training with the best available evidence.
        </p>

        {/* Stats grid */}
        <div className='mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4'>
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            if (prefersReducedMotion) {
              return (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm'
                >
                  <Icon className='mx-auto h-8 w-8 text-accent-gold' />
                  <div className='mt-3 text-xl font-bold text-primary-text md:text-2xl'>
                    {stat.value}
                  </div>
                  <div className='mt-1 text-xs font-medium uppercase tracking-wider text-muted-text'>
                    {stat.label}
                  </div>
                </div>
              );
            }

            return (
              <motion.div
                key={stat.label}
                className='rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Icon className='mx-auto h-8 w-8 text-accent-gold' />
                <div className='mt-3 text-xl font-bold text-primary-text md:text-2xl'>
                  {stat.value}
                </div>
                <div className='mt-1 text-xs font-medium uppercase tracking-wider text-muted-text'>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className='mt-12'>
          <a
            href='/research'
            className='inline-flex items-center gap-2 text-base font-semibold text-accent-gold transition-colors duration-200 hover:text-accent-gold/80'
          >
            EXPLORE THE RESEARCH ENGINE →
          </a>
        </div>
      </div>
    </section>
  );
}

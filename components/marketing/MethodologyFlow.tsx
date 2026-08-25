'use client';

/**
 * MethodologyFlow — Visual flow diagram showing the GRIT training method.
 *
 * Displays a 4-step flow: YOU TRAIN → AI ANALYZES → ADAPTS → YOU PROGRESS
 * with a CTA to learn more about the methodology.
 */

import {
  Dumbbell,
  Brain,
  RefreshCw,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/animations/hooks';

const steps = [
  { icon: Dumbbell, label: 'YOU TRAIN' },
  { icon: Brain, label: 'YOU RATE IT' },
  { icon: RefreshCw, label: 'G.R.I.T. ADJUSTS' },
  { icon: TrendingUp, label: 'YOU GROW' },
];

export default function MethodologyFlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id='methodology'
      className='relative py-20 md:py-28'
      aria-labelledby='methodology-flow-heading'
    >
      <div className='mx-auto max-w-[1280px] px-6 text-center'>
        <h2
          id='methodology-flow-heading'
          className='font-heading text-2xl font-extrabold uppercase tracking-tight text-primary-text sm:text-3xl md:text-4xl'
        >
          THE G.R.I.T. METHOD
        </h2>
        <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-text'>
          Train, log, rate. Over time G.R.I.T. builds a picture of how your body
          responds — which muscles grow from what volume, which exercises deliver
          the best pump — and feeds that back into your next week&apos;s program.
        </p>

        {/* Flow diagram */}
        <div className='mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-2 md:gap-4'>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className='flex items-center gap-2 sm:gap-4'
              >
                {prefersReducedMotion ? (
                  <div className='flex flex-col items-center gap-3'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-20 md:w-20'>
                      <Icon className='h-7 w-7 text-accent-gold md:h-8 md:w-8' />
                    </div>
                    <span className='text-xs font-bold uppercase tracking-wider text-primary-text md:text-sm'>
                      {step.label}
                    </span>
                  </div>
                ) : (
                  <motion.div
                    className='flex flex-col items-center gap-3'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:h-20 md:w-20'>
                      <Icon className='h-7 w-7 text-accent-gold md:h-8 md:w-8' />
                    </div>
                    <span className='text-xs font-bold uppercase tracking-wider text-primary-text md:text-sm'>
                      {step.label}
                    </span>
                  </motion.div>
                )}
                {i < steps.length - 1 && (
                  <ArrowRight className='hidden h-5 w-5 text-accent-gold/60 sm:block' />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className='mt-12'>
          <a
            href='/methodology'
            className='inline-flex items-center gap-2 text-base font-semibold text-accent-gold transition-colors duration-200 hover:text-accent-gold/80'
          >
            LEARN OUR METHODOLOGY →
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Dumbbell, Flame, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { useReducedMotion } from '@/lib/animations/hooks';
import { cn } from '@/lib/utils';
import { APP_URL } from '@/lib/config/site';
import type { HeroSectionProps } from '@/lib/types/components';

export default function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  const shouldAnimate = !prefersReducedMotion;
  const shouldParallax = shouldAnimate && !isMobile;

  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5',
        className,
      )}
      aria-label='Hero'
    >
      {/* Base dark gradient */}
      <div
        className='absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(20,184,166,0.15),transparent_40%),radial-gradient(ellipse_at_85%_30%,rgba(13,61,63,0.25),transparent_50%),linear-gradient(180deg,#0B0D10_0%,#121821_70%,#1F2531_100%)]'
        aria-hidden='true'
      />

      {/* Tactile noise texture - organic grain */}
      <div
        className='absolute inset-0 opacity-20 pointer-events-none'
        aria-hidden='true'
        style={{
          backgroundImage: `url("/noise.svg")`,
          backgroundSize: '256px 256px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Asymmetric lighting layers */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        style={shouldParallax ? { y: parallaxY } : undefined}
        aria-hidden='true'
      >
        {/* Top-left glow - teal */}
        <div
          className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]'
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.18), transparent 60%)' }}
        />
        {/* Bottom-right glow - warm accent */}
        <div
          className='absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]'
          style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.15), transparent 60%)' }}
        />
        {/* Subtle cool depth layer */}
        <div
          className='absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]'
          style={{ background: 'radial-gradient(circle, rgba(13,61,63,0.2), transparent 60%)' }}
        />
      </motion.div>

      {/* Micro-noise overlay for texture */}
      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        aria-hidden='true'
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content container - asymmetric layout */}
      <motion.div
        className='relative z-10 w-full max-w-[1400px] px-6 py-20 sm:py-24 lg:py-28'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldAnimate ? { duration: 1.2, ease: 'easeOut' } : { duration: 0 }}
      >
        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-16'>
          {/* Left content - text */}
          <div className='flex-1'>
            {/* Brand badge - offset and layered */}
            <motion.div
              className='mb-8 inline-flex items-center gap-2 rounded-full border border-accent-gold/20 bg-accent-gold/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-gold backdrop-blur-sm'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <ShieldCheck className='h-3.5 w-3.5' aria-hidden='true' />
              <span>Porter Performance · G.R.I.T.</span>
            </motion.div>

            {/* Headline - broken grid alignment */}
            <motion.h1
              className='max-w-3xl font-heading text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-primary-text sm:text-6xl md:text-7xl lg:text-8xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ letterSpacing: '-0.035em' }}
            >
              Build muscle with a plan that adapts.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className='mt-6 max-w-2xl text-lg leading-8 text-muted-text md:text-xl md:leading-9'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              G.R.I.T. turns hypertrophy science into a clean mobile workflow: set priorities, generate recoverable multi-week blocks, log every
              set, and adjust training from real performance feedback.
            </motion.p>

            {/* CTA Buttons - staggered arrangement */}
            <motion.div
              className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a
                href={APP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-gold px-8 text-base font-bold text-primary-bg shadow-[0_18px_55px_rgba(20,184,166,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg'
              >
                <span aria-hidden='true'>↗</span>
                Open G.R.I.T.
              </a>
              <a
                href='#methodology'
                className='inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-primary-text backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-gold/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg'
              >
                SEE HOW IT WORKS ⊙
              </a>
            </motion.div>

            {/* Free trial callout */}
            <motion.p
              className='mt-4 text-xs font-medium text-muted-text'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              7-day free trial · No credit card required · Cancel anytime
            </motion.p>

            {/* Stats row - floating cards */}
            <motion.dl
              className='mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                ['MEV–MAV', 'volume guardrails'],
                ['RIR', 'effort targets'],
                ['4-week', 'adaptive blocks'],
              ].map(([value, label], i) => (
                <motion.div
                  key={value}
                  className='rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                >
                  <dt className='text-lg font-extrabold tracking-tight text-primary-text'>{value}</dt>
                  <dd className='mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-text'>{label}</dd>
                </motion.div>
              ))}
            </motion.dl>

            {/* Badges - horizontal row */}
            <motion.div
              className='mt-10'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className='text-xs font-semibold uppercase tracking-[0.15em] text-muted-text'>
                EVERYTHING YOU NEED TO GROW.
              </p>
              <div className='mt-4 flex flex-wrap gap-3'>
                {[
                  { icon: <Dumbbell className='h-4 w-4' />, label: 'Muscle Priority' },
                  { icon: <TrendingUp className='h-4 w-4' />, label: 'Auto Programs' },
                  { icon: <BarChart3 className='h-4 w-4' />, label: 'PR Tracking' },
                  { icon: <Flame className='h-4 w-4' />, label: 'Workout Feedback' },
                  { icon: <Zap className='h-4 w-4' />, label: 'Smart Recovery' },
                ].map(({ icon, label }, i) => (
                  <motion.div
                    key={label}
                    className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85 + i * 0.05, duration: 0.3 }}
                  >
                    <span className='text-accent-gold'>{icon}</span>
                    <span className='text-xs font-medium text-primary-text'>{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - floating elements composition */}
          <div className='hidden lg:flex flex-1 justify-end'>
            <FloatingElements />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/** Floating elements that move independently - breaks template rhythm */
function FloatingElements() {
  const parallaxY = useTransform(
    useScroll().scrollY,
    [0, 600, 1200],
    [0, -40, 20]
  );
  const parallaxX = useTransform(
    useScroll().scrollY,
    [0, 800],
    [0, -30]
  );
  const scale = useTransform(
    useScroll().scrollY,
    [0, 500, 1000],
    [1, 1.05, 0.95]
  );

  return (
    <div className='relative h-[400px] w-[320px]'>
      {/* Phone mockup - floating */}
      <motion.div
        className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1C1C1F] to-[#28282C] shadow-[0_30px_80px_rgba(0,0,0,0.5)]'
        style={{
          width: 280,
          height: 580,
          y: parallaxY,
          scale,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Dynamic island */}
        <div
          className='absolute top-3 left-1/2 -translate-x-1/2'
          style={{ width: 100, height: 28, borderRadius: 20, backgroundColor: '#000' }}
        />

        {/* Progress bar */}
        <div className='h-1 w-full bg-[#28282C]'>
          <div className='h-1 w-[57%] rounded-full bg-[#14B8A6]' />
        </div>

        {/* Workout header */}
        <div className='border-b border-[#28282C] p-3'>
          <div className='flex items-start justify-between'>
            <div>
              <div className='text-xs font-bold leading-4'>
                <span className='text-[#E5E7EB]'>Week 2</span> <span className='text-[#9CA3AF]'>Day 1</span>
              </div>
              <div className='mt-1 text-[#9CA3AF] text-[11px]'>Summer Program</div>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-[#9CA3AF] text-[11px]'>8/14</span>
              <div className='flex items-center gap-1'>
                {[0, 1, 2].map(i => (
                  <div key={i} className='h-1.5 w-1.5 rounded-full bg-[#9CA3AF]' />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exercise cards - staggered */}
        <div className='flex flex-col gap-3 p-2.5'>
          {/* Card 1 */}
          <div className='overflow-hidden rounded-xl bg-[#1C1C1F]'>
            <div className='flex items-start justify-between p-2.5'>
              <div>
                <div className='text-sm font-bold'>Incline Bench Press</div>
                <div className='text-[#9CA3AF] text-[11px]'>Barbell</div>
              </div>
            </div>
            <div className='flex items-center border-b border-[#28282C] p-1.5 text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]'>
              <div className='w-7' />
              <div className='flex-1 text-center'>Weight</div>
              <div className='flex-1 text-center'>Reps</div>
              <div className='w-[44px] text-center'>Log</div>
            </div>
            {[
              { w: '155', r: '10', done: true },
              { w: '155', r: '9', done: true },
              { w: '155', r: '', done: false },
            ].map((row, i) => (
              <div key={i} className='flex items-center gap-1.5 py-1'>
                <div className='w-7 text-[#9CA3AF] text-[10px] text-center'>{i + 1}</div>
                <div className={`flex-1 rounded-lg px-1 text-center text-sm font-semibold ${row.done ? 'bg-[#14B8A6]/18 text-[#14B8A6]' : 'bg-[#28282C] text-[#E5E7EB]'}`}>{row.w}</div>
                <div className={`flex-1 rounded-lg px-1 text-center text-sm font-semibold ${row.r ? 'text-[#E5E7EB]' : 'text-[#9CA3AF]'}`}>{row.r || '–'}</div>
                <div className='flex justify-center'>
                  {row.done ? (
                    <div className='h-5.5 w-5.5 rounded-lg bg-[#14B8A6] flex items-center justify-center'>
                      <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='#0B0D10' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                    </div>
                  ) : (
                    <div className='h-5.5 w-5.5 rounded-lg border-2 border-[#28282C]' />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Card 2 */}
          <div className='overflow-hidden rounded-xl bg-[#1C1C1F]'>
            <div className='flex items-start justify-between p-2.5'>
              <div>
                <div className='text-sm font-bold'>Lateral Raise</div>
                <div className='text-[#9CA3AF] text-[11px]'>Dumbbell</div>
              </div>
            </div>
            <div className='flex items-center border-b border-[#28282C] p-1.5 text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]'>
              <div className='w-7' />
              <div className='flex-1 text-center'>Weight</div>
              <div className='flex-1 text-center'>Reps</div>
              <div className='w-[44px] text-center'>Log</div>
            </div>
            {[
              { w: '30', r: '15', done: true },
              { w: '30', r: '', done: false },
            ].map((row, i) => (
              <div key={i} className='flex items-center gap-1.5 py-1'>
                <div className='w-7 text-[#9CA3AF] text-[10px] text-center'>{i + 1}</div>
                <div className={`flex-1 rounded-lg px-1 text-center text-sm font-semibold ${row.done ? 'bg-[#14B8A6]/18 text-[#14B8A6]' : 'bg-[#28282C] text-[#E5E7EB]'}`}>{row.w}</div>
                <div className={`flex-1 rounded-lg px-1 text-center text-sm font-semibold ${row.r ? 'text-[#E5E7EB]' : 'text-[#9CA3AF]'}`}>{row.r || '–'}</div>
                <div className='flex justify-center'>
                  {row.done ? (
                    <div className='h-5.5 w-5.5 rounded-lg bg-[#14B8A6] flex items-center justify-center'>
                      <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='#0B0D10' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                    </div>
                  ) : (
                    <div className='h-5.5 w-5.5 rounded-lg border-2 border-[#28282C]' />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom FAB */}
        <div className='absolute bottom-12 left-3 right-3 border-t border-[#28282C] bg-[#0B0D10] pt-2'>
          <div className='mx-auto flex h-10 w-full items-center justify-center rounded-xl bg-[#28282C] text-[#9CA3AF] text-sm font-bold'>
            Finish Workout
          </div>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className='absolute -top-8 -right-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/10 to-transparent'
        style={{ opacity: 0.5, x: parallaxX }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className='h-8 w-8 rounded-full bg-accent-gold/20' />
      </motion.div>

      <motion.div
        className='absolute bottom-8 -left-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-sm'
        style={{ opacity: 0.4 }}
        animate={{
          y: [0, 10, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className='h-8 w-8 rounded-full bg-accent-gold/10' />
      </motion.div>
    </div>
  );
}

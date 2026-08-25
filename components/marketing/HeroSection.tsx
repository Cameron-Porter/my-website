'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Dumbbell, Flame, ShieldCheck, TrendingUp } from 'lucide-react';
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
  const parallaxY = useTransform(scrollY, [0, 600], [0, -50]);

  const shouldAnimate = !prefersReducedMotion;
  const shouldParallax = shouldAnimate && !isMobile;

  return (
    <section
      className={cn(
        'relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/5',
        className,
      )}
      aria-label='Hero'
    >
      {/* Background gradient */}
      <div
        className='absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(20,184,166,0.18),transparent_34%),radial-gradient(circle_at_84%_22%,rgba(20,184,166,0.10),transparent_30%),linear-gradient(180deg,#0B0D10_0%,#121821_58%,#1F2531_100%)]'
        aria-hidden='true'
      />

      {/* Decorative lighting effects */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        style={shouldParallax ? { y: parallaxY } : undefined}
        aria-hidden='true'
      >
        <div className='absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-gold/12 blur-[100px] md:h-[500px] md:w-[500px]' />
        <div className='absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-accent-gold/8 blur-[120px] md:h-[600px] md:w-[600px]' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35' />
      </motion.div>

      {/* Content */}
      <motion.div
        className='relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 sm:py-20'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={
          shouldAnimate ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }
        }
      >
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)] lg:items-center'>
          {/* Left content */}
          <div>
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-accent-gold/25 bg-accent-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold shadow-[0_0_40px_rgba(20,184,166,0.14)]'>
              <ShieldCheck className='h-3.5 w-3.5' aria-hidden='true' />
              Porter Performance · G.R.I.T.
            </div>

            {/* Headline */}
            <h1 className='max-w-3xl font-heading text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.045em] text-primary-text sm:text-6xl md:text-7xl lg:text-8xl'>
              Build muscle with a plan that adapts.
            </h1>

            {/* Subheadline */}
            <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-text md:text-xl md:leading-9'>
              G.R.I.T. turns hypertrophy science into a clean mobile workflow:
              set priorities, generate recoverable multi-week blocks, log every
              set, and adjust training from real performance feedback.
            </p>

            {/* CTA Buttons */}
            <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
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
            </div>

            {/* Free trial callout */}
            <p className='mt-4 text-xs font-medium text-muted-text'>
              7-day free trial · No credit card required · Cancel anytime
            </p>

            <dl className='mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3'>
              {[
                ['MEV–MAV', 'volume guardrails'],
                ['RIR', 'effort targets'],
                ['4-week', 'adaptive blocks'],
              ].map(([value, label]) => (
                <div key={value} className='rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm'>
                  <dt className='text-lg font-extrabold tracking-tight text-primary-text'>{value}</dt>
                  <dd className='mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-text'>{label}</dd>
                </div>
              ))}
            </dl>

            {/* Badges */}
            <div className='mt-10'>
              <p className='text-xs font-semibold uppercase tracking-[0.15em] text-muted-text'>
                EVERYTHING YOU NEED TO GROW.
              </p>
              <div className='mt-4 flex flex-wrap gap-4'>
                <Badge icon={<Dumbbell className='h-4 w-4' />} label='Muscle Priority System' />
                <Badge icon={<TrendingUp className='h-4 w-4' />} label='Auto Programs' />
                <Badge icon={<BarChart3 className='h-4 w-4' />} label='PR Tracking' />
                <Badge icon={<Flame className='h-4 w-4' />} label='Workout Feedback' />
              </div>
            </div>
          </div>

          {/* Right side — GRIT app mockup */}
          <div className='flex origin-top justify-center scale-[0.92] sm:scale-100 lg:justify-end'>
            <GritPhoneMockup />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm'>
      <span className='text-accent-gold'>{icon}</span>
      <span className='text-xs font-medium text-primary-text'>{label}</span>
    </div>
  );
}

/** Three small vertical bars representing a muscle priority level */
function PriorityBars({ filled, color }: { filled: 1 | 2 | 3; color: string }) {
  return (
    <div className='flex items-center gap-[2px] mr-1.5'>
      {([1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className='w-[3px] rounded-sm'
          style={{
            height: 10,
            backgroundColor: i <= filled ? color : `${color}40`,
          }}
        />
      ))}
    </div>
  );
}

/** Faithful coded replica of the GRIT workout screen */
function GritPhoneMockup() {
  const bg      = '#111114';
  const surface = '#1C1C1F';
  const surf2   = '#28282C';
  const teal    = '#14B8A6';
  const text    = '#E5E7EB';
  const muted   = '#9CA3AF';
  const pink    = '#EC4899';
  const red     = '#EF4444';

  return (
    <div
      className='relative overflow-hidden shadow-2xl'
      style={{
        width: 280,
        height: 580,
        borderRadius: 44,
        backgroundColor: bg,
        border: '2px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Dynamic island */}
      <div
        className='absolute top-3 left-1/2 -translate-x-1/2'
        style={{ width: 100, height: 28, borderRadius: 20, backgroundColor: '#000' }}
      />

      {/* Teal progress bar */}
      <div style={{ height: 3, backgroundColor: surf2, marginTop: 0 }}>
        <div style={{ height: 3, width: '57%', backgroundColor: teal }} />
      </div>

      {/* Workout header */}
      <div style={{ padding: '12px 16px 10px', borderBottom: `1px solid ${surf2}` }}>
        <div className='flex items-start justify-between'>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={{ color: text }}>Week 2 </span>
              <span style={{ color: muted }}>Day 1</span>
            </div>
            <div style={{ color: muted, fontSize: 11, marginTop: 2 }}>Summer Program</div>
          </div>
          <div className='flex items-center gap-2'>
            <span style={{ color: muted, fontSize: 11 }}>8/14</span>
            <div style={{ width: 18, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: muted }} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ padding: '10px 10px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Exercise card 1 — CHEST / Emphasize */}
        <div style={{ backgroundColor: surface, borderRadius: 12, overflow: 'hidden' }}>
          {/* Badge */}
          <div style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center',
            backgroundColor: `${pink}28`, paddingLeft: 10, paddingRight: 10,
            paddingTop: 4, paddingBottom: 4, borderBottomRightRadius: 8,
          }}>
            <PriorityBars filled={3} color={pink} />
            <span style={{ color: pink, fontSize: 9, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>CHEST</span>
          </div>

          <div style={{ padding: '6px 14px 10px' }}>
            {/* Title row */}
            <div className='flex items-start justify-between mb-1'>
              <div>
                <div style={{ color: text, fontSize: 14, fontWeight: 700 }}>Incline Bench Press</div>
                <div style={{ color: muted, fontSize: 11 }}>Barbell</div>
              </div>
              <div className='flex gap-1'>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke={muted} strokeWidth='2'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>
                </div>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke={muted} strokeWidth='2'><circle cx='12' cy='5' r='1'/><circle cx='12' cy='12' r='1'/><circle cx='12' cy='19' r='1'/></svg>
                </div>
              </div>
            </div>

            {/* Column headers */}
            <div className='flex items-center' style={{ borderBottom: `1px solid ${surf2}`, paddingBottom: 4, marginBottom: 4 }}>
              <div style={{ width: 28 }} />
              <div style={{ flex: 1, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>WEIGHT</div>
              <div style={{ flex: 1, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>REPS</div>
              <div style={{ width: 44, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>LOG</div>
            </div>

            {/* Rows */}
            {[
              { w: '155', r: '10', done: true },
              { w: '155', r: '9',  done: true },
              { w: '155', r: '',   done: false, active: true },
            ].map((row, i) => (
              <div key={i} className='flex items-center' style={{ marginBottom: 4 }}>
                <div style={{ width: 28, color: muted, fontSize: 9, textAlign: 'center' }}>{i + 1}</div>
                <div style={{
                  flex: 1, margin: '0 3px',
                  backgroundColor: row.active ? `${teal}18` : surf2,
                  borderRadius: 6, textAlign: 'center',
                  color: row.active ? teal : text,
                  fontSize: 12, fontWeight: 600, padding: '4px 0',
                  border: row.active ? `1px solid ${teal}50` : '1px solid transparent',
                }}>{row.w}</div>
                <div style={{
                  flex: 1, margin: '0 3px',
                  backgroundColor: row.active ? `${teal}18` : surf2,
                  borderRadius: 6, textAlign: 'center',
                  color: row.active ? teal : (row.r ? text : muted),
                  fontSize: 12, fontWeight: 600, padding: '4px 0',
                  border: row.active ? `1px solid ${teal}50` : '1px solid transparent',
                }}>{row.r || '–'}</div>
                <div style={{ width: 44, display: 'flex', justifyContent: 'center' }}>
                  {row.done ? (
                    <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='#111114' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                    </div>
                  ) : (
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${surf2}` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise card 2 — SHOULDERS / Grow */}
        <div style={{ backgroundColor: surface, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            backgroundColor: `${red}28`, paddingLeft: 10, paddingRight: 10,
            paddingTop: 4, paddingBottom: 4, borderBottomRightRadius: 8,
          }}>
            <PriorityBars filled={2} color={red} />
            <span style={{ color: red, fontSize: 9, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>SHOULDERS</span>
          </div>
          <div style={{ padding: '6px 14px 10px' }}>
            <div style={{ color: text, fontSize: 14, fontWeight: 700 }}>Lateral Raise</div>
            <div style={{ color: muted, fontSize: 11, marginBottom: 6 }}>Dumbbell</div>
            {/* Column headers */}
            <div className='flex items-center' style={{ borderBottom: `1px solid ${surf2}`, paddingBottom: 4, marginBottom: 4 }}>
              <div style={{ width: 28 }} />
              <div style={{ flex: 1, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>WEIGHT</div>
              <div style={{ flex: 1, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>REPS</div>
              <div style={{ width: 44, textAlign: 'center', color: muted, fontSize: 8, fontWeight: 800, letterSpacing: 1 }}>LOG</div>
            </div>
            {[{ w: '30', r: '15', done: true }, { w: '30', r: '', done: false, active: true }].map((row, i) => (
              <div key={i} className='flex items-center' style={{ marginBottom: 4 }}>
                <div style={{ width: 28, color: muted, fontSize: 9, textAlign: 'center' }}>{i + 1}</div>
                <div style={{ flex: 1, margin: '0 3px', backgroundColor: row.active ? `${teal}18` : surf2, borderRadius: 6, textAlign: 'center', color: row.active ? teal : text, fontSize: 12, fontWeight: 600, padding: '4px 0', border: row.active ? `1px solid ${teal}50` : '1px solid transparent' }}>{row.w}</div>
                <div style={{ flex: 1, margin: '0 3px', backgroundColor: row.active ? `${teal}18` : surf2, borderRadius: 6, textAlign: 'center', color: row.active ? teal : (row.r ? text : muted), fontSize: 12, fontWeight: 600, padding: '4px 0', border: row.active ? `1px solid ${teal}50` : '1px solid transparent' }}>{row.r || '–'}</div>
                <div style={{ width: 44, display: 'flex', justifyContent: 'center' }}>
                  {row.done ? (
                    <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='#111114' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                    </div>
                  ) : (
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${surf2}` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Finish Workout button */}
      <div style={{ position: 'absolute', bottom: 52, left: 10, right: 10, borderTop: `1px solid ${surf2}`, backgroundColor: bg, paddingTop: 8 }}>
        <div style={{
          backgroundColor: surf2,
          borderRadius: 12,
          padding: '11px 0',
          textAlign: 'center',
          color: muted,
          fontSize: 13,
          fontWeight: 700,
        }}>
          Finish Workout
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 52, backgroundColor: bg,
        borderTop: `1px solid ${surf2}`,
        display: 'flex', alignItems: 'center',
      }}>
        {[
          { label: 'Workout', active: true,
            icon: <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M6.5 6.5h11M6.5 17.5h11M5 12h14M3 7.5V9a1 1 0 0 0 1 1h1M19 7.5V9a1 1 0 0 1-1 1h-1M3 16.5V15a1 1 0 0 1 1-1h1M19 16.5V15a1 1 0 0 0-1-1h-1'/></svg> },
          { label: 'Programs', active: false,
            icon: <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='3' y='4' width='18' height='18' rx='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/><line x1='8' y1='14' x2='8' y2='14'/><line x1='12' y1='14' x2='12' y2='14'/><line x1='16' y1='14' x2='16' y2='14'/></svg> },
          { label: 'History', active: false,
            icon: <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/><path d='M2.05 11a10 10 0 0 1 4-7.4'/></svg> },
          { label: 'Profile', active: false,
            icon: <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='8' r='4'/><path d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/></svg> },
        ].map((tab) => (
          <div key={tab.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ color: tab.active ? teal : muted }}>{tab.icon}</div>
            <span style={{ color: tab.active ? teal : muted, fontSize: 9, fontWeight: tab.active ? 700 : 500 }}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

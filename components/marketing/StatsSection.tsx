export default function StatsSection() {
  return (
    <section
      className='relative py-20 md:py-28'
      aria-labelledby='stats-heading'
    >
      <div className='mx-auto max-w-[1280px] px-6 text-center'>
        <h2
          id='stats-heading'
          className='font-heading text-2xl font-extrabold uppercase tracking-tight text-primary-text sm:text-3xl md:text-4xl'
        >
          PROGRAMMING THAT WORKS. RESULTS THAT SPEAK.
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-text'>
          Every feature in G.R.I.T. is built around one goal: helping you add muscle
          smarter, not just harder.
        </p>

        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <StatCard value='7-DAY' label='FREE TRIAL' />
          <StatCard value='100%' label='EVIDENCE-BASED' />
          <StatCard value='ADAPTIVE' label='EVERY WEEK' />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className='rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm'>
      <div className='text-3xl font-extrabold text-accent-gold md:text-4xl'>
        {value}
      </div>
      <div className='mt-2 text-sm font-semibold uppercase tracking-wider text-muted-text'>
        {label}
      </div>
    </div>
  );
}

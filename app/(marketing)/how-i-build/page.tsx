import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How I Build',
  description: 'Human-owned engineering decisions, AI-assisted implementation, validation, and privacy boundaries in Cameron Porter’s workflow.',
};

const practices = [
  {
    title: 'Human-owned decisions',
    body: 'I own the problem definition, scope, architectural tradeoffs, and acceptance criteria. Before changing code, I read the existing implementation and project instructions. A plausible solution is not enough: it needs to fit the system and the people using it.',
  },
  {
    title: 'AI as a collaborator',
    body: 'I use Hermes for task organization, implementation assistance, diff review, and test ideas. Delegating a bounded task does not delegate accountability. I review proposed changes and require tests rather than treating generated code or an agent’s completion message as evidence.',
  },
  {
    title: 'Validation before delivery',
    body: 'The working loop is a failing test, a narrow implementation, and a passing test. Then I check the wider suite, lint, types, and production build. For UI work, I also inspect rendered behavior. Local checks, deployed behavior, and real user outcomes are separate claims; one does not prove the others.',
  },
  {
    title: 'Privacy and limits',
    body: 'Keep credentials out of source control and client bundles. Use the minimum context a task needs, and do not publish private employer material as portfolio evidence. Logs, documents, and model outputs are inputs to inspect, not instructions to trust. Review and tests reduce risk; they do not establish that AI is always correct or that a product is safe in every setting.',
  },
];

export default function HowIBuildPage() {
  return (
    <article className='mx-auto max-w-[1100px] px-5 py-16 sm:px-6 md:py-24'>
      <header className='max-w-3xl'>
        <p className='text-sm font-extrabold uppercase tracking-[0.24em] text-accent-blaze'>Process, not autopilot</p>
        <div className='rule-speed mt-4 w-20' aria-hidden='true' />
        <h1 className='mt-6 font-heading text-4xl font-extrabold uppercase tracking-tight text-primary-text sm:text-5xl'>How I build</h1>
        <p className='mt-5 text-lg leading-8 text-muted-text'>Human judgment sets the direction. AI helps with the work. Review and executable checks decide whether a change is ready.</p>
      </header>
      <div className='mt-10 grid gap-5 md:grid-cols-2'>
        {practices.map(({ title, body }, index) => (
          <section key={title} className='cut-sm edge border border-[var(--hairline)] bg-secondary-surface/70 p-7'>
            <p className='text-sm font-extrabold text-accent-alpine' aria-hidden='true'>0{index + 1}</p>
            <h2 className='mt-4 text-xl font-bold text-primary-text'>{title}</h2>
            <p className='mt-4 text-sm leading-7 text-muted-text'>{body}</p>
          </section>
        ))}
      </div>
      <section className='mt-10 cut border border-accent-blaze/40 p-7 md:p-10'>
        <h2 className='font-heading text-2xl font-bold uppercase text-primary-text'>Practice is not a benchmark</h2>
        <p className='mt-4 max-w-3xl leading-8 text-muted-text'>These are workflow practices, not measured AI product evaluations. I am not presenting an evaluation dataset, model accuracy score, or productivity benchmark here. The GRIT case study shows a concrete boundary in inspected code; the Garage describes ongoing exploration with my tools.</p>
        <div className='mt-5 flex flex-wrap gap-6'>
          <Link href='/projects/grit' className='inline-flex min-h-11 items-center font-bold text-accent-blaze underline-offset-4 hover:underline'>Read GRIT case study</Link>
          <Link href='/lab' className='inline-flex min-h-11 items-center font-bold text-accent-alpine underline-offset-4 hover:underline'>Explore the Garage</Link>
        </div>
      </section>
    </article>
  );
}

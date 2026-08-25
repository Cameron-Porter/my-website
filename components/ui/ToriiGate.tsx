'use client';

export function ToriiGate({ 
  className,
  size = 18,
}: { className?: string; size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      {/* Main pillars */}
      <rect x='5' y='2' width='2' height='16' rx='1' />
      <rect x='17' y='2' width='2' height='16' rx='1' />
      {/* Top lintel */}
      <line x1='3' y1='4' x2='21' y2='4' strokeWidth='1.5' />
      {/* Decorative elements - flowing ropes */}
      <path d='M7 6c2 0 2-3 4-3s2 3 4 3' stroke='currentColor' strokeWidth='1' fill='none' opacity='0.6' />
      <path d='M17 6c-2 0-2-3-4-3s-2 3-4 3' stroke='currentColor' strokeWidth='1' fill='none' opacity='0.6' />
    </svg>
  );
}

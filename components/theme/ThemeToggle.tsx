'use client';

import { useSyncExternalStore } from 'react';
import { Lamp } from 'lucide-react';
import { THEME_STORAGE_KEY } from '@/lib/theme/theme-script';

const THEME_CHANGE_EVENT = 'themechange';

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToThemeChanges(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToThemeChanges, getThemeSnapshot, getServerThemeSnapshot);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // localStorage may be unavailable (private mode, disabled storage) — theme just won't persist.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full border border-ink/10 bg-primary-bg/80 backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/60 dark:border-accent-gold/25 dark:shadow-[0_0_36px_rgba(232,184,75,0.35)]'
    >
      <span
        aria-hidden='true'
        className='lantern-glow lantern-breathe pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(232,184,75,0.15),rgba(232,184,75,0.45)_50%,rgba(232,184,75,0.15)_100%)] opacity-0 blur-lg transition-opacity duration-500 dark:opacity-100'
      />
      <Lamp
        aria-hidden='true'
        size={22}
        className='relative z-10 text-muted-text/60 transition-colors duration-300 dark:text-accent-jade dark:drop-shadow-[0_0_12px_rgba(232,184,75,0.9)]'
      />
    </button>
  );
}

'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
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
      title={isDark ? 'Night run — switch to daylight' : 'Daylight — switch to night run'}
      className='cut-sm group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center border border-accent-blaze/40 bg-primary-bg/90 shadow-[var(--glow-blaze-sm)] backdrop-blur-md transition-transform duration-200 hover:scale-105'
    >
      <span
        aria-hidden='true'
        className='pulse-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--blaze-rgb)/0.8),rgb(var(--blaze-rgb)/0.5)_40%,transparent_65%)] opacity-0 blur-sm transition-opacity duration-500 dark:opacity-100'
      />
      {/* Both marks render; the theme class picks one, so the toggle is
          correct on first paint instead of flashing after hydration. */}
      <Sun
        aria-hidden='true'
        size={22}
        className='relative z-10 text-accent-blaze transition-colors duration-300 dark:hidden'
      />
      <Moon
        aria-hidden='true'
        size={22}
        className='relative z-10 hidden text-accent-blaze drop-shadow-[0_0_12px_rgb(var(--blaze-rgb)/0.9)] transition-colors duration-300 dark:block'
      />
    </button>
  );
}

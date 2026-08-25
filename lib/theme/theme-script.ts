export const THEME_STORAGE_KEY = 'theme';

/**
 * Runs synchronously in <head> before hydration so the lantern's lit/unlit
 * state matches the stored (or system) preference on first paint — no flash,
 * no client/server class mismatch for React to fight over.
 */
export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var stored=localStorage.getItem(k);var dark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`;

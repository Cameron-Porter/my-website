import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Fix for html-encoding-sniffer (used by JSDOM) requiring an ESM module in CJS context
    // See: https://github.com/jsdom/jsdom/issues/3363
    server: {
      deps: {
        inline: ["@exodus/bytes"],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});

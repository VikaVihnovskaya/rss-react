import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'node_modules', 'dist'],
    setupFiles: 'setupTests.ts',
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [react()],
  preview: {
    port: 443,
  },
  // for dev
  server: {
    port: 5173,
  },
});
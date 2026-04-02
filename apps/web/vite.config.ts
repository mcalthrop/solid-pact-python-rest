/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // See src/test/vitest-no-jest-dom.ts — prevents vite-plugin-solid from injecting jest-dom.
    setupFiles: ['src/test/vitest-no-jest-dom.ts'],
  },
});

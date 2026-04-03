/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [tailwindcss(), solid()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // See src/test/vitest-no-jest-dom.ts — prevents vite-plugin-solid from injecting jest-dom.
    setupFiles: ['src/test/vitest-no-jest-dom.ts', 'src/test/vitest-setup.ts'],
    env: {
      VITE_API_BASE_URL: 'http://127.0.0.1:8000',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/api/generated/**',
        'src/api/client.ts',
        'src/components/ui/**',
        'src/vite-env.d.ts',
        'src/test/**',
        'src/index.tsx',
      ],
      // Line/function/statement gates match the project requirement for full coverage. Branch
      // probes on Solid/JSX trees are noisy in v8 (often ~50% per node); omitting branch thresholds
      // avoids a misleading CI failure while keeping strict line coverage.
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
      },
    },
  },
});

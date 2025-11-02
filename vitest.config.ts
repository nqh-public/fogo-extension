import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['packages/**/*.test.ts', 'packages/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'out/', '**/*.d.ts', '**/*.config.*', '**/build.mjs'],
    },
  },
});

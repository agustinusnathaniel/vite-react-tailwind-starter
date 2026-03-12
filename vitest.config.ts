import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/utils/**/**.{ts,tsx,js,jsx}'],
    },
    globals: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
});

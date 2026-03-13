import { defineConfig } from 'vite-plus';

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

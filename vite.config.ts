import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import { defineConfig } from 'vite-plus';

const pwaOptions: Partial<VitePWAOptions> = {
  // TODO: enable if you want to enable PWA service worker
  disable: true,
  registerType: 'autoUpdate',
  base: '/',
  manifest: {
    short_name: 'vite-react-tailwind-starter',
    name: 'Vite React App Template',
    theme_color: '#000000',
    lang: 'en',
    start_url: '/',
    background_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
  },
  pwaAssets: {
    disabled: false,
    config: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCheckDisabled = mode === 'production' || !!process.env.VITEST;
  return {
    staged: {
      '*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}': ['ultracite fix'],
    },
    plugins: [
      ValidateEnv(),
      devtools(),
      tanstackRouter({ autoCodeSplitting: true }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      ...(isCheckDisabled
        ? []
        : [
            checker({
              typescript: true,
            }),
          ]),
      VitePWA(pwaOptions),
    ],
    server: {
      open: true,
    },
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      coverage: {
        include: ['src/utils/**/**.{ts,tsx,js,jsx}'],
      },
    },
  };
});

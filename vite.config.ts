import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import tsConfigPaths from 'vite-tsconfig-paths';

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
    plugins: [
      ValidateEnv(),
      tanstackRouter({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
      tsConfigPaths(),
      ...(!isCheckDisabled
        ? [
            checker({
              typescript: true,
            }),
          ]
        : []),
      VitePWA(pwaOptions),
    ],
    server: {
      open: true,
    },
  };
});

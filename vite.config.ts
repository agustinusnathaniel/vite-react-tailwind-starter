import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus';

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  // TODO: enable if you want to enable PWA service worker
  disable: true,
  manifest: {
    background_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    lang: 'en',
    name: 'Vite React App Template',
    prefer_related_applications: false,
    short_name: 'vite-react-tailwind-starter',
    start_url: '/',
    theme_color: '#000000',
  },
  pwaAssets: {
    config: true,
    disabled: false,
  },
  registerType: 'autoUpdate',
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCheckDisabled = mode === 'production' || !!process.env.VITEST;
  const env = loadEnv(mode, process.cwd(), '');
  const isReactCompilerEnabled = env.ENABLE_PLUGIN_REACT_COMPILER === 'true';

  return {
    fmt: {
      // disable vp fmt
      ignorePatterns: ['**/*'],
      singleQuote: true,
    },
    lint: {
      // disable vp check
      ignorePatterns: ['**/*'],
      options: { typeAware: true, typeCheck: true },
    },
    plugins: lazyPlugins(() => [
      ValidateEnv(),
      devtools(),
      tanstackRouter({ autoCodeSplitting: true }),
      react(),
      ...(isReactCompilerEnabled
        ? [
            babel({
              presets: [reactCompilerPreset()],
            }),
          ]
        : []),
      tailwindcss(),
      ...(isCheckDisabled
        ? []
        : [
            checker({
              typescript: true,
            }),
          ]),
      VitePWA(pwaOptions),
    ]),
    resolve: {
      tsconfigPaths: true,
    },
    staged: {
      '*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}': ['ultracite fix'],
    },
    test: {
      coverage: {
        include: ['src/utils/**/**.{ts,tsx,js,jsx}'],
      },
    },
  };
});

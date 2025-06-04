/// <reference types="vite/client" />

type ImportMetaEnvAugmented =
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    typeof import('../env').default
  >;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv extends ImportMetaEnvAugmented {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

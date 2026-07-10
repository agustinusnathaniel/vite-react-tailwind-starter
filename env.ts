import { defineConfig } from '@julr/vite-plugin-validate-env';
import z from 'zod';

export default defineConfig({
  schema: {
    ENABLE_PLUGIN_REACT_COMPILER: z.stringbool().optional(),
    // Example Only: Rename or Set to required when ready
    VITE_API_BASE_URL: z.string().optional(),
    VITE_ENABLE_TANSTACK_DEVTOOLS: z.stringbool().optional(),
  },
  validator: 'standard',
});

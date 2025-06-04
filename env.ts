import { defineConfig } from "@julr/vite-plugin-validate-env";
import z from "zod";

export default defineConfig({
  validator: "standard",
  schema: {
    // Example Only: Rename or Set to required when ready
    VITE_API_BASE_URL: z.string().optional(),
  },
});

import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://marioa96.github.io/',
  base: '07-FEM_mortgage-repayment-calculator',
});
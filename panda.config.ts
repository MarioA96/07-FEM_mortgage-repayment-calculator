import { defineConfig } from '@pandacss/dev'
 
export default defineConfig({
  preflight: true,
  // define the content to scan 👇🏻
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}', './pages/**/*.{ts,tsx,js,jsx,astro}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      breakpoints: {
        xsm: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      tokens: {
        fonts: {
          plusJakartaSans_italic: { value: 'var(--font-plusjakarta-italic), sans-serif' },
          plusJakartaSans_regular: { value: 'var(--font-plusjakarta-regular), sans-serif' },
        }
      }
    }
  }
})
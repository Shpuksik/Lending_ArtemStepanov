/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#080B0F',
        surface: '#0D1218',
        card: '#111820',
        border: '#27323D',
        'text-main': '#F4F7FA',
        'text-secondary': '#A7B1BD',
        'text-muted': '#6F7C89',
        accent: '#5AD7FF',
        'accent-hover': '#82E3FF',
        'button-text': '#041016'
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
};

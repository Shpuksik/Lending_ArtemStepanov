/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#121214',
        card: '#18181D',
        border: '#333338',
        'text-main': '#EDEDED',
        'text-secondary': '#B8C0CC',
        'text-muted': '#7F8794',
        accent: '#38BDF8',
        'accent-hover': '#0EA5E9',
        'button-text': '#020617',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

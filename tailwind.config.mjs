/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#121214',
        card: '#1A1A1E',
        border: '#27272A',
        'text-main': '#EDEDED',
        'text-secondary': '#A1A1AA',
        'text-muted': '#52525B',
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

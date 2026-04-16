import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0E0E0E',
        'blanc-casse': '#F8F6F0',
        'gris-graphite': '#4A4A4A',
        'gris-moyen': '#9A9A9A',
        'gris-clair': '#E8E8E8',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 1s ease forwards',
        'scroll-line': 'scrollLine 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLine: {
          '0%, 100%': { height: '40px', opacity: '1' },
          '50%': { height: '60px', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

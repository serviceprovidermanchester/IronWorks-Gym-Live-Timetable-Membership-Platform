/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff5500',
          dark: '#090d16',
          surface: '#0f172a',
          light: '#fff5f0',
        },
        accent: {
          DEFAULT: '#ff5500',
          light: '#ff7733',
          dark: '#e04400',
          teal: '#14b8a6',
        },
        ink: {
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
          dark: '#090d16',
        },
        muted: '#94a3b8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease both',
        'count-up': 'countUp 1s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

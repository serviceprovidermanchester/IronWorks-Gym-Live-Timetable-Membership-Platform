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
          DEFAULT: '#e4572e',
          dark: '#a8320f',
          light: '#f9e8e3',
        },
        accent: {
          DEFAULT: '#2a9d8f',
          dark: '#1e7268',
        },
        ink: {
          DEFAULT: '#14202b',
          soft: '#2c3e50',
        },
        muted: '#5b6b7a',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f5fb',
          100: '#e6ebf7',
          200: '#c4d1ee',
          300: '#9db3e3',
          400: '#5b7ccc',
          500: '#1e3a8a', // primary navy
          600: '#193270',
          700: '#14295a',
          800: '#0f2046',
          900: '#0b1833',
        },
        gold: {
          50: '#fff9e8',
          100: '#fff1c2',
          200: '#ffe482',
          300: '#ffd84b',
          400: '#ffc81a',
          500: '#e6b400', // primary gold
          600: '#bf9400',
          700: '#997600',
          800: '#735800',
          900: '#4d3a00',
        },
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial'],
      },
    },
  },
  plugins: [],
};




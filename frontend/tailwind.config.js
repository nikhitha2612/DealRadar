/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#050505',
          800: '#0A0A0A',
          700: '#141414',
        },
        indigo: {
          500: '#6366F1',
        },
        emerald: {
          500: '#10B981',
        }
      },
      borderRadius: {
        '3xl': '3rem',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

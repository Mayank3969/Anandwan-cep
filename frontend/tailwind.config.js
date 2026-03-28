/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        forest: {
          light: '#2a6a57',
          DEFAULT: '#1B4D3E',
          dark: '#0f2c23'
        },
        burnt: {
          light: '#e66b1a',
          DEFAULT: '#CC5500',
          dark: '#994000'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

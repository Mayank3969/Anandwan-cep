/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2e7d32', // Earthy Green
          orange: '#ef6c00', // Warm Orange
        }
      }
    },
  },
  plugins: [],
}

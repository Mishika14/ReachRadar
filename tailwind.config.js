/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: {
      nunito: ['Nunito', 'serif'], // Add your Google Font with proper syntax
    },},
  },
  plugins: [],
}
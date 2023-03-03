/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FACC15',
        secondary: '#F87171',
        white: '#FFFFFF',
        black: '#000000'
      },
    },
  },
  plugins: [],
}

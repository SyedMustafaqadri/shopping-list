/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '10px 10px 26px 0px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.placeholder-red-600::placeholder': {
          color: '#ec645b',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
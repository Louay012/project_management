/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
      },
      zIndex: {
        100: '100',
      },
    },
  },
  plugins: [],
}


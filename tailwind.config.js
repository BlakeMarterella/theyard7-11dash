/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        '711-red': '#ed2525',
        '711-orange': '#f4811f',
        '711-green': {
          DEFAULT: '#008062',
          500: '#008062',
        }
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
};

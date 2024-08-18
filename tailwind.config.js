import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        catDarkBurgundy: '#260C1A',
        catDarkMauve: '#432E36',
        catBrown: '#5F4842',
        catTaupe: '#AF8D86',
        catLightCream: '#FFFCD0',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

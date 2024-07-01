/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'disney': ['Disney'],
        'body': ['Allods']
      },
      textColor: {
        'primary': '#dfa955',
        'primary50': '#efde7e',
        'secondary': '#BFBDBDFF',
      },
      colors: {
        'primary': '#f59e0b',
        'primary50': '#efde7e',
        'secondary': '#dddddd',
        'secondary50': '#f1f1f1',
      }
    },
  },
  plugins: [],
}

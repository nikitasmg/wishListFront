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
      colors: {
        'primary': '#9A1750',
        'primary50': '#E3AFBC',
        'secondary': '#E3E2DF',
        'secondary50': '#f1f1f1',
      }
    },
  },
  plugins: [],
}

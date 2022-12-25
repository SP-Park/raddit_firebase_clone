/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: '#4682B4',
        raddit: '#ff3c00'
      },
      backgroundImage: {
        recommendation1: `url('../public/images/4.jpg')`,
        personalHome: `url('../public/images/2.jpg')`,
      }
    },
  },
  plugins: [],
}

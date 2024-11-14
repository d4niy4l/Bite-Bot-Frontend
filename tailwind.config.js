/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sulphur: ['Sulphur Point', 'sans-serif'],
      },
      colors:{
        logoColor: '#00FFCC',
      }
    },
  },
  plugins: [],
}
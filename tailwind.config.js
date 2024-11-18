/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sulphur: ['Sulphur Point', 'sans-serif'],
      },
      colors: {
        logoColor: '#00FFCC',
        themegreen: '#22C55E',
        themeblue: '#3B82F6',
        themered: '#EF4444',
        themeorange: '#EAB308',
        themepurple: '#A855F7',
        themegrey: '#D1D5DB',
      },
    },
  },
  plugins: [],
};

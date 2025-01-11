/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{html,js,jsx,ts,tsx,vue}',],
  theme: {
    extend: {
      colors: {
        customOrange: 'rgb(239, 127, 2)', // Naranja personalizado
        customPurple: 'rgb(116, 1, 182)',  // Morado oscuro
        customGreen: 'rgb(11, 238, 0)', // Verde fluorescente
        customDarkPurple: 'rgb(82, 2, 129)', // Morado más oscurocustomDarkPurple: 'rgb(116, , 250)',
        customDarkGray: 'rgb(40, 40, 40)', // Morado más oscurocustomDarkPurple: 'rgb(116, , 250)', 

      },
    },
  },
  plugins: [],
}

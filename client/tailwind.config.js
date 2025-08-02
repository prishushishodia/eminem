/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        nike: ['Nike Futura ND', 'sans-serif'],
        Helix: ['Helix', 'sans-serif'], // Define your custom font
        Neue: ['Neue', 'sans-serif'],
         Montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
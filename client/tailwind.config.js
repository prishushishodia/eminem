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
  Helix: ['Helix', 'sans-serif'],
  Neue: ['Neue', 'sans-serif'],
  Montserrat: ['Montserrat', 'sans-serif'],
  Nunito: ['"Nunito Sans"', 'sans-serif'],
  Great : ["Great Vibes", 'cursive']
},

    },
  },
  plugins: [],
}
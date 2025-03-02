/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      fontFamily: {
        heading: "'Russo One', sans-serif",
        content: "'Rajdhani', sans-serif"
      },
      colors: {
        'primary': "#228B22",
      },
      keyframes: {
        borderAnimation: {
          '0%': { borderColor: 'red blue blue red' },
          '50%': { borderColor: 'blue red red blue' },
          '100%': { borderColor: 'red blue blue red' },
        },
      },
      animation: {
        border: 'borderAnimation 2s infinite linear',
      },
    },

  },
 
  plugins: [require("daisyui")],
}
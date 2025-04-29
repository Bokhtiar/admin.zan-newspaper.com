/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        content: "'Rajdhani', sans-serif",
        bangla: "'Noto Sans Bengali', sans-serif",
      },
      colors: {
        light: '#F9FAFB',
        dark: '#111827',
        lightCard: '#FFFFFF',
        darkCard: '#1E293B',
        lightBorder: '#E5E7EB',
        darkBorder: '#374151',
        lightTitle: '#1E293B',
        lightPrimary: '#334155',
        lightSecondary: '#64748B',
        lightAccent: '#4F46E5',
        darkAccent: '#6366F1',
        darkTitle: '#F3F4F6',
        darkPrimary: '#E5E7EB',
        darkSecondary: '#9CA3AF',
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
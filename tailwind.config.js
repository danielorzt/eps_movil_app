/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f4511e',
          dark: '#d84315',
        },
        secondary: {
          light: '#2196f3',
          dark: '#1976d2',
        },
        success: {
          light: '#4caf50',
          dark: '#388e3c',
        },
        warning: {
          light: '#ff9800',
          dark: '#f57c00',
        },
        error: {
          light: '#f44336',
          dark: '#d32f2f',
        },
        info: {
          light: '#2196f3',
          dark: '#1976d2',
        },
      },
    },
  },
  plugins: [],
} 
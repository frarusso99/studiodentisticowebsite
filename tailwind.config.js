/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A828F',
          dark: '#233539',
          light: '#AFCDD5',
          medium: '#2E545D',
        }
      },
      fontFamily: {
        'display': ['Arimo', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'brand': ['Seasons', 'sans-serif'],
        'redhat': ['Red Hat Display', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],  
        'urbanist': ['Urbanist', 'sans-serif'],
        'worksans': ['Work Sans', 'sans-serif'], 
        'mulish': ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

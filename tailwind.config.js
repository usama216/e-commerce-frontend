/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biomed-teal': '#4FC3E0',
        'biomed-navy': '#1E3A8A',
        'biomed-blue': '#2563EB',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-celeste': '#7CDAF9',
        'custom-celeste-variant': '#0ABCF9',
        'custom-warning': '#FFDE59',
        'custom-grey':'#D9D9D9',
        'custom-red':'#FF4040',
        'custom-yellow':'#FFB340',
        'custom-green':'#307B15'
      }
    },
  },
  plugins: [],
}


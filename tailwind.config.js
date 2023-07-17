/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#ebe3a5',
        'yellow-light': '#f9f7dc',
        'yellow-deep': '#91793e',
        green: '227483',
        'green-light': '#60b7c7'
      }
    }
  },

  plugins: []
}

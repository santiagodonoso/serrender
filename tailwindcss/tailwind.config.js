/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../views/*.*", "../js/*.*"],
  theme: {
    extend: {
      screens: {
        'sm': '500px',
      }  
    },
  },
  plugins: [],
}


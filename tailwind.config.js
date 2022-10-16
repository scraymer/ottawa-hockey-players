/** @type {import('tailwindcss').Config} */

/* eslint-env es6 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  mode: 'jit',
  plugins: [
    require('@tailwindcss/forms')
  ],
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}'
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    }
  }
}

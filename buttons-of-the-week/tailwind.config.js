/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Roboto Serif', 'ui-serif', 'Georgia', 'serif'],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {
      fontFamily: {
        serif: ['Roboto Serif', 'ui-serif', 'Georgia', 'serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        bold: '700',
      }
    }
  },
  plugins: [],
}
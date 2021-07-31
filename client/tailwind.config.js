module.exports = {
  purge: ['./src/*{.js}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        reddit_orange: '#f54404',
        reddit_red: '#f54404',
        reddit_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1a',
          brightest: '#272728',
        },
        reddit_border: {
          DEFAULT: '#343536',
        },
        reddit_text: {
          DEFAULT: 'rgb(215, 218, 220)',
          darker: '#818384',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

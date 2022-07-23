module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          200: '#FFEBAA',
          300: '#FFC632',
          400: '#EAB300',
          500: '#EA7500',
        },
        gradient: {
          100: 'linear-gradient(270deg, #EAB300 0%, #EA7500 100%)',
        },
        gray: {
          1: '#CCD7FF',
          'transparent-1': 'rgba(255, 255, 255, 0.2)',
          'transparent-2': 'rgba(255, 255, 255, 0.05)',
        },
        black: '#000',
        patterns: {
          opacities: {
            100: '1',
            80: '.80',
            60: '.60',
            40: '.40',
            20: '.20',
            10: '.10',
            5: '.05',
          },
          sizes: {
            1: '0.25rem',
            2: '0.5rem',
            4: '1rem',
            6: '1.5rem',
            8: '2rem',
            16: '4rem',
            20: '5rem',
            24: '6rem',
            32: '8rem',
          },
        },
      },
      fontFamily: {
        base: 'Inter, sans-serif',
        secondary: 'Dosis, sans-serif',
        roboto: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

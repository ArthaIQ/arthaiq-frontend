/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A5F',
        accent: '#2E86AB',
        gold: '#D4A017',
        'score-high': '#16A34A',
        'score-mid': '#F59E0B',
        'score-low': '#DC2626',
        surface: '#F8FAFC',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(30, 58, 95, 0.08), 0 1px 2px -1px rgba(30, 58, 95, 0.08)',
      },
    },
  },
  plugins: [],
}

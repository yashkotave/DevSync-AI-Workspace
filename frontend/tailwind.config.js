import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5C6BC0',
        surface: '#F7F8FA',
        card: '#FFFFFF',
        border: '#E8EAED'
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.08)',
        pop: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }
  },
  plugins: [forms]
};

module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.jsx',
    ],
    safelist: [
      'from-blue-200',
      'from-red-200',
      'from-indigo-200',
      'from-yellow-200',
      'to-blue-100',
      'to-red-100',
      'to-indigo-100',
      'to-yellow-100',
      'border-blue-600',
      'border-red-600',
      'border-indigo-600',
      'border-yellow-600',
      'from-green-500',
      'from-purple-500',
      'from-blue-500',
      'from-grey-500',
      'bg-blue-600',
      'bg-red-600',
      'bg-indigo-600',
      'bg-yellow-600',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

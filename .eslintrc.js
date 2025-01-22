module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off', // Disable prop-types validation (if you don't use them)
    'no-unused-vars': 'off', // Disable no-unused-vars rule (you can adjust this based on your preference)
    camelcase: 'off' // Disable camelcase enforcement (if this is your style)
  }
}

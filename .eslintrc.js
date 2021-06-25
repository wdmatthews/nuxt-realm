module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  rules: {
    'no-console': 'off',
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'operator-linebreak': ['error', 'before'],
    'node/no-exports-assign': 'off',
  },
}

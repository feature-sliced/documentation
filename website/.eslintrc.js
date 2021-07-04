module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    '@eslint-kit/patch',
    '@eslint-kit/base',
    '@eslint-kit/react',
    '@eslint-kit/prettier',
  ],
  parser: 'babel-eslint',
}

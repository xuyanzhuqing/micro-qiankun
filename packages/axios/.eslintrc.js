/* eslint-env node */
module.exports = {
  env: {
    browser: true, // https://juejin.cn/post/7144174159021473829
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"]
  }
};
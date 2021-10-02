module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "no-debugger": "off",
    "camelcase": "off",
    "no-use-before-define": "off"
  },
  globals: {}
};

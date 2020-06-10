module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:node/recommended',
    'plugin:import/errors',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    "import/prefer-default-export": [0],
    'prettier/prettier': 'error',
    "node/no-unsupported-features/es-syntax": ["error", {
      "ignores": ["modules"]
    }],
    "import/prefer-default-export": [0]
  },
}

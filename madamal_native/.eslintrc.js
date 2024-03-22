module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-native/all',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.native.js'],
      },
    },
  },
  plugins: ['unused-imports'],
  rules: {
    // Add any project-specific rules or overrides here
    'prettier/prettier': 1,
    'unused-imports/no-unused-imports': 'error',
  },
};

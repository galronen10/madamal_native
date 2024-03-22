module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-native/all',
    'prettier',
    'plugin:prettier/recommended',
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
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.native.js'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  plugins: ['unused-imports', 'prefer-arrow'],
  rules: {
    // Add any project-specific rules or overrides here
    'prettier/prettier': 1,
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prefer-const': 'error', // Enforce use of const for all declarations
    'arrow-body-style': ['error', 'as-needed'], // Enforce arrow function syntax
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};

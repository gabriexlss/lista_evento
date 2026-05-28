const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

const nodeGlobals = {
  process: 'readonly',
  console: 'readonly',
  module: 'readonly',
  require: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  exports: 'readonly',
  global: 'readonly',
  Buffer: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
};

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: nodeGlobals,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
];

// eslint.config.mjs
import eslint from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Specify TypeScript files to lint
    languageOptions: {
      parser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Allows modern ECMAScript features
        sourceType: 'module', // Allows using imports
        ecmaFeatures: {
          jsx: true, // Enable JSX support if using React
        },
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      'no-unused-vars': 'warn', // Warns about unused variables
      '@typescript-eslint/no-explicit-any': 'warn', // Warns on using `any`
      'prefer-const': 'error', // Suggests using const for variables that are never reassigned
      'no-console': 'warn', // Warns about console.log statements
    },
  },
];

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/out/**',
      '**/*.vsix',
      '**/coverage/**',
      '**/.vitest-cache/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Node.js globals for VSCode extension
        NodeJS: 'readonly',
        // DOM globals for tests and core package
        document: 'readonly',
        window: 'readonly',
        Element: 'readonly',
        HTMLElement: 'readonly',
        URL: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'off', // Extensions need console for logging
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-console': 'off',
    },
  },
  {
    // Chrome extension specific files
    files: ['apps/chrome/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        // Chrome extension APIs
        chrome: 'readonly',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];

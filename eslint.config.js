import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser, // Add this line for TypeScript support
      parserOptions: {
        tsconfigRootDir: './',
        project: ['./tsconfig.json'], // Specify your tsconfig
      },
    },
    plugins: {
      react: pluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

import pluginNext from '@next/eslint-plugin-next'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'arrow-body-style': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': 'warn',
      'no-nested-ternary': 'error',
      'no-magic-numbers': 'error',
      'no-useless-return': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'warn',
      'require-await': 'warn',
      'simple-import-sort/imports': 'error',
      'sort-keys': 'warn',
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['warn', 2],
      '@stylistic/jsx-sort-props': 'error',
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
]

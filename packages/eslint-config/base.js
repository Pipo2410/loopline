// import eslintConfigPrettier from 'eslint-config-prettier'
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import onlyWarn from 'eslint-plugin-only-warn'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const gitignorePath = resolve(__dirname, '../../.gitignore')

export const config = [
  includeIgnoreFile(gitignorePath),
  // eslintPluginPrettierRecommended,
  // eslintConfigPrettier,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules/*', '.next/*'],
    plugins: {
      turbo: turboPlugin,
      '@typescript-eslint': tseslint.plugin,
      onlyWarn,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
    ignores: ['dist/**'],
  },
]

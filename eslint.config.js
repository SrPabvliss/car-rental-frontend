import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress/flat'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import importHelpersPlugin from 'eslint-plugin-import-helpers'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [ '**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'src/components/ui/**/*' ],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ],
  },

  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    ignores: [ '**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'src/components/ui/**/*' ],
    plugins: {
      'import-helpers': importHelpersPlugin
    },
    rules: {
      'import-helpers/order-imports': ['warn', {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@/components/',
          '/^@/composables/',
          '/^@/stores/',
          '/^@/types/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }],

      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'off',

      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
    }
  },

  skipFormatting,
]

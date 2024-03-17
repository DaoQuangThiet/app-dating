module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended', // https://github.com/storybookjs/eslint-plugin-storybook#readme
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  root: true,
  rules: {
    'simple-import-sort/imports': ['warn', { groups: [['^[^.]', '^']] }],
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowFunctionsWithoutTypeParameters: true,
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'angle-bracket',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
  },
}

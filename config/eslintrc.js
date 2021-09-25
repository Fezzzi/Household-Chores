const webpackAliases = require('./webpack-aliases')

module.exports = {
  extends: [
    'react-app',
    'standard-with-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    project: [
      './tsconfig.json',
      './tsconfig-*.json',
    ],
  },
  rules: {
    'no-shadow': 0,
    'no-bitwise': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'default-case': 0,
    'no-fallthrough': 0,
    'no-else-return': 0,
    'global-require': 0,
    'no-return-assign': 0,
    'multiline-ternary': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'no-empty-function': 0,
    'no-confusing-arrow': 0,
    'no-mixed-operators': 0,
    'no-restricted-syntax': 0,
    'prefer-destructuring': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'no-useless-constructor': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'lines-between-class-members': 0,

    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-await-in-loop': 1,

    'semi': [2, 'never'],
    'indent': [2, 2, { 'SwitchCase': 1, 'ignoredNodes': ['TemplateLiteral *'] }],
    'max-len': [2, { code: 160, tabWidth: 2 }],
    'quote-props': [2, 'as-needed', { unnecessary: false }],
    'comma-style': [2, 'last', { exceptions: { 'ArrowFunctionExpression': false } }],
    'comma-dangle': [2, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'arrow-parens': [2, 'as-needed'],
    'operator-linebreak': [2, 'before'],
    'generator-star-spacing': [2, 'after'],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 1, maxBOF: 0 }],

    'import/named': 0,
    'import/no-anonymous-default-export': 0,

    'import/first': 1,
    'import/extensions': [1, { js: 'never', ts: 'never', jsx: 'never', tsx: 'never' }],

    'import/order': [2, {
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling'],
      ],
      pathGroups: [{
        pattern: 'assets/**',
        group: 'internal',
        position: 'before',
      }],
      'newlines-between': 'always-and-inside-groups',
    }],
    'import/default': 2,
    'import/no-cycle': 2,
    'import/no-useless-path-segments': [2, { noUselessIndex: true }],

    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackAliases,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      rules: {
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/explicit-function-return-type': 0,

        // todo: Might be handy to enable some of these during refactoring
        '@typescript-eslint/return-await': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/promise-function-async': 0,
        '@typescript-eslint/restrict-template-expressions': 0,

        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/member-delimiter-style': [2, { multiline: { delimiter: 'none' } }],
        '@typescript-eslint/prefer-nullish-coalescing': 2,
      },
    }, {
      files: ['./src/api/resources/**/*.ts', './src/shared/locales/**/*.ts'],
      rules: {
        'max-len': 0,
      },
    },
  ],
}

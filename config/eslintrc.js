const webpackAliases = require('./webpack-aliases.config')

const tsRules = {
  'no-unused-vars': 0,
  '@typescript-eslint/ban-ts-ignore': 0,
  '@typescript-eslint/no-var-requires': 0,
  '@typescript-eslint/no-use-before-define': 0,

  '@typescript-eslint/ban-types': 1,
  '@typescript-eslint/no-namespace': 1,
  '@typescript-eslint/no-this-alias': 1,
  '@typescript-eslint/no-misused-new': 1,
  '@typescript-eslint/no-for-in-array': 1,
  '@typescript-eslint/class-name-casing': 1,
  '@typescript-eslint/no-empty-function': 1,
  '@typescript-eslint/no-empty-interface': 1,
  '@typescript-eslint/no-inferrable-types': 1,
  '@typescript-eslint/no-array-constructor': 1,
  '@typescript-eslint/interface-name-prefix': 1,
  '@typescript-eslint/no-useless-constructor': 1,
  '@typescript-eslint/member-delimiter-style': 1,
  '@typescript-eslint/triple-slash-reference': 1,
  '@typescript-eslint/type-annotation-spacing': 1,
  '@typescript-eslint/prefer-namespace-keyword': 1,
  '@typescript-eslint/consistent-type-assertions': 1,
  '@typescript-eslint/adjacent-overload-signatures': 1,

  '@typescript-eslint/no-unused-vars': 2,
  '@typescript-eslint/prefer-nullish-coalescing': 2,
}

module.exports = {
  extends: [
    'eslint-config-airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    mocha: true,
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
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'no-empty-function': 0,
    'no-confusing-arrow': 0,
    'no-mixed-operators': 0,
    'prefer-destructuring': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'lines-between-class-members': 0,

    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-await-in-loop': 1,

    'semi': [2, 'never'],
    'max-len': [2, { code: 160, tabWidth: 2 }],
    'quote-props': [2, 'as-needed', { unnecessary: false }],
    'comma-dangle': [2, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'arrow-parens': [2, 'as-needed'],
    'operator-linebreak': [2, 'before'],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 1, maxBOF: 0 }],

    'import/first': 1,
    'import/named': 1,
    'import/extensions': [1, { js: 'never', ts: 'never', tsx: 'never' }],
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,

    'import/order': [2, {
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling'],
      ],
      pathGroups: [{
        pattern: '~/**',
        group: 'internal',
        position: 'before',
      }],
      'newlines-between': 'always',
    }],
    'import/default': 2,
    'import/no-cycle': 2,
    'import/no-useless-path-segments': [2, { noUselessIndex: true }],

    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,

    'jsx-a11y/anchor-is-valid': 1,

    'react/no-multi-comp': 0,
    'react/no-danger': 0,
    'react/sort-comp': 0,
    'react/jsx-no-bind': 0,
    'react/button-has-type': 0,
    'no-useless-constructor': 0,
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,

    'react/jsx-wrap-multilines': [2, {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
    }],
    'react/no-access-state-in-setstate': 2,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
  ],
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: ['node_modules', 'code'],
    },
    'import/resolver': {
      webpack: {
        config: webpackAliases,
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        ...tsRules,
      },
    }, {
      files: ['*.js', '*.jsx'],
      parser: 'babel-eslint',
    },
  ],
}

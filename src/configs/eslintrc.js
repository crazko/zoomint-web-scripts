module.exports = {
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb', // With React rules
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
    'import/no-default-export': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': 'off',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
  // TODO: this has to be overriden in the top level config
  // Issue: https://github.com/eslint/eslint/issues/11558, https://github.com/eslint/eslint/pull/12887
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'off',
      },
    },
  ],
};

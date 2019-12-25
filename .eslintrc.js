module.exports = {
  env: {
    node: true,
  },
  extends: ['./src/configs/eslintrc.js'],
  overrides: [
    {
      files: ['*.js', 'src/configs/*.js'],
      rules: {
        'import/no-commonjs': 'off',
        'import/no-nodejs-modules': 'off',
      },
    },
  ],
};

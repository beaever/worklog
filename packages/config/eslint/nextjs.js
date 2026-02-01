const reactConfig = require('./react.js');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...reactConfig,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],

  plugins: [
    'import',
    'jest',
  ],

  parser: 'babel-eslint',

  env: {
    jest: true,
  },

  rules: {
    'import/no-extraneous-dependencies': [2, {  }],
    semi: [2, 'never'],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
}

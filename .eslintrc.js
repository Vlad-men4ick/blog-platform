module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'react/state-in-constructor': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/prop-types': 0,
    'no-plusplus': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // indent: ['error', 2],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    camelcase: 'off',
    'class-methods-use-this': 0,
    'no-console': 0,
    'no-use-before-define': 0,
    quotes: ['error', 'single'],
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/order': [
      'error',
      {
        groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
      },
    ],
  },
  settings: {
    version: 'detect',
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
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
    'no-console': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-param-reassign': 0,
  },
  settings: {
    react: {
      version: 'latest',
    },
    // Module import path mapping
    'import/resolver': {
      typescript: {},
    },
  },
  globals: {
    JSX: true,
  },
  // This rule is not part of the recommended set of rules in the
  // 'eslint-plugin-react' package, it is not a standard eslint rule.
  // Fix for 'Function component is not a function' error
  // This was a bug in the airbnb configuration versions 18.2.1 to 19.0.2
  'react/function-component-definition': [
    2,
    {
      namedComponents: 'function-declaration',
    },
  ],
}

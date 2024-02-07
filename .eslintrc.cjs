module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'comma-dangle': ['warn', {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    'constructor-super': 'error',
    'jsx-quotes': ['warn', 'prefer-single'],
    'no-console': 'warn',
    'no-self-assign': 'warn',
    'prefer-const': 'error',
    'react/prop-types': 'off',
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single']
  }
}

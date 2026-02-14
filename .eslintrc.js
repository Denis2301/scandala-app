module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    env: {
        browser: true,
        es2023: true,
        node: true,
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier',
        'simple-import-sort'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended' // <- важно для совместимости Prettier + ESLint
    ],
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-fallthrough': 'error',
        'react/react-in-jsx-scope': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^@?\\w'],            // React + node_modules
                    ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$'], // абсолютные алиасы
                    ['^\\.\\./'],                     // родительские папки
                    ['^\\./']                         // текущая папка
                ]
            }
        ],
        'simple-import-sort/exports': 'error'
    },
    settings: {
        react: { version: 'detect' },
    },
};

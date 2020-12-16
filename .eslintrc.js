module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'no-unused-vars': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'global-require': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            }
        ],
    }
};

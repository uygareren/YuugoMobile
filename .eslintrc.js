module.exports = {
    env: {
        browser: true,
        es2021: true,
        "react-native/react-native": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "react-native"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                singleQuote: false, // Çift tırnak kullanımını zorla
                // semi: true, // Noktalı virgül kullanımını zorla
                // trailingComma: 'all', // Satır sonu virgülü kullanımını zorla
                printWidth: 120, // Yazdırma genişliğini belirle
                tabWidth: 2, // Sekme genişliğini belirle
                endOfLine: "off",
                jsxBracketSameLine: false,
            },
        ],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "object-curly-spacing": ["error", "always"],
    },
};

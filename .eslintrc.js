module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "@eslint-kit/patch",
        "@eslint-kit/base",
        "@eslint-kit/react",
        "prettier",
    ],
    plugins: ["@typescript-eslint"],
    rules: {
        // Sometime harmful =(
        "react/jsx-props-no-spreading": 0,
        // For external links
        "react/jsx-no-target-blank": 2,
        // For perfomance
        "react/jsx-no-bind": [
            2,
            {
                ignoreDOMComponents: true,
                ignoreRefs: true,
                allowArrowFunctions: false,
                allowFunctions: false,
                allowBind: false,
            },
        ],
        "linebreak-style": [2, "unix"],
        "import/no-unresolved": [
            2,
            {
                ignore: [
                    "^@theme",
                    "^@docusaurus/plugin-content-docs/client",
                    "astro:content",
                ],
            },
        ],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@site", "."],
                    [
                        "@docusaurus",
                        "./node_modules/@docusaurus/core/lib/client/exports",
                    ],
                    [
                        "@theme",
                        "./node_modules/@docusaurus/theme-classic/src/theme",
                    ],
                ],
                extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
            },
        },
    },
};

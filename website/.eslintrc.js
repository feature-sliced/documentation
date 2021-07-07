module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    extends: ["@eslint-kit/patch", "@eslint-kit/base", "@eslint-kit/react", "@eslint-kit/prettier"],
    parser: "babel-eslint",
    rules: {
        // Sometime harmful =(
        "react/jsx-props-no-spreading": 0,
        "linebreak-style": [2, "unix"],
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@site", "."],
                    ["@docusaurus", "./node_modules/@docusaurus/core/lib/client/exports"],
                    ["@theme", "./node_modules/@docusaurus/theme-classic/src/theme"],
                ],
                extensions: [".js", ".jsx", ".json"],
            },
        },
    },
};

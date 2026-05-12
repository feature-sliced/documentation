module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    extends: ["prettier"],
    plugins: ["@typescript-eslint"],
    rules: {
        "linebreak-style": [2, "unix"],
        "import/no-unresolved": [
            2,
            {
                ignore: ["astro:content"],
            },
        ],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
    },
};

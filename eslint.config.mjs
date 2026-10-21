import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            ".github",
            "public/",
            ".workflows",
            "**/*.d.ts",
        ],
    },
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            "linebreak-style": [2, "unix"],
        },
    },
];

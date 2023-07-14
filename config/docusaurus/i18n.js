const { DEFAULT_LOCALE } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["i18n"]} */
const i18n = {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["ru", "en", "uz"],
    localeConfigs: {
        ru: {
            label: "Русский",
        },
        en: {
            label: "English",
        },
        uz: {
            label: "O'zbekcha",
        },
    },
};

module.exports = { i18n };

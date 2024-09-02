const { DEFAULT_LOCALE } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["i18n"]} */
const i18n = {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["ru", "en", "uz", "kr"],
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
        kr: {
            label: "한국어",
        },
    },
};

module.exports = { i18n };

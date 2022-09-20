const { DEFAULT_LOCALE } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["i18n"]} */
const i18n = {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["ru", "en"],
    localeConfigs: {
        ru: {
            label: "Русский",
        },
        en: {
            label: "English",
        },
    },
};

module.exports = { i18n };

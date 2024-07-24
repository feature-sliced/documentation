/**
 * @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["metadata"]}
 * @see https://docusaurus.io/docs/api/themes/configuration#meta-image
 * @see https://docusaurus.io/docs/api/themes/configuration#metadata
 */
const metadata = [
    { name: "keywords", content: "architecture, frontend, project structure" },
    { name: "twitter:site", content: "@feature_sliced" },
    { name: "twitter:card", content: "summary_large_image" },
    // NOTE: uncomment if need
    // { name: "description", content: description },
    // { name: "og:image", content: `/img/preview.png` }, // ~ inherits from themeConfig.image
    // { name: "og:title", content: title },
    // { name: "og:type", content: "website" },
    // { name: "og:description", content: description },
    // { name: "twitter:image", content: `/img/preview.png` }, // ~ inherits from themeConfig.image
    // { name: "twitter:title", content: title },
    // { name: "twitter:description", content: description },
];

module.exports = { metadata };

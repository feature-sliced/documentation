const fs = require("fs");
const sha1 = require("sha1");
const { getTemplates } = require("./template");
const { createLayoutLayers } = require("./layout");
const { createFontsMapFromTemplates } = require("./font");
const { createImagesMapFromTemplates, getTemplateImageId } = require("./image");
const { getConfig } = require("./config");
const { getTemplateNameByRules } = require("./rules");

module.exports = function ({ templatesDir }) {
    const initData = bootstrap(templatesDir);
    if (!initData) {
        console.error("OpenGraph plugin exit with error.");
        return;
    }

    const { config } = initData;

    return {
        name: "docusaurus-plugin-open-graph-image",
        async postBuild({ plugins, outDir, i18n }) {
            const docsPlugin = plugins.find(
                (plugin) => plugin.name === "docusaurus-plugin-content-docs",
            );

            if (!docsPlugin) throw new Error("Docusaurus Doc plugin not found.");

            const previewOutputDir = `${outDir}\\${config.outputDir}`;
            fs.mkdir(previewOutputDir, { recursive: true }, (error) => {
                if (error) throw error;
            });

            const docsContent = docsPlugin.content;
            const docsVersions = docsContent.loadedVersions;
            docsVersions.forEach((version) => {
                const { docs } = version;

                docs.forEach((document) => {
                    generateImageFromDoc(initData, document, i18n.currentLocale, previewOutputDir);
                });
            });
        },
    };
};

function bootstrap(templatesDir) {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return;

    if (!templatesDir) {
        console.error("Wrong templatesDir option.");
        return;
    }

    const templates = getTemplates(templatesDir);
    if (!templates) return;

    const config = getConfig(templatesDir);
    if (!config) return;

    // TODO: File not found exception?
    const fonts = createFontsMapFromTemplates(templates);
    const images = createImagesMapFromTemplates(templates);

    return { templates, config, fonts, images };
}

async function generateImageFromDoc(initData, doc, locale, outputDir) {
    const { templates, config, images, fonts } = initData;
    const { id, title } = doc;

    const hashFileName = sha1(id + locale);

    const templateName = getTemplateNameByRules(id, config.rules);

    const template = templates.find((template) => template.name === templateName);

    const previewImage = await images.get(getTemplateImageId(template)).clone();

    const previewFont = fonts.get(template.params.font);

    const textLayers = createLayoutLayers(
        doc,
        template.params.layout,
        previewFont,
        config.textWidthLimit,
    );

    try {
        await previewImage.composite(textLayers);
        await previewImage
            .jpeg({
                quality: config.quality,
                chromaSubsampling: "4:4:4",
            })
            .toFile(`${outputDir}\\${hashFileName}.jpg`);
    } catch (error) {
        console.error(error, id, title, hashFileName);
    }
}

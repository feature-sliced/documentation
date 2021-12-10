const fs = require("fs");
const sha1 = require("sha1");
const { getTemplates } = require("./template");
const { validateTemplate } = require("./utils");
const { createLayoutLayers } = require("./layout");
const { createFontsMapFromTemplates } = require("./font");
const { createImagesMapFromTemplates, getTemplateImageId } = require("./image");
const { getConfig } = require("./config");
const { getTemplateNameByRules } = require("./rules");

module.exports = function (context, { templatesDir }) {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return;

    if (!templatesDir) {
        console.error("Wrong templatesDir option.");
        return;
    }

    const templates = getTemplates(templatesDir);
    if (!templates.some(validateTemplate)) {
        return;
    }

    const config = getConfig(templatesDir);
    if (!config) return;

    // TODO: File not found exception?
    const fonts = createFontsMapFromTemplates(templates);
    const images = createImagesMapFromTemplates(templates);

    async function generateImageFromDoc(doc, locale, outputDir) {
        const { id, title } = doc;

        const hashFileName = sha1(id + locale);

        const templateName = getTemplateNameByRules(id, config.rules);

        const template = templates.find((item) => item.name === templateName);

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

    return {
        name: "docusaurus-plugin-open-graph-image",
        async postBuild({ plugins, outDir, i18n }) {
            const docsPlugin = plugins.find(
                (plugin) => plugin.name === "docusaurus-plugin-content-docs",
            );

            const previewOutputDir = `${outDir}\\${config.outputDir}`;
            fs.mkdir(previewOutputDir, { recursive: true }, (error) => {
                if (error) throw error;
            });

            if (docsPlugin) {
                const docsContent = docsPlugin.content;
                const docsVersions = docsContent.loadedVersions;
                docsVersions.forEach((version) => {
                    const { docs } = version;

                    docs.forEach((item) => {
                        generateImageFromDoc(item, i18n.currentLocale, previewOutputDir);
                    });
                });
            }
        },
    };
};

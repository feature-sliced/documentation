const { mkdir } = require("fs/promises");
const { resolve } = require("path");
const sha1 = require("sha1");
const { getTemplates } = require("./template");
const { createLayoutLayers } = require("./layout");
const { createFontsMapFromTemplates } = require("./font");
const { createImagesMapFromTemplates, getTemplateImageId } = require("./image");
const { getConfig } = require("./config");
const { getTemplateNameByRules } = require("./rules");
const { Logger } = require("./utils");

module.exports = function (_, { templatesDir }) {
    return {
        name: "docusaurus-plugin-og",
        async postBuild({ plugins, outDir, i18n }) {
            Logger.info(`OG: work in progress.`);

            const initData = await bootstrap(templatesDir);
            if (!initData) {
                Logger.err("OpenGraph plugin exit with error.");
                return;
            }

            Logger.ok(`OG: initialization complete.`);

            const { config } = initData;

            const docsPlugin = plugins.find(
                (plugin) => plugin.name === "docusaurus-plugin-content-docs",
            );

            if (!docsPlugin)
                throw new Error("Docusaurus Doc plugin not found.");

            const previewOutputDir = resolve(outDir, config.outputDir);

            try {
                await mkdir(previewOutputDir, { recursive: true });
            } catch (error) {
                Logger.err(error);
                return;
            }
            Logger.ok(`OG: assets output folder created.`);

            const docsContent = docsPlugin.content;
            const docsVersions = docsContent.loadedVersions;
            docsVersions.forEach((version) => {
                const { docs } = version;
                docs.forEach((document) => {
                    generateImageFromDoc(
                        initData,
                        document,
                        i18n.currentLocale,
                        previewOutputDir,
                    );
                });
            });
        },
    };
};

async function bootstrap(templatesDir) {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return;

    if (!templatesDir) {
        Logger.err("Wrong templatesDir option.");
        return;
    }

    const templates = await getTemplates(templatesDir);
    if (!templates) return;

    const config = await getConfig(templatesDir);
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

    const template = templates.find(
        (template) => template.name === templateName,
    );

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
            .toFile(resolve(outputDir, `${hashFileName}.jpg`));
        Logger.ok(`Generated: ${hashFileName}.jpg`);
    } catch (error) {
        Logger.err(`${error}
            DocumentID: ${id}
            Title: ${title}
            Hash: ${hashFileName}
            Path: ${resolve(outputDir, `${hashFileName}.jpg`)}`);
    }
}

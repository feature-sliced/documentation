const fs = require("fs");
const crypto = require("crypto");
const getTemplates = require("./template");
const { validateTemplate } = require("./utils");
const { createLayoutLayers } = require("./layout");
const { createFontsMapFromTemplates } = require("./font");
const { createImagesMapFromTemplates } = require("./image");

module.exports = function (context, { templatesDir }) {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return;

    if (!templatesDir) {
        console.error("Wrong templatesDir option.");
        return;
    }

    const templates = getTemplates(templatesDir);
    if (!templates.some(validateTemplate)) {
        console.error("Template validation error.");
        return;
    }

    const fonts = createFontsMapFromTemplates(templatesDir, templates);
    const images = createImagesMapFromTemplates(templatesDir, templates);

    return {
        name: "docusaurus-plugin-open-graph-image",
        async postBuild({ plugins, outDir, i18n }) {
            const docsPlugin = plugins.find(
                (plugin) => plugin.name === "docusaurus-plugin-content-docs",
            );

            const previewOutputDir = `${outDir}\\assets\\og\\`;
            fs.mkdir(previewOutputDir, { recursive: true }, (error) => {
                if (error) throw error;
            });

            if (docsPlugin) {
                const docsContent = docsPlugin.content;
                const docsVersions = docsContent.loadedVersions;
                docsVersions.forEach((version) => {
                    const { docs } = version;

                    async function generateImageFromDoc(doc) {
                        const { id, title } = doc;

                        // use basic
                        const template = templates.find((item) => item.name === "basic");

                        const previewImage = await images
                            .get(`${template.name}_${template.params.image}`)
                            .clone();

                        const previewFont = fonts.get(template.params.font);

                        const textLayers = createLayoutLayers(
                            doc,
                            template.params.layout,
                            previewFont,
                        );

                        await previewImage.composite(textLayers);

                        const shaOne = crypto.createHash("sha1");
                        const hashFileName = shaOne.update(id + i18n.currentLocale).digest("hex");
                        console.log("Generating: " + title + " " + id, hashFileName);

                        try {
                            await previewImage
                                .jpeg({
                                    // TODO: Quality from config.json
                                    quality: 80,
                                    chromaSubsampling: "4:4:4",
                                })
                                .toFile(`${previewOutputDir}\\${hashFileName}.jpg`);
                        } catch (error) {
                            console.log(error, id, title, hashFileName);
                        }
                    }

                    docs.forEach((item) => {
                        generateImageFromDoc(item);
                    });
                });
            }
        },
    };
};

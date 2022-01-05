const { resolve } = require("path");
const { readdir, readFile } = require("fs/promises");
const { object, string, number, array, is, optional } = require("superstruct");
const { objectFromBuffer, Logger } = require("./utils");

const dirIgnore = ["config.json"];

async function getTemplates(templatesDir, encode = "utf8") {
    try {
        const allDirFiles = await readdir(templatesDir);
        const templatesDirNames = allDirFiles.filter((fileName) => !dirIgnore.includes(fileName));

        const templates = await Promise.all(
            templatesDirNames.map(async (templateName) => {
                const templateBuffer = await readFile(
                    resolve(templatesDir, templateName, "template.json"),
                    encode,
                );

                return {
                    name: templateName,
                    path: templatesDir,
                    params: objectFromBuffer(templateBuffer),
                };
            }),
        );

        if (!templates.some(validateTemplate)) {
            Logger.err("Templates validation error.");
            return;
        }

        return templates;
    } catch (error) {
        Logger.err(error);
    }
}

// TODO: May be with postEffects, images and etc? (optional fontSize, fill and etc)
const Layout = object({
    type: optional(string()),
    name: string(),
    fill: optional(string()),
    stroke: optional(string()),
    top: optional(number()),
    left: optional(number()),
    transform: optional(string()),
    fontSize: optional(number()),
    fontWeight: optional(number()),
});

const Template = object({
    image: string(),
    font: string(),
    layout: array(Layout),
});

function validateTemplate({ params }) {
    return is(params, Template);
}

module.exports = { getTemplates };

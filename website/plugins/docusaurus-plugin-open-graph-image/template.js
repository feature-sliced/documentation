const { resolve } = require("path");
const { readdir, readFile } = require("fs/promises");
const { object, string, number, array, is } = require("superstruct");
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
    type: string(),
    name: string(),
    fontSize: number(),
    fill: string(),
    stroke: string(),
    top: number(),
    left: number(),
});

const Template = object({
    image: string(),
    font: string(),
    layout: array(Layout),
});

function validateTemplate({ params }) {
    if (is(params, Template)) {
        if (params.layout.length === 0) return false;

        return params.layout.reduce((validationResult, layout) => {
            if (!is(layout, Layout)) return false;
            return validationResult;
        }, true);
    }

    return false;
}

module.exports = { getTemplates };

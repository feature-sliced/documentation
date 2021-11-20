const fs = require("fs");
const { objectFromBuffer } = require("./utils");

const dirIgnore = ["config.json"];

function getTemplates(templatesDir, encode = "utf8") {
    const templatesDirNames = fs
        .readdirSync(templatesDir)
        .filter((item) => !dirIgnore.includes(item));

    // TODO: check file exist
    return templatesDirNames.map((templateName) => ({
        name: templateName,
        path: templatesDir,
        params: objectFromBuffer(
            fs.readFileSync(`${templatesDir}\\${templateName}\\template.json`, encode),
        ),
    }));
}

module.exports = { getTemplates };

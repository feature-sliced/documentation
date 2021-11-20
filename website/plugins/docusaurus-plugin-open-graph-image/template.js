const fs = require("fs");
const { objectFromBuffer } = require("./utils");

const dirIgnore = ["config.json"];

module.exports = exports = function getTemplates(templatesDir, encode = "utf8") {
    const templatesDirNames = fs
        .readdirSync(templatesDir)
        .filter((item) => !dirIgnore.includes(item));

    return templatesDirNames.map((templateName) => ({
        name: templateName,
        params: objectFromBuffer(
            fs.readFileSync(`${templatesDir}\\${templateName}\\template.json`, encode),
        ),
    }));
};

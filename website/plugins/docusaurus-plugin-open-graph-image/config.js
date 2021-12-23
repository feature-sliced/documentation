const { readFile } = require("fs/promises");
const { object, string, number, array, is } = require("superstruct");
const { objectFromBuffer } = require("./utils");

async function getConfig(path, encode = "utf-8") {
    try {
        const config = objectFromBuffer(await readFile(`${path}\\config.json`, encode));

        if (!validateConfig(config)) {
            console.error("Config validation error");
            return;
        }

        return config;
    } catch (error) {
        console.error(error);
    }
}

const Rule = object({
    name: string(),
    priority: number(),
    pattern: string(),
});

const Config = object({
    outputDir: string(),
    textWidthLimit: number(),
    quality: number(),
    rules: array(Rule),
});

function validateConfig(config) {
    if (is(config, Config)) {
        return config.rules.reduce((validationResult, rule) => {
            if (!is(rule, Rule)) return false;
            return validationResult;
        }, true);
    }
    return false;
}

module.exports = { getConfig };

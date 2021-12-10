const fs = require("fs");
const { object, string, number, array, is } = require("superstruct");
const { objectFromBuffer } = require("./utils");

function getConfig(path, encode = "utf-8") {
    const config = objectFromBuffer(fs.readFileSync(`${path}\\config.json`, encode));
    if (!validateConfig(config)) {
        console.error("Config validation error");
        return;
    }
    return config;
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
        return config.rules.reduce((acc, item) => {
            if (!is(item, Rule)) return false;
            return acc;
        }, true);
    }
    return false;
}

module.exports = { getConfig };

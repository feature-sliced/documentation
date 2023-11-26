const { resolve } = require("path");
const { readFile } = require("fs/promises");
const { object, string, number, array, is } = require("superstruct");
const { objectFromBuffer, Logger } = require("./utils");

async function getConfig(configPath, encode = "utf-8") {
    try {
        const config = objectFromBuffer(
            await readFile(resolve(configPath, "config.json"), encode),
        );

        if (!validateConfig(config)) {
            Logger.err("Config validation error");
            return;
        }

        return config;
    } catch (error) {
        Logger.err(error);
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
    return is(config, Config);
}

module.exports = { getConfig };

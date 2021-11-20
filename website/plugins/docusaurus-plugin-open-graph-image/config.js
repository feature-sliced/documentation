const fs = require("fs");
const { objectFromBuffer, validateConfig } = require("./utils");

function getConfig(path, encode = "utf-8") {
    const config = objectFromBuffer(fs.readFileSync(`${path}\\config.json`, encode));
    if (!validateConfig(config)) {
        console.error("Config validation error");
        return;
    }
    return config;
}
module.exports = { getConfig };

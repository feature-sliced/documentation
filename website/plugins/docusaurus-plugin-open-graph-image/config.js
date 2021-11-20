const fs = require("fs");
const { objectFromBuffer, validateConfig } = require("./utils");

module.exports.getConfig = function (path, encode = "utf-8") {
    const config = objectFromBuffer(fs.readFileSync(`${path}\\config.json`, encode));
    if (!validateConfig(config)) {
        console.error("Config validation error");
        return;
    }
    return config;
};

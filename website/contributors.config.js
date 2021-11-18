const fs = require("fs");
const path = require("path");

const contributorsPath = path.resolve("..", ".all-contributorsrc");
const contributorsData = JSON.parse(fs.readFileSync(contributorsPath, "utf-8"));

module.exports = {
    contributorsData,
};

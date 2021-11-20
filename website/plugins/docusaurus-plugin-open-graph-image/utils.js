const { number, string, is, object, array } = require("superstruct");

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

module.exports.validateTemplate = function ({ params }) {
    if (is(params, Template)) {
        if (params.layout.length === 0) return false;

        return params.layout.reduce((acc, item) => {
            if (!is(item, Layout)) return false;
            return acc;
        }, true);
    }
    console.error("Template validation error.");
    return false;
};

module.exports.objectFromBuffer = function objectFromBuffer(buffer) {
    return JSON.parse(buffer.toString());
};

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

module.exports.validateConfig = function (config) {
    if (is(config, Config)) {
        return config.rules.reduce((acc, item) => {
            if (!is(item, Rule)) return false;
            return acc;
        }, true);
    }
    return false;
};

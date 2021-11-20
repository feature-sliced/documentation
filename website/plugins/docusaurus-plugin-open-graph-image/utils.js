const { number, string, is, object, array } = require("superstruct");

const Template = object({
    image: string(),
    font: string(),
    layout: array(),
});

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

module.exports.validateTemplate = function ({ params }) {
    if (is(params, Template)) {
        if (params.layout.length === 0) return false;

        return params.layout.reduce((acc, item) => {
            if (!is(item, Layout)) return false;
            return acc;
        }, true);
    }
    return false;
};

module.exports.objectFromBuffer = function objectFromBuffer(buffer) {
    return JSON.parse(buffer.toString());
};

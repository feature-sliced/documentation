const { resolve } = require("path");
const textToSVG = require("text-to-svg");

function createFontsMapFromTemplates(templates) {
    const fonts = new Map();
    templates.forEach((template) => {
        if (!fonts.has(template.params.font)) {
            fonts.set(
                template.params.font,
                textToSVG.loadSync(resolve(template.path, template.name, template.params.font)),
            );
        }
    });
    return fonts;
}

function createSVGText(
    font,
    text,
    { fontSize = 72, fill = "white", stroke = "white" },
    widthLimit = 1000,
) {
    const attributes = { fill, stroke };
    const options = { fontSize, anchor: "top", attributes };
    // Remove all emoji from text
    const filteredText = text.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "",
    );

    return font.getSVG(filteredText, options);
}
module.exports = { createSVGText, createFontsMapFromTemplates };

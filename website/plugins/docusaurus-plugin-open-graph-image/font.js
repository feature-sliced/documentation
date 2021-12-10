const textToSVG = require("text-to-svg");

function createFontsMapFromTemplates(templates) {
    const fonts = new Map();
    templates.forEach((template) => {
        if (!fonts.has(template.params.font)) {
            fonts.set(
                template.params.font,
                textToSVG.loadSync(`${template.path}\\${template.name}\\${template.params.font}`),
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

    /* If font width more than widthLimit => scale font width to ~90% of widthLimit */
    if (widthLimit) {
        const { width } = font.getMetrics(text, options);
        if (width > widthLimit)
            options.fontSize = Math.trunc((fontSize * 0.9) / (width / widthLimit));
    }

    return font.getSVG(text, options);
}
module.exports = { createSVGText, createFontsMapFromTemplates };

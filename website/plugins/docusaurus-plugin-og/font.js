const { resolve } = require("path");
const { getFontFace } = require("./svg");

function createFontsMapFromTemplates(templates) {
    const fonts = new Map();
    templates.forEach((template) => {
        if (!fonts.has(template.params.font)) {
            // trunc file extension
            const fontName = template.params.font.slice(0, -4);
            fonts.set(template.params.font, {
                name: fontName,
                declaration: getFontFace(
                    fontName,
                    resolve(template.path, template.name, template.params.font),
                ),
            });
        }
    });
    return fonts;
}

module.exports = { createFontsMapFromTemplates };

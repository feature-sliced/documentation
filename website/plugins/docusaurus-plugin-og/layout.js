const { Logger } = require("./utils");
const { textToSVG } = require("./svg");

function createLayoutLayers(doc, layout, previewFont, textWidthLimit) {
    /* Check for all layers names exist in doc fields */
    if (layout.some((layer) => !doc[layer.name])) {
        Logger.err(`Wrong template config.`);
        return;
    }

    return layout.map((layer) => {
        const layoutOptions = {
            fontSize: layer.fontSize,
            fill: layer.fill,
            stroke: layer.stroke,
            transform: layer.transform,
            fontWeight: layer.fontWeight,
        };

        return {
            input: Buffer.from(
                textToSVG(previewFont, doc[layer.name], layoutOptions, textWidthLimit),
            ),
            top: layer.top || 0,
            left: layer.left || 0,
        };
    });
}

module.exports = { createLayoutLayers };

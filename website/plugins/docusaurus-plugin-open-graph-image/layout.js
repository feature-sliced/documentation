const { createSVGText } = require("./font");

function createLayoutLayers(doc, layout, previewFont, textWidthLimit) {
    const layers = layout.map((layer) => {
        if (!doc[layer.name]) {
            console.error(`Wrong template config? Doc property ${layer.name} not found.`);
            return undefined;
        }

        const layoutOptions = {
            fontSize: layer.fontSize,
            fill: layer.fill,
            stroke: layer.stroke,
        };

        return {
            input: Buffer.from(
                createSVGText(previewFont, doc[layer.name], layoutOptions, textWidthLimit),
            ),
            top: layer.top,
            left: layer.left,
        };
    });

    if (layers.includes(undefined)) return;

    return layers;
}

module.exports = { createLayoutLayers };

const { createSVGText } = require("./font");

function createLayoutLayers(doc, layout, previewFont, textWidthLimit) {
    const layers = layout.map((item) => {
        if (!doc[item.name]) {
            console.error(`Wrong template config? Doc property ${item.name} not found.`);
            return undefined;
        }

        const layoutOptions = {
            fontSize: item.fontSize,
            fill: item.fill,
            stroke: item.stroke,
        };

        return {
            input: Buffer.from(
                createSVGText(previewFont, doc[item.name], layoutOptions, textWidthLimit),
            ),
            top: item.top,
            left: item.left,
        };
    });

    if (layers.includes(undefined)) return;

    return layers;
}

module.exports = { createLayoutLayers };

const XMLSpecifiedSymbols = [
    { from: "&", to: "&amp;" },
    { from: ">", to: "&gt;" },
    { from: "<", to: "&lt;" },
];

// prevent errors while parsing XML svg object
function isolateXMLSpecifiedSymbols(text) {
    return XMLSpecifiedSymbols.reduce(
        (result, char) => result.replace(new RegExp(char.from), char.to),
        text,
    );
}

function SVGText(text, font) {
    return `
    <text
    xmlns="http://www.w3.org/2000/svg"
    style="
                font-family:${font.name}; 
                font-size: ${font.fontSize};
                font-weight: ${font.fontWeight};
                "
    transform="${font.transform}"
    fill="${font.fill}"
    stroke="${font.stroke}"
  >
    ${isolateXMLSpecifiedSymbols(text)}
  </text>`;
}

function getFontFace(fontName, path) {
    return `<font>
                <font-face font-family="${fontName}">
                    <font-face-src>
                        <font-face-uri xlink:href="file://${path}" />
                    </font-face-src>
                </font-face>
            </font>`;
}

function getTextWidth(text, options) {
    return ((options.fontSize * 400) / options.fontWeight) * 0.9 * text.length;
}

function textToSVG(font, text, options, widthLimit = 1300, textPaddingTop = -70) {
    const filteredText = text.replace(
        /([\u2700-\u27BF]|[[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF])/g,
        "",
    );

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${widthLimit}" height="${600}">`;
    svg += font.declaration;

    if (getTextWidth(text, options) > widthLimit) {
        const reformat = filteredText.split(" ").reduce(
            (acc, cur) => {
                if (getTextWidth(`${acc.temp} ${cur}`, options) < widthLimit) {
                    return { ...acc, temp: `${acc.temp} ${cur}` };
                }

                return {
                    temp: cur,
                    result: [...acc.result, acc.temp],
                };
            },
            {
                temp: "",
                result: [],
            },
        );
        svg += SVGText(reformat.temp, {
            ...options,
            name: font.name,
        });
        for (let i = reformat.result.length - 1; i >= 0; i--) {
            svg += SVGText(reformat.result[i], {
                ...options,
                transform: `${options.transform} translate(0, ${
                    (reformat.result.length - i) * textPaddingTop
                })`,
                name: font.name,
            });
        }

        console.error(filteredText, reformat.result, reformat.temp);
    } else svg += SVGText(filteredText, { ...options, name: font.name });
    svg += `</svg>`;

    return svg;
}

module.exports = { textToSVG, getFontFace };

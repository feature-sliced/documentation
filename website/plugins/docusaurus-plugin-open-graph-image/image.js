const sharp = require("sharp");

function createImagePipeline(file) {
    // TODO: Apply effects, compression and etc.
    // TODO: File validation?
    return sharp(file);
}

// TODO: save folder path to templates?
function createImageFromTemplate(templatesDir, { name, params }) {
    return createImagePipeline(`${templatesDir}\\${name}\\${params.image}`);
}

module.exports.createImagesMapFromTemplates = function (templatesDir, templates) {
    const images = new Map();
    templates.forEach((item) => {
        if (!images.has(item.params.image)) {
            images.set(
                `${item.name}_${item.params.image}`,
                createImageFromTemplate(templatesDir, item),
            );
        }
    });
    return images;
};

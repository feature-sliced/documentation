const sharp = require("sharp");

function createImagePipeline(file) {
    // TODO: Apply effects, compression and etc.
    // TODO: File validation?
    return sharp(file);
}

function createImageFromTemplate({ path, name, params }) {
    return createImagePipeline(`${path}\\${name}\\${params.image}`);
}

module.exports.createImagesMapFromTemplates = function (templates) {
    const images = new Map();
    templates.forEach((item) => {
        if (!images.has(`${item.name}_${item.params.image}`)) {
            images.set(`${item.name}_${item.params.image}`, createImageFromTemplate(item));
        }
    });
    return images;
};

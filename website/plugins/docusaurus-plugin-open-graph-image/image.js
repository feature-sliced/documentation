const sharp = require("sharp");

function getTemplateImageId(template) {
    return `${template.name}_${template.params.image}`;
}

function createImagePipeline(file) {
    // TODO: Apply effects, compression and etc.
    // TODO: File validation?
    return sharp(file);
}

function createImageFromTemplate({ path, name, params }) {
    return createImagePipeline(`${path}\\${name}\\${params.image}`);
}

function createImagesMapFromTemplates(templates) {
    const images = new Map();
    templates.forEach((template) => {
        const imageId = getTemplateImageId(template);

        if (!images.has(imageId)) {
            images.set(imageId, createImageFromTemplate(template));
        }
    });
    return images;
}

module.exports = { createImagesMapFromTemplates, getTemplateImageId };

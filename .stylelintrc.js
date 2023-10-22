module.exports = {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended",
        "stylelint-config-recess-order",
    ],
    rules: {
        "color-hex-length": "long",
        "at-rule-no-unknown": true,
        "selector-class-pattern": null,
    },
};

module.exports = {
    // TODO: add later
    // plugins: [
    //     "stylelint-scss"
    // ],
    extends: [
        "stylelint-config-standard",
        "stylelint-config-recommended",
        "stylelint-config-recess-order",
    ],
    rules: {
        "indentation": 4,
        "color-hex-length": "long",
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true
    },
}

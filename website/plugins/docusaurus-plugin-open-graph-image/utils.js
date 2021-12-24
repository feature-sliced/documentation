const pc = require("picocolors");

function objectFromBuffer(buffer) {
    return JSON.parse(buffer.toString());
}

const Logger = {
    info(text) {
        // eslint-disable-next-line no-console
        console.log(pc.bgYellow(pc.black(`! ${text}`)));
    },
    ok(text) {
        // eslint-disable-next-line no-console
        console.log(pc.bgGreen(pc.black(`\u2714 ${text}`)));
    },
    err(text) {
        console.error(pc.bgRed(pc.black(`\u274C ${text}`)));
    },
};

module.exports = { objectFromBuffer, Logger };

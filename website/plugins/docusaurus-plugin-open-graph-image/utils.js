function objectFromBuffer(buffer) {
    return JSON.parse(buffer.toString());
}

module.exports = { objectFromBuffer };

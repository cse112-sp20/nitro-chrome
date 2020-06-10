/* global module:writable */
function sortPointsAsc(map) {
    return new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
}

module.exports = sortPointsAsc;
/* global module:writable */
function sortNameDesc(map) {
    return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

module.exports = sortNameDesc;
/* global module:writable */
function sortNameAsc(map) {
    return new Map([...map.entries()].sort((a, b) => b[0].localeCompare(a[0])));
}

module.exports = sortNameAsc;
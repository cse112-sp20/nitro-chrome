/* global module:writable */

function productivity(completed, required){
    let decimal = completed / (completed + required);
    return (decimal * 100).toFixed(0);
}
module.exports = productivity;
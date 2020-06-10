/* global require:writable, test:writable, expect:writable */
const productivity = require("./productivity");

let completed = 150;
let required  = 400;
let answer = "27";
test('test calculation of productivity score', () => {
  expect(productivity(completed, required)).toBe(answer);
});
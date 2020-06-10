/* global require:writable, test:writable, expect:writable */
const sortNameDesc = require("./sortNameDesc");

let unsorted = new Map();
let answer = new Map();
unsorted.set("BarFoo", 314);
unsorted.set("DevOps", 55);
unsorted.set("Ipsum", 61);
unsorted.set("Backend", 0);
unsorted.set("Frontend", 9);
unsorted.set("Lorem", 25);

answer.set("Lorem", 25);
answer.set("Ipsum", 61);
answer.set("Frontend", 9);
answer.set("DevOps", 55);
answer.set("BarFoo", 314);
answer.set("Backend", 0);

test('sort map of name:points in descending order of name', () => {
  expect(sortNameDesc(unsorted)).toEqual(answer);
});
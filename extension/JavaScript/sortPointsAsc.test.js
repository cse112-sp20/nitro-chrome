/* global require:writable, test:writable, expect:writable */
const sortPointsAsc = require("./sortPointsAsc");

let unsorted = new Map();
let answer = new Map();
unsorted.set("teamA", 9);
unsorted.set("teamB", 55);
unsorted.set("teamC", 0);

answer.set("teamC", 0);
answer.set("teamA", 9);
answer.set("teamB", 55);

test('sort map of name:points in ascending order of points', () => {
  expect(sortPointsAsc(unsorted)).toEqual(answer);
});

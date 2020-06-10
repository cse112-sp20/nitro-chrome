/* global require:writable, test:writable, expect:writable */
const checkNull = require("./checkNull");

test('test whether functions correctly return null', () => {
  expect(checkNull()).toBeNull();
});

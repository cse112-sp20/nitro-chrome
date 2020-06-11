/* global require:writable, test:writable, expect:writable */
const checkDark = require("./checkDark");

test('test checking for string equality for toggling dark/light mode', () => {
  expect(checkDark()).toBe("dark");
});

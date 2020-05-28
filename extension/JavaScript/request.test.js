/* eslint-disable no-undef */
const request = require('./request');

test('send GET request, expect 200 status', () => {
  expect(request("http://ec2-54-227-1-34.compute-1.amazonaws.com/")).toBe(200);
});

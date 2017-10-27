const lowerCase = require('./lowerCase');
const lowercase = require('./lowercase');

test('lowerCase exports lowercase', () => {
  expect(lowerCase).toBe(lowercase);
});

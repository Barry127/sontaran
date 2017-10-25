const isInt = require('./isInt');
const isInteger = require('./isInteger');

test('isInt exports isInteger', () => {
  expect(isInt).toBe(isInteger);
});

const isNan = require('./isNan');
const isNaN = require('./isNaN');

test('isNan exports isNaN', () => {
  expect(isNan).toBe(isNaN);
});

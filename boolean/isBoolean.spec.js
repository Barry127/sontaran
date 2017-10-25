const isBoolean = require('./isBoolean');

test('isBoolean returns a function', () => {
  expect(isBoolean()).toBeInstanceOf(Function);
});

describe('Valid booleans', () => {
  const validator = isBoolean();

  const validBooleans = [
    true,
    false
  ];

  validBooleans.forEach(boolean => {
    test(`${boolean} is a boolean`, () => {
      expect(validator(boolean)).toBe(true);
    });
  });
});

describe('Invalid booleans', () => {
  const validator = isBoolean();

  const invalidBooleans = [
    -1,
    0,
    1,
    'true',
    'false',
    null,
    undefined
  ];

  invalidBooleans.forEach(boolean => {
    test(`${boolean} is not a boolean`, () => {
      expect(validator(boolean)).toBe(false);
    });
  });
});

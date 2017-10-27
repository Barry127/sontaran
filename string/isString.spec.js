const isString = require('./isString');

test('isString returns a function', () => {
  expect(isString()).toBeInstanceOf(Function);
});

describe('Valid strings', () => {
  const validator = isString();

  const validStrings = [
    'aaa',
    'Hello World!',
    'Something'
  ];

  validStrings.forEach(string => {
    test(`${string} is a string`, () => {
      expect(validator(string)).toBe(true);
    });
  });
});

describe('Invalid strings', () => {
  const validator = isString();

  const invalidStrings = [
    true,
    null,
    undefined,
    5,
    0xFF
  ];

  invalidStrings.forEach(string => {
    test(`${string} is not a string`, () => {
      expect(validator(string)).toBe(false);
    });
  });
});

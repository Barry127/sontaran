const isInteger = require('./isInteger');

test('isInteger returns a function', () => {
  expect(isInteger()).toBeInstanceOf(Function);
});

describe('Valid integers', () => {
  const validIntegers = [
    42,
    -3
    ,0
    -0,
    0xFF,
    3.1E12,
    0b011,
    6.00,
    0o55
  ];

  validIntegers.forEach(value => {
    test(`${value} is an integer`, () => {
      expect(isInteger()(value)).toBe(true);
    });
  });
});

describe('Invalid integers', () => {
  const invalidIntegers = [
    3.33,
    Math.PI,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  invalidIntegers.forEach(value => {
    test(`${value} is not an integer`, () => {
      expect(isInteger()(value)).toBe(false);
    });
  })
});

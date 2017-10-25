const isNumber = require('./isNumber');

test('isNumber returns a function', () => {
  expect(isNumber()).toBeInstanceOf(Function);
});

describe('Valid numbers', () => {
  const validator = isNumber();

  const validNumbers = [
    42,
    -3,
    0,
    3.33,
    -5.2,
    Math.PI,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    0xFF,
    3.1e+12,
    0b011,
    0o55,
    32e-4
  ];

  validNumbers.forEach(number => {
    test(`${number} is a number`, () => {
      expect(validator(number)).toBe(true);
    });
  });
});

describe('Invalid numbers', () => {
  const validator = isNumber();

  const invalidNumbers = [
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  invalidNumbers.forEach(number => {
    test(`${number} is not a number`, () => {
      expect(validator(number)).toBe(false);
    });
  });
});

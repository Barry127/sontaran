const isNegative = require('./isNegative');

test('isNegative returns a function', () => {
  expect(isNegative()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    -3,
    -0xCC,
    -2.1E+3,
    Number.NEGATIVE_INFINITY,
    -6.00,
    -0o32
  ];

  validValues.forEach(value => {
    test(`${value} is negative`, () => {
      expect(isNegative()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const validValues = [
      0,
      (-0),
      3.33,
      Number.NaN,
      Number.POSITIVE_INFINITY
    ];

    validValues.forEach(value => {
      test(`${value} is not negative`, () => {
        expect(isNegative()(value)).toBe(false);
      });
    });
});

const isPositive = require('./isPositive');

test('isPositive returns a function', () => {
  expect(isPositive()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    42,
    0xCA,
    4.3E6,
    Number.POSITIVE_INFINITY,
    6.0,
    0o43
  ];

  validValues.forEach(value => {
    test(`${value} is positive`, () => {
      expect(isPositive()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const validValues = [
      0,
      (-0),
      -3,
      -0xCC,
      -2.1E+3,
      Number.NEGATIVE_INFINITY,
      -6.00,
      -0o32,
      Number.NaN
    ];

    validValues.forEach(value => {
      test(`${value} is not positive`, () => {
        expect(isPositive()(value)).toBe(false);
      });
    });
});

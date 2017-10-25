const isNaN = require('./isNaN');

test('isNaN returns a function', () => {
  expect(isNaN()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    Number.NaN,
    Math.sqrt(-3)
  ];

  validValues.forEach(value => {
    test(`${value} is NaN`, () => {
      expect(isNaN()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    4.3,
    Math.PI,
    true,
    5,
    -9,
    '42'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not NaN`, () => {
      expect(isNaN()(value)).toBe(false);
    });
  });
});

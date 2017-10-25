const notNaN = require('./notNaN');

test('notNaN returns a function', () => {
  expect(notNaN()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    4.3,
    Math.PI,
    true,
    5,
    -9,
    '42'
  ];

  validValues.forEach(value => {
    test(`${value} is not NaN`, () => {
      expect(notNaN()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    Number.NaN,
    Math.sqrt(-3)
  ];

  invalidValues.forEach(value => {
    test(`${value} is NaN`, () => {
      expect(notNaN()(value)).toBe(false);
    });
  });
});

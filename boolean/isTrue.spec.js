const isTrue = require('./isTrue');

test('isTrue returns a function', () => {
  expect(isTrue()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    true
  ];

  validValues.forEach(value => {
    test(`${value} is true`, () => {
      expect(isTrue()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    false,
    -1,
    0,
    'true'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not true`, () => {
      expect(isTrue()(value)).toBe(false);
    });
  });
});

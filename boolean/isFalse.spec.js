const isFalse = require('./isFalse');

test('isFalse returns a function', () => {
  expect(isFalse()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    false
  ];

  validValues.forEach(value => {
    test(`${value} is false`, () => {
      expect(isFalse()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    true,
    -1,
    0,
    'false'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not false`, () => {
      expect(isFalse()(value)).toBe(false);
    });
  });
});

const isArray = require('./isArray');

test('isArray returns a function', () => {
  expect(isArray()).toBeInstanceOf(Function);
});

describe('Valid arrays', () => {
  const validator = isArray();

  const validNumbers = [
    [ 1, 2, 3 ],
    new Array()
  ];

  validNumbers.forEach(number => {
    test(`${number} is an array`, () => {
      expect(validator(number)).toBe(true);
    });
  });
});

describe('Invalid arrays', () => {
  const validator = isArray();

  const invalidNumbers = [
    { a: 1, b: 2, c: 3 }
  ];

  invalidNumbers.forEach(number => {
    test(`${number} is not an array`, () => {
      expect(validator(number)).toBe(false);
    });
  });
});

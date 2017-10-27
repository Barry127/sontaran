const isObject = require('./isObject');

test('isObject returns a function', () => {
  expect(isObject()).toBeInstanceOf(Function);
});

describe('Valid objects', () => {
  const validator = isObject();

  const validNumbers = [
    {},
    new Object(),
    []
  ];

  validNumbers.forEach(number => {
    test(`${number} is an object`, () => {
      expect(validator(number)).toBe(true);
    });
  });
});

describe('Invalid objects', () => {
  const validator = isObject();

  const invalidNumbers = [
    '42',
    '-3',
    true,
    '#4',
    undefined,
    null
  ];

  invalidNumbers.forEach(number => {
    test(`${number} is not an object`, () => {
      expect(validator(number)).toBe(false);
    });
  });
});

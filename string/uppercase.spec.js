const uppercase = require('./uppercase');

test('uppercase returns a function', () => {
  expect(uppercase()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'HELLO WORLD!',
    'SOME_STRING',
    'NUMBERS-ARE-OK-4',
    'ÀÁØÇÈÉ',
    '😉'
  ];

  validValues.forEach(value => {
    test(`${value} is a valid uppercase string`, () => {
      expect(uppercase()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    'hello world',
    'Hello World',
    'h3',
    'ßøàáçèé'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid uppercase string`, () => {
      expect(uppercase()(value)).toBe(false);
    });
  });
});

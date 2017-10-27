const lowercase = require('./lowercase');

test('lowercase returns a function', () => {
  expect(lowercase()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'hello world!',
    'some-string',
    'numbers-are-ok-4',
    'ßøàáçèé',
    '😉'
  ];

  validValues.forEach(value => {
    test(`${value} is a valid lowercase string`, () => {
      expect(lowercase()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    'HELLO WORLD',
    'Hello World',
    'H3',
    'ÇÈÉ'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid lowercase string`, () => {
      expect(lowercase()(value)).toBe(false);
    });
  });
});

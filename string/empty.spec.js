const empty = require('./empty');

test('empty returns a function', () => {
  expect(empty()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '',
    '  ',
    "\t",
    "\n",
    "\r",
    "\n  \n\t"
  ];

  validValues.forEach(value => {
    test(`${value} is empty`, () => {
      expect(empty()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '_',
    'Hello',
    'FooBar',
    '.'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not empty`, () => {
      expect(empty()(value)).toBe(false);
    });
  });
});

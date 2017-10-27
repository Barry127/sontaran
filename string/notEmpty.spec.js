const notEmpty = require('./notEmpty');

test('notEmpty returns a function', () => {
  expect(notEmpty()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '_',
    'Hello',
    'FooBar',
    '.'
  ];

  validValues.forEach(value => {
    test(`${value} is not empty`, () => {
      expect(notEmpty()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '',
    '  ',
    "\t",
    "\n",
    "\r",
    "\n  \n\t"
  ];

  invalidValues.forEach(value => {
    test(`${value} is empty`, () => {
      expect(notEmpty()(value)).toBe(false);
    });
  });
});

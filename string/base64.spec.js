const base64 = require('./base64');

test('base64 returns a function', () => {
  expect(base64()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'U29tZXRoaW5nIHNtYXJ0PyE=',
    'U29tZXRoaW5nIHNtYXJ0Py=='
  ];

  validValues.forEach(value => {
    test(`${value} is a valid base64 encoded string`, () => {
      expect(base64()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    'U29tZXRoaW5#IH[tYXJ0PyE=', // invalid character
    'U29tZXRoaW5nIHNtYXJ0yE=', // invalid length
    'U29tZXRoaW=nIHNtYXJ0PyE=', // = sign in the middle of string
    'U29tZXRoaW5nIHNtYXJ0Py=E', // = is not at the end
    'U29tZXRoaW5nIHNtYXJ0P===', // to many = signs at the end
    4
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid base64 encoded string`, () => {
      expect(base64()(value)).toBe(false);
    });
  });
});

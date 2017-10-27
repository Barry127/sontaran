const hexColor = require('./hexColor');

test('hexColor returns a function', () => {
  expect(hexColor()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '#000000',
    '#000',
    '#FFFFFF',
    '#ABC',
    '#fFf',
    '#AcDFE3',
    '#3fE'
  ];

  validValues.forEach(value => {
    test(`${value} is a valid hexColor`, () => {
      expect(hexColor()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '000000',
    '000',
    '#EFG',
    '#DEN',
    '#ef3g4d'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid hexColor`, () => {
      expect(hexColor()(value)).toBe(false);
    });
  });
});

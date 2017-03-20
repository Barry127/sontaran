const { expect } = require('chai');
const isNegative = require('./isNegative');

describe('number/isNegative', () => {

  const validValues = [
    -3,
    -0xFF,
    -3.1E+12,
    Number.NEGATIVE_INFINITY,
    -6.00,
    -0o55
  ];

  const invalidValues = [
    0,
    3.33,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  validValues.forEach(value => {
    it(`${value} is negative`, () => {
      expect(isNegative(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not negative`, () => {
      expect(isNegative(value)).to.be.false;
    });
  });

});

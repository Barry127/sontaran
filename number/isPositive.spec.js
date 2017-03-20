const { expect } = require('chai');
const isPositive = require('./isPositive');

describe('number/isPositive', () => {

  const validValues = [
    3,
    0xFF,
    3.1E+12,
    Number.POSITIVE_INFINITY,
    6.00,
    0o55
  ];

  const invalidValues = [
    0,
    -3.33,
    Number.NaN,
    Number.NEGATIVE_INFINITY,
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  validValues.forEach(value => {
    it(`${value} is positive`, () => {
      expect(isPositive(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not positive`, () => {
      expect(isPositive(value)).to.be.false;
    });
  });

});

const { expect } = require('chai');
const isInteger = require('./isInteger');

describe('number/isInteger', () => {

  const validValues = [
    42,
    -3,
    0,
    0xFF,
    3.1E+12,
    0b011,
    6.00,
    0o55
  ];

  const invalidValues = [
    3.33,
    -5.2,
    Math.PI,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  validValues.forEach(value => {
    it(`${value} is an integer`, () => {
      expect(isInteger(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not an integer`, () => {
      expect(isInteger(value)).to.be.false;
    });
  });

});

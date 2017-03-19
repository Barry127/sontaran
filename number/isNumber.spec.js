const { expect } = require('chai');
const isNumber = require('./isNumber');

describe('number/isNumber', () => {

  const validValues = [
    42,
    -3,
    0,
    3.33,
    -5.2,
    Math.PI,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    0xFF,
    3.1E+12,
    0b011,
    0o55

  ];

  const invalidValues = [
    '42',
    '-3',
    true,
    null,
    '#4'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid number`, () => {
      expect(isNumber(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is a not valid number`, () => {
      expect(isNumber(value)).to.be.false;
    });
  });

});

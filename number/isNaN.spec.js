const { expect } = require('chai');
const isNaN = require('./isNaN');

describe('number/isNaN', () => {

  const validValues = [
    Number.NaN,
    Math.sqrt(-3)
  ];

  const invalidValues = [
    4.3,
    Math.PI,
    true,
    5,
    -9
  ];

  validValues.forEach(value => {
    it(`${value} is NaN`, () => {
      expect(isNaN(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not NaN`, () => {
      expect(isNaN(value)).to.be.false;
    });
  });

});

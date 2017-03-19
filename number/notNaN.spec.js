const { expect } = require('chai');
const notNaN = require('./notNaN');

describe('number/notNaN', () => {

  const validValues = [
    4.3,
    Math.PI,
    5,
    -9
  ];

  const invalidValues = [
    Number.NaN,
    Math.sqrt(-3)
  ];

  validValues.forEach(value => {
    it(`${value} is not NaN`, () => {
      expect(notNaN(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is NaN`, () => {
      expect(notNaN(value)).to.be.false;
    });
  });

});

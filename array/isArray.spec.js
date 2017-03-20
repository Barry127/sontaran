const { expect } = require('chai');
const isArray = require('./isArray');

describe('array/isArray', () => {

  const validValues = [
    [ 1, 2, 3 ],
    new Array()
  ];

  const invalidValues = [
    { a: 1, b: 2, c: 3 }
  ];

  validValues.forEach(value => {
    it(`${value} is an array`, () => {
      expect(isArray(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not an array`, () => {
      expect(isArray(value)).to.be.false;
    });
  });

});

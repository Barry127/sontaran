const { expect } = require('chai');
const isFalse = require('./isFalse');

describe('boolean/isFalse', () => {

  const validValues = [
    false
  ];

  const invalidValues = [
    true,
    -1,
    0,
    'false'
  ];

  validValues.forEach(value => {
    it(`${value} is false`, () => {
      return expect(isFalse(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not false`, () => {
      return expect(isFalse(value)).to.be.false;
    });
  });
});

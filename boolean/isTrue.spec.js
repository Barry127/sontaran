const { expect } = require('chai');
const isTrue = require('./isTrue');

describe('boolean/isTrue', () => {

  const validValues = [
    true
  ];

  const invalidValues = [
    false,
    1,
    'true'
  ];

  validValues.forEach(value => {
    it(`${value} is true`, () => {
      return expect(isTrue(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not true`, () => {
      return expect(isTrue(value)).to.be.false;
    });
  });
});

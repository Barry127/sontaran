const { expect } = require('chai');
const isString = require('./isString');

describe('string/isString', () => {

  const validValues = [
    'aa',
    'Hello World!',
    `Something`
  ];

  const invalidValues = [
    true,
    null,
    4
  ];

  validValues.forEach(value => {
    it(`${value} is a valid string`, () => {
      expect(isString(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is a not valid string`, () => {
      expect(isString(value)).to.be.false;
    });
  });

});

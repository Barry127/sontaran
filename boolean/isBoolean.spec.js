const { expect } = require('chai');
const isBoolean = require('./isBoolean');

describe('boolean/isBoolean', () => {

  const validValues = [
    true,
    false
  ];

  const invalidValues = [
    -1,
    0,
    1,
    'true',
    'false'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid boolean`, () => {
      expect(isBoolean(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is a not valid boolean`, () => {
      expect(isBoolean(value)).to.be.false;
    });
  });

});

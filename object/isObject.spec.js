const { expect } = require('chai');
const isObject = require('./isObject');

describe('object/isObject', () => {

  const validValues = [
    {},
    new Object(),
    [],
    null
  ];

  const invalidValues = [
    '42',
    '-3',
    true,
    '#4',
    undefined
  ];

  validValues.forEach(value => {
    it(`${value} is an object`, () => {
      expect(isObject(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a object`, () => {
      expect(isObject(value)).to.be.false;
    });
  });

});

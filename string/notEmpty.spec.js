const { expect } = require('chai');
const notEmpty = require('./notEmpty');

describe('string/notEmpty', () => {

  const validValues = [
    '_',
    'Hello',
    'FooBar'
  ];

  const invalidValues = [
    '',
    '  ',
    "\t",
    "\n",
    "\r",
    "\n  \n\t",
    4,
    null,
    false
  ];

  validValues.forEach(value => {
    it(`${value} is not empty`, () => {
      expect(notEmpty(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is empty`, () => {
      expect(notEmpty(value)).to.be.false;
    });
  });

});

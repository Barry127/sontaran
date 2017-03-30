const { expect } = require('chai');
const empty = require('./empty');

describe('string/empty', () => {

  const validValues = [
    '',
    '  ',
    "\t",
    "\n",
    "\r",
    "\n  \n\t"
  ];

  const invalidValues = [
    '_',
    'Hello',
    'FooBar',
    4,
    null,
    false
  ];

  validValues.forEach(value => {
    it(`${value} is empty`, () => {
      expect(empty(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not empty`, () => {
      expect(empty(value)).to.be.false;
    });
  });

});

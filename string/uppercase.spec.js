const { expect } = require('chai');
const uppercase = require('./uppercase');

describe('string/uppercase', () => {

  const validValues = [
    'HELLO WORLD!',
    'SOME_STRING',
    'NUMBERS-ARE-OK-4',
    'ÀÁØÇÈÉ'
  ];

  const invalidValues = [
    'hello world',
    'Hello World',
    'h3',
    'ßøàáçèé',
    3,
    null
  ];

  validValues.forEach(value => {
    it(`${value} is a valid uppercase string`, () => {
      expect(uppercase(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid uppercase string`, () => {
      expect(uppercase(value)).to.be.false;
    });
  });

});

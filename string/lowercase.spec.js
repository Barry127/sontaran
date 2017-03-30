const { expect } = require('chai');
const lowercase = require('./lowercase');

describe('string/lowercase', () => {

  const validValues = [
    'hello world!',
    'some-string',
    'numbers-are-ok-4',
    'ßøàáçèé',
  ];

  const invalidValues = [
    'HELLO WORLD',
    'Hello World',
    'H3',
    'ÇÈÉ',
    3,
    null
  ];

  validValues.forEach(value => {
    it(`${value} is a valid lowercase string`, () => {
      expect(lowercase(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid lowercase string`, () => {
      expect(lowercase(value)).to.be.false;
    });
  });

});

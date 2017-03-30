const { expect } = require('chai');
const base64 = require('./base64');

describe('string/base64', () => {

  const validValues = [
    'U29tZXRoaW5nIHNtYXJ0PyE=',
    'U29tZXRoaW5nIHNtYXJ0Py==',
  ];

  const invalidValues = [
    'U29tZXRoaW5#IH[tYXJ0PyE=', // invalid character
    'U29tZXRoaW5nIHNtYXJ0yE=', // invalid length
    'U29tZXRoaW=nIHNtYXJ0PyE=', // = sign in the middle of string
    'U29tZXRoaW5nIHNtYXJ0Py=E', // = is not at the end
    'U29tZXRoaW5nIHNtYXJ0P===', // to many = signs at the end
    4,
    null
  ];

  validValues.forEach(value => {
    it(`${value} is a valid base64 encoded string`, () => {
      expect(base64(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid base64 encoded string`, () => {
      expect(base64(value)).to.be.false;
    });
  });

});

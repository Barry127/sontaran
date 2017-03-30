const { expect } = require('chai');
const hexColor = require('./hexColor');

describe('string/hexColor', () => {

  const validValues = [
    '#000000',
    '#000',
    '#FFFFFF',
    '#ABC',
    '#fFf',
    '#AcDFE3',
    '#3fE'
  ];

  const invalidValues = [
    '000000',
    '000',
    '#EFG',
    '#DEN',
    '#ef3g4d',
    4,
    null
  ];

  validValues.forEach(value => {
    it(`${value} is a valid hexColor`, () => {
      expect(hexColor(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid hexColor`, () => {
      expect(hexColor(value)).to.be.false;
    });
  });

});

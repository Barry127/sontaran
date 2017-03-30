const { expect } = require('chai');
const ascii = require('./ascii');

const allAsci = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`;

describe('string/ascii', () => {

  const validValues = [
    'aa',
    'Hello World!',
    `Something`,
    allAsci
  ];

  const invalidValues = [
    true,
    null,
    4,
    '♠♣♥♦',
    'wrøng'
  ];

  validValues.forEach(value => {
    it(`${value} contains only ascii characters`, () => {
      expect(ascii(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} contains non-ascii characters`, () => {
      expect(ascii(value)).to.be.false;
    });
  });

});

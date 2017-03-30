const { expect } = require('chai');
const extendedAscii = require('./extendedAscii');

const allAscii = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`;
const allExtendedAscii = `${allAscii} ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ`;

describe('string/extendedAscii', () => {

  const validValues = [
    'aa',
    'Hello World!',
    `Something`,
    'not-wrøng',
    allAscii,
    allExtendedAscii
  ];

  const invalidValues = [
    true,
    null,
    4,
    '♠♣♥♦'
  ];

  validValues.forEach(value => {
    it(`${value} contains only extended ascii characters`, () => {
      expect(extendedAscii(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} contains non-extended ascii characters`, () => {
      expect(extendedAscii(value)).to.be.false;
    });
  });

});

const { expect } = require('chai');
const equals = require('./equals');

describe('number/equals', () => {

  const validPairs = [
    [ 3, 3 ],
    [ -2, -2 ],
    [ 3.33, 3.33 ],
    [ Math.PI, Math.PI ],
    [ Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ 4, 8 ],
    [ Math.PI, 3.14 ],
    [ -2, 4 ],
    [ 3, '3' ],
    [ Number.NaN, Number.NaN ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.false;
    });
  });

});

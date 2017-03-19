const { expect } = require('chai');
const min = require('./min');

describe('number/min', () => {

  const validPairs = [
    [ 3, 2 ],
    [ 4, 4 ],
    [ -2, -6 ],
    [ 3, Number.NEGATIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ Math.PI, 4 ],
    [ -2, -1 ],
    [ 4, Number.NaN ],
    [ 2, '1' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is not less than ${pair[1]}`, () => {
      expect(min(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is less than ${pair[1]}`, () => {
      expect(min(pair[0], pair[1])).to.be.false;
    });
  });

});
